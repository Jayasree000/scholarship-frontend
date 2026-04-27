import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FileText, Calendar, DollarSign, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const { applications, scholarships } = useAppContext();
    const navigate = useNavigate();

    // Assuming logged in as 'user-1'
    const studentApps = applications.filter(app => app.studentId === 'user-1');

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle2 className="status-icon success" />;
            case 'rejected': return <XCircle className="status-icon danger" />;
            default: return <Clock className="status-icon warning" />;
        }
    };

    const pendingCount = studentApps.filter(a => a.status === 'pending').length;
    const acceptedCount = studentApps.filter(a => a.status === 'accepted').length;

    return (
        <div className="container main-content dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>My Applications</h1>
                    <p>Track the status of your scholarship and financial aid applications.</p>
                </div>

                <button className="btn btn-primary" onClick={() => navigate('/student/search')}>
                    Find More Scholarships <ChevronRight size={18} />
                </button>
            </header>

            <section className="stats-overview grid-cols-3">
                <div className="stat-card glass-panel">
                    <div className="stat-icon info">
                        <FileText size={24} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{studentApps.length}</span>
                        <span className="stat-label">Total Applications</span>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{pendingCount}</span>
                        <span className="stat-label">Under Review</span>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon success">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{acceptedCount}</span>
                        <span className="stat-label">Accepted</span>
                    </div>
                </div>
            </section>

            <section className="applications-list">
                <h2>Application History</h2>

                {studentApps.length === 0 ? (
                    <div className="empty-state glass-panel">
                        <FileText size={48} className="empty-icon" />
                        <h3>No applications yet</h3>
                        <p>You haven't applied to any scholarships. Head over to the search page to find opportunities.</p>
                        <button className="btn btn-secondary mt-4" onClick={() => navigate('/student/search')}>
                            Browse Scholarships
                        </button>
                    </div>
                ) : (
                    <div className="apps-grid">
                        {studentApps.map(app => {
                            const scholarship = scholarships.find(s => s.id === app.scholarshipId);

                            return (
                                <div key={app.id} className="app-card glass-panel">
                                    <div className="app-card-header">
                                        <div>
                                            <h3>{app.scholarshipTitle}</h3>
                                            <span className="applied-date">Applied on {new Date(app.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className={`status-badge ${app.status}`}>
                                            {getStatusIcon(app.status)}
                                            <span className="capitalize">{app.status}</span>
                                        </div>
                                    </div>

                                    {scholarship && (
                                        <div className="app-card-details">
                                            <div className="detail-item">
                                                <DollarSign size={16} />
                                                <span>{scholarship.amount}</span>
                                            </div>
                                            <div className="detail-item">
                                                <Calendar size={16} />
                                                <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="app-card-footer">
                                        <button className="btn btn-secondary btn-sm" disabled>
                                            View Details
                                        </button>
                                        {app.status === 'pending' && (
                                            <button className="text-btn danger-text text-sm">Withdraw</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default StudentDashboard;
