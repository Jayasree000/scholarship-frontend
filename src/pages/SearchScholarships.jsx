import React, { useState } from 'react';
import { Search, Filter, GraduationCap, Calendar, DollarSign, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './SearchScholarships.css';

const SearchScholarships = () => {
    const { scholarships, applications } = useAppContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = ['All', ...new Set(scholarships.map(s => s.category))];

    const filteredScholarships = scholarships.filter(scholarship => {
        const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || scholarship.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getApplicationStatus = (scholarshipId) => {
        return applications.find(app => app.scholarshipId === scholarshipId)?.status;
    };

    return (
        <div className="search-page container main-content">
            <header className="page-header">
                <h1>Discover Opportunities</h1>
                <p>Find and apply for scholarships that match your profile and goals.</p>
            </header>

            <section className="search-controls glass-panel">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or provider..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-wrapper">
                    <Filter className="filter-icon" size={20} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </section>

            <section className="results-section">
                <div className="results-header">
                    <h2>Available Scholarships</h2>
                    <span className="results-count">{filteredScholarships.length} found</span>
                </div>

                <div className="scholarships-grid grid-cols-2">
                    {filteredScholarships.map(scholarship => {
                        const status = getApplicationStatus(scholarship.id);

                        return (
                            <div key={scholarship.id} className="scholarship-card glass-panel">
                                <div className="card-header">
                                    <div className="card-title-group">
                                        <div className="icon-wrapper">
                                            <GraduationCap size={20} color="var(--pk-primary)" />
                                        </div>
                                        <div>
                                            <h3>{scholarship.title}</h3>
                                            <span className="provider">{scholarship.provider}</span>
                                        </div>
                                    </div>
                                    {status && (
                                        <span className={`badge badge-${status === 'accepted' ? 'success' : status === 'rejected' ? 'danger' : 'warning'}`}>
                                            {status === 'pending' ? 'Applied' : status}
                                        </span>
                                    )}
                                </div>

                                <p className="description">{scholarship.description}</p>

                                <div className="card-meta">
                                    <div className="meta-item">
                                        <DollarSign size={16} />
                                        <span>{scholarship.amount}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Calendar size={16} />
                                        <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="card-tags">
                                    {scholarship.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        disabled={status}
                                        onClick={() => navigate(`/student/apply/${scholarship.id}`)}
                                    >
                                        {status ? 'Application Submitted' : 'Apply Now'}
                                        {!status && <ChevronRight size={18} />}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {filteredScholarships.length === 0 && (
                        <div className="no-results glass-panel">
                            <Search size={48} color="var(--pk-text-tertiary)" />
                            <h3>No scholarships found</h3>
                            <p>Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SearchScholarships;