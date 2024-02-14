import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    habits: []
};

const habitSlice = createSlice({
    name: 'habit',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            state.habits.push({
                text: action.payload
            });
        },
        addDates: (state, action) => {
            state.habits.forEach(habit => {
                if (habit.text.weekView) {
                    // Add or update the dates in the weekDaysStatus object
                    habit.text.weekDayStatus = {
                        [action.payload.date]: action.payload,
                        ...habit.text.weekDayStatus                        
                    };
                }
            });
        },        
        delete: (state, action) => {
            state.habits = state.habits.filter(habit => habit.text.id !== action.payload);
        },
        showWeekView: (state, action) => {
            state.habits[action.payload].text.weekView = true;
        },
        hideWeekView: (state, action) => {
            state.habits[action.payload].text.weekView = false;
        },
        statusHabit: (state, action) => {
            const habit = state.habits.filter((habit => habit.text.weekView === true));
            const habitView = state.habits.find((habit => habit.text.weekView === true));
            const currentScore = Number(habitView.text.currentScore);
            const day = Object.fromEntries(
                Object.entries(habit[0].text.weekDayStatus).filter(
                    ([date, dayStatus]) => {
                        if(dayStatus.date === action.payload.date) {
                            if(dayStatus.status === action.payload.status) {
                                if(dayStatus.status === 'done') {
                                    habitView.text.currentScore = currentScore - 1;
                                }
                                dayStatus.status = '';
                            } else if(action.payload.status === 'done') {                                
                                habitView.text.currentScore = currentScore + 1;
                                dayStatus.status = action.payload.status;
                            } else {
                                if(dayStatus.status === 'done') {
                                    habitView.text.currentScore = currentScore - 1;
                                }
                                dayStatus.status = action.payload.status;          
                            }                  
                        }
                    }
                )
            )
        },
        habitTotalDays: (state, action) => {
            const habit = state.habits.find((habit => habit.text.weekView === true));
            habit.text.totalDays = action.payload;
        }
    }
});

export const habitReducer = habitSlice.reducer;
export const actions = habitSlice.actions;

// selector
export const habitSelector = (state) => state.habitReducer.habits;
