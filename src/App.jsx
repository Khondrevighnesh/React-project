import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BMICalculator from "./compoentent/bmi";
import Calculator from "./compoentent/calculter";
import ExpenseTracker from "./compoentent/Expenesstracer";
import TodoApp from "./compoentent/Todolist";
// import WeatherApp from "./compoentent/Weather";

function App() {
  return (
    <>
      {/* <BMICalculator /> */}
      {/* <Calculator /> */}
      {/* <ExpenseTracker /> */}
      <TodoApp />
    </>
  );
}

export default App;
