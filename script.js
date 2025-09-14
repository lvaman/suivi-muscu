// --- Firebase Services ---
const api = window.firebaseServices;

// --- Configuration & Static Data ---
const config = {
    KG_TO_LBS: 2.20462,
    translations: {
        fr: {
            mainTitle: "Suivi Sportif 🏋️‍♂️",
            subTitle: "Sélectionnez une date pour voir ou ajouter un entraînement.",
            addExerciseTitle: "Ajouter un exercice",
            editExerciseTitle: "Modifier l'exercice",
            exerciseSearchLabel: "Rechercher un exercice",
            categoryLabel: "Catégorie",
            chooseCategory: "Choisir une catégorie...",
            exerciseLabel: "Exercice",
            setsLabel: "Séries",
            repsLabel: "Répétitions",
            weightLabel: "Poids",
            unitLabel: "Unité",
            bodyweightLabel: "Poids du corps",
            generateSetsBtn: "Générer les séries",
            addSetManuallyBtn: "Ajouter une série manuellement",
            notesLabel: "Notes",
            notesPlaceholder: "Sensations, performances...",
            saveExerciseBtn: "Enregistrer",
            updateExerciseBtn: "Mettre à jour",
            cancelEditBtn: "Annuler",
            workoutOf: "Entraînement du",
            noWorkout: "Aucun entraînement enregistré pour ce jour.",
            bodyweightDisplay: "Poids du corps",
            setLabel: "Série",
            repsDisplay: "reps",
            deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet exercice ?",
            alertIncompleteSet: "Veuillez ajouter au moins une série valide.",
            alertQuickAdd: "Veuillez entrer un nombre valide de séries et de répétitions.",
            dayAbbr: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
        },
        en: {
            mainTitle: "Fitness Tracker 🏋️‍♂️",
            subTitle: "Select a date to view or add a workout.",
            addExerciseTitle: "Add Exercise",
            editExerciseTitle: "Edit Exercise",
            exerciseSearchLabel: "Search Exercise",
            categoryLabel: "Category",
            chooseCategory: "Choose a category...",
            exerciseLabel: "Exercise",
            setsLabel: "Sets",
            repsLabel: "Repetitions",
            weightLabel: "Weight",
            unitLabel: "Unit",
            bodyweightLabel: "Bodyweight",
            generateSetsBtn: "Generate Sets",
            addSetManuallyBtn: "Add Set Manually",
            notesLabel: "Notes",
            notesPlaceholder: "How it felt, performance...",
            saveExerciseBtn: "Save",
            updateExerciseBtn: "Update",
            cancelEditBtn: "Cancel",
            workoutOf: "Workout for",
            noWorkout: "No workout logged for this day.",
            bodyweightDisplay: "Bodyweight",
            setLabel: "Set",
            repsDisplay: "reps",
            deleteConfirm: "Are you sure you want to delete this exercise?",
            alertIncompleteSet: "Please add at least one valid set.",
            alertQuickAdd: "Please enter a valid number of sets and repetitions.",
            dayAbbr: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        }
    },
    categoryTranslations: {
        'Pectoraux': 'Chest',
        'Dos': 'Back',
        'Jambes': 'Legs',
        'Épaules': 'Shoulders',
        'Biceps': 'Biceps',
        'Triceps': 'Triceps',
        'Cardio': 'Cardio'
    },
    exercisesData: {
        'Pectoraux': [
            { french: 'Développé couché (Barre)', english: 'Barbell Bench Press' },
            { french: 'Développé couché (Haltères)', english: 'Dumbbell Bench Press' },
            { french: 'Développé couché (Smith)', english: 'Smith Machine Bench Press' },
            { french: 'Presse à pectoraux (machine)', english: 'Chest Press Machine' },
            { french: 'Développé incliné (Barre)', english: 'Incline Barbell Press' },
            { french: 'Développé incliné (Haltères)', english: 'Incline Dumbbell Press' },
            { french: 'Développé incliné (Smith)', english: 'Incline Smith Machine Press' },
            { french: 'Presse à pectoraux inclinée (machine)', english: 'Incline Chest Press Machine' },
            { french: 'Écartés avec haltères', english: 'Dumbbell Flys' },
            { french: 'Écartés à la poulie haute', english: 'High Cable Fly' },
            { french: 'Écartés à la poulie basse', english: 'Low Cable Fly' },
            { french: 'Pompes', english: 'Push-ups' }
        ],
        'Dos': [
            { french: 'Tractions', english: 'Pull-ups' },
            { french: 'Tirage vertical (Pulldown)', english: 'Lat Pulldown' },
            { french: 'Tirage vertical (unilatéral)', english: 'Single-Arm Lat Pulldown' },
            { french: 'Rowing barre', english: 'Barbell Row' },
            { french: 'Rowing haltère (unilatéral)', english: 'Single-Arm Dumbbell Row' },
            { french: 'Tirage horizontal (2 mains)', english: 'Seated Cable Row (2 hands)' },
            { french: 'Tirage horizontal à la poulie (unilatéral)', english: 'Single-Arm Cable Row' }
        ],
        'Jambes': [
            { french: 'Squat', english: 'Squat' },
            { french: 'Squat (Smith)', english: 'Smith Machine Squat' },
            { french: 'Presse à cuisses', english: 'Leg Press' },
            { french: 'Fentes', english: 'Lunges' },
            { french: 'Leg extensions', english: 'Leg Extensions' },
            { french: 'Leg curls', english: 'Leg Curls' }
        ],
        'Épaules': [
            { french: 'Développé militaire (Barre)', english: 'Military Press (Barbell)' },
            { french: 'Développé militaire (Haltères)', english: 'Military Press (Dumbbell)' },
            { french: 'Développé épaules haltères (banc incliné)', english: 'Incline Dumbbell Shoulder Press' },
            { french: 'Développé militaire (Smith)', english: 'Smith Machine Military Press' },
            { french: 'Élévations latérales (Haltères)', english: 'Dumbbell Lateral Raises' },
            { french: 'Élévations latérales à la poulie (unilatéral)', english: 'Single-Arm Cable Lateral Raise' },
            { french: 'Oiseau', english: 'Bent-over Dumbbell Raise' }
        ],
        'Biceps': [
            { french: 'Curl barre', english: 'Barbell Curl' },
            { french: 'Curl haltères', english: 'Dumbbell Curl' },
            { french: 'Curl marteau', english: 'Hammer Curl' }
        ],
        'Triceps': [
            { french: 'Dips', english: 'Dips' },
            { french: 'Barre au front', english: 'Skull Crusher' },
            { french: 'Extensions triceps à la poulie (Pushdowns)', english: 'Tricep Pushdown' },
            { french: 'Extensions triceps à la poulie haute (au-dessus de la tête)', english: 'Overhead Cable Tricep Extension' }
        ],
        'Cardio': [
            { french: 'Tapis de course', english: 'Treadmill' },
            { french: 'Vélo elliptique', english: 'Elliptical Trainer' },
            { french: 'Rameur', english: 'Rowing Machine' }
        ]
    },
    get englishToFrenchCategoryKey() {
        return Object.fromEntries(Object.entries(this.categoryTranslations).map(([fr, en]) => [en, fr]));
    }
};

