// --- Utility Functions ---

import { config, TIME_SUFFIX } from './config.js';
import { state } from './state.js';

// Translation helper
export const t = (key) => config.translations[state.language][key] || key;

// Toggle button active state
export const toggleActiveButton = (activeButton, inactiveButton) => {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
};

// Convert weight between units
export const convertWeight = (weight, fromUnit, toUnit) => {
    if (fromUnit === toUnit || weight === 0) return parseFloat(weight).toFixed(1);
    if (fromUnit === 'kg' && toUnit === 'lbs') return (weight * config.KG_TO_LBS).toFixed(1);
    if (fromUnit === 'lbs' && toUnit === 'kg') return (weight / config.KG_TO_LBS).toFixed(1);
    return parseFloat(weight).toFixed(1);
};

// Get localized exercise name
export const getLocalizedExerciseName = (exercise) => {
    return state.language === 'fr' ? (config.exerciseNameMap[exercise.name] || exercise.name) : exercise.name;
};

// Get localized category name
export const getLocalizedCategoryName = (category) => {
    return state.language === 'fr' ? (config.englishToFrenchCategoryKey[category] || category) : category;
};

// Get category color key (map Biceps/Triceps to Arms)
export const getCategoryColorKey = (category) => {
    return (category === 'Biceps' || category === 'Triceps') ? 'Arms' : category;
};

// Calculate estimated 1-Rep Max (Epley Formula)
export const calculateEst1RM = (weight, reps) => {
    if (reps == 1) return weight;
    if (weight <= 0 || reps <= 0) return 0;
    return weight * (1 + reps / 30);
};

// Get workout color info for calendar
export const getWorkoutColorInfo = (exercises) => {
    if (!exercises || exercises.length === 0) return { className: '', style: '' };

    const orderedUniqueCategories = [...new Set(exercises.map(ex => getCategoryColorKey(ex.category)))];
    const uniqueCount = orderedUniqueCategories.length;

    const styles = orderedUniqueCategories.map((cat, i) => `--c${i + 1}: var(--color-${cat});`).join(' ');

    let className = '';
    if (uniqueCount >= 4) {
        className = 'workout-color-4';
    } else if (uniqueCount >= 1) {
        className = `workout-color-${uniqueCount}`;
    }

    return { className, style: styles };
};

// Flatten exercises for search
export const flattenExercises = () => {
    state.allExercisesFlat = [];
    for (const categoryKey in config.exercisesData) {
        config.exercisesData[categoryKey].forEach((exercise, index) => {
            state.allExercisesFlat.push({ ...exercise, categoryKey, index });
        });
    }
};
