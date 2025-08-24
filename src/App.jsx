import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import BookProvider from "./context/BookContext";
import Header from "./components/Header";
import Book from "./pages/Book/Book";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="container my-3">
                    <BookProvider>
                        <Routes>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Book />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </BookProvider>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;