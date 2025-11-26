// --- Core Application Logic ---

import * as api from '../firebase-init.js';
import { ADMIN_UID, config, TIME_SUFFIX } from './config.js';
import { state } from './state.js';
import { dom } from './dom.js';
import { ui } from './ui.js';
import { handlers } from './handlers.js';
import { toggleActiveButton, flattenExercises, convertWeight, calculateEst1RM, getCategoryColorKey } from './utils.js';
import { t } from './utils.js';

export const initialize = () => {
    listenForAuthChanges();
    flattenExercises();
    initializeDragAndDrop();
    dom.datePicker.value = state.currentDate;
    ui.populateCategoryOptions();
    ui.updateText();
    ui.updateExerciseOptions();
    ui.addSetRow();
    fetchAndRenderCalendar();
    loadWorkoutsForDate(state.currentDate);
    setupEventListeners();
};

const listenForAuthChanges = () => {
    api.onAuthStateChanged(api.auth, user => {
        if (user && user.uid === ADMIN_UID) {
            state.user = user;
            document.body.classList.remove('is-guest');
            dom.loginArea.classList.add('hidden');
            dom.logoutArea.classList.remove('hidden');
            dom.authStatus.textContent = `Admin: ${user.email}`;
        } else {
            state.user = null;
            document.body.classList.add('is-guest');
            dom.loginArea.classList.remove('hidden');
            dom.logoutArea.classList.add('hidden');
            dom.authStatus.textContent = '';
            if (user) {
               api.signOut(api.auth);
            }
        }
    });
};

const initializeDragAndDrop = () => {
    if (typeof Sortable === 'undefined') return;
    new Sortable(dom.workoutLog, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        onEnd: (evt) => {
            if (evt.oldIndex === evt.newIndex) return;
            const movedItem = state.currentWorkoutData.splice(evt.oldIndex, 1)[0];
            state.currentWorkoutData.splice(evt.newIndex, 0, movedItem);
            saveWorkoutOrder();
        }
    });
};

const saveWorkoutOrder = async () => {
    if (!state.user || !state.currentWorkoutData) return;
    const docRef = api.doc(api.db, "daily_workouts", state.currentDate);
    await api.setDoc(docRef, { exercises: state.currentWorkoutData }, { merge: true });
};

