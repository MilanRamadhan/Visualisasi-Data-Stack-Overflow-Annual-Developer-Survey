// Visualization handler
class VisualizationHandler {
    constructor() {
        this.charts = new Map();
        this.initializeCharts();
    }

    async initializeCharts() {
        // Initialize chart containers
        this.createChartContainer('distribution-chart', 'Distribution Analysis');
        this.createChartContainer('correlation-chart', 'Correlation Analysis');
        this.createChartContainer('trends-chart', 'Trend Analysis');
        this.createChartContainer('combinations-chart', 'Combination Analysis');
        this.createChartContainer('cross-analysis-chart', 'Cross Field Analysis');
    }

    createChartContainer(id, title) {
        const container = document.createElement('div');
        container.id = id;
        container.className = 'chart-container';
        container.innerHTML = `
            <h3>${title}</h3>
            <div class="chart-controls"></div>
            <div class="chart-content"></div>
        `;
        document.getElementById('visualization-container').appendChild(container);
    }

    async loadFieldDistribution(field, groupBy = null) {
        try {
            const url = `/api/visualization/distribution?field=${field}${groupBy ? `&groupBy=${groupBy}` : ''}`;
            const response = await fetch(url);
            const data = await response.json();
            this.renderDistributionChart('distribution-chart', data, field, groupBy);
        } catch (error) {
            console.error('Error loading distribution:', error);
        }
    }

    async loadFieldCorrelation(field1, field2) {
        try {
            const url = `/api/visualization/correlation?field1=${field1}&field2=${field2}`;
            const response = await fetch(url);
            const data = await response.json();
            this.renderCorrelationChart('correlation-chart', data, field1, field2);
        } catch (error) {
            console.error('Error loading correlation:', error);
        }
    }

    async loadFieldTrends(field, timeField = 'YearsCodePro') {
        try {
            const url = `/api/visualization/trends?field=${field}&timeField=${timeField}`;
            const response = await fetch(url);
            const data = await response.json();
            this.renderTrendsChart('trends-chart', data, field, timeField);
        } catch (error) {
            console.error('Error loading trends:', error);
        }
    }

    async loadFieldCombinations(fields) {
        try {
            const url = `/api/visualization/combinations?fields=${fields.join(',')}`;
            const response = await fetch(url);
            const data = await response.json();
            this.renderCombinationsChart('combinations-chart', data, fields);
        } catch (error) {
            console.error('Error loading combinations:', error);
        }
    }

    async loadCrossFieldAnalysis(field1, field2, aggregation = 'count') {
        try {
            const url = `/api/visualization/cross-analysis?field1=${field1}&field2=${field2}&aggregation=${aggregation}`;
            const response = await fetch(url);
            const data = await response.json();
            this.renderCrossAnalysisChart('cross-analysis-chart', data, field1, field2, aggregation);
        } catch (error) {
            console.error('Error loading cross analysis:', error);
        }
    }

    renderDistributionChart(containerId, data, field, groupBy) {
        const container = document.querySelector(`#${containerId} .chart-content`);
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: { values: data },
            mark: 'bar',
            encoding: {
                x: { field: '_id', type: 'nominal', title: field },
                y: { field: 'count', type: 'quantitative', title: 'Count' },
                color: groupBy ? { field: '_id.group', type: 'nominal' } : undefined
            }
        };
        vegaEmbed(container, spec);
    }

    renderCorrelationChart(containerId, data, field1, field2) {
        const container = document.querySelector(`#${containerId} .chart-content`);
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: { values: data },
            mark: 'point',
            encoding: {
                x: { field: field1, type: 'quantitative' },
                y: { field: field2, type: 'quantitative' }
            }
        };
        vegaEmbed(container, spec);
    }

    renderTrendsChart(containerId, data, field, timeField) {
        const container = document.querySelector(`#${containerId} .chart-content`);
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: { values: data },
            mark: 'line',
            encoding: {
                x: { field: '_id', type: 'temporal' },
                y: { field: 'count', type: 'quantitative' },
                color: { field: 'value', type: 'nominal' }
            }
        };
        vegaEmbed(container, spec);
    }

    renderCombinationsChart(containerId, data, fields) {
        const container = document.querySelector(`#${containerId} .chart-content`);
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: { values: data },
            mark: 'rect',
            encoding: {
                x: { field: fields[0], type: 'nominal' },
                y: { field: fields[1], type: 'nominal' },
                color: { field: 'count', type: 'quantitative' }
            }
        };
        vegaEmbed(container, spec);
    }

    renderCrossAnalysisChart(containerId, data, field1, field2, aggregation) {
        const container = document.querySelector(`#${containerId} .chart-content`);
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: { values: data },
            mark: 'bar',
            encoding: {
                x: { field: '_id.field1', type: 'nominal' },
                y: { field: aggregation === 'count' ? 'count' : 'avg', type: 'quantitative' },
                color: { field: '_id.field2', type: 'nominal' }
            }
        };
        vegaEmbed(container, spec);
    }
}

// Initialize visualization handler when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.visualizationHandler = new VisualizationHandler();
});