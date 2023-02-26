import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import {useAppContext} from "./context/useContext";
import { ToastContainer } from "react-toastify";
// page


// modal qrCode
// import {ModalQrCode} from "./components";

const App = () => {
  // const {dark, openModal, isQrCode} = useAppContext();
  const name = "Cường"
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> {name}.
        </p>
      
      
      </header>
    </div>
  );
}

export default App;