const setupEventListeners = () => {
    dom.loginBtn.addEventListener('click', handleLogin);
    dom.logoutBtn.addEventListener('click', () => api.signOut(api.auth));

    document.addEventListener('keydown', handlers.handleKeyDown);
    dom.datePicker.addEventListener('change', (e) => updateSelectedDate(e.target.value));
    dom.prevDayBtn.addEventListener('click', () => navigateDays(-1));
    dom.nextDayBtn.addEventListener('click', () => navigateDays(1));

    dom.simpleCalendarContainer.addEventListener('click', handlers.handleCalendarActions);

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
        dom.simpleCalendarContainer.addEventListener('mouseover', handlers.handleCalendarMouseOver);
        dom.simpleCalendarContainer.addEventListener('mouseout', handlers.handleCalendarMouseOut);
        dom.simpleCalendarContainer.addEventListener('mousemove', handlers.handleCalendarMouseMove);
    }

    dom.pickerGoBtn.addEventListener('click', handlers.handlePickerGo);
    dom.categorySelect.addEventListener('change', ui.updateExerciseOptions);
    dom.addSetButton.addEventListener('click', () => ui.addSetRow());
    dom.workoutForm.addEventListener('submit', handlers.handleWorkoutSubmit);
    dom.generateSetsButton.addEventListener('click', handlers.generateSetsFromQuickAdd);
    dom.bodyweightCheckbox.addEventListener('change', (e) => dom.quickWeightInput.disabled = e.target.checked);
    dom.langFrButton.addEventListener('click', () => setLanguage('fr'));
    dom.langEnButton.addEventListener('click', () => setLanguage('en'));
    dom.displayKgButton.addEventListener('click', () => setDisplayUnit('kg'));
    dom.displayLbsButton.addEventListener('click', () => setDisplayUnit('lbs'));
    dom.cancelEditBtn.addEventListener('click', () => ui.resetForm());
    dom.workoutLog.addEventListener('click', handlers.handleLogActions);

    dom.exerciseSearch.addEventListener('input', handlers.handleExerciseSearch);
    dom.autocompleteResults.addEventListener('click', handlers.handleAutocompleteClick);

    dom.importWorkoutBtn.addEventListener('click', () => {
        if (!state.user) return alert("You must be logged in as an admin to import workouts.");
        dom.importDatePicker.value = state.currentDate;
        ui.toggleModal(dom.importModal, true);
        if (dom.importDatePicker.showPicker) {
            try {
                dom.importDatePicker.showPicker();
            } catch (error) {
                console.warn("Could not programmatically open date picker:", error);
                dom.importDatePicker.focus();
            }
        } else {
            dom.importDatePicker.focus();
        }
    });
    dom.importCancelBtn.addEventListener('click', () => ui.toggleModal(dom.importModal, false));
    dom.importConfirmBtn.addEventListener('click', () => importWorkout());

    dom.progressModalClose.addEventListener('click', () => ui.toggleModal(dom.progressModal, false));
    dom.progressModal.addEventListener('click', (e) => {
        if (e.target === dom.progressModal) {
            ui.toggleModal(dom.progressModal, false);
        }
    });
    dom.progressChartControls.addEventListener('click', (e) => {
        if (e.target.matches('.metric-btn')) {
            ui.renderProgressChartAndTable(e.target.dataset.metric);
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
             dom.autocompleteResults.style.display = 'none';
        }
        if (dom.calendarPicker.classList.contains('visible') && !e.target.closest('#simple-calendar-container')) {
            ui.togglePicker(false);
        }
        if (!dom.importModal.classList.contains('hidden') && e.target === dom.importModal) {
            ui.toggleModal(dom.importModal, false);
        }
    });

    dom.progressHistoryTable.closest('table').querySelector('th[data-sort-key="date"]').addEventListener('click', () => {
        sortProgressHistory('date');
    });
    dom.progressHistoryTable.closest('table').querySelector('th[data-sort-key="topSet"]').addEventListener('click', () => {
        sortProgressHistory('topSet');
    });
    dom.progressHistoryTable.closest('table').querySelector('th[data-sort-key="totalVolume"]').addEventListener('click', () => {
        sortProgressHistory('totalVolume');
    });
};

const handleLogin = async () => {
    const email = dom.loginEmailInput.value;
    const password = dom.loginPasswordInput.value;
    if (!email || !password) return alert("Please enter email and password.");
    try {
        await api.signInWithEmailAndPassword(api.auth, email, password);
    } catch(error) {
        alert(`Error logging in: ${error.message}`);
    }
};

export const fetchAndRenderCalendar = async () => {
    const { year, month } = state.calendar;
    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    const q = api.query(api.collection(api.db, 'daily_workouts'), api.where('__name__', '>=', startDate), api.where('__name__', '<=', endDate));
    const querySnapshot = await api.getDocs(q);
    state.calendar.monthlyWorkouts.clear();
    querySnapshot.docs.forEach(doc => {
        state.calendar.monthlyWorkouts.set(doc.id, doc.data().exercises);
    });
    ui.renderCalendarGrid();
};

export const updateSelectedDate = (newDate) => {
    state.currentDate = newDate;
    dom.datePicker.value = newDate;
    ui.updateDateDisplay();
    const [year, month] = newDate.split('-').map(Number);
    if (state.calendar.year !== year || state.calendar.month !== month - 1) {
        state.calendar.year = year;
        state.calendar.month = month - 1;
        fetchAndRenderCalendar();
    } else {
         document.querySelector('.simple-calendar-day.selected-day')?.classList.remove('selected-day');
         document.querySelector(`.simple-calendar-day[data-date="${newDate}"]`)?.classList.add('selected-day');
    }

    loadWorkoutsForDate(newDate);
};