// --- Application State ---
const state = {
    language: 'en',
    displayUnit: 'lbs',
    currentDate: new Date().toISOString().split('T')[0],
    currentWorkoutData: null,
    editingExerciseIndex: null,
    firestoreUnsubscribe: null,
    allExercisesFlat: [],
    calendar: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        monthlyWorkouts: new Map()
    }
};

// --- DOM Element References ---
const dom = {
    datePicker: document.getElementById('date-picker'),
    categorySelect: document.getElementById('category-select'),
    exerciseSelect: document.getElementById('exercise-select'),
    exerciseSearch: document.getElementById('exercise-search'),
    autocompleteResults: document.getElementById('autocomplete-results'),
    setsContainer: document.getElementById('sets-container'),
    addSetButton: document.getElementById('add-set-button'),
    notesInput: document.getElementById('notes-input'),
    workoutForm: document.getElementById('add-workout-form'),
    workoutLog: document.getElementById('workout-log'),
    logDateSpan: document.getElementById('log-date'),
    setRowTemplate: document.getElementById('set-row-template'),
    formTitle: document.getElementById('form-title'),
    submitWorkoutBtn: document.getElementById('submit-workout-btn'),
    cancelEditBtn: document.getElementById('cancel-edit-btn'),
    quickSetsInput: document.getElementById('quick-sets'),
    quickRepsInput: document.getElementById('quick-reps'),
    quickWeightInput: document.getElementById('quick-weight'),
    quickUnitSelect: document.getElementById('quick-unit'),
    bodyweightCheckbox: document.getElementById('bodyweight-checkbox'),
    generateSetsButton: document.getElementById('generate-sets-button'),
    langFrButton: document.getElementById('lang-fr'),
    langEnButton: document.getElementById('lang-en'),
    displayKgButton: document.getElementById('display-kg'),
    displayLbsButton: document.getElementById('display-lbs'),
    prevDayBtn: document.getElementById('prev-day-btn'),
    nextDayBtn: document.getElementById('next-day-btn'),
    simpleCalendarContainer: document.getElementById('simple-calendar-container'),
    calendarPicker: document.getElementById('calendar-picker'),
    monthSelect: document.getElementById('month-select'),
    yearSelect: document.getElementById('year-select'),
    pickerGoBtn: document.getElementById('picker-go-btn'),
    calendarTooltip: document.getElementById('calendar-tooltip'),
};

