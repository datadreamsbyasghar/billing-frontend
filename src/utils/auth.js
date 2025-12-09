// src/utils/auth.js

// ✅ Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('access_token'); // ✅ fixed key
  return !!token;
};

// ✅ Get current user role
export const getUserRole = () => {
  return localStorage.getItem('role') || '';
};

// ✅ Check if user is admin
export const isAdmin = () => {
  return getUserRole() === 'admin';
};

// ✅ Check if user is staff
export const isStaff = () => {
  return getUserRole() === 'staff';
};

// ✅ Check if user is a normal user
export const isUser = () => {
  return getUserRole() === 'user';
};

// ✅ Generic role checker
export const hasRole = (role) => {
  return getUserRole() === role;
};