const setLanguage = (lang) => {
    if (state.language === lang) return;
    state.language = lang;
    toggleActiveButton(
        lang === 'fr' ? dom.langFrButton : dom.langEnButton,
        lang === 'fr' ? dom.langEnButton : dom.langFrButton
    );
    ui.populateCategoryOptions();
    ui.updateExerciseOptions();
    ui.updateText();
    ui.renderWorkoutLog();
    ui.renderCalendarGrid();
};

const setDisplayUnit = (unit) => {
    if (state.displayUnit === unit) return;
    state.displayUnit = unit;
    toggleActiveButton(
        unit === 'kg' ? dom.displayKgButton : dom.displayLbsButton,
        unit === 'kg' ? dom.displayLbsButton : dom.displayKgButton
    );
    ui.renderWorkoutLog();
};

export const startEditExercise = (index) => {
    if (!state.user) return;
    state.editingExerciseIndex = index;
    const ex = state.currentWorkoutData[index];
    const categoryKeyInFrench = config.englishToFrenchCategoryKey[ex.category];
    dom.categorySelect.value = categoryKeyInFrench;
    ui.updateExerciseOptions();
    const exerciseOption = Array.from(dom.exerciseSelect.options).find(opt => {
        const optIndex = parseInt(opt.value, 10);
        return config.exercisesData[categoryKeyInFrench][optIndex]?.english === ex.name;
    });
    if (exerciseOption) dom.exerciseSelect.value = exerciseOption.value;
    dom.notesInput.value = ex.notes;
    dom.setsContainer.innerHTML = "";
    ex.sets.forEach(set => ui.addSetRow(set));
    ui.updateText();
    dom.cancelEditBtn.style.display = 'block';
    dom.formTitle.scrollIntoView({ behavior: "smooth" });
};

export const deleteExercise = async (index) => {
    if (!state.user || !confirm(t('deleteConfirm'))) return;

    const updatedExercises = [...state.currentWorkoutData];
    updatedExercises.splice(index, 1);

    const docRef = api.doc(api.db, "daily_workouts", state.currentDate);

    if (updatedExercises.length > 0) {
        await api.setDoc(docRef, { exercises: updatedExercises });
    } else {
        await api.deleteDoc(docRef);
    }
};

const loadWorkoutsForDate = (dateString) => {
    if (state.firestoreUnsubscribe) state.firestoreUnsubscribe();
    const docRef = api.doc(api.db, "daily_workouts", dateString);
    state.firestoreUnsubscribe = api.onSnapshot(docRef, docSnap => {
        state.currentWorkoutData = docSnap.exists() ? docSnap.data().exercises : [];
        ui.renderWorkoutLog();
        const exercises = state.currentWorkoutData;
        if (exercises && exercises.length > 0) {
            state.calendar.monthlyWorkouts.set(docSnap.id, exercises);
        } else {
            state.calendar.monthlyWorkouts.delete(docSnap.id);
        }
        ui.renderCalendarGrid();
    });
};

const importWorkout = async () => {
    if (!state.user) return;
    const sourceDate = dom.importDatePicker.value;
    if (!sourceDate) return;

    const sourceDocRef = api.doc(api.db, "daily_workouts", sourceDate);
    const sourceDocSnap = await api.getDoc(sourceDocRef);

    if (!sourceDocSnap.exists() || !sourceDocSnap.data().exercises) {
        alert(t('importNoData'));
        return;
    }

    const exercisesToCopy = sourceDocSnap.data().exercises;
    const destinationDate = state.currentDate;
    const destDocRef = api.doc(api.db, "daily_workouts", destinationDate);

    await api.setDoc(destDocRef, {
        exercises: api.arrayUnion(...exercisesToCopy)
    }, { merge: true });

    ui.toggleModal(dom.importModal, false);
    alert(t('importSuccess'));
};

export const navigateDays = (days) => {
    const date = new Date(state.currentDate + TIME_SUFFIX);
    date.setDate(date.getDate() + days);
    updateSelectedDate(date.toISOString().split('T')[0]);
};

