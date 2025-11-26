// --- Application State ---

export const state = {
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
