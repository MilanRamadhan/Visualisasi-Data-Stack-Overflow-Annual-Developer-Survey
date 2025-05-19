const express = require('express');
const cors = require('cors');
const path = require('path');
const surveyData = require('./public/js/surveyVisualization');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/survey/wage-gap/:country', (req, res) => {
    const country = req.params.country;
    res.json(surveyData.wageGap[country] || surveyData.wageGap.usa);
});

app.get('/api/survey/language-adoption/:ageGroup', (req, res) => {
    const ageGroup = req.params.ageGroup;
    res.json(surveyData.languageAdoption[ageGroup] || surveyData.languageAdoption['18-24']);
});

app.get('/api/survey/work-os/:model', (req, res) => {
    const model = req.params.model;
    res.json(surveyData.workOsCorrelation[model] || surveyData.workOsCorrelation.all);
});

app.get('/api/survey/database-skills/:orgSize', (req, res) => {
    const orgSize = req.params.orgSize;
    res.json(surveyData.databaseSkills[orgSize] || surveyData.databaseSkills.small);
});

app.get('/api/survey/edu-exp-comp/:aiLevel', (req, res) => {
    const aiLevel = req.params.aiLevel;
    res.json(surveyData.eduExpComp[aiLevel] || surveyData.eduExpComp.high);
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});