export const saveWorkout = async (workoutData) => {
    const docRef = api.doc(api.db, "daily_workouts", state.currentDate);
    if (state.editingExerciseIndex !== null) {
        const allWorkouts = [...state.currentWorkoutData];
        allWorkouts[state.editingExerciseIndex] = workoutData;
        await api.setDoc(docRef, { exercises: allWorkouts }, { merge: true });
    } else {
        await api.setDoc(docRef, { exercises: api.arrayUnion(workoutData) }, { merge: true });
    }
};

export const openProgressModal = async (exerciseName) => {
    const exerciseInFrench = config.exerciseNameMap[exerciseName] || exerciseName;
    const exerciseDisplay = state.language === 'fr' ? exerciseInFrench : exerciseName;
    dom.progressModalTitle.textContent = `${t('progressTitle')} ${exerciseDisplay}`;

    const q = api.query(api.collection(api.db, 'daily_workouts'));
    const querySnapshot = await api.getDocs(q);

    const history = [];
    querySnapshot.forEach(doc => {
        const workoutDate = doc.id;
        const exercises = doc.data().exercises || [];
        const targetExercise = exercises.find(ex => ex.name === exerciseName);

        if (targetExercise) {
            history.push(processExerciseInstance(targetExercise, workoutDate));
        }
    });

    state.progressData = history;
    sortProgressHistory(state.progressSort.key, true);
    ui.toggleModal(dom.progressModal, true);
};

const processExerciseInstance = (ex, date) => {
    const setsInLbs = ex.sets.map(set => ({
        reps: set.reps,
        weight: set.unit === 'kg' ? set.weight * config.KG_TO_LBS : set.weight
    }));

    const isBodyweight = setsInLbs.every(set => set.weight === 0);

    if (isBodyweight) {
        const maxReps = Math.max(...setsInLbs.map(set => set.reps));
        const totalReps = setsInLbs.reduce((sum, set) => sum + set.reps, 0);
        const bestSetRaw = setsInLbs.reduce((best, current) =>
            current.reps > best.reps ? current : best, setsInLbs[0]);

        return {
            date,
            notes: ex.notes || '',
            isBodyweight: true,
            maxWeight: maxReps,
            totalVolume: totalReps,
            est1RM: maxReps,
            topSet: `${bestSetRaw.reps} ${t('repsDisplay')}`
        };
    }

    const est1RM = Math.max(...setsInLbs.map(set => calculateEst1RM(set.weight, set.reps)));
    const totalVolume = setsInLbs.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    const maxWeight = Math.max(...setsInLbs.map(set => set.weight));
    const topSetRaw = setsInLbs.reduce((best, current) => calculateEst1RM(current.weight, current.reps) > calculateEst1RM(best.weight, best.reps) ? current : best, setsInLbs[0]);
    const topSetDisplayWeight = convertWeight(topSetRaw.weight, 'lbs', state.displayUnit);

    return {
        date,
        notes: ex.notes || '',
        isBodyweight: false,
        maxWeight: parseFloat(convertWeight(maxWeight, 'lbs', state.displayUnit)),
        totalVolume: parseFloat(convertWeight(totalVolume, 'lbs', state.displayUnit)),
        est1RM: parseFloat(convertWeight(est1RM, 'lbs', state.displayUnit)),
        topSet: `${topSetRaw.reps} ${t('repsDisplay')} @ ${topSetDisplayWeight} ${state.displayUnit}`
    };
};

const sortProgressHistory = (sortKey, initialSort = false) => {
    if (!initialSort) {
        if (state.progressSort.key === sortKey) {
            state.progressSort.order = state.progressSort.order === 'asc' ? 'desc' : 'asc';
        } else {
            state.progressSort.key = sortKey;
            state.progressSort.order = 'asc';
        }
    }

    state.progressData.sort((a, b) => {
        const dateA = new Date(a.date + TIME_SUFFIX);
        const dateB = new Date(b.date + TIME_SUFFIX);
        if (state.progressSort.order === 'asc') {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    });

    ui.renderProgressChartAndTable('maxWeight');
};

export { getCategoryColorKey };
