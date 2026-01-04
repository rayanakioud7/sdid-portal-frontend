// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoroccanPattern from '../components/MoroccanPattern'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // State to handle all inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student' // Default to student
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    // Add backend logic here later
    navigate('/modules');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* 1. The Rotating Zellij Background */}
      <MoroccanPattern />

      {/* 2. Glass Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-fadeIn">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-blue-200/60">Join the SDID Academic Portal</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
           
           {/* Full Name */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="John Doe"
              required
            />
           </div>
           
           {/* Email */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="student@fst.ac.ma"
              required
            />
           </div>

           {/* Password */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="••••••••"
              required
            />
           </div>

           {/* Role Selector (Crucial Feature) */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">I am a...</label>
            <div className="relative">
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white appearance-none cursor-pointer transition-all"
              >
                <option value="student">Student (Etudiant)</option>
                <option value="professor">Professor (Enseignant)</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
           </div>

           {/* Submit Button */}
           <button 
             type="submit" 
             className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transform hover:scale-[1.01] transition-all duration-200 mt-2"
           >
             Create Account
           </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;