import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, FileText, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { applications, scholarships, updateApplicationStatus } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Stats calculation
    const totalApps = applications.length;
    const pendingApps = applications.filter(a => a.status === 'pending').length;
    const acceptedApps = applications.filter(a => a.status === 'accepted').length;
    const rejectedApps = applications.filter(a => a.status === 'rejected').length;

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.scholarshipTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (appId, newStatus) => {
        updateApplicationStatus(appId, newStatus);
    };

    return (
        <div className="container main-content admin-dashboard">
            <header className="admin-header">
                <h1>Overview</h1>
                <p>Manage and review all student applications across the platform.</p>
            </header>

            <section className="admin-stats grid-cols-2">
                <div className="stat-card glass-panel" style={{ '--card-color': 'var(--pk-info)' }}>
                    <div className="stat-icon info"><FileText size={24} /></div>
                    <div className="stat-details">
                        <span className="stat-value">{totalApps}</span>
                        <span className="stat-label">Total Applications</span>
                    </div>
                </div>

                <div className="stat-card glass-panel" style={{ '--card-color': 'var(--pk-warning)' }}>
                    <div className="stat-icon warning"><Users size={24} /></div>
                    <div className="stat-details">
                        <span className="stat-value">{pendingApps}</span>
                        <span className="stat-label">Requires Review</span>
                    </div>
                </div>

                <div className="stat-card glass-panel" style={{ '--card-color': 'var(--pk-success)' }}>
                    <div className="stat-icon success"><CheckCircle size={24} /></div>
                    <div className="stat-details">
                        <span className="stat-value">{acceptedApps}</span>
                        <span className="stat-label">Accepted</span>
                    </div>
                </div>

                <div className="stat-card glass-panel" style={{ '--card-color': 'var(--pk-danger)' }}>
                    <div className="stat-icon danger"><XCircle size={24} /></div>
                    <div className="stat-details">
                        <span className="stat-value">{rejectedApps}</span>
                        <span className="stat-label">Rejected</span>
                    </div>
                </div>
            </section>

            <section className="applications-management glass-panel">
                <div className="management-header">
                    <h2>Application Review Queue</h2>

                    <div className="management-controls">
                        <div className="search-box">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search applicant or scholarship..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="form-input search-input-sm"
                            />
                        </div>

                        <div className="filter-box">
                            <Filter size={18} className="filter-icon" />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="form-input filter-select-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Applicant Name</th>
                                <th>Scholarship</th>
                                <th>Applied Date</th>
                                <th>Financial Need</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApps.map(app => (
                                <tr key={app.id}>
                                    <td className="font-medium">{app.studentName}</td>
                                    <td>{app.scholarshipTitle}</td>
                                    <td className="text-secondary">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`need-badge need-${app.financialNeed?.toLowerCase() || 'medium'}`}>
                                            {app.financialNeed || 'Medium'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${app.status}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        {app.status === 'pending' ? (
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn accept"
                                                    onClick={() => handleStatusChange(app.id, 'accepted')}
                                                    title="Accept Application"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    onClick={() => handleStatusChange(app.id, 'rejected')}
                                                    title="Reject Application"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="text-btn text-sm"
                                                onClick={() => handleStatusChange(app.id, 'pending')}
                                            >
                                                Reset Status
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {filteredApps.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="empty-table-state">
                                        No applications found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;