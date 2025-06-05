import { useState } from "react";
import Header from "./components/header";
import MainPage from "./components/mainPage";
import AddNew from "./pages/AddNew";
import ViewAllMemories from "./pages/viewAllMemories";
import UpdateMemory from "./pages/updateMemory";
import ErrorPage from "./pages/404Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// ...existing imports...
function App() {
  localStorage.setItem("digitalDiaryVisited", "false");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage firstVisit={true} />} />
        <Route path="addNew" element={<AddNew />} />
        <Route path="viewAllMemories" element={<ViewAllMemories />} />
        <Route path="updateMemory" element={<UpdateMemory />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
