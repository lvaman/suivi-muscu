// --- UI Rendering Functions ---

import { config, TIME_SUFFIX } from './config.js';
import { state } from './state.js';
import { dom } from './dom.js';
import { t, convertWeight, getLocalizedExerciseName, getLocalizedCategoryName, getCategoryColorKey, getWorkoutColorInfo } from './utils.js';

export const ui = {
    updateText() {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            const translation = t(key);

            if (el.placeholder) {
                el.placeholder = translation;
            } else if (el.id === 'submit-workout-btn') {
                el.textContent = state.editingExerciseIndex !== null ? t('updateExerciseBtn') : t('saveExerciseBtn');
            } else if (el.id === 'form-title') {
                el.textContent = state.editingExerciseIndex !== null ? t('editExerciseTitle') : t('addExerciseTitle');
            } else {
                const firstChild = el.childNodes[0];
                if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                    firstChild.nodeValue = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
        document.documentElement.lang = state.language;
        this.updateDateDisplay();
    },

    updateDateDisplay() {
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';
        dom.logDateSpan.textContent = ' ' + new Date(state.currentDate + TIME_SUFFIX).toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
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
            const categoryDisplay = getLocalizedCategoryName(ex.category);
            const exerciseDisplay = getLocalizedExerciseName(ex);
            const setsList = ex.sets.map(set => {
                const displayWeight = convertWeight(set.weight, set.unit, state.displayUnit);
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
            const { className, style } = hasWorkout ? getWorkoutColorInfo(workoutData) : { className: '', style: '' };
            const dayClasses = ['simple-calendar-day'];
            if (hasWorkout) dayClasses.push('has-workout', className);
            if (isToday) dayClasses.push('today-day');
            if (isSelected) dayClasses.push('selected-day');
            html += `<div class="${dayClasses.join(' ')}" style="${style}" data-date="${dateStr}">${day}</div>`;
        }
        html += '</div>';
        calendarWrapper.innerHTML = html;
    },

    renderProgressChartAndTable(metric = 'maxWeight') {
        if (state.chartInstance) {
            state.chartInstance.destroy();
        }
        dom.progressChartControls.querySelectorAll('.metric-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.metric === metric);
        });

        const isBodyweightExercise = state.progressData.length > 0 &&
            state.progressData.every(d => d.isBodyweight);

        let datasets = [];
        const locale = state.language === 'fr' ? 'fr-FR' : 'en-US';

        const createDataset = (labelKey, metricKey, borderColor, yAxisID = 'y') => ({
            label: t(labelKey),
            data: state.progressData.map(d => ({
                x: new Date(d.date + TIME_SUFFIX).getTime(),
                y: d[metricKey]
            })),
            borderColor,
            backgroundColor: borderColor.replace(', 1)', ', 0.2)'),
            fill: false,
            tension: 0.1,
            yAxisID
        });

        if (metric === 'combined') {
            if (isBodyweightExercise) {
                datasets.push(
                    createDataset('progressMaxWeight', 'maxWeight', 'rgba(231, 76, 60, 1)'),
                    createDataset('progressTotalVolume', 'totalVolume', 'rgba(46, 204, 113, 1)'),
                    createDataset('progressEst1RM', 'est1RM', 'rgba(52, 152, 219, 1)')
                );
            } else {
                datasets.push(
                    createDataset('progressMaxWeight', 'maxWeight', 'rgba(231, 76, 60, 1)'),
                    createDataset('progressTotalVolume', 'totalVolume', 'rgba(46, 204, 113, 1)', 'yVolume'),
                    createDataset('progressEst1RM', 'est1RM', 'rgba(52, 152, 219, 1)')
                );
            }
        } else {
            let labelKey;
            let borderColor;
            if (metric === 'maxWeight') {
                labelKey = 'progressMaxWeight';
                borderColor = 'rgba(231, 76, 60, 1)';
            } else if (metric === 'totalVolume') {
                labelKey = 'progressTotalVolume';
                borderColor = 'rgba(46, 204, 113, 1)';
            } else {
                labelKey = 'progressEst1RM';
                borderColor = 'rgba(52, 152, 219, 1)';
            }
            datasets.push(createDataset(labelKey, metric, borderColor, 'y'));
        }

        state.chartInstance = new Chart(dom.progressChartCanvas, {
            type: 'line',
            data: {
                datasets: datasets
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
                                if (isBodyweightExercise) {
                                    return Math.round(value) + ' ' + t('repsDisplay');
                                }
                                const decimals = metric === 'totalVolume' ? 0 : 1;
                                return value.toFixed(decimals) + ` ${state.displayUnit}`;
                            }
                        }
                     },
                    yVolume: {
                        beginAtZero: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(0) + ` ${state.displayUnit}`;
                            }
                        },
                        title: {
                            display: metric === 'combined' && !isBodyweightExercise,
                            text: t('progressTotalVolume')
                        },
                        display: metric === 'combined' && !isBodyweightExercise
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const timestamp = context[0].parsed.x;
                                return new Date(timestamp).toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                            }
                        }
                    }
                }
            }
        });
        dom.progressHistoryTableBody.innerHTML = state.progressData.map(d => {
            const totalVolumeDisplay = d.isBodyweight
                ? `${d.totalVolume} ${t('repsDisplay')}`
                : `${d.totalVolume.toFixed(0)} ${state.displayUnit}`;
            return `
                <tr>
                    <td>${new Date(d.date + TIME_SUFFIX).toLocaleDateString(state.language === 'fr' ? 'fr-FR' : 'en-US')}</td>
                    <td>${d.topSet}</td>
                    <td>${totalVolumeDisplay}</td>
                    <td>${d.notes}</td>
                </tr>
            `;
        }).join('');

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
