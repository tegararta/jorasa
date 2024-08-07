import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setusername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedusername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedusername && storedRole) {
      setusername(JSON.parse(storedusername));
      setRole(storedRole);
    }
  }, []);

  const login = (usernameData, roleData) => {
    setusername(usernameData);
    setRole(roleData);
    localStorage.setItem('username', JSON.stringify(usernameData));
    localStorage.setItem('role', roleData);
  };

  const logout = () => {
    setusername(null);
    setRole(null);
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };