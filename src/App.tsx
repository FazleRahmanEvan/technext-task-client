import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
