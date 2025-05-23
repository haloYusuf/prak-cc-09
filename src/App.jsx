// App.jsx atau parent component
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const switchToLogin = () => setCurrentPage('login');
  const switchToRegister = () => setCurrentPage('register');

  return (
    <>
      {currentPage === 'login' ? (
        <LoginPage onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterPage onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default App;