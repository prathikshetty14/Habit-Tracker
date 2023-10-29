// Importing relevant dependecies and styles
import "../Styles/HabitContainer.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HabitsList from "./HabitsList";
import { addHabit } from "../Redux/habitSlice";

// Define the HabitContainer component
function HabitContainer() {

  // Initialize state variables using the 'useState' hook
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  // Get the 'habits' data from the Redux store using 'useSelector'
  const data = useSelector((state) => state.habit.habits)

  // Function to format a date as 'dd/mm/yy'
  const formatDate = (date) => {
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yy = date.getFullYear().toString().substring(2);
    return `${dd}/${mm}/${yy}`;
  };

  // Function to get the dates for the last 7 days
  const getLast7Days = () => {
    const today = new Date();
    const last7Days = Array(7)
      .fill(null)
      .map((_, index) => {
        const day = new Date(today);
        day.setDate(today.getDate() - index);
        return formatDate(day);
      });
    return last7Days;
  };

  // Function to add a new habit when the "Add Task" button is clicked
  const addYourHabitOnClick = () => {
    const habitToBeAdded = {
      id: Date.now(),
      title: habit,
      description: description,
      dates: getLast7Days().map((date) => ({ date, status: "none" })),
    };

    setHabit("");
    setDescription("");

    // Dispatch the 'addHabit' action to add the new habit 
    dispatch(addHabit(habitToBeAdded));
  };

  // Return the JSX structure of the HabitContainer component
  return (
    <div className="main-container">
      <div className="habits-bar-container">

        {/* Section for adding a new habit */}
        <section className="habit-adding">

          {/* Input field for habit name */}
          <div className="input-bar">
            <span className="icon-container">
              <img src="https://cdn-icons-png.flaticon.com/128/9018/9018036.png" alt="h1-heading"/>
            </span>
            <input
              onChange={(e) => setHabit(e.target.value)}
              value={habit}
              type="text"
              placeholder="Write the habit..."
              required
            />
          </div>

          {/* Input field for habit description */}
          <div className="input-bar">
            <span className="icon-container">
              <img src="https://cdn-icons-png.flaticon.com/128/9018/9018037.png" alt="h2-heading"/>
            </span>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Write the description of the habit...."
            />
          </div>


          <button className="button-57" onClick={addYourHabitOnClick}>
            <span className="text">Add Task</span><span class="material-symbols-outlined">add_task</span>
          </button>
        </section>

        {/* Map through 'data' (list of habits) and render each habit using HabitsList component */}
        {data.map((habit) => (
          <HabitsList
            key={habit.id}
            habitName={habit.title}
            habitDescription={habit.description}
            habitStatus={habit.dates}
            habitId={habit.id}
          />
        ))}
        
      </div>
    </div>
  );
}

export default HabitContainer;
