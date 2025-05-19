// Dummy data for Stack Overflow Developer Survey 2024
const surveyData = {
    // Wage gap data by gender and experience
    wageGap: {
        usa: {
            labels: ['0-3 tahun', '4-6 tahun', '7-9 tahun', '10-14 tahun', '15+ tahun'],
            datasets: [
                {
                    label: 'Male',
                    data: [85000, 105000, 130000, 155000, 180000],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Female',
                    data: [80000, 95000, 115000, 135000, 160000],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Non-binary/Other',
                    data: [82000, 100000, 120000, 145000, 165000],
                    backgroundColor: 'rgba(252, 115, 88, 0.8)',
                    borderColor: 'rgba(252, 115, 88, 1)',
                    borderWidth: 1
                }
            ]
        },
        germany: {
            labels: ['0-3 tahun', '4-6 tahun', '7-9 tahun', '10-14 tahun', '15+ tahun'],
            datasets: [
                {
                    label: 'Male',
                    data: [55000, 68000, 82000, 95000, 110000],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Female',
                    data: [52000, 64000, 76000, 88000, 100000],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Non-binary/Other',
                    data: [53000, 65000, 78000, 90000, 103000],
                    backgroundColor: 'rgba(252, 115, 88, 0.8)',
                    borderColor: 'rgba(252, 115, 88, 1)',
                    borderWidth: 1
                }
            ]
        }
    },

    // Language adoption patterns
    languageAdoption: {
        '18-24': {
            labels: ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#', 'Go', 'Rust', 'Ruby'],
            datasets: [
                {
                    label: 'Currently Using',
                    data: [72, 65, 45, 40, 35, 20, 18, 14],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Want to Learn',
                    data: [45, 70, 40, 60, 30, 55, 62, 22],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        '25-34': {
            labels: ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#', 'Go', 'Rust', 'Ruby'],
            datasets: [
                {
                    label: 'Currently Using',
                    data: [75, 60, 50, 55, 40, 25, 15, 20],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Want to Learn',
                    data: [40, 65, 35, 50, 30, 50, 58, 18],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                }
            ]
        }
    },

    // Work model and OS correlation
    workOsCorrelation: {
        all: {
            labels: ['Windows', 'macOS', 'Linux/Ubuntu', 'Linux/Debian', 'Other Linux'],
            datasets: [
                {
                    label: 'Remote',
                    data: [42, 28, 18, 8, 4],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Hybrid',
                    data: [48, 30, 14, 6, 2],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'In-Office',
                    data: [55, 25, 12, 5, 3],
                    backgroundColor: 'rgba(252, 115, 88, 0.8)',
                    borderColor: 'rgba(252, 115, 88, 1)',
                    borderWidth: 1
                }
            ]
        },
        remote: {
            labels: ['Windows', 'macOS', 'Linux/Ubuntu', 'Linux/Debian', 'Other Linux'],
            datasets: [
                {
                    label: 'Remote',
                    data: [42, 28, 18, 8, 4],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                }
            ]
        }
    },

    // Database skills comparison
    databaseSkills: {
        small: {
            labels: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Firebase'],
            datasets: [
                {
                    label: 'Currently Using',
                    data: [49, 45, 30, 28, 22, 20],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Want to Learn',
                    data: [35, 30, 25, 45, 38, 30],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        medium: {
            labels: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Firebase'],
            datasets: [
                {
                    label: 'Currently Using',
                    data: [52, 48, 25, 32, 28, 15],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Want to Learn',
                    data: [30, 25, 22, 40, 45, 25],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                }
            ]
        }
    },

    // Education, experience and compensation
    eduExpComp: {
        high: {
            labels: ['No degree', 'Bachelor\'s', 'Master\'s', 'PhD'],
            datasets: [
                {
                    label: '0-3 tahun exp',
                    data: [70000, 85000, 95000, 105000],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: '4-6 tahun exp',
                    data: [90000, 105000, 120000, 135000],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: '7+ tahun exp',
                    data: [115000, 130000, 145000, 160000],
                    backgroundColor: 'rgba(252, 115, 88, 0.8)',
                    borderColor: 'rgba(252, 115, 88, 1)',
                    borderWidth: 1
                }
            ]
        },
        medium: {
            labels: ['No degree', 'Bachelor\'s', 'Master\'s', 'PhD'],
            datasets: [
                {
                    label: '0-3 tahun exp',
                    data: [65000, 78000, 88000, 98000],
                    backgroundColor: 'rgba(107, 93, 245, 0.8)',
                    borderColor: 'rgba(107, 93, 245, 1)',
                    borderWidth: 1
                },
                {
                    label: '4-6 tahun exp',
                    data: [82000, 95000, 110000, 125000],
                    backgroundColor: 'rgba(66, 185, 255, 0.8)',
                    borderColor: 'rgba(66, 185, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: '7+ tahun exp',
                    data: [105000, 118000, 133000, 148000],
                    backgroundColor: 'rgba(252, 115, 88, 0.8)',
                    borderColor: 'rgba(252, 115, 88, 1)',
                    borderWidth: 1
                }
            ]
        }
    }
};

// Export using CommonJS
module.exports = surveyData;