// --- Firebase Services ---
import * as api from './firebase-init.js';

// --- Translation Helper ---
const t = (key) => config.translations[state.language][key] || key;

// --- UI Helper ---
const toggleActiveButton = (activeButton, inactiveButton) => {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
};

// --- Admin User ID ---
const ADMIN_UID = "fWPQ0nKpYGPZdMcT7mKQivq8b7j2";

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
            dayAbbr: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            importBtn: "Importer",
            cancelBtn: "Annuler",
            importModalTitle: "Importer un entraînement",
            importModalDesc: "Sélectionnez une date pour copier l'entraînement.",
            importSuccess: "Entraînement importé avec succès !",
            importNoData: "Aucun entraînement trouvé à cette date.",
            loginBtn: "Connexion",
            loginEmailPlaceholder: "Email",
            loginPasswordPlaceholder: "Mot de passe",
            logoutBtn: "Déconnexion",
            progressTitle: "Progrès :",
            progressMaxWeight: "Poids Max",
            progressTotalVolume: "Volume Total",
            progressEst1RM: "Meilleure Série (Est. 1RM)",
            progressRecentHistory: "Historique",
            progressTblHeaderDate: "Date",
            progressTblHeaderTopSet: "Meilleure Série",
            progressTblHeaderTotalVolume: "Volume Total",
            progressTblHeaderNotes: "Notes"
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
            dayAbbr: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            importBtn: "Import",
            cancelBtn: "Cancel",
            importModalTitle: "Import Workout",
            importModalDesc: "Select a date to copy the workout from.",
            importSuccess: "Workout imported successfully!",
            importNoData: "No workout found on that date.",
            loginBtn: "Login",
            loginEmailPlaceholder: "Email",
            loginPasswordPlaceholder: "Password",
            logoutBtn: "Logout",
            progressTitle: "Progress:",
            progressMaxWeight: "Max Weight",
            progressTotalVolume: "Total Volume",
            progressEst1RM: "Best Set (Est. 1RM)",
            progressRecentHistory: "Recent History",
            progressTblHeaderDate: "Date",
            progressTblHeaderTopSet: "Top Set",
            progressTblHeaderTotalVolume: "Total Volume",
            progressTblHeaderNotes: "Notes"
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
            { french: 'Tirage horizontal à la poulie', english: 'Seated Cable Row' },
            { french: 'Tirage horizontal à la poulie (unilatéral)', english: 'Single-Arm Cable Row' },
            { french: 'Tirage horizontal à la machine (prise neutre)', english: 'Seated Machine Row (neutral grip)' },
            { french: 'Tirage horizontal à la machine (prise pronation)', english: 'Seated Machine Row (pronated grip)' },
            { french: 'Tirage horizontal à la machine (unilatéral prise neutre)', english: 'Single-Arm Seated Machine Row (neutral grip)' },
            { french: 'Tirage horizontal à la machine (unilatéral prise pronation)', english: 'Single-Arm Seated Machine Row (pronated grip)' },
            { french: 'Élévation latérale à la poulie (unilatéral)', english: 'Single-Arm Cable Rear Delt Fly' },
            { french: 'Élévation latérale haltère', english: 'Dumbbell Rear Delt Fly' }
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
    },
    get exerciseNameMap() {
        return Object.values(this.exercisesData).flat().reduce((acc, ex) => {
            acc[ex.english] = ex.french;
            return acc;
        }, {});
    }
};

// --- Application State ---
const state = {
    user: null,
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
    },
    chartInstance: null,
    progressData: [],
    progressSort: { key: 'date', order: 'desc' }
};

// --- DOM Element References ---
const dom = {
    appContainer: document.getElementById('app-container'),
    loginArea: document.getElementById('login-area'),
    logoutArea: document.getElementById('logout-area'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    loginEmailInput: document.getElementById('login-email'),
    loginPasswordInput: document.getElementById('login-password'),
    authStatus: document.getElementById('auth-status'),
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
    importWorkoutBtn: document.getElementById('import-workout-btn'),
    importModal: document.getElementById('import-modal'),
    importDatePicker: document.getElementById('import-date-picker'),
    importConfirmBtn: document.getElementById('import-confirm-btn'),
    importCancelBtn: document.getElementById('import-cancel-btn'),
    progressModal: document.getElementById('progress-modal'),
    progressModalTitle: document.getElementById('progress-modal-title'),
    progressModalClose: document.getElementById('progress-modal-close'),
    progressChartControls: document.getElementById('progress-chart-controls'),
    progressChartCanvas: document.getElementById('progress-chart-canvas'),
    progressHistoryTable: document.getElementById('progress-history-table').querySelector('tbody'),
};

// --- UI Functions ---
const ui = {
    updateText() {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (el.id === 'submit-workout-btn') {
                el.textContent = state.editingExerciseIndex !== null ? t('updateExerciseBtn') : t('saveExerciseBtn');
            } else if (el.id === 'form-title') {
                el.textContent = state.editingExerciseIndex !== null ? t('editExerciseTitle') : t('addExerciseTitle');
            } else if (el.placeholder) {
                el.placeholder = t(key);
            } else {
                const firstChild = el.childNodes[0];
                if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                    firstChild.nodeValue = t(key) + ' ';
                } else {
                    el.textContent = t(key);
                }
            }
        });
        document.documentElement.lang = state.language;
        this.updateDateDisplay();
    },

    updateDateDisplay() {
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';
        dom.logDateSpan.textContent = new Date(state.currentDate + 'T12:00:00').toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    },

    populateCategoryOptions() {
        const currentVal = dom.categorySelect.value;
        dom.categorySelect.innerHTML = `<option value="">${t('chooseCategory')}</option>`;
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
            dom.exerciseSelect.innerHTML = `<option>${t('chooseCategory')}</option>`;
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
            dom.workoutLog.innerHTML = `<p>${t('noWorkout')}</p>`;
            return;
        }
        exercises.forEach((ex) => {
            const card = document.createElement('div');
            card.className = "exercise-card";
            const categoryDisplay = state.language === 'fr' ? (config.englishToFrenchCategoryKey[ex.category] || ex.category) : ex.category;
            const exerciseInFrench = config.exerciseNameMap[ex.name];
            const exerciseDisplay = state.language === 'fr' ? (exerciseInFrench || ex.name) : ex.name;
            const setsList = ex.sets.map(set => {
                const displayWeight = this.convertWeight(set.weight, set.unit, state.displayUnit);
                const weightText = set.weight === 0 ? t('bodyweightDisplay') : `${displayWeight} ${state.displayUnit}`;
                return `<li><span>${t('setLabel')}: ${set.reps} ${t('repsDisplay')}</span> <span>${weightText}</span></li>`;
            }).join('');

            card.innerHTML = `
                <div class="drag-handle" aria-label="Drag to reorder">⠿</div>
                <div class="exercise-actions">
                    <button class="action-btn progress-btn" title="Progress" aria-label="View progress" data-exercise-name="${ex.name}">📈</button>
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
        const dayHeaders = t('dayAbbr')
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

    // Function to render the progress chart and table
    renderProgressChartAndTable(metric = 'maxWeight') {
        if (state.chartInstance) {
            state.chartInstance.destroy();
        }
        dom.progressChartControls.querySelectorAll('.metric-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.metric === metric);
        });

        // Create data points as {x, y} objects, using a timestamp for x.
        // This allows the x-axis to be a linear time scale.
        const dataPoints = state.progressData.map(d => ({
            x: new Date(d.date + 'T12:00:00').getTime(),
            y: d[metric]
        }));

        let labelKey;
        if (metric === 'maxWeight') {
            labelKey = 'progressMaxWeight';
        } else if (metric === 'totalVolume') {
            labelKey = 'progressTotalVolume';
        } else {
            labelKey = 'progressEst1RM';
        }
        const labelText = t(labelKey);
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';

        state.chartInstance = new Chart(dom.progressChartCanvas, {
            type: 'line',
            data: {
                datasets: [{
                    label: labelText,
                    data: dataPoints,
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 8,
                            callback: function(value) {
                                return new Date(value).toLocaleDateString(locale, { month: 'short', day: 'numeric' });
                            }
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(1) + (metric !== 'totalVolume' ? ` ${state.displayUnit}` : '');
                            }
                        }
                     }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            // Format the tooltip title from the timestamp
                            title: function(context) {
                                const timestamp = context[0].parsed.x;
                                return new Date(timestamp).toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                            }
                        }
                    }
                }
            }
        });
        dom.progressHistoryTable.innerHTML = state.progressData.map(d => `
            <tr>
                <td>${new Date(d.date + 'T12:00:00').toLocaleDateString(state.language === 'fr' ? 'fr-FR' : 'en-US')}</td>
                <td>${d.topSet}</td>
                <td>${d.totalVolume.toFixed(0)} ${state.displayUnit}</td>
                <td>${d.notes}</td>
            </tr>
        `).join('');

        // Update sort indicators
        dom.progressHistoryTable.closest('table').querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.textContent = '';
        });
        const activeHeader = dom.progressHistoryTable.closest('table').querySelector(`th[data-sort-key="${state.progressSort.key}"]`);
        if (activeHeader) {
            activeHeader.querySelector('.sort-indicator').textContent = state.progressSort.order === 'asc' ? '▲' : '▼';
        }
    },

    toggleModal(modal, show) {
        modal.classList.toggle('hidden', !show);
        if (show) {
            modal.querySelector('input, button').focus();
        }
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
    handleLogActions(e) {
        const target = e.target.closest(".action-btn");
        if (!target) return;

        if (target.classList.contains("progress-btn")) {
            const exerciseName = target.dataset.exerciseName;
            logic.openProgressModal(exerciseName);
            return;
        }

        // Prevent guests from editing/deleting
        if (!state.user) return;

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
        if (!state.user) {
            alert("You must be logged in as an admin to save workouts.");
            return;
        }

        const sets = Array.from(dom.setsContainer.querySelectorAll('.set-row')).map(row => {
            const reps = row.querySelector('.reps-input').value;
            const weight = row.querySelector('.weight-input').value;
            const unit = row.querySelector('.unit-select').value;
            return (reps && weight !== "") ? { reps: parseInt(reps, 10), weight: parseFloat(weight), unit } : null;
        }).filter(Boolean);

        if (sets.length === 0) return alert(t('alertIncompleteSet'));

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
        if (!setCount || !repCount) return alert(t('alertQuickAdd'));
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
        if (e.key === 'Escape') {
             if (dom.calendarPicker.classList.contains('visible')) ui.togglePicker(false);
             if (!dom.importModal.classList.contains('hidden')) ui.toggleModal(dom.importModal, false);
             if (!dom.progressModal.classList.contains('hidden')) ui.toggleModal(dom.progressModal, false);
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
                const displayName = state.language === 'fr' ? (config.exerciseNameMap[ex.name] || ex.name) : ex.name;
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
        this.listenForAuthChanges();
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

    listenForAuthChanges() {
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
        if (!state.user || !state.currentWorkoutData) return;
        const docRef = api.doc(api.db, "daily_workouts", state.currentDate);
        await api.setDoc(docRef, { exercises: state.currentWorkoutData }, { merge: true });
    },

    setupEventListeners() {
        dom.loginBtn.addEventListener('click', this.handleLogin);
        dom.logoutBtn.addEventListener('click', () => api.signOut(api.auth));

        document.addEventListener('keydown', handlers.handleKeyDown);
        dom.datePicker.addEventListener('change', (e) => this.updateSelectedDate(e.target.value));
        dom.prevDayBtn.addEventListener('click', () => this.navigateDays(-1));
        dom.nextDayBtn.addEventListener('click', () => this.navigateDays(1));

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
        dom.langFrButton.addEventListener('click', () => this.setLanguage('fr'));
        dom.langEnButton.addEventListener('click', () => this.setLanguage('en'));
        dom.displayKgButton.addEventListener('click', () => this.setDisplayUnit('kg'));
        dom.displayLbsButton.addEventListener('click', () => this.setDisplayUnit('lbs'));
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
        dom.importConfirmBtn.addEventListener('click', () => this.importWorkout());

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
            logic.sortProgressHistory('date');
        });
    },

    async handleLogin() {
        const email = dom.loginEmailInput.value;
        const password = dom.loginPasswordInput.value;
        if (!email || !password) return alert("Please enter email and password.");
        try {
            await api.signInWithEmailAndPassword(api.auth, email, password);
            // onAuthStateChanged will handle the UI update
        } catch(error) {
            alert(`Error logging in: ${error.message}`);
        }
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
        toggleActiveButton(
            lang === 'fr' ? dom.langFrButton : dom.langEnButton,
            lang === 'fr' ? dom.langEnButton : dom.langFrButton
        );
        ui.populateCategoryOptions();
        ui.updateExerciseOptions();
        ui.updateText();
        ui.renderWorkoutLog();
        ui.renderCalendarGrid();
    },

    setDisplayUnit(unit) {
        if (state.displayUnit === unit) return;
        state.displayUnit = unit;
        toggleActiveButton(
            unit === 'kg' ? dom.displayKgButton : dom.displayLbsButton,
            unit === 'kg' ? dom.displayLbsButton : dom.displayKgButton
        );
        ui.renderWorkoutLog();
    },

    startEditExercise(index) {
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
    },

    async deleteExercise(index) {
        if (!state.user || !confirm(t('deleteConfirm'))) return;

        const updatedExercises = [...state.currentWorkoutData];
        updatedExercises.splice(index, 1);

        const docRef = api.doc(api.db, "daily_workouts", state.currentDate);

        if (updatedExercises.length > 0) {
            await api.setDoc(docRef, { exercises: updatedExercises });
        } else {
            await api.deleteDoc(docRef);
        }
    },

    loadWorkoutsForDate(dateString) {
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
    },

    async importWorkout() {
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
    },

    async openProgressModal(exerciseName) {
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
                history.push(this.processExerciseInstance(targetExercise, workoutDate));
            }
        });

        state.progressData = history;
        this.sortProgressHistory(state.progressSort.key, true);
        ui.toggleModal(dom.progressModal, true);
    },

    processExerciseInstance(ex, date) {
        const setsInLbs = ex.sets.map(set => ({
            reps: set.reps,
            weight: set.unit === 'kg' ? set.weight * config.KG_TO_LBS : set.weight
        }));

        const est1RM = Math.max(...setsInLbs.map(set => this.calculateEst1RM(set.weight, set.reps)));
        const totalVolume = setsInLbs.reduce((sum, set) => sum + (set.weight * set.reps), 0);
        const maxWeight = Math.max(...setsInLbs.map(set => set.weight));
        const topSetRaw = setsInLbs.reduce((best, current) => this.calculateEst1RM(current.weight, current.reps) > this.calculateEst1RM(best.weight, best.reps) ? current : best, setsInLbs[0]);
        const topSetDisplayWeight = ui.convertWeight(topSetRaw.weight, 'lbs', state.displayUnit);

        return {
            date,
            notes: ex.notes || '',
            maxWeight: parseFloat(ui.convertWeight(maxWeight, 'lbs', state.displayUnit)),
            totalVolume: parseFloat(ui.convertWeight(totalVolume, 'lbs', state.displayUnit)),
            est1RM: parseFloat(ui.convertWeight(est1RM, 'lbs', state.displayUnit)),
            topSet: `${topSetRaw.reps} ${t('repsDisplay')} @ ${topSetDisplayWeight} ${state.displayUnit}`
        };
    },

    // Estimated 1-Rep Max (Epley Formula)
    calculateEst1RM(weight, reps) {
        if (reps == 1) return weight;
        if (weight <= 0 || reps <= 0) return 0;
        return weight * (1 + reps / 30);
    },

    sortProgressHistory(sortKey, initialSort = false) {
        if (!initialSort) {
            if (state.progressSort.key === sortKey) {
                state.progressSort.order = state.progressSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                state.progressSort.key = sortKey;
                state.progressSort.order = 'asc';
            }
        }

        state.progressData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (state.progressSort.order === 'asc') {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });

        // Re-render the chart and table with the new sort order
        ui.renderProgressChartAndTable('maxWeight');
    }
};

// --- Application Entry Point ---
logic.initialize();
