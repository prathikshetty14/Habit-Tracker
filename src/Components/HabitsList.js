// Importing relevant dependecies and styles
import "../Styles/HabitsList.css"
import React from "react";
import { useDispatch } from "react-redux";
import { deleteHabit, updateStatus } from "../Redux/habitSlice";


// Define the HabitsList component with props
function HabitsList({ habitName, habitDescription, habitStatus, habitId }) {

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Function to update the completion status of a habit for a specific date
  const updateCompleteStatus = (date) => {
    const data = {
      date,
      id: habitId,
    };

    // Dispatch the 'updateStatus' action to update the habit's status
    dispatch(updateStatus(data));
  };

  return (
    <div className="list-of-habits">
      <div className="habit-details">

        {/* Display the habit name */}
        <div className="habit-name">{habitName}</div>

        {/* Display the habit description */} 
        <div className="habit-description">{habitDescription}</div>
      </div>
      <div className="seven-days-of-week">
        <table>

          {/* Table Head with Days of the Week */}
          <thead>
            <tr>
              {habitStatus.map((status, index) => (
                <th key={status.date} style={index === 6 ? { background: "#F75D59" } : null}>
                  {status.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {/* Table row to toggle between "Pending" - "Completed" - "Incomplete" */}
            <tr>
              {habitStatus.map((status) => (
                <td
                className="td-status"
                key={status.date}
                onClick={() => updateCompleteStatus(status.date)}
                >
                  {status.status === "none" ? (
                    <span id="pending" class="material-symbols-outlined">
                    pending
                    </span>
                  ) : status.status === "done" ? (
                    <span id="checked" class="material-symbols-outlined">
                    new_releases
                    </span>
                  ) : (
                    <span id="unchecked" class="material-symbols-outlined">
                    dangerous
                    </span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Clickable delete button to remove a habit */}
      <div onClick={() => dispatch(deleteHabit(habitId))} className="delete-btn">
        <span class="material-symbols-outlined">
        delete
        </span>
      </div>
    </div>
  );
}

export default HabitsList;
