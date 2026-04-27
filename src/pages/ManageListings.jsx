import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Trash2, Edit2, Copy, Save, X } from 'lucide-react';
import './ManageListings.css';

const ManageListings = () => {
    const { scholarships, addScholarship, deleteScholarship } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        provider: '',
        amount: '',
        deadline: '',
        category: 'STEM',
        eligibility: '',
        description: '',
        tags: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addScholarship({
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        });
        setIsAdding(false);
        setFormData({
            title: '', provider: '', amount: '', deadline: '', category: 'STEM', eligibility: '', description: '', tags: ''
        });
    };

    return (
        <div className="container main-content manage-listings">
            <header className="admin-header">
                <div>
                    <h1>Manage Scholarships</h1>
                    <p>Create, update, and remove scholarship opportunities from the platform.</p>
                </div>

                {!isAdding && (
                    <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
                        <Plus size={18} /> Add New Scholarship
                    </button>
                )}
            </header>

            {isAdding && (
                <section className="add-scholarship-form glass-panel slide-down">
                    <div className="form-header flex-between">
                        <h2>Add New Scholarship</h2>
                        <button className="btn-icon text-secondary" onClick={() => setIsAdding(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleAddSubmit} className="grid-form">
                        <div className="form-group grid-full">
                            <label className="form-label" htmlFor="title">Scholarship Title</label>
                            <input type="text" id="title" name="title" className="form-input" required value={formData.title} onChange={handleChange} placeholder="e.g. Future Tech Leaders" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="provider">Provider / Organization</label>
                            <input type="text" id="provider" name="provider" className="form-input" required value={formData.provider} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="amount">Amount Provided</label>
                            <input type="text" id="amount" name="amount" className="form-input" required value={formData.amount} onChange={handleChange} placeholder="e.g. $5,000" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="deadline">Application Deadline</label>
                            <input type="date" id="deadline" name="deadline" className="form-input" required value={formData.deadline} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="category">Category</label>
                            <select id="category" name="category" className="form-input" required value={formData.category} onChange={handleChange}>
                                <option value="STEM">STEM</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Business">Business</option>
                                <option value="Arts & Humanities">Arts & Humanities</option>
                                <option value="Social Sciences">Social Sciences</option>
                                <option value="General Merit">General Merit</option>
                            </select>
                        </div>

                        <div className="form-group grid-full">
                            <label className="form-label" htmlFor="tags">Tags (Comma separated)</label>
                            <input type="text" id="tags" name="tags" className="form-input" value={formData.tags} onChange={handleChange} placeholder="e.g. Need-based, Undergrad, Women in Tech" />
                        </div>

                        <div className="form-group grid-full">
                            <label className="form-label" htmlFor="eligibility">Eligibility Requirements</label>
                            <input type="text" id="eligibility" name="eligibility" className="form-input" required value={formData.eligibility} onChange={handleChange} placeholder="e.g. Open to high school seniors with 3.5+ GPA" />
                        </div>

                        <div className="form-group grid-full">
                            <label className="form-label" htmlFor="description">Full Description</label>
                            <textarea id="description" name="description" className="form-input textarea" rows="4" required value={formData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-actions grid-full">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary"><Save size={18} /> Save Scholarship</button>
                        </div>
                    </form>
                </section>
            )}

            <section className="listings-grid grid-cols-2">
                {scholarships.map(scholarship => (
                    <div key={scholarship.id} className="scholarship-card admin-card glass-panel">
                        <div className="card-header">
                            <div>
                                <h3>{scholarship.title}</h3>
                                <span className="provider">{scholarship.provider}</span>
                            </div>
                            <div className="card-actions">
                                <button className="btn-icon" title="Edit (Coming soon)">
                                    <Edit2 size={16} />
                                </button>
                                <button className="btn-icon" title="Duplicate (Coming soon)">
                                    <Copy size={16} />
                                </button>
                                <button
                                    className="btn-icon danger"
                                    title="Delete Scholarship"
                                    onClick={() => deleteScholarship(scholarship.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="admin-card-details">
                            <div className="stat-row">
                                <span className="label">Award Limit:</span>
                                <span className="value font-medium">{scholarship.amount}</span>
                            </div>
                            <div className="stat-row">
                                <span className="label">Deadline:</span>
                                <span className="value">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="stat-row">
                                <span className="label">Category:</span>
                                <span className="value">{scholarship.category}</span>
                            </div>
                        </div>

                        <div className="card-tags mt-4">
                            {scholarship.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}

                {scholarships.length === 0 && (
                    <div className="empty-state grid-full glass-panel">
                        <h3>No Active Scholarships</h3>
                        <p>You have deleted all scholarships. Add a new one to get started.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ManageListings;