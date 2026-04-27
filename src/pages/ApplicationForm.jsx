import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FileText, User, DollarSign, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './ApplicationForm.css';

const ApplicationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scholarships, applyForScholarship } = useAppContext();

    const scholarship = scholarships.find(s => s.id === id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        gpa: '',
        major: '',
        financialNeed: 'Medium',
        essayText: ''
    });

    if (!scholarship) {
        return <div className="container main-content">Scholarship not found.</div>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            applyForScholarship({
                scholarshipId: scholarship.id,
                scholarshipTitle: scholarship.title,
                ...formData
            });
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="container main-content success-view">
                <div className="glass-panel success-card">
                    <div className="success-icon-wrapper">
                        <CheckCircle2 size={64} className="success-icon" />
                    </div>
                    <h2>Application Submitted!</h2>
                    <p>You have successfully applied for the <strong>{scholarship.title}</strong>.</p>
                    <p className="text-secondary">Your application is now under review. You can track its status in your dashboard.</p>

                    <div className="success-actions">
                        <button className="btn btn-secondary" onClick={() => navigate('/student/search')}>
                            Find More Scholarships
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/student/dashboard')}>
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container main-content application-page">
            <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
                Back to Search
            </button>

            <div className="application-layout">
                <div className="form-column glass-panel">
                    <div className="form-header">
                        <h2>Complete Your Application</h2>
                        <p>Please fill out all required fields to apply.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="application-form">
                        <div className="form-section">
                            <h3><User size={18} /> Academic Details</h3>
                            <div className="grid-cols-2">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="major">Major / Program of Study</label>
                                    <input
                                        type="text"
                                        id="major"
                                        name="major"
                                        className="form-input"
                                        value={formData.major}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Computer Science"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="gpa">Current GPA</label>
                                    <input
                                        type="number"
                                        id="gpa"
                                        name="gpa"
                                        step="0.01"
                                        min="0"
                                        max="4.0"
                                        className="form-input"
                                        value={formData.gpa}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. 3.8"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3><DollarSign size={18} /> Financial Information</h3>
                            <div className="form-group">
                                <label className="form-label" htmlFor="financialNeed">Estimated Financial Need</label>
                                <select
                                    id="financialNeed"
                                    name="financialNeed"
                                    className="form-input"
                                    value={formData.financialNeed}
                                    onChange={handleChange}
                                >
                                    <option value="Low">Low (Supplemental support)</option>
                                    <option value="Medium">Medium (Partial tuition support)</option>
                                    <option value="High">High (Full tuition / living support)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3><FileText size={18} /> Personal Essay</h3>
                            <div className="form-group">
                                <label className="form-label" htmlFor="essayText">Why are you a good candidate for this scholarship?</label>
                                <textarea
                                    id="essayText"
                                    name="essayText"
                                    className="form-input textarea"
                                    rows="6"
                                    value={formData.essayText}
                                    onChange={handleChange}
                                    required
                                    placeholder="Write your essay here... (Minimum 200 words recommended)"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="info-column">
                    <div className="scholarship-summary glass-panel">
                        <h3>Applying For</h3>
                        <h4>{scholarship.title}</h4>
                        <span className="provider">{scholarship.provider}</span>

                        <div className="summary-details">
                            <div className="summary-item">
                                <span className="label">Amount</span>
                                <span className="value success-text">{scholarship.amount}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Deadline</span>
                                <span className="value text-warning">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Category</span>
                                <span className="value">{scholarship.category}</span>
                            </div>
                        </div>

                        <div className="eligibility-box">
                            <h5>Eligibility Requirements</h5>
                            <p>{scholarship.eligibility}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;