import './styles/App.scss';
import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './router/ProtectedRoute';
import projectRoutes from './router/routes/projectRoutes';
import apiAxios from "./apiAxios";

const App: FC = () => {
    useEffect(() => {
        let axioResponse = apiAxios();
        axioResponse
          .get("users")
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
        <BrowserRouter>
            <div className="pmo-app">
                <Routes>
                    <Route path="/" element={<ProtectedRoute component={Home} />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
