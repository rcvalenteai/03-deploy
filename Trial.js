class Trial {
    /**
     * create a trial containing random values to be displayed and indices to be compared.
     * @param {Chart} chart Chart condition name. Ex: bar
     */
    constructor(chart) {
        this.chart = chart;
        this.randomValues = this.generateRandomValues();
        this.testIndices = this.generateRandomIndices();
        this.realPercentage = this.calculateRealPercentage();
        this.guessedPercentage = 0;
    }

    /**
     * generates 10 random values between 0-1
     * @returns {[Number]}
     */
    generateRandomValues() {
        let values = [];
        for(let i = 0; i < 10; i++) {
            values.push(Number(((Math.random() * 0.9) + 0.1)).toPrecision(2));
        }
        return values;
    }

    /**
     * generates 2 random indices between 0-9
     * @returns {[Number]}
     */
    generateRandomIndices() {
        let indices = [];
        let index = Math.floor(Math.random() * Math.floor(10));
        for(let i = 0; i < 2; i++) {
            if (i === 0) {
                indices.push(index);
            }
            else {
                while (index === indices[0]) {
                    index = Math.floor(Math.random() * Math.floor(10))
                }
                indices.push(index)
            }
        }
        return indices
    }

    /**
     * calculates the percentage the smaller value is of the larger. Ex: (.4, .8) = .5
     * @returns {Number}
     */
    calculateRealPercentage() {
        let val1 = this.randomValues[this.testIndices[0]];
        let val2 = this.randomValues[this.testIndices[1]];
        let realVal = Number((val1 / val2).toPrecision(2) * 100);
        if (val1 > val2) {
            realVal = Number((val2/val1).toPrecision(2) * 100);
        }
        return realVal;
    }

    /**
     * displays the chart in the given html location
     * @param image d3 selected location to add svg
     */
    display(image) {
        this.chart.display(image, this.randomValues, this.testIndices);
    }
}