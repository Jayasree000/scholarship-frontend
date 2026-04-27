import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialScholarships, initialApplications } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [scholarships, setScholarships] = useState(initialScholarships);
    const [applications, setApplications] = useState(initialApplications);
    const [user, setUser] = useState(null); // null means not logged in

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    // Student Actions
    const applyForScholarship = (applicationData) => {
        const newApp = {
            id: `app-${Date.now()}`,
            studentId: 'user-1', // Mocking a logged-in student
            studentName: 'Alex Johnson',
            status: 'pending',
            appliedDate: new Date().toISOString().split('T')[0],
            ...applicationData
        };
        setApplications([...applications, newApp]);
    };

    // Admin Actions
    const updateApplicationStatus = (appId, newStatus) => {
        setApplications(applications.map(app =>
            app.id === appId ? { ...app, status: newStatus } : app
        ));
    };

    const addScholarship = (scholarshipData) => {
        const newScholarship = {
            id: `${Date.now()}`,
            status: 'open',
            ...scholarshipData
        };
        setScholarships([...scholarships, newScholarship]);
    };

    const deleteScholarship = (id) => {
        setScholarships(scholarships.filter(s => s.id !== id));
    };

    return (
        <AppContext.Provider value={{
            scholarships,
            applications,
            user,
            login,
            logout,
            applyForScholarship,
            updateApplicationStatus,
            addScholarship,
            deleteScholarship
        }}>
            {children}
        </AppContext.Provider>
    );
};