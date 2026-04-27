import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import './Login.css';

const Login = () => {
    const { login } = useAppContext();
    const navigate = useNavigate();
    
    // For simplicity, we choose role via a dropdown or switch since it's a demo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        // Mock login mechanism based on selected role
        login({
            id: role === 'admin' ? 'admin-1' : 'user-1',
            name: role === 'admin' ? 'Site Administrator' : 'Alex Johnson',
            email: email,
            role: role
        });

        // Redirect based on role
        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/student/search');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass-panel">
                <div className="login-header">
                    <ShieldCheck size={48} color="var(--pk-primary)" className="login-icon" />
                    <h2>Welcome Back</h2>
                    <p>Enter your details to access your account.</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Account Type</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="form-input"
                        >
                            <option value="student">Student Account</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-icon-wrapper">
                            <User size={18} className="input-icon" />
                            <input 
                                type="email" 
                                className="form-input" 
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input 
                                type="password" 
                                className="form-input" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn">
                        Sign In <ArrowRight size={18} />
                    </button>
                    
                    <div className="demo-credentials">
                        <small>Demo Mode: Any email/password will work. Role selection determines your dashboard.</small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
