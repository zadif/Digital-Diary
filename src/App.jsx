import { useState } from "react";
import Header from "./components/header";
import MainPage from "./components/mainPage";
import AddNew from "./pages/AddNew";
import ErrorPage from "./pages/404Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage firstVisit={true} />} />
        <Route path="addNew" element={<AddNew />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
