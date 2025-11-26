// --- Event Handlers ---

import { config } from './config.js';
import { state } from './state.js';
import { dom } from './dom.js';
import { ui } from './ui.js';
import { t, getCategoryColorKey } from './utils.js';
import * as logic from './logic.js';

export const handlers = {
    handleLogActions(e) {
        const target = e.target.closest(".action-btn");
        if (!target) return;

        if (target.classList.contains("progress-btn")) {
            const exerciseName = target.dataset.exerciseName;
            logic.openProgressModal(exerciseName);
            return;
        }

        if (!state.user) return;

        const card = e.target.closest('.exercise-card');
        if (!card) return;

        const index = Array.from(dom.workoutLog.children).indexOf(card);
        if (index === -1) return;

        if (target.classList.contains("edit-btn")) {
            logic.startEditExercise(index);
        } else if (target.classList.contains("delete-btn")) {
            logic.deleteExercise(index);
        }
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

        await logic.saveWorkout(workoutData);
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
                let colorCategory = getCategoryColorKey(ex.category);
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
