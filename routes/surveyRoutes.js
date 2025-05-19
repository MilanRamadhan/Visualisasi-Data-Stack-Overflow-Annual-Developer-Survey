const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/SurveyController');

// ... existing routes ...

// Visualization endpoints
router.get('/wage-gap', surveyController.getWageGap);
router.get('/language-adoption', surveyController.getLanguageAdoption);
router.get('/work-os-correlation', surveyController.getWorkOsCorrelation);
router.get('/database-skills', surveyController.getDatabaseSkills);
router.get('/education-compensation', surveyController.getEducationCompensation);

module.exports = router;