// --- UI Functions ---
const ui = {
    updateText() {
        const lang = state.language;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (!config.translations[lang][key]) return;
            if (el.id === 'submit-workout-btn') {
                el.textContent = state.editingExerciseIndex !== null ? config.translations[lang].updateExerciseBtn : config.translations[lang].saveExerciseBtn;
            } else if (el.id === 'form-title') {
                el.textContent = state.editingExerciseIndex !== null ? config.translations[lang].editExerciseTitle : config.translations[lang].addExerciseTitle;
            } else if (el.placeholder) {
                el.placeholder = config.translations[lang][key];
            } else {
                const firstChild = el.childNodes[0];
                if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                    firstChild.nodeValue = config.translations[lang][key] + ' ';
                } else {
                    el.textContent = config.translations[lang][key];
                }
            }
        });
        document.documentElement.lang = lang;
        this.updateDateDisplay();
    },

    updateDateDisplay() {
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';
        dom.logDateSpan.textContent = new Date(state.currentDate + 'T12:00:00').toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    },

    populateCategoryOptions() {
        const currentVal = dom.categorySelect.value;
        dom.categorySelect.innerHTML = `<option value="">${config.translations[state.language].chooseCategory}</option>`;
        for (const key in config.categoryTranslations) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = state.language === 'fr' ? key : config.categoryTranslations[key];
            dom.categorySelect.appendChild(option);
        }
        dom.categorySelect.value = currentVal;
    },

    updateExerciseOptions() {
        const currentVal = dom.exerciseSelect.value;
        const selectedCategoryKey = dom.categorySelect.value;
        dom.exerciseSelect.innerHTML = "";
        if (!selectedCategoryKey) {
            dom.exerciseSelect.innerHTML = `<option>${config.translations[state.language].chooseCategory}</option>`;
            return;
        }
        const exercises = config.exercisesData[selectedCategoryKey] || [];
        exercises.forEach((exercise, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = state.language === 'fr' ? exercise.french : exercise.english;
            dom.exerciseSelect.appendChild(option);
        });
        dom.exerciseSelect.value = currentVal;
    },

    addSetRow(setData = {}) {
        const templateContent = dom.setRowTemplate.content.cloneNode(true);
        const setRow = templateContent.querySelector('.set-row');
        if (setData.reps) setRow.querySelector('.reps-input').value = setData.reps;
        if (setData.weight !== undefined) setRow.querySelector('.weight-input').value = setData.weight;
        if (setData.unit) setRow.querySelector('.unit-select').value = setData.unit;
        setRow.querySelector('.delete-set-btn').addEventListener('click', e => e.target.closest('.set-row').remove());
        dom.setsContainer.appendChild(templateContent);
    },

    resetForm() {
        state.editingExerciseIndex = null;
        dom.workoutForm.reset();
        dom.exerciseSearch.value = '';
        dom.setsContainer.innerHTML = "";
        this.addSetRow();
        dom.cancelEditBtn.style.display = 'none';
        dom.quickWeightInput.disabled = false;
        this.updateText();
    },

    convertWeight(weight, fromUnit, toUnit) {
        if (fromUnit === toUnit || weight === 0) return parseFloat(weight).toFixed(1);
        if (fromUnit === 'kg' && toUnit === 'lbs') return (weight * config.KG_TO_LBS).toFixed(1);
        if (fromUnit === 'lbs' && toUnit === 'kg') return (weight / config.KG_TO_LBS).toFixed(1);
        return parseFloat(weight).toFixed(1);
    },

    renderWorkoutLog() {
        dom.workoutLog.innerHTML = "";
        const exercises = state.currentWorkoutData;
        if (!exercises || exercises.length === 0) {
            dom.workoutLog.innerHTML = `<p>${config.translations[state.language].noWorkout}</p>`;
            return;
        }
        exercises.forEach((ex) => {
            const card = document.createElement('div');
            card.className = "exercise-card";
            const categoryDisplay = state.language === 'fr' ? (config.englishToFrenchCategoryKey[ex.category] || ex.category) : ex.category;
            const exerciseInFrenchObj = Object.values(config.exercisesData).flat().find(e => e.english === ex.name);
            const exerciseDisplay = state.language === 'fr' ? (exerciseInFrenchObj ? exerciseInFrenchObj.french : ex.name) : ex.name;
            const setsList = ex.sets.map(set => {
                const displayWeight = this.convertWeight(set.weight, set.unit, state.displayUnit);
                const weightText = set.weight === 0 ? config.translations[state.language].bodyweightDisplay : `${displayWeight} ${state.displayUnit}`;
                return `<li><span>${config.translations[state.language].setLabel}: ${set.reps} ${config.translations[state.language].repsDisplay}</span> <span>${weightText}</span></li>`;
            }).join('');

            card.innerHTML = `
                <div class="drag-handle" aria-label="Drag to reorder">⠿</div>
                <div class="exercise-actions">
                    <button class="action-btn edit-btn" title="Edit" aria-label="Edit exercise">✏️</button>
                    <button class="action-btn delete-btn" title="Delete" aria-label="Delete exercise">🗑️</button>
                </div>
                <h3>${exerciseDisplay} <small>(${categoryDisplay})</small></h3>
                <ul>${setsList}</ul>
                ${ex.notes ? `<p class="notes"><strong>Notes:</strong> ${ex.notes}</p>` : ''}
            `;
            dom.workoutLog.appendChild(card);
        });
    },

    renderCalendarGrid() {
        const { year, month } = state.calendar;
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';
        const monthName = new Date(year, month).toLocaleString(locale, { month: 'long', year: 'numeric' });
        const todayStr = new Date().toISOString().split('T')[0];

        let calendarWrapper = document.getElementById('calendar-grid-wrapper');
        if (!calendarWrapper) {
            calendarWrapper = document.createElement('div');
            calendarWrapper.id = 'calendar-grid-wrapper';
            dom.simpleCalendarContainer.prepend(calendarWrapper);
        }
        const dayHeaders = config.translations[state.language].dayAbbr
            .map(day => `<div class="simple-calendar-weekday">${day}</div>`).join('');
        let html = `
            <div class="simple-calendar-header">
                <button class="simple-calendar-nav" data-action="prev-month" aria-label="Previous month">‹</button>
                <span data-action="open-picker">${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</span>
                <button class="simple-calendar-nav" data-action="next-month" aria-label="Next month">›</button>
            </div>
            <div class="simple-calendar-grid">
                ${dayHeaders}
            `;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1);
        const dayOffset = (firstDayOfMonth.getDay() + 6) % 7;
        for (let i = 0; i < dayOffset; i++) {
            html += `<div class="simple-calendar-day empty"></div>`;
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const workoutData = state.calendar.monthlyWorkouts.get(dateStr);
            const hasWorkout = !!workoutData && workoutData.length > 0;
            const isSelected = dateStr === state.currentDate;
            const isToday = dateStr === todayStr;
            const { className, style } = hasWorkout ? logic.getWorkoutColorInfo(workoutData) : { className: '', style: '' };
            const dayClasses = ['simple-calendar-day'];
            if (hasWorkout) dayClasses.push('has-workout', className);
            if (isToday) dayClasses.push('today-day');
            if (isSelected) dayClasses.push('selected-day');
            html += `<div class="${dayClasses.join(' ')}" style="${style}" data-date="${dateStr}">${day}</div>`;
        }
        html += '</div>';
        calendarWrapper.innerHTML = html;
    },

    togglePicker(show) {
        dom.calendarPicker.classList.toggle('visible', show);
    },

    populateMonthYearPicker() {
        const { year, month } = state.calendar;
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';
        dom.monthSelect.innerHTML = Array.from({ length: 12 }, (_, i) => {
            const monthName = new Date(2000, i).toLocaleString(locale, { month: 'long' });
            return `<option value="${i}" ${i === month ? 'selected' : ''}>${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</option>`;
        }).join('');
        const currentYear = new Date().getFullYear();
        dom.yearSelect.innerHTML = Array.from({ length: 16 }, (_, i) => {
            const yearValue = currentYear - 10 + i;
            return `<option value="${yearValue}" ${yearValue === year ? 'selected' : ''}>${yearValue}</option>`;
        }).join('');
    }
};

// --- Event Handlers ---
const handlers = {
    handleDateChange() {
        logic.updateSelectedDate(dom.datePicker.value);
    },

    handleLogActions(e) {
        const target = e.target.closest(".action-btn");
        if (!target) return;

        const card = e.target.closest('.exercise-card');
        if (!card) return;

        const allCards = Array.from(dom.workoutLog.querySelectorAll('.exercise-card'));
        const index = allCards.indexOf(card);

        if (index === -1) return;

        if (target.classList.contains("edit-btn")) logic.startEditExercise(index);
        else if (target.classList.contains("delete-btn")) logic.deleteExercise(index);
    },

    async handleWorkoutSubmit(e) {
        e.preventDefault();
        const sets = Array.from(dom.setsContainer.querySelectorAll('.set-row')).map(row => {
            const reps = row.querySelector('.reps-input').value;
            const weight = row.querySelector('.weight-input').value;
            const unit = row.querySelector('.unit-select').value;
            return (reps && weight !== "") ? { reps: parseInt(reps, 10), weight: parseFloat(weight), unit } : null;
        }).filter(Boolean);

        if (sets.length === 0) return alert(config.translations[state.language].alertIncompleteSet);

        const categoryKey = dom.categorySelect.value;
        const exerciseIndex = parseInt(dom.exerciseSelect.value, 10);
        const selectedExercise = config.exercisesData[categoryKey][exerciseIndex];
        const workoutData = {
            category: config.categoryTranslations[categoryKey],
            name: selectedExercise.english,
            notes: dom.notesInput.value.trim(),
            sets
        };
        const docRef = api.doc(api.db, "daily_workouts", state.currentDate);
        if (state.editingExerciseIndex !== null) {
            const allWorkouts = [...state.currentWorkoutData];
            allWorkouts[state.editingExerciseIndex] = workoutData;
            await api.setDoc(docRef, { exercises: allWorkouts }, { merge: true });
        } else {
            await api.setDoc(docRef, { exercises: api.arrayUnion(workoutData) }, { merge: true });
        }
        ui.resetForm();
    },

    handleCalendarActions(e) {
        const { action, date } = e.target.dataset;
        if (action === 'prev-month' || action === 'next-month') {
            if (action === 'prev-month') {
                state.calendar.month--;
                if (state.calendar.month < 0) { state.calendar.month = 11; state.calendar.year--; }
            } else {
                state.calendar.month++;
                if (state.calendar.month > 11) { state.calendar.month = 0; state.calendar.year++; }
            }
            logic.fetchAndRenderCalendar();
        } else if (date) {
            logic.updateSelectedDate(date);
        } else if (action === 'open-picker') {
            ui.populateMonthYearPicker();
            ui.togglePicker(true);
        }
    },

    handlePickerGo() {
        state.calendar.year = parseInt(dom.yearSelect.value, 10);
        state.calendar.month = parseInt(dom.monthSelect.value, 10);
        ui.togglePicker(false);
        logic.fetchAndRenderCalendar();
    },

    generateSetsFromQuickAdd() {
        const setCount = parseInt(dom.quickSetsInput.value, 10);
        const repCount = dom.quickRepsInput.value;
        if (!setCount || !repCount) return alert(config.translations[state.language].alertQuickAdd);
        const weightValue = dom.bodyweightCheckbox.checked ? "0" : dom.quickWeightInput.value;
        const unitValue = dom.quickUnitSelect.value;
        dom.setsContainer.innerHTML = "";
        for (let i = 0; i < setCount; i++) ui.addSetRow({ reps: repCount, weight: weightValue, unit: unitValue });
    },

    handleExerciseSearch() {
        const searchTerm = dom.exerciseSearch.value.toLowerCase();
        if (searchTerm.length < 2) {
            dom.autocompleteResults.innerHTML = '';
            dom.autocompleteResults.style.display = 'none';
            return;
        }

        const results = state.allExercisesFlat.filter(ex =>
            ex.english.toLowerCase().includes(searchTerm) ||
            ex.french.toLowerCase().includes(searchTerm)
        );

        if (results.length > 0) {
            dom.autocompleteResults.innerHTML = results.map(ex => {
                const categoryDisplay = state.language === 'fr' ? ex.categoryKey : config.categoryTranslations[ex.categoryKey];
                const exerciseDisplay = state.language === 'fr' ? ex.french : ex.english;
                return `
                    <div class="autocomplete-item" data-category="${ex.categoryKey}" data-exercise-index="${ex.index}">
                        ${exerciseDisplay} <small>(${categoryDisplay})</small>
                    </div>`;
            }).join('');
            dom.autocompleteResults.style.display = 'block';
        } else {
            dom.autocompleteResults.style.display = 'none';
        }
    },

    handleAutocompleteClick(e) {
        const item = e.target.closest('.autocomplete-item');
        if (!item) return;
        const { category, exerciseIndex } = item.dataset;
        dom.categorySelect.value = category;
        dom.categorySelect.dispatchEvent(new Event('change'));
        dom.exerciseSelect.value = exerciseIndex;
        dom.exerciseSearch.value = '';
        dom.autocompleteResults.style.display = 'none';
    },

    handleKeyDown(e) {
        if (e.key === 'Escape' && dom.calendarPicker.classList.contains('visible')) {
            ui.togglePicker(false);
            return;
        }
        const isInputFocused = ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName);
        if (isInputFocused) return;
        if (e.key === 'ArrowLeft') logic.navigateDays(-1);
        if (e.key === 'ArrowRight') logic.navigateDays(1);
    },

    handleCalendarMouseOver(e) {
        const day = e.target.closest('.has-workout');
        if (!day) return;
        const workoutData = state.calendar.monthlyWorkouts.get(day.dataset.date);
        if (workoutData) {
            const listItems = workoutData.map(ex => {
                const exDetails = Object.values(config.exercisesData).flat().find(e => e.english === ex.name);
                const displayName = state.language === 'fr' ? (exDetails?.french || ex.name) : ex.name;
                let colorCategory = ex.category;
                if (colorCategory === 'Biceps' || colorCategory === 'Triceps') {
                    colorCategory = 'Arms';
                }
                return `<li><span class="category-dot" style="background-color: var(--color-${colorCategory});"></span>${displayName}</li>`;
            }).join('');
            dom.calendarTooltip.innerHTML = `<ul>${listItems}</ul>`;
            dom.calendarTooltip.style.display = 'block';
        }
    },

    handleCalendarMouseOut() {
        dom.calendarTooltip.style.display = 'none';
    },

    handleCalendarMouseMove(e) {
        dom.calendarTooltip.style.left = `${e.pageX + 15}px`;
        dom.calendarTooltip.style.top = `${e.pageY + 15}px`;
    }
};

// --- Core Application Logic ---
const logic = {
    initialize() {
        this.flattenExercises();
        this.initializeDragAndDrop();
        dom.datePicker.value = state.currentDate;
        ui.populateCategoryOptions();
        ui.updateText();
        ui.updateExerciseOptions();
        ui.addSetRow();
        this.fetchAndRenderCalendar();
        this.loadWorkoutsForDate(state.currentDate);
        this.setupEventListeners();
    },

    flattenExercises() {
        state.allExercisesFlat = [];
        for (const categoryKey in config.exercisesData) {
            config.exercisesData[categoryKey].forEach((exercise, index) => {
                state.allExercisesFlat.push({ ...exercise, categoryKey, index });
            });
        }
    },

    initializeDragAndDrop() {
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
                this.saveWorkoutOrder();
            }
        });
    },

    async saveWorkoutOrder() {
        if (!state.currentWorkoutData) return;
        const docRef = api.doc(api.db, "daily_workouts", state.currentDate);
        await api.setDoc(docRef, { exercises: state.currentWorkoutData }, { merge: true });
    },

    setupEventListeners() {
        document.addEventListener('keydown', handlers.handleKeyDown);
        dom.datePicker.addEventListener('change', handlers.handleDateChange);
        dom.prevDayBtn.addEventListener('click', () => this.navigateDays(-1));
        dom.nextDayBtn.addEventListener('click', () => this.navigateDays(1));

        dom.simpleCalendarContainer.addEventListener('click', handlers.handleCalendarActions);
        dom.simpleCalendarContainer.addEventListener('mouseover', handlers.handleCalendarMouseOver);
        dom.simpleCalendarContainer.addEventListener('mouseout', handlers.handleCalendarMouseOut);
        dom.simpleCalendarContainer.addEventListener('mousemove', handlers.handleCalendarMouseMove);

        dom.pickerGoBtn.addEventListener('click', handlers.handlePickerGo);
        dom.categorySelect.addEventListener('change', ui.updateExerciseOptions);
        dom.addSetButton.addEventListener('click', () => ui.addSetRow());
        dom.workoutForm.addEventListener('submit', handlers.handleWorkoutSubmit);
        dom.generateSetsButton.addEventListener('click', handlers.generateSetsFromQuickAdd);
        dom.bodyweightCheckbox.addEventListener('change', (e) => dom.quickWeightInput.disabled = e.target.checked);
        dom.langFrButton.addEventListener('click', () => this.setLanguage('fr'));
        dom.langEnButton.addEventListener('click', () => this.setLanguage('en'));
        dom.displayKgButton.addEventListener('click', () => this.setDisplayUnit('kg'));
        dom.displayLbsButton.addEventListener('click', () => this.setDisplayUnit('lbs'));
        dom.cancelEditBtn.addEventListener('click', () => ui.resetForm());
        dom.workoutLog.addEventListener('click', handlers.handleLogActions);

        dom.exerciseSearch.addEventListener('input', handlers.handleExerciseSearch);
        dom.autocompleteResults.addEventListener('click', handlers.handleAutocompleteClick);

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                 dom.autocompleteResults.style.display = 'none';
            }
            if (dom.calendarPicker.classList.contains('visible') && !e.target.closest('#simple-calendar-container')) {
                ui.togglePicker(false);
            }
        });
    },

    async fetchAndRenderCalendar() {
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
    },

    updateSelectedDate(newDate) {
        state.currentDate = newDate;
        dom.datePicker.value = newDate;
        ui.updateDateDisplay();
        const [year, month] = newDate.split('-').map(Number);
        if (state.calendar.year !== year || state.calendar.month !== month - 1) {
            state.calendar.year = year;
            state.calendar.month = month - 1;
            this.fetchAndRenderCalendar();
        } else {
             document.querySelector('.simple-calendar-day.selected-day')?.classList.remove('selected-day');
             document.querySelector(`.simple-calendar-day[data-date="${newDate}"]`)?.classList.add('selected-day');
        }

        this.loadWorkoutsForDate(newDate);
    },

    setLanguage(lang) {
        if (state.language === lang) return;
        state.language = lang;
        dom.langFrButton.classList.toggle('active', 'fr' === lang);
        dom.langEnButton.classList.toggle('active', 'en' === lang);
        ui.populateCategoryOptions();
        ui.updateExerciseOptions();
        ui.updateText();
        ui.renderWorkoutLog();
        ui.renderCalendarGrid();
    },

    setDisplayUnit(unit) {
        if (state.displayUnit === unit) return;
        state.displayUnit = unit;
        dom.displayKgButton.classList.toggle('active', 'kg' === unit);
        dom.displayLbsButton.classList.toggle('active', 'lbs' === unit);
        ui.renderWorkoutLog();
    },

    startEditExercise(index) {
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
    },

    async deleteExercise(index) {
        if (!confirm(config.translations[state.language].deleteConfirm)) return;

        const updatedExercises = [...state.currentWorkoutData];
        updatedExercises.splice(index, 1);

        const docRef = api.doc(api.db, "daily_workouts", state.currentDate);

        if (updatedExercises.length > 0) {
            // If exercises remain, update the document
            await api.setDoc(docRef, { exercises: updatedExercises });
        } else {
            // If this was the last exercise, delete the entire document
            await api.deleteDoc(docRef);
        }
    },

    loadWorkoutsForDate(dateString) {
        if (state.firestoreUnsubscribe) state.firestoreUnsubscribe();
        const docRef = api.doc(api.db, "daily_workouts", dateString);
        state.firestoreUnsubscribe = api.onSnapshot(docRef, docSnap => {
            state.currentWorkoutData = docSnap.exists() ? docSnap.data().exercises : [];
            ui.renderWorkoutLog();
            if (!docSnap.metadata.hasPendingWrites) {
                const exercises = state.currentWorkoutData;
                if (exercises && exercises.length > 0) {
                    state.calendar.monthlyWorkouts.set(docSnap.id, exercises);
                } else {
                    state.calendar.monthlyWorkouts.delete(docSnap.id);
                }
                ui.renderCalendarGrid();
            }
        });
    },

    navigateDays(days) {
        const date = new Date(state.currentDate + 'T12:00:00');
        date.setDate(date.getDate() + days);
        this.updateSelectedDate(date.toISOString().split('T')[0]);
    },

    getWorkoutColorInfo(exercises) {
        if (!exercises || exercises.length === 0) return { className: '', style: '' };
        const orderedUniqueCategories = [];
        const seenCategories = new Set();
        for (const ex of exercises) {
            let category = ex.category;
            if (category === 'Biceps' || category === 'Triceps') {
                category = 'Arms';
            }
            if (!seenCategories.has(category)) {
                seenCategories.add(category);
                orderedUniqueCategories.push(category);
            }
        }

        const uniqueCount = orderedUniqueCategories.length;
        let className = '';
        let style = '';

        switch (uniqueCount) {
            case 1:
                className = 'workout-color-1';
                style = `--c1: var(--color-${orderedUniqueCategories[0]});`;
                break;
            case 2:
                className = 'workout-color-2';
                style = `--c1: var(--color-${orderedUniqueCategories[0]}); --c2: var(--color-${orderedUniqueCategories[1]});`;
                break;
            case 3:
                className = 'workout-color-3';
                style = `--c1: var(--color-${orderedUniqueCategories[0]}); --c2: var(--color-${orderedUniqueCategories[1]}); --c3: var(--color-${orderedUniqueCategories[2]});`;
                break;
            default: // 4 or more categories
                className = 'workout-color-4';
                style = `
                    --c1: var(--color-${orderedUniqueCategories[0]});
                    --c2: var(--color-${orderedUniqueCategories[1]});
                    --c3: var(--color-${orderedUniqueCategories[2]});
                    --c4: var(--color-${orderedUniqueCategories[3]});`;
                break;
        }

        return { className, style };
    }
};

// --- Application Entry Point ---
logic.initialize();
