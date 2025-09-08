import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./views/dashboard/Dashboard";
import { AlertProvider } from "./components/alert/Alert";

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
