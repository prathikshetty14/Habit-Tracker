// Importing relevant dependecies and styles
import React from 'react';
import HabitContainer from './Components/HabitContainer';
import "./Styles/App.css"

// Defining the main App component
function App() {

  return (
    <div className='App'>
      {/* Create a title and logo section */}
      <div className='title-logo'>
        <h1>Habit Tracker</h1>
        <img src='https://cdn-icons-png.flaticon.com/128/4807/4807765.png' alt='logo'/>
      </div>

      {/* Include the HabitContainer component for habit tracking */}
      <HabitContainer/>
    </div>
  );
}

export default App;
