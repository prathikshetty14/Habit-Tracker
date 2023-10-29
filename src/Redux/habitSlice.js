// Importing relevant dependecies
import { createSlice } from "@reduxjs/toolkit";

// Get the habit array from local storage or initialize it as an empty array
const habitsArray = JSON.parse(localStorage.getItem("habits")) || [];


// Define initial state with habits
const initialState = {
  habits: habitsArray,
};


// Create a 'habits' slice with add, delete, and update actions
const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {

    // Add a new habit to the state and local storage
    addHabit: (state, action) => {
      state.habits.push(action.payload);
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // Delete a habit by its ID from the state and local storage
    deleteHabit: (state, action) => {
      const habitIdToDelete = Number(action.payload);
      const updatedHabits = state.habits.filter((habit) => habit.id !== habitIdToDelete);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      state.habits = updatedHabits;
    },

    // Update the status of a habit for a specific date
    updateStatus: (state, action) => {
      const { date, id } = action.payload;
      state.habits = state.habits.map((habit) => {
        if (habit.id === id) {
          habit.dates = habit.dates.map((habitDate) => {
            if (habitDate.date === date) {
              
              // Toggle the status: None -> Done, Done -> Not Done, Not Done -> None
              if (habitDate.status === "none") {
                habitDate.status = "done";
              } else if (habitDate.status === "done") {
                habitDate.status = "not done";
              } else if (habitDate.status === "not done") {
                habitDate.status = "none";
              }
            }
            return habitDate;
          });
        }
        return habit;
      });
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
  },
});

// Export actions for add, delete, and update
export const { addHabit, deleteHabit, updateStatus } = habitSlice.actions;

// Export the reducer for the 'habits' slice
export const habitReducer = habitSlice.reducer;
