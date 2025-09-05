import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./views/dashboard/Dashboard";
import { AlertProvider } from "./components/alert/Alert";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
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
