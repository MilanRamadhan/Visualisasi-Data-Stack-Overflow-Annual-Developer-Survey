const surveyModel = require('../models/SurveyModel');

class SurveyController {
    async getFields(req, res) {
        try {
            const fields = await surveyModel.getNumericFields();
            res.json(fields);
        } catch (error) {
            console.error('Error in getFields:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getData(req, res) {
        try {
            const field = req.query.field || 'CompTotal';
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;

            const result = await surveyModel.getData(field, page, limit);
            res.json(result);
        } catch (error) {
            console.error('Error in getData:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getStats(req, res) {
        try {
            const field = req.query.field || 'CompTotal';
            const stats = await surveyModel.getStats(field);
            res.json(stats);
        } catch (error) {
            console.error('Error in getStats:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getSurveyQuestions(req, res) {
        try {
            const questions = await surveyModel.getSurveyQuestions();
            res.json(questions);
        } catch (error) {
            console.error('Error in getSurveyQuestions:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getQuestionData(req, res) {
        try {
            const questionId = req.query.questionId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;

            if (!questionId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Question ID is required'
                });
            }

            const result = await surveyModel.getQuestionData(questionId, page, limit);
            res.json(result);
        } catch (error) {
            console.error('Error in getQuestionData:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getQuestionStats(req, res) {
        try {
            const questionId = req.query.questionId;

            if (!questionId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Question ID is required'
                });
            }

            const stats = await surveyModel.getQuestionStats(questionId);
            res.json(stats);
        } catch (error) {
            console.error('Error in getQuestionStats:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getFieldDistribution(req, res) {
        try {
            const { field, groupBy } = req.query;
            if (!field) {
                return res.status(400).json({ error: 'Field parameter is required' });
            }
            const result = await surveyModel.getFieldDistribution(field, groupBy);
            res.json(result);
        } catch (error) {
            console.error('Error in getFieldDistribution:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getFieldCorrelation(req, res) {
        try {
            const { field1, field2 } = req.query;
            if (!field1 || !field2) {
                return res.status(400).json({ error: 'Both field1 and field2 parameters are required' });
            }
            const result = await surveyModel.getFieldCorrelation(field1, field2);
            res.json(result);
        } catch (error) {
            console.error('Error in getFieldCorrelation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getFieldTrends(req, res) {
        try {
            const { field, timeField } = req.query;
            if (!field) {
                return res.status(400).json({ error: 'Field parameter is required' });
            }
            const result = await surveyModel.getFieldTrends(field, timeField);
            res.json(result);
        } catch (error) {
            console.error('Error in getFieldTrends:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getFieldCombinations(req, res) {
        try {
            const { fields } = req.query;
            if (!fields) {
                return res.status(400).json({ error: 'Fields parameter is required' });
            }
            const fieldArray = fields.split(',');
            const result = await surveyModel.getFieldCombinations(fieldArray);
            res.json(result);
        } catch (error) {
            console.error('Error in getFieldCombinations:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getCrossFieldAnalysis(req, res) {
        try {
            const { field1, field2, aggregation } = req.query;
            if (!field1 || !field2) {
                return res.status(400).json({ error: 'Both field1 and field2 parameters are required' });
            }
            const result = await surveyModel.getCrossFieldAnalysis(field1, field2, aggregation);
            res.json(result);
        } catch (error) {
            console.error('Error in getCrossFieldAnalysis:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getWageGap(req, res) {
        try {
            const { country } = req.query;
            if (!country) {
                return res.status(400).json({ error: 'Country parameter is required' });
            }
            const data = await surveyModel.analyzeWageGap(country);
            res.json(data);
        } catch (error) {
            console.error('Error in getWageGap:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getLanguageAdoption(req, res) {
        try {
            const { ageGroup } = req.query;
            if (!ageGroup) {
                return res.status(400).json({ error: 'Age group parameter is required' });
            }
            const data = await surveyModel.analyzeLanguageAdoption(ageGroup);
            res.json(data);
        } catch (error) {
            console.error('Error in getLanguageAdoption:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getWorkOsCorrelation(req, res) {
        try {
            const { workModel } = req.query;
            const data = await surveyModel.analyzeWorkOsCorrelation(workModel || 'all');
            res.json(data);
        } catch (error) {
            console.error('Error in getWorkOsCorrelation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getDatabaseSkills(req, res) {
        try {
            const { orgSize } = req.query;
            if (!orgSize) {
                return res.status(400).json({ error: 'Organization size parameter is required' });
            }
            const data = await surveyModel.analyzeDatabaseSkills(orgSize);
            res.json(data);
        } catch (error) {
            console.error('Error in getDatabaseSkills:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getEducationCompensation(req, res) {
        try {
            const { aiLevel } = req.query;
            if (!aiLevel) {
                return res.status(400).json({ error: 'AI level parameter is required' });
            }
            const data = await surveyModel.analyzeEducationCompensation(aiLevel);
            res.json(data);
        } catch (error) {
            console.error('Error in getEducationCompensation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new SurveyController();