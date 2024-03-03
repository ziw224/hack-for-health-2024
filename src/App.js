import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/chatRoom/Home";
// import Map from "./pages/map/Map";
import MainHome from "./pages/mainHome/MainHome";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              currentUser ? <Navigate to="/mainhome" /> : <Navigate to="/login" />
            }
          />
          <Route path="mainhome" element={
            <ProtectedRoute>
              <MainHome />
            </ProtectedRoute>
          }/>
          <Route path="chatroom" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          {/* <Route path="map" element={<Map />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
