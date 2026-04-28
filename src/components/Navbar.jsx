import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Search, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAppContext();
    const isAdmin = user?.role === 'admin';
    const isStudent = user?.role === 'student';
    const navigate = useNavigate();

    return (
        <nav className="navbar glass-panel">
            <div className="container navbar-content">
                <div className="navbar-brand" onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/student/search')} style={{ cursor: 'pointer' }}>
                    <div className="logo-icon">
                        <GraduationCap size={24} color="var(--pk-primary)" />
                    </div>
                    <span className="logo-text">ScholarTracker</span>
                </div>

                <div className="navbar-links">
                    {user && (
                        <div className="user-profile-nav">
                            <div className="user-avatar-mini">
                                {user.name.charAt(0)}
                            </div>
                            <div className="user-meta-mini">
                                <span className="user-name-mini">{user.name}</span>
                                <span className="user-role-mini">{user.role}</span>
                            </div>
                            <div className="nav-vertical-divider"></div>
                        </div>
                    )}
                    {isAdmin && (
                        <>
                            <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <LayoutDashboard size={18} />
                                <span>Overview</span>
                            </NavLink>
                            <NavLink to="/admin/listings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <Settings size={18} />
                                <span>Manage</span>
                            </NavLink>
                        </>
                    )}
                    {isStudent && (
                        <>
                            <NavLink to="/student/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <Search size={18} />
                                <span>Find Scholarships</span>
                            </NavLink>
                            <NavLink to="/student/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <LayoutDashboard size={18} />
                                <span>My Applications</span>
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <button onClick={logout} className="btn btn-secondary btn-sm">
                            Log out
                        </button>
                    ) : (
                        <NavLink to="/login" className="btn btn-primary btn-sm">
                            Sign In
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;