import React, { useState } from 'react';
import MoroccanPattern from '../components/MoroccanPattern'; 

const AdminDashboard = () => {
  // Mock Database
  const [users, setUsers] = useState([
    { id: 1, name: "Amine Tazi", email: "amine@fst.ac.ma", role: "student", status: "Active", joined: "Oct 12, 2025" },
    { id: 2, name: "Prof. El Amrani", email: "elamrani@fst.ac.ma", role: "instructor", status: "Active", joined: "Oct 10, 2025" },
    { id: 3, name: "Unknown User", email: "hacker@gmail.com", role: "student", status: "Banned", joined: "Dec 20, 2025" },
    { id: 4, name: "New Student", email: "new@fst.ac.ma", role: "student", status: "Pending", joined: "Just now" },
  ]);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    pending: users.filter(u => u.status === 'Pending').length,
    banned: users.filter(u => u.status === 'Banned').length,
  };

  // --- ACTIONS ---

  // 1. Change Status (Approve/Ban)
  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  // 2. Change Role (With Confirmation)
  const handleRoleChange = (id, newRole, currentName) => {
    const confirmChange = window.confirm(
      `⚠️ ADMIN SECURITY WARNING\n\nAre you sure you want to promote/demote ${currentName} to "${newRole.toUpperCase()}"?\n\nThis will change their access permissions immediately.`
    );

    if (confirmChange) {
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
    } else {
      // If they cancel, we force a re-render to reset the dropdown (simplified for React state)
      // In a real app, this happens automatically because state didn't change
    }
  };

  const deleteUser = (id) => {
    if(window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-red-500 selection:text-white relative overflow-hidden">
      <MoroccanPattern rotate={false} />

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/10 bg-slate-900/60">
         <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-red-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-red-500/30 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <span className="text-xl font-bold tracking-wide">SDID <span className="text-red-500">Admin</span></span>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-sm text-red-200/60 hidden md:block">System Administrator</span>
            <div className="h-9 w-9 rounded-full bg-slate-800 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-500">AD</div>
         </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 pt-8 pb-20">
        
        {/* Stats Grid */}
        <div className="mb-10 animate-fadeIn">
           <h1 className="text-3xl font-bold mb-6">User Management</h1>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900/50 border border-white/10 rounded-xl">
                 <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total Users</p>
                 <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="p-5 bg-slate-900/50 border border-green-500/20 rounded-xl">
                 <p className="text-green-400 text-xs uppercase tracking-wider font-semibold">Active</p>
                 <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <div className="p-5 bg-slate-900/50 border border-amber-500/20 rounded-xl">
                 <p className="text-amber-400 text-xs uppercase tracking-wider font-semibold">Pending</p>
                 <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
              </div>
              <div className="p-5 bg-slate-900/50 border border-red-500/20 rounded-xl">
                 <p className="text-red-400 text-xs uppercase tracking-wider font-semibold">Banned</p>
                 <p className="text-2xl font-bold text-red-400">{stats.banned}</p>
              </div>
           </div>
        </div>

        {/* User Table */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden animate-fadeIn delay-100 min-h-[400px]">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                       <th className="p-5 font-medium">User</th>
                       <th className="p-5 font-medium">Role</th>
                       <th className="p-5 font-medium">Status</th>
                       <th className="p-5 font-medium text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-white/5">
                    {users.map((user) => (
                       <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                          <td className="p-5">
                             <div className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                   user.role === 'instructor' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300'
                                }`}>
                                   {user.name.charAt(0)}
                                </div>
                                <div>
                                   <p className="font-semibold text-white">{user.name}</p>
                                   <p className="text-gray-500 text-xs">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          
                          {/* --- ROLE DROPDOWN --- */}
                          <td className="p-5">
                             <div className="relative inline-block">
                               <select 
                                 value={user.role}
                                 onChange={(e) => handleRoleChange(user.id, e.target.value, user.name)}
                                 className={`appearance-none pl-3 pr-8 py-1 rounded text-xs font-medium border cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-slate-900 transition-all ${
                                    user.role === 'instructor' 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 focus:ring-blue-500' 
                                    : 'bg-slate-700/50 text-gray-400 border-white/10 focus:ring-gray-400'
                                 }`}
                               >
                                 <option value="student">Student</option>
                                 <option value="instructor">Professor</option>
                               </select>
                               {/* Arrow Icon */}
                               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-current opacity-60">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                               </div>
                             </div>
                          </td>

                          <td className="p-5">
                             {user.status === 'Active' && <span className="text-green-400 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Active</span>}
                             {user.status === 'Pending' && <span className="text-amber-400 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Pending</span>}
                             {user.status === 'Banned' && <span className="text-red-400 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Banned</span>}
                          </td>
                          
                          <td className="p-5 text-right">
                             <div className="flex justify-end gap-2">
                                {user.status === 'Pending' && (
                                   <button 
                                     onClick={() => handleStatusChange(user.id, 'Active')}
                                     className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-green-900/20"
                                   >
                                     Approve
                                   </button>
                                )}
                                {user.status !== 'Banned' ? (
                                   <button 
                                     onClick={() => handleStatusChange(user.id, 'Banned')}
                                     className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-colors"
                                   >
                                     Ban
                                   </button>
                                ) : (
                                   <button 
                                     onClick={() => handleStatusChange(user.id, 'Active')}
                                     className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold"
                                   >
                                     Unban
                                   </button>
                                )}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;