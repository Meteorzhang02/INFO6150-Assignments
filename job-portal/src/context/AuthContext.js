// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      // 这里应该调用Assignment 8的后端API
      // 暂时使用模拟登录
      if (username === 'admin' && password === 'password') {
        setIsAuthenticated(true);
        setUser({ username });
        localStorage.setItem('token', 'mock-jwt-token');
        return { success: true };
      } else {
        return { success: false, error: '用户名或密码错误' };
      }
    } catch (error) {
      return { success: false, error: '登录失败' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};