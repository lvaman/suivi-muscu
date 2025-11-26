// --- Configuration & Static Data ---

export const TIME_SUFFIX = 'T12:00:00';
export const ADMIN_UID = "fWPQ0nKpYGPZdMcT7mKQivq8b7j2";

export const config = {
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
            progressTblHeaderNotes: "Notes",
            progressCombinedView: "Vue Combinée"
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
            progressTblHeaderNotes: "Notes",
            progressCombinedView: "Combined View"
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
            { french: 'Squat gobelet', english: 'Goblet Squat' },
            { french: 'Presse à cuisses', english: 'Leg Press' },
            { french: 'Fentes', english: 'Lunges' },
            { french: 'Leg extensions', english: 'Leg Extensions' },
            { french: 'Leg curls', english: 'Leg Curls' }
        ],
        'Épaules': [
            { french: 'Développé militaire (Barre)', english: 'Military Press (Barbell)' },
            { french: 'Développé militaire (Haltères)', english: 'Military Press (Dumbbell)' },
            { french: 'Développé épaules haltères (banc incliné)', english: 'Incline Dumbbell Shoulder Press' },
            { french: 'Développé épaules haltères (machine)', english: 'Incline Machine Shoulder Press' },
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
