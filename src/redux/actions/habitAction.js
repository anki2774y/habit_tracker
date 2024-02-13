export const ADD_HABIT = "ADD Habit";
export const ADD_DATES = "ADD DATES";
export const DELETE_HABIT = "DELETE Habit";
export const SHOWWEEKVIEW_HABIT = "SHOW WEEK View";
export const HIDEWEEKVIEW_HABIT = "HIDE WEEK View";
export const STATUS_HABIT = "STATUS Habit";
export const HABIT_TOTALDAYS = "HABIT TotalDays";

export const addHabit = (text) => ({text, type: ADD_HABIT});
export const addDates = (text) => ({text, type: ADD_DATES});
export const deleteHabit = (index) => ({index, type: DELETE_HABIT});
export const showWeekView = (index) => ({index, type: SHOWWEEKVIEW_HABIT});
export const hideWeekView = (index) => ({index, type: HIDEWEEKVIEW_HABIT});
export const statusHabit = (text) => ({text, type: STATUS_HABIT});
export const habitTotalDays = (text) => ({text, type: HABIT_TOTALDAYS});