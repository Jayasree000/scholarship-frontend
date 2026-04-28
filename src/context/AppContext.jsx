import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);
    const [user, setUser] = useState(null); // null means not logged in
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        // Parse ID to number for backend mapping, defaults to 1 for student demo
        const userId = userData.role === 'admin' ? 2 : 1; 
        setUser({ ...userData, dbId: userId });
    };

    const logout = () => {
        setUser(null);
    };

    // Load initial data from the backend
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const scholarshipsRes = await api.get('/scholarships');
                setScholarships(scholarshipsRes.data);

                // For demo purposes, we fetch all applications
                const appsRes = await api.get('/scholarships/applications');
                // Map the backend structure to the frontend structure
                const mappedApps = appsRes.data.map(app => ({
                    id: app.id,
                    studentId: app.student?.id,
                    studentName: app.student?.name || 'Unknown Student',
                    scholarshipId: app.scholarship?.id,
                    scholarshipTitle: app.scholarship?.title || 'Unknown Scholarship',
                    status: app.status?.toLowerCase() || 'pending',
                    appliedDate: app.appliedAt,
                    coverLetter: app.coverLetter
                }));
                setApplications(mappedApps);
            } catch (error) {
                console.error("Error fetching data from API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Student Actions
    const applyForScholarship = async (applicationData) => {
        try {
            const payload = {
                student: { id: user?.dbId || 1 },
                scholarship: { id: applicationData.scholarshipId },
                coverLetter: applicationData.essayText // Map essayText from form to coverLetter in DB
            };
            
            const response = await api.post('/scholarships/apply', payload);
            const savedApp = response.data;
            
            setApplications([...applications, {
                id: savedApp.id,
                studentId: savedApp.student?.id,
                studentName: user?.name || 'Alex Johnson',
                scholarshipId: savedApp.scholarship?.id,
                scholarshipTitle: scholarships.find(s => s.id === savedApp.scholarship?.id)?.title || 'Scholarship',
                status: 'pending',
                appliedDate: savedApp.appliedAt,
                coverLetter: savedApp.coverLetter
            }]);
            return true;
        } catch (error) {
            console.error("Failed to apply:", error);
            return false;
        }
    };

    // Admin Actions
    const updateApplicationStatus = async (appId, newStatus) => {
        try {
            await api.put(`/scholarships/applications/${appId}/status`, newStatus);
            setApplications(applications.map(app =>
                app.id === appId ? { ...app, status: newStatus } : app
            ));
            return true;
        } catch (error) {
            console.error("Failed to update status:", error);
            return false;
        }
    };

    const addScholarship = async (scholarshipData) => {
        try {
            const response = await api.post('/scholarships', scholarshipData);
            setScholarships([...scholarships, response.data]);
            return true;
        } catch (error) {
            console.error("Failed to add scholarship:", error);
            return false;
        }
    };

    const deleteScholarship = async (id) => {
        try {
            await api.delete(`/scholarships/${id}`);
            setScholarships(scholarships.filter(s => s.id !== id));
            return true;
        } catch (error) {
            console.error("Failed to delete scholarship:", error);
            return false;
        }
    };

    return (
        <AppContext.Provider value={{
            scholarships,
            applications,
            user,
            loading,
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