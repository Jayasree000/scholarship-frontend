export const initialScholarships = [
    {
        id: '1',
        title: 'Global Tech Innovators Scholarship',
        provider: 'TechFuture Foundation',
        amount: '$10,000',
        deadline: '2026-05-15',
        category: 'STEM',
        eligibility: 'Computer Science, Engineering majors. GPA 3.5+',
        description: 'Awarded to students demonstrating exceptional promise in technological innovation and software development.',
        status: 'open',
        tags: ['Tech', 'Merit-based', 'Undergrad']
    },
    {
        id: '2',
        title: 'Community Leadership Grant',
        provider: 'Civic Duty Institute',
        amount: '$5,000',
        deadline: '2026-04-30',
        category: 'Social Sciences',
        eligibility: 'All majors. Demonstrated community service. GPA 3.0+',
        description: 'Supporting students who have made significant contributions to their local communities through volunteer work.',
        status: 'open',
        tags: ['Service', 'Need-based', 'All Levels']
    },
    {
        id: '3',
        title: 'Future Medical Professionals Award',
        provider: 'National Health Org',
        amount: '$15,000',
        deadline: '2026-06-01',
        category: 'Healthcare',
        eligibility: 'Pre-med, Nursing, Pharmacy. GPA 3.7+',
        description: 'Helping the next generation of healthcare workers fund their intensive studies and clinical rotations.',
        status: 'open',
        tags: ['Medical', 'Merit-based', 'Graduate']
    },
    {
        id: '4',
        title: 'Women in Business Scholarship',
        provider: 'Enterprise Women Network',
        amount: '$8,000',
        deadline: '2026-03-15',
        category: 'Business',
        eligibility: 'Female identifying. Business, Finance, Economics. GPA 3.2+',
        description: 'Empowering women to take leadership roles in the corporate sector through financial support and mentorship.',
        status: 'open',
        tags: ['Business', 'Diversity', 'Undergrad']
    }
];

export const initialApplications = [
    {
        id: 'app-1',
        studentId: 'user-1',
        studentName: 'Alex Johnson',
        scholarshipId: '1',
        scholarshipTitle: 'Global Tech Innovators Scholarship',
        status: 'pending', // pending, accepted, rejected
        appliedDate: '2026-02-20',
        essayText: 'I have always been fascinated by software...',
        financialNeed: 'High'
    },
    {
        id: 'app-2',
        studentId: 'user-1',
        studentName: 'Alex Johnson',
        scholarshipId: '3',
        scholarshipTitle: 'Future Medical Professionals Award',
        status: 'rejected',
        appliedDate: '2026-01-10',
        essayText: 'Medicine is my calling...',
        financialNeed: 'Medium'
    }
];