const { MongoClient } = require('mongodb');

class SurveyModel {
    constructor() {
        this.uri = "mongodb+srv://irfan:cahayaksp@cluster0.tzyfaev.mongodb.net/so_survey?retryWrites=true&w=majority";
        this.client = new MongoClient(this.uri);
        this.database = null;
        this.collection = null;

        // Cache configuration
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes

        // Schema definition
        this.schema = {
            fields: [
                {
                    name: "Country",
                    type: "string",
                    values: ["United States", "India", "Germany", "United Kingdom", "Canada", "France", "Brazil", "Poland", "Netherlands", "Australia", "Indonesia", "Other"]
                },
                {
                    name: "Gender",
                    type: "string",
                    values: ["Man", "Woman", "Non-binary", "Prefer not to say", "Prefer to self-describe"]
                },
                {
                    name: "CompTotal",
                    type: "number"
                },
                {
                    name: "YearsCode",
                    type: "string",
                    values: ["Less than 1 year", "1-2 years", "3-5 years", "6-8 years", "9-11 years", "12-14 years", "15-17 years", "18-20 years", "21-23 years", "24-26 years", "27-29 years", "30 or more years"]
                },
                {
                    name: "YearsCodePro",
                    type: "string",
                    values: ["Less than 1 year", "1-2 years", "3-5 years", "6-8 years", "9-11 years", "12-14 years", "15-17 years", "18-20 years", "21-23 years", "24-26 years", "27-29 years", "30 or more years"]
                },
                {
                    name: "Age",
                    type: "string",
                    values: ["Under 18 years old", "18-24 years old", "25-34 years old", "35-44 years old", "45-54 years old", "55-64 years old", "65 years or older", "Prefer not to say"]
                },
                {
                    name: "EdLevel",
                    type: "string",
                    values: [
                        "Primary/elementary school", "Secondary school", "Some college/university study without earning a degree",
                        "Associate degree", "Bachelor's degree", "Master's degree", "Professional degree", "Something else"
                    ]
                },
                {
                    name: "RemoteWork",
                    type: "string",
                    values: ["Remote", "In-person", "Hybrid (some remote, some in-person)"]
                },
                {
                    name: "OpSysProfessionalUse",
                    type: "string",
                    values: ["Windows", "MacOS", "Linux", "Other"]
                },
                {
                    name: "OpSysPersonalUse",
                    type: "string",
                    values: ["Windows", "MacOS", "Linux", "Android", "iOS", "Other"]
                },
                {
                    name: "PlatformHaveWorkedWith",
                    type: "array",
                    values: ["AWS", "Google Cloud", "Microsoft Azure", "Heroku", "Netlify", "Vercel", "Other"]
                },
                {
                    name: "PlatformWantToWorkWith",
                    type: "array",
                    values: ["AWS", "Google Cloud", "Microsoft Azure", "Heroku", "Netlify", "Vercel", "Other"]
                },
                {
                    name: "LanguageHaveWorkedWith",
                    type: "array",
                    values: [
                        "Python", "JavaScript", "TypeScript", "Java", "C#", "C++", "C", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "SQL", "Other"
                    ]
                },
                {
                    name: "LanguageWantToWorkWith",
                    type: "array",
                    values: [
                        "Python", "JavaScript", "TypeScript", "Java", "C#", "C++", "C", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "SQL", "Other"
                    ]
                },
                {
                    name: "DatabaseHaveWorkedWith",
                    type: "array",
                    values: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Firebase", "Microsoft SQL Server", "Other"]
                },
                {
                    name: "DatabaseWantToWorkWith",
                    type: "array",
                    values: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Firebase", "Microsoft SQL Server", "Other"]
                },
                {
                    name: "WebframeHaveWorkedWith",
                    type: "array",
                    values: [
                        "React", "Vue.js", "Angular", "Next.js", "Express", "Django", "Flask", "ASP.NET", "Svelte", "Other"
                    ]
                },
                {
                    name: "WebframeWantToWorkWith",
                    type: "array",
                    values: [
                        "React", "Vue.js", "Angular", "Next.js", "Express", "Django", "Flask", "ASP.NET", "Svelte", "Other"
                    ]
                },
                {
                    name: "AIToolCurrentlyUsing",
                    type: "array",
                    values: [
                        "ChatGPT", "GitHub Copilot", "Bing AI", "Claude", "Replit Ghostwriter", "Codeium", "Amazon Q", "Other"
                    ]
                },
                {
                    name: "AIToolInterestedInUsing",
                    type: "array",
                    values: [
                        "ChatGPT", "GitHub Copilot", "Bing AI", "Claude", "Replit Ghostwriter", "Codeium", "Amazon Q", "Other"
                    ]
                },
                {
                    name: "BuyNewTool",
                    type: "string",
                    values: ["Yes", "No", "I don't know"]
                },
                {
                    name: "OrgSize",
                    type: "string",
                    values: [
                        "Just me", "2 to 9 employees", "10 to 19", "20 to 99", "100 to 499", "500 to 999", "1,000 to 4,999", "5,000 to 9,999", "10,000 or more", "I don't know"
                    ]
                },
                {
                    name: "Industry",
                    type: "string",
                    values: [
                        "Software Development", "Banking/Finance", "Education", "Healthcare", "Retail", "Telecommunications", "Government", "Other"
                    ]
                },
                {
                    name: "WorkExp",
                    type: "string",
                    values: ["0", "1-5", "6-10", "11-15", "16-20", "21+"]
                }
            ],
            primaryKey: ["Country", "Gender", "YearsCodePro"],
            description: "Schema for modeling developer survey data with AI, compensation, and tech preferences"
        };

        // Field type mappings for quick lookup
        this.fieldTypes = new Map(
            this.schema.fields.map(field => [field.name, field.type])
        );

        // Valid values for categorical fields
        this.validValues = new Map(
            this.schema.fields
                .filter(field => field.values)
                .map(field => [field.name, new Set(field.values)])
        );

        // Field categories for quick access
        this.fieldCategories = {
            numeric: this.schema.fields
                .filter(field => field.type === 'number')
                .map(field => field.name),
            categorical: this.schema.fields
                .filter(field => field.type === 'string' && field.values)
                .map(field => field.name),
            array: this.schema.fields
                .filter(field => field.type === 'array')
                .map(field => field.name)
        };
    }

    // Cache management methods
    async getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
    }

    // Optimized field access methods
    getFieldType(fieldName) {
        return this.fieldTypes.get(fieldName);
    }

    getValidValues(fieldName) {
        return this.validValues.get(fieldName);
    }

    validateFieldValue(fieldName, value) {
        const fieldType = this.getFieldType(fieldName);
        if (!fieldType) return false;

        if (fieldType === 'array') {
            const validValues = this.getValidValues(fieldName);
            return Array.isArray(value) && value.every(v => validValues.has(v));
        } else if (fieldType === 'string') {
            const validValues = this.getValidValues(fieldName);
            return validValues ? validValues.has(value) : true;
        } else if (fieldType === 'number') {
            return typeof value === 'number' && !isNaN(value);
        }

        return false;
    }

    // Optimized field category methods
    getNumericFields() {
        return this.fieldCategories.numeric;
    }

    getCategoricalFields() {
        return this.fieldCategories.categorical;
    }

    getArrayFields() {
        return this.fieldCategories.array;
    }

    // Enhanced data retrieval methods
    async getData(field, page = 1, limit = 1000) {
        try {
            const cacheKey = `data_${field}_${page}_${limit}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            const skip = (page - 1) * limit;
            const fieldType = this.getFieldType(field);

            let query = { [field]: { $exists: true, $ne: null } };

            if (fieldType === 'number') {
                query[field] = { ...query[field], $type: "number" };
            } else if (fieldType === 'string' && this.getValidValues(field)) {
                query[field] = { ...query[field], $in: Array.from(this.getValidValues(field)) };
            }

            const [total, data] = await Promise.all([
                this.collection.countDocuments(query),
                this.collection.find(query, { projection: { [field]: 1, _id: 0 } })
                    .skip(skip)
                    .limit(limit)
                    .toArray()
            ]);

            const result = {
                data: data.map(doc => ({
                    [field]: fieldType === 'number' ? Number(doc[field]) : doc[field]
                })),
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            };

            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error getting data:', error);
            throw error;
        }
    }

    // Enhanced stats calculation
    async getStats(field) {
        try {
            const pipeline = [
                { $match: { [field]: { $exists: true, $ne: null } } },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        min: { $min: `$${field}` },
                        max: { $max: `$${field}` },
                        avg: { $avg: `$${field}` },
                        p25: {
                            $percentile: {
                                input: `$${field}`,
                                p: [0.25],
                                method: "approximate"
                            }
                        },
                        p50: {
                            $percentile: {
                                input: `$${field}`,
                                p: [0.5],
                                method: "approximate"
                            }
                        },
                        p75: {
                            $percentile: {
                                input: `$${field}`,
                                p: [0.75],
                                method: "approximate"
                            }
                        },
                        stdDev: { $stdDevPop: `$${field}` }
                    }
                }
            ];

            const stats = await this.collection.aggregate(pipeline).toArray();
            const result = stats[0] || {
                count: 0,
                min: 0,
                max: 0,
                avg: 0,
                p25: [0],
                p50: [0],
                p75: [0],
                stdDev: 0
            };

            // Ensure all values are numbers and handle arrays from percentiles
            const processedStats = {
                count: Number(result.count),
                min: Number(result.min),
                max: Number(result.max),
                avg: Number(result.avg),
                p25: Array.isArray(result.p25) ? Number(result.p25[0]) : Number(result.p25),
                p50: Array.isArray(result.p50) ? Number(result.p50[0]) : Number(result.p50),
                p75: Array.isArray(result.p75) ? Number(result.p75[0]) : Number(result.p75),
                stdDev: Number(result.stdDev)
            };

            // Round all numeric values to 2 decimal places
            Object.keys(processedStats).forEach(key => {
                if (typeof processedStats[key] === 'number') {
                    processedStats[key] = Math.round(processedStats[key] * 100) / 100;
                }
            });

            return processedStats;
        } catch (error) {
            console.error('Error getting stats:', error);
            throw error;
        }
    }

    // Enhanced complex analysis methods
    async getComplexAnalysis(analysisType, params) {
        try {
            const cacheKey = `analysis_${analysisType}_${JSON.stringify(params)}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            const result = await this[`analyze${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)}`](params);
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error in complex analysis:', error);
            throw error;
        }
    }

    async connect() {
        try {
            await this.client.connect();
            this.database = this.client.db('so_survey');
            this.collection = this.database.collection('results');
            console.log('Connected to MongoDB Atlas');
            return true;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            return false;
        }
    }

    async getSurveyQuestions() {
        try {
            const questions = [
                {
                    id: 'CompTotal',
                    title: 'Total Compensation',
                    description: 'What is your total compensation (salary, bonuses, and perks, before taxes and deductions)?',
                    type: 'numeric',
                    unit: 'USD',
                    analysis: ['distribution', 'percentile', 'correlation']
                },
                {
                    id: 'YearsCode',
                    title: 'Years of Coding Experience',
                    description: 'How many years have you been coding?',
                    type: 'numeric',
                    unit: 'years',
                    analysis: ['distribution', 'percentile', 'correlation']
                },
                {
                    id: 'YearsCodePro',
                    title: 'Years of Professional Coding',
                    description: 'How many years have you coded professionally?',
                    type: 'numeric',
                    unit: 'years',
                    analysis: ['distribution', 'percentile', 'correlation']
                },
                {
                    id: 'WorkExp',
                    title: 'Work Experience',
                    description: 'How many years of work experience do you have?',
                    type: 'numeric',
                    unit: 'years',
                    analysis: ['distribution', 'percentile', 'correlation']
                },
                {
                    id: 'RemoteWork',
                    title: 'Remote Work',
                    description: 'What is your remote work status?',
                    type: 'categorical',
                    analysis: ['frequency', 'trend']
                },
                {
                    id: 'EdLevel',
                    title: 'Education Level',
                    description: 'What is your highest level of education?',
                    type: 'categorical',
                    analysis: ['frequency', 'trend']
                },
                {
                    id: 'OrgSize',
                    title: 'Organization Size',
                    description: 'What is the size of your organization?',
                    type: 'categorical',
                    analysis: ['frequency', 'trend']
                },
                {
                    id: 'Country',
                    title: 'Country',
                    description: 'In which country do you currently reside?',
                    type: 'categorical',
                    analysis: ['frequency', 'trend']
                },
                {
                    id: 'LanguageHaveWorkedWith',
                    title: 'Programming Languages Used',
                    description: 'Which programming languages have you worked with?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'LanguageWantToWorkWith',
                    title: 'Programming Languages Interested In',
                    description: 'Which programming languages do you want to work with?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'DatabaseHaveWorkedWith',
                    title: 'Databases Used',
                    description: 'Which databases have you worked with?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'PlatformHaveWorkedWith',
                    title: 'Platforms Used',
                    description: 'Which platforms have you worked with?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'WebframeHaveWorkedWith',
                    title: 'Web Frameworks Used',
                    description: 'Which web frameworks have you worked with?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'OpSysPersonal use',
                    title: 'Personal Operating Systems',
                    description: 'Which operating systems do you use personally?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'OpSysProfessional use',
                    title: 'Professional Operating Systems',
                    description: 'Which operating systems do you use professionally?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'AIToolInterested in Using',
                    title: 'AI Tools Interested In',
                    description: 'Which AI tools are you interested in using?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                },
                {
                    id: 'AIToolCurrently Using',
                    title: 'AI Tools Currently Using',
                    description: 'Which AI tools are you currently using?',
                    type: 'multiSelect',
                    analysis: ['frequency', 'combination', 'trend']
                }
            ];

            // Verify which questions have data in the database
            const validQuestions = [];
            for (const question of questions) {
                const count = await this.collection.countDocuments({
                    [question.id]: { $exists: true, $ne: null }
                });
                if (count > 0) {
                    validQuestions.push({
                        ...question,
                        count
                    });
                }
            }

            return validQuestions;
        } catch (error) {
            console.error('Error getting survey questions:', error);
            throw error;
        }
    }

    async getQuestionData(questionId, page = 1, limit = 1000) {
        try {
            const skip = (page - 1) * limit;
            const question = (await this.getSurveyQuestions()).find(q => q.id === questionId);

            if (!question) {
                throw new Error('Question not found');
            }

            let query = { [questionId]: { $exists: true, $ne: null } };
            let projection = { [questionId]: 1, _id: 0 };

            // Handle different question types
            if (question.type === 'numeric') {
                // Try numeric data first
                query[questionId] = {
                    ...query[questionId],
                    $type: "number"
                };

                // If no numeric data, try string data
                const numericCount = await this.collection.countDocuments(query);
                if (numericCount === 0) {
                    query[questionId] = {
                        ...query[questionId],
                        $type: "string",
                        $regex: /^-?\d*\.?\d+$/
                    };
                }
            } else if (question.type === 'multiSelect') {
                // For multi-select questions, we'll get the unique values and their combinations
                const pipeline = [
                    { $match: query },
                    { $unwind: `$${questionId}` },
                    { $group: { _id: `$${questionId}`, count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ];

                // Get individual value counts
                const valueCounts = await this.collection.aggregate(pipeline).toArray();

                // Get combination counts if needed
                let combinationCounts = [];
                if (question.analysis.includes('combination')) {
                    const combinationPipeline = [
                        { $match: query },
                        { $group: { _id: `$${questionId}`, count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ];
                    combinationCounts = await this.collection.aggregate(combinationPipeline).toArray();
                }

                return {
                    data: {
                        values: valueCounts.map(r => ({ value: r._id, count: r.count })),
                        combinations: combinationCounts.map(r => ({ combination: r._id, count: r.count }))
                    },
                    pagination: {
                        total: valueCounts.length,
                        page: 1,
                        limit: valueCounts.length,
                        pages: 1
                    }
                };
            }

            const total = await this.collection.countDocuments(query);
            if (total === 0) {
                return {
                    data: [],
                    pagination: {
                        total: 0,
                        page,
                        limit,
                        pages: 0
                    }
                };
            }

            const data = await this.collection.find(query, { projection })
                .skip(skip)
                .limit(limit)
                .toArray();

            let processedData;
            if (question.type === 'numeric') {
                processedData = data.map(doc => ({
                    [questionId]: typeof doc[questionId] === 'string' ? Number(doc[questionId]) : doc[questionId]
                }));
            } else {
                processedData = data;
            }

            return {
                data: processedData,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error('Error getting question data:', error);
            throw error;
        }
    }

    async getQuestionStats(questionId) {
        try {
            const question = (await this.getSurveyQuestions()).find(q => q.id === questionId);

            if (!question) {
                throw new Error('Question not found');
            }

            if (question.type === 'numeric') {
                // Try numeric data first
                let pipeline = [
                    {
                        $match: {
                            [questionId]: {
                                $exists: true,
                                $ne: null,
                                $type: "number"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            min: { $min: `$${questionId}` },
                            max: { $max: `$${questionId}` },
                            avg: { $avg: `$${questionId}` },
                            count: { $sum: 1 },
                            // Add percentiles
                            p25: { $percentile: { input: `$${questionId}`, p: 0.25 } },
                            p50: { $percentile: { input: `$${questionId}`, p: 0.50 } },
                            p75: { $percentile: { input: `$${questionId}`, p: 0.75 } },
                            // Add standard deviation
                            stdDev: { $stdDevPop: `$${questionId}` }
                        }
                    }
                ];

                let stats = await this.collection.aggregate(pipeline).toArray();

                // If no numeric data, try string data
                if (!stats.length) {
                    pipeline = [
                        {
                            $match: {
                                [questionId]: {
                                    $exists: true,
                                    $ne: null,
                                    $type: "string",
                                    $regex: /^-?\d*\.?\d+$/
                                }
                            }
                        },
                        {
                            $addFields: {
                                numericValue: { $toDouble: `$${questionId}` }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                min: { $min: "$numericValue" },
                                max: { $max: "$numericValue" },
                                avg: { $avg: "$numericValue" },
                                count: { $sum: 1 },
                                p25: { $percentile: { input: "$numericValue", p: 0.25 } },
                                p50: { $percentile: { input: "$numericValue", p: 0.50 } },
                                p75: { $percentile: { input: "$numericValue", p: 0.75 } },
                                stdDev: { $stdDevPop: "$numericValue" }
                            }
                        }
                    ];

                    stats = await this.collection.aggregate(pipeline).toArray();
                }

                const result = stats[0] || { min: 0, max: 0, avg: 0, count: 0, p25: 0, p50: 0, p75: 0, stdDev: 0 };

                // Round values
                Object.keys(result).forEach(key => {
                    if (typeof result[key] === 'number') {
                        result[key] = Math.round(result[key] * 100) / 100;
                    }
                });

                return result;
            } else if (question.type === 'categorical' || question.type === 'multiSelect') {
                // For categorical and multi-select questions, get value counts and trends
                const pipeline = [
                    { $match: { [questionId]: { $exists: true, $ne: null } } },
                    { $unwind: `$${questionId}` },
                    { $group: { _id: `$${questionId}`, count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ];

                const results = await this.collection.aggregate(pipeline).toArray();
                const total = results.reduce((sum, r) => sum + r.count, 0);

                // Calculate percentages
                const categories = results.map(r => ({
                    value: r._id,
                    count: r.count,
                    percentage: Math.round((r.count / total) * 10000) / 100
                }));

                return {
                    categories,
                    total,
                    topValues: categories.slice(0, 5),
                    bottomValues: categories.slice(-5).reverse()
                };
            }

            throw new Error('Unsupported question type');
        } catch (error) {
            console.error('Error getting question stats:', error);
            throw error;
        }
    }

    async getCorrelation(questionId1, questionId2) {
        try {
            const question1 = (await this.getSurveyQuestions()).find(q => q.id === questionId1);
            const question2 = (await this.getSurveyQuestions()).find(q => q.id === questionId2);

            if (!question1 || !question2) {
                throw new Error('One or both questions not found');
            }

            if (question1.type !== 'numeric' || question2.type !== 'numeric') {
                throw new Error('Both questions must be numeric for correlation analysis');
            }

            const pipeline = [
                {
                    $match: {
                        [questionId1]: { $exists: true, $ne: null },
                        [questionId2]: { $exists: true, $ne: null }
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        sum1: { $sum: `$${questionId1}` },
                        sum2: { $sum: `$${questionId2}` },
                        sum1Squared: { $sum: { $multiply: [`$${questionId1}`, `$${questionId1}`] } },
                        sum2Squared: { $sum: { $multiply: [`$${questionId2}`, `$${questionId2}`] } },
                        sumProduct: { $sum: { $multiply: [`$${questionId1}`, `$${questionId2}`] } }
                    }
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            if (!result.length) {
                return { correlation: 0, count: 0 };
            }

            const stats = result[0];
            const n = stats.count;
            const sum1 = stats.sum1;
            const sum2 = stats.sum2;
            const sum1Squared = stats.sum1Squared;
            const sum2Squared = stats.sum2Squared;
            const sumProduct = stats.sumProduct;

            // Calculate correlation coefficient
            const numerator = (n * sumProduct) - (sum1 * sum2);
            const denominator = Math.sqrt(
                ((n * sum1Squared) - (sum1 * sum1)) *
                ((n * sum2Squared) - (sum2 * sum2))
            );

            const correlation = denominator === 0 ? 0 : numerator / denominator;

            return {
                correlation: Math.round(correlation * 10000) / 10000,
                count: n
            };
        } catch (error) {
            console.error('Error calculating correlation:', error);
            throw error;
        }
    }

    async analyzeWageGap(country) {
        try {
            const pipeline = [
                {
                    $match: {
                        Country: country,
                        Gender: { $in: ['Man', 'Woman', 'Non-binary, genderqueer, or gender non-conforming'] }
                    }
                },
                {
                    $group: {
                        _id: {
                            gender: '$Gender',
                            experience: {
                                $switch: {
                                    branches: [
                                        { case: { $lte: ['$YearsCodePro', 3] }, then: '0-3 tahun' },
                                        { case: { $lte: ['$YearsCodePro', 6] }, then: '4-6 tahun' },
                                        { case: { $lte: ['$YearsCodePro', 9] }, then: '7-9 tahun' },
                                        { case: { $lte: ['$YearsCodePro', 14] }, then: '10-14 tahun' },
                                        { case: { $gt: ['$YearsCodePro', 14] }, then: '15+ tahun' }
                                    ],
                                    default: 'Unknown'
                                }
                            }
                        },
                        avgSalary: { $avg: '$CompTotal' }
                    }
                },
                {
                    $group: {
                        _id: '$_id.gender',
                        data: {
                            $push: {
                                experience: '$_id.experience',
                                salary: { $round: ['$avgSalary', 0] }
                            }
                        }
                    }
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            return this.formatWageGapData(result);
        } catch (error) {
            console.error('Error in analyzeWageGap:', error);
            throw error;
        }
    }

    async analyzeLanguageAdoption(ageGroup) {
        try {
            const [minAge, maxAge] = ageGroup.split('-').map(Number);
            const pipeline = [
                {
                    $match: {
                        Age: { $gte: minAge, $lte: maxAge }
                    }
                },
                {
                    $project: {
                        languages: {
                            $concatArrays: [
                                { $ifNull: ['$LanguageHaveWorkedWith', []] },
                                { $ifNull: ['$LanguageWantToWorkWith', []] }
                            ]
                        }
                    }
                },
                {
                    $unwind: '$languages'
                },
                {
                    $group: {
                        _id: '$languages',
                        currentlyUsing: {
                            $sum: {
                                $cond: [
                                    { $in: ['$languages', '$LanguageHaveWorkedWith'] },
                                    1,
                                    0
                                ]
                            }
                        },
                        wantToLearn: {
                            $sum: {
                                $cond: [
                                    { $in: ['$languages', '$LanguageWantToWorkWith'] },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    $sort: { currentlyUsing: -1 }
                },
                {
                    $limit: 8
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            return this.formatLanguageAdoptionData(result);
        } catch (error) {
            console.error('Error in analyzeLanguageAdoption:', error);
            throw error;
        }
    }

    async analyzeWorkOsCorrelation(workModel) {
        try {
            const pipeline = [
                {
                    $match: {
                        RemoteWork: workModel === 'all' ? { $exists: true } : workModel
                    }
                },
                {
                    $group: {
                        _id: {
                            workModel: '$RemoteWork',
                            os: '$OpSys'
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: '$_id.workModel',
                        osData: {
                            $push: {
                                os: '$_id.os',
                                count: '$count'
                            }
                        }
                    }
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            return this.formatWorkOsCorrelationData(result);
        } catch (error) {
            console.error('Error in analyzeWorkOsCorrelation:', error);
            throw error;
        }
    }

    async analyzeDatabaseSkills(orgSize) {
        try {
            const pipeline = [
                {
                    $match: {
                        OrgSize: orgSize
                    }
                },
                {
                    $project: {
                        databases: {
                            $concatArrays: [
                                { $ifNull: ['$DatabaseHaveWorkedWith', []] },
                                { $ifNull: ['$DatabaseWantToWorkWith', []] }
                            ]
                        }
                    }
                },
                {
                    $unwind: '$databases'
                },
                {
                    $group: {
                        _id: '$databases',
                        currentlyUsing: {
                            $sum: {
                                $cond: [
                                    { $in: ['$databases', '$DatabaseHaveWorkedWith'] },
                                    1,
                                    0
                                ]
                            }
                        },
                        wantToLearn: {
                            $sum: {
                                $cond: [
                                    { $in: ['$databases', '$DatabaseWantToWorkWith'] },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    $sort: { currentlyUsing: -1 }
                },
                {
                    $limit: 6
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            return this.formatDatabaseSkillsData(result);
        } catch (error) {
            console.error('Error in analyzeDatabaseSkills:', error);
            throw error;
        }
    }

    async analyzeEducationCompensation(aiLevel) {
        try {
            const pipeline = [
                {
                    $match: {
                        AIToolUsage: aiLevel
                    }
                },
                {
                    $group: {
                        _id: {
                            education: '$EdLevel',
                            experience: {
                                $switch: {
                                    branches: [
                                        { case: { $lte: ['$YearsCodePro', 3] }, then: '0-3 tahun exp' },
                                        { case: { $lte: ['$YearsCodePro', 6] }, then: '4-6 tahun exp' },
                                        { case: { $gt: ['$YearsCodePro', 6] }, then: '7+ tahun exp' }
                                    ],
                                    default: 'Unknown'
                                }
                            }
                        },
                        avgSalary: { $avg: '$CompTotal' }
                    }
                },
                {
                    $group: {
                        _id: '$_id.experience',
                        data: {
                            $push: {
                                education: '$_id.education',
                                salary: { $round: ['$avgSalary', 0] }
                            }
                        }
                    }
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            return this.formatEducationCompensationData(result);
        } catch (error) {
            console.error('Error in analyzeEducationCompensation:', error);
            throw error;
        }
    }

    // Helper methods for data formatting
    formatWageGapData(data) {
        const labels = ['0-3 tahun', '4-6 tahun', '7-9 tahun', '10-14 tahun', '15+ tahun'];
        const datasets = data.map(item => ({
            label: item._id,
            data: labels.map(label => {
                const found = item.data.find(d => d.experience === label);
                return found ? found.salary : 0;
            }),
            backgroundColor: this.getColorForGender(item._id),
            borderColor: this.getColorForGender(item._id, true),
            borderWidth: 1
        }));

        return { labels, datasets };
    }

    formatLanguageAdoptionData(data) {
        const labels = data.map(item => item._id);
        const datasets = [
            {
                label: 'Currently Using',
                data: data.map(item => item.currentlyUsing),
                backgroundColor: 'rgba(107, 93, 245, 0.8)',
                borderColor: 'rgba(107, 93, 245, 1)',
                borderWidth: 1
            },
            {
                label: 'Want to Learn',
                data: data.map(item => item.wantToLearn),
                backgroundColor: 'rgba(66, 185, 255, 0.8)',
                borderColor: 'rgba(66, 185, 255, 1)',
                borderWidth: 1
            }
        ];

        return { labels, datasets };
    }

    formatWorkOsCorrelationData(data) {
        const labels = ['Windows', 'macOS', 'Linux/Ubuntu', 'Linux/Debian', 'Other Linux'];
        const datasets = data.map(item => ({
            label: item._id,
            data: labels.map(label => {
                const found = item.osData.find(d => d.os === label);
                return found ? found.count : 0;
            }),
            backgroundColor: this.getColorForWorkModel(item._id),
            borderColor: this.getColorForWorkModel(item._id, true),
            borderWidth: 1
        }));

        return { labels, datasets };
    }

    formatDatabaseSkillsData(data) {
        const labels = data.map(item => item._id);
        const datasets = [
            {
                label: 'Currently Using',
                data: data.map(item => item.currentlyUsing),
                backgroundColor: 'rgba(107, 93, 245, 0.8)',
                borderColor: 'rgba(107, 93, 245, 1)',
                borderWidth: 1
            },
            {
                label: 'Want to Learn',
                data: data.map(item => item.wantToLearn),
                backgroundColor: 'rgba(66, 185, 255, 0.8)',
                borderColor: 'rgba(66, 185, 255, 1)',
                borderWidth: 1
            }
        ];

        return { labels, datasets };
    }

    formatEducationCompensationData(data) {
        const labels = ['No degree', 'Bachelor\'s', 'Master\'s', 'PhD'];
        const datasets = data.map(item => ({
            label: item._id,
            data: labels.map(label => {
                const found = item.data.find(d => d.education === label);
                return found ? found.salary : 0;
            }),
            backgroundColor: this.getColorForExperience(item._id),
            borderColor: this.getColorForExperience(item._id, true),
            borderWidth: 1
        }));

        return { labels, datasets };
    }

    getColorForGender(gender, isBorder = false) {
        const colors = {
            'Man': isBorder ? 'rgba(107, 93, 245, 1)' : 'rgba(107, 93, 245, 0.8)',
            'Woman': isBorder ? 'rgba(66, 185, 255, 1)' : 'rgba(66, 185, 255, 0.8)',
            'Non-binary, genderqueer, or gender non-conforming': isBorder ? 'rgba(252, 115, 88, 1)' : 'rgba(252, 115, 88, 0.8)'
        };
        return colors[gender] || (isBorder ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)');
    }

    getColorForWorkModel(model, isBorder = false) {
        const colors = {
            'Remote': isBorder ? 'rgba(107, 93, 245, 1)' : 'rgba(107, 93, 245, 0.8)',
            'Hybrid': isBorder ? 'rgba(66, 185, 255, 1)' : 'rgba(66, 185, 255, 0.8)',
            'In-Office': isBorder ? 'rgba(252, 115, 88, 1)' : 'rgba(252, 115, 88, 0.8)'
        };
        return colors[model] || (isBorder ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)');
    }

    getColorForExperience(experience, isBorder = false) {
        const colors = {
            '0-3 tahun exp': isBorder ? 'rgba(107, 93, 245, 1)' : 'rgba(107, 93, 245, 0.8)',
            '4-6 tahun exp': isBorder ? 'rgba(66, 185, 255, 1)' : 'rgba(66, 185, 255, 0.8)',
            '7+ tahun exp': isBorder ? 'rgba(252, 115, 88, 1)' : 'rgba(252, 115, 88, 0.8)'
        };
        return colors[experience] || (isBorder ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)');
    }

    async getFieldSchema(fieldName) {
        return this.schema.fields.find(field => field.name === fieldName);
    }

    async getRandomSample(size = 10000) {
        try {
            const cacheKey = `sample_${size}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            const pipeline = [
                { $sample: { size } }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error getting random sample:', error);
            throw error;
        }
    }

    async getFieldDistribution(field, groupBy = null) {
        try {
            const cacheKey = `distribution_${field}_${groupBy || 'none'}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            let pipeline = [
                { $sample: { size: 10000 } },
                { $match: { [field]: { $exists: true, $ne: null } } }
            ];

            // Handle array fields
            if (this.getFieldType(field) === 'array') {
                pipeline.push({ $unwind: `$${field}` });
            }

            // Add grouping
            if (groupBy) {
                pipeline.push({
                    $group: {
                        _id: {
                            value: `$${field}`,
                            group: `$${groupBy}`
                        },
                        count: { $sum: 1 }
                    }
                });
            } else {
                pipeline.push({
                    $group: {
                        _id: `$${field}`,
                        count: { $sum: 1 }
                    }
                });
            }

            pipeline.push({ $sort: { count: -1 } });

            const result = await this.collection.aggregate(pipeline).toArray();
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error getting field distribution:', error);
            throw error;
        }
    }

    async getCrossFieldAnalysis(field1, field2, aggregation = 'count') {
        try {
            const cacheKey = `cross_${field1}_${field2}_${aggregation}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            let pipeline = [
                { $sample: { size: 10000 } },
                {
                    $match: {
                        [field1]: { $exists: true, $ne: null },
                        [field2]: { $exists: true, $ne: null }
                    }
                }
            ];

            // Handle array fields
            if (this.getFieldType(field1) === 'array') {
                pipeline.push({ $unwind: `$${field1}` });
            }
            if (this.getFieldType(field2) === 'array') {
                pipeline.push({ $unwind: `$${field2}` });
            }

            // Add aggregation
            const groupStage = {
                $group: {
                    _id: {
                        field1: `$${field1}`,
                        field2: `$${field2}`
                    }
                }
            };

            if (aggregation === 'count') {
                groupStage.$group.count = { $sum: 1 };
            } else if (aggregation === 'avg' && this.getFieldType(field1) === 'number') {
                groupStage.$group.avg = { $avg: `$${field1}` };
            }

            pipeline.push(groupStage);
            pipeline.push({ $sort: { count: -1 } });

            const result = await this.collection.aggregate(pipeline).toArray();
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error in cross field analysis:', error);
            throw error;
        }
    }

    async getFieldCorrelation(field1, field2) {
        try {
            const cacheKey = `correlation_${field1}_${field2}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            const pipeline = [
                { $sample: { size: 10000 } },
                {
                    $match: {
                        [field1]: { $exists: true, $ne: null },
                        [field2]: { $exists: true, $ne: null }
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        sum1: { $sum: `$${field1}` },
                        sum2: { $sum: `$${field2}` },
                        sum1Squared: { $sum: { $multiply: [`$${field1}`, `$${field1}`] } },
                        sum2Squared: { $sum: { $multiply: [`$${field2}`, `$${field2}`] } },
                        sumProduct: { $sum: { $multiply: [`$${field1}`, `$${field2}`] } }
                    }
                }
            ];

            const result = await this.collection.aggregate(pipeline).toArray();
            if (!result.length) return { correlation: 0, count: 0 };

            const stats = result[0];
            const n = stats.count;
            const sum1 = stats.sum1;
            const sum2 = stats.sum2;
            const sum1Squared = stats.sum1Squared;
            const sum2Squared = stats.sum2Squared;
            const sumProduct = stats.sumProduct;

            const correlation = this.calculateCorrelation(n, sum1, sum2, sum1Squared, sum2Squared, sumProduct);
            const finalResult = { correlation, count: n };

            this.setCache(cacheKey, finalResult);
            return finalResult;
        } catch (error) {
            console.error('Error calculating correlation:', error);
            throw error;
        }
    }

    calculateCorrelation(n, sum1, sum2, sum1Squared, sum2Squared, sumProduct) {
        const numerator = (n * sumProduct) - (sum1 * sum2);
        const denominator = Math.sqrt(
            ((n * sum1Squared) - (sum1 * sum1)) *
            ((n * sum2Squared) - (sum2 * sum2))
        );
        return denominator === 0 ? 0 : numerator / denominator;
    }

    async getFieldTrends(field, timeField = 'YearsCodePro') {
        try {
            const cacheKey = `trends_${field}_${timeField}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            let pipeline = [
                { $sample: { size: 10000 } },
                {
                    $match: {
                        [field]: { $exists: true, $ne: null },
                        [timeField]: { $exists: true, $ne: null }
                    }
                }
            ];

            if (this.getFieldType(field) === 'array') {
                pipeline.push({ $unwind: `$${field}` });
            }

            pipeline.push({
                $group: {
                    _id: {
                        time: `$${timeField}`,
                        value: `$${field}`
                    },
                    count: { $sum: 1 }
                }
            });

            pipeline.push({
                $group: {
                    _id: '$_id.time',
                    values: {
                        $push: {
                            value: '$_id.value',
                            count: '$count'
                        }
                    },
                    total: { $sum: '$count' }
                }
            });

            pipeline.push({ $sort: { '_id': 1 } });

            const result = await this.collection.aggregate(pipeline).toArray();
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error getting field trends:', error);
            throw error;
        }
    }

    async getFieldCombinations(fields) {
        try {
            const cacheKey = `combinations_${fields.join('_')}`;
            const cached = await this.getFromCache(cacheKey);
            if (cached) return cached;

            let pipeline = [
                { $sample: { size: 10000 } },
                {
                    $match: fields.reduce((match, field) => ({
                        ...match,
                        [field]: { $exists: true, $ne: null }
                    }), {})
                }
            ];

            // Handle array fields
            fields.forEach(field => {
                if (this.getFieldType(field) === 'array') {
                    pipeline.push({ $unwind: `$${field}` });
                }
            });

            pipeline.push({
                $group: {
                    _id: fields.reduce((id, field) => ({
                        ...id,
                        [field]: `$${field}`
                    }), {}),
                    count: { $sum: 1 }
                }
            });

            pipeline.push({ $sort: { count: -1 } });

            const result = await this.collection.aggregate(pipeline).toArray();
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error getting field combinations:', error);
            throw error;
        }
    }
}

module.exports = new SurveyModel();