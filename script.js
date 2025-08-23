// Récupérer les services Firebase exposés
const { db, doc, setDoc, onSnapshot, updateDoc, arrayUnion } = window.firebaseServices;

// Structure de données pour les exercices
const exercisesData = {
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
};

// --- Éléments du DOM ---
const datePicker = document.getElementById('date-picker');
const categorySelect = document.getElementById('category-select');
const exerciseSelect = document.getElementById('exercise-select');
const setsContainer = document.getElementById('sets-container');
const addSetButton = document.getElementById('add-set-button');
const notesInput = document.getElementById('notes-input');
const workoutForm = document.getElementById('add-workout-form');
const workoutLog = document.getElementById('workout-log');
const logDateSpan = document.getElementById('log-date');
const setRowTemplate = document.getElementById('set-row-template');

// Éléments du DOM pour la saisie rapide
const quickSetsInput = document.getElementById('quick-sets');
const quickRepsInput = document.getElementById('quick-reps');
const quickWeightInput = document.getElementById('quick-weight');
const quickUnitSelect = document.getElementById('quick-unit');
const bodyweightCheckbox = document.getElementById('bodyweight-checkbox');
const generateSetsButton = document.getElementById('generate-sets-button');

// --- État Global ---
let selectedDate = new Date().toISOString().split('T')[0];
let unsubscribe;

// --- Initialisation ---
function initialize() {
    datePicker.value = selectedDate;
    logDateSpan.textContent = new Date(selectedDate + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    updateExerciseOptions();
    loadWorkoutsForDate(selectedDate);
    addFirstSet();

    datePicker.addEventListener('change', handleDateChange);
    categorySelect.addEventListener('change', updateExerciseOptions);
    addSetButton.addEventListener('click', addSetRow);
    workoutForm.addEventListener('submit', handleFormSubmit);

    // Écouteurs pour le panneau rapide
    generateSetsButton.addEventListener('click', generateSets);
    bodyweightCheckbox.addEventListener('change', toggleWeightInput);
}

// --- Fonctions ---

// Génère les séries en fonction du panneau rapide
function generateSets() {
    const setCount = parseInt(quickSetsInput.value, 10) || 0;
    const repCount = quickRepsInput.value;
    const weightValue = bodyweightCheckbox.checked ? '0' : quickWeightInput.value;
    const unitValue = quickUnitSelect.value;

    if (setCount <= 0 || !repCount) {
        alert("Veuillez entrer un nombre de séries et de répétitions valide.");
        return;
    }

    setsContainer.innerHTML = ''; // Vider les séries existantes

    for (let i = 0; i < setCount; i++) {
        const newRow = setRowTemplate.content.cloneNode(true);
        newRow.querySelector('.reps-input').value = repCount;
        newRow.querySelector('.weight-input').value = weightValue;
        newRow.querySelector('.unit-select').value = unitValue;

        const deleteButton = newRow.querySelector('.delete-set-btn');
        deleteButton.addEventListener('click', (e) => {
            e.target.closest('.set-row').remove();
        });

        setsContainer.appendChild(newRow);
    }
}

// Gère la case à cocher "Poids du corps"
function toggleWeightInput() {
    quickWeightInput.disabled = bodyweightCheckbox.checked;
    if (bodyweightCheckbox.checked) {
        quickWeightInput.value = '0';
    }
}

function handleDateChange() {
    selectedDate = datePicker.value;
    logDateSpan.textContent = new Date(selectedDate + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    loadWorkoutsForDate(selectedDate);
}

function updateExerciseOptions() {
    const selectedCategory = categorySelect.value;
    exerciseSelect.innerHTML = '';
    if (!selectedCategory) {
        const option = document.createElement('option');
        option.textContent = "Veuillez choisir une catégorie";
        exerciseSelect.appendChild(option);
        return;
    }
    exercisesData[selectedCategory].forEach(exercise => {
        const option = document.createElement('option');
        option.value = exercise.french; 
        option.textContent = `${exercise.french} - ${exercise.english}`;
        exerciseSelect.appendChild(option);
    });
}

function addSetRow() {
    const templateContent = setRowTemplate.content.cloneNode(true);
    const deleteButton = templateContent.querySelector('.delete-set-btn');
    deleteButton.addEventListener('click', (e) => {
        e.target.closest('.set-row').remove();
    });
    setsContainer.appendChild(templateContent);
}

function addFirstSet() {
    setsContainer.innerHTML = '';
    addSetRow();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const sets = [];
    setsContainer.querySelectorAll('.set-row').forEach(row => {
        const reps = row.querySelector('.reps-input').value;
        const weight = row.querySelector('.weight-input').value;
        const unit = row.querySelector('.unit-select').value;
        if (reps && weight !== '') {
            sets.push({ 
                reps: parseInt(reps, 10), 
                weight: parseFloat(weight),
                unit: unit
            });
        }
    });

    if (sets.length === 0) {
        alert("Veuillez ajouter au moins une série valide.");
        return;
    }

    const newWorkout = {
        category: categorySelect.value,
        name: exerciseSelect.value,
        notes: notesInput.value.trim(),
        sets: sets
    };

    const docRef = doc(db, 'daily_workouts', selectedDate);
    
    try {
        await updateDoc(docRef, {
            exercises: arrayUnion(newWorkout)
        });
    } catch (error) {
        await setDoc(docRef, {
            date: selectedDate,
            exercises: [newWorkout]
        });
    }

    const categoryToKeep = categorySelect.value;
    const repsToKeep = quickRepsInput.value;
    workoutForm.reset();
    categorySelect.value = categoryToKeep;
    quickRepsInput.value = repsToKeep;
    bodyweightCheckbox.checked = false;
    quickWeightInput.disabled = false;
    updateExerciseOptions();
    addFirstSet();
}

function loadWorkoutsForDate(dateString) {
    if (unsubscribe) {
        unsubscribe();
    }
    const docRef = doc(db, 'daily_workouts', dateString);
    unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            renderWorkoutLog(docSnap.data().exercises);
        } else {
            workoutLog.innerHTML = '<p>Aucun entraînement enregistré pour ce jour.</p>';
        }
    });
}

function renderWorkoutLog(exercises) {
    workoutLog.innerHTML = '';
    if (!exercises || exercises.length === 0) {
        workoutLog.innerHTML = '<p>Aucun entraînement enregistré pour ce jour.</p>';
        return;
    }

    exercises.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        
        const setsList = ex.sets.map(set => {
            const unit = set.unit || 'kg';
            const weightDisplay = set.weight === 0 ? 'Poids du corps' : `${set.weight} ${unit}`;
            return `<li><span>Série: ${set.reps} reps</span> <span>${weightDisplay}</span></li>`;
        }).join('');

        card.innerHTML = `
            <h3>${ex.name} <small>(${ex.category})</small></h3>
            <ul>${setsList}</ul>
            ${ex.notes ? `<p class="notes"><strong>Notes:</strong> ${ex.notes}</p>` : ''}
        `;
        workoutLog.appendChild(card);
    });
}

initialize();
