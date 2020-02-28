class Experiment {
    constructor(charts, trailsPerChart, image) {
        this.charts = charts;
        this.trialsPerChart = trailsPerChart;
        this.image = image;

        this.trialCount = 0;
        this.trials = [];
        this.trials = this.generateTrials();

        this.timestamp = Date.now();
        this.startTrial();
    }


    generateTrials() {
        var trials = [];
        let numCharts = this.charts.length;
        let chartCounters = [];
        for (const chart in charts) {
            chartCounters.push(this.trialsPerChart)
        }
        while(this.sumTrials(chartCounters) !== 0) {
            let chartIndex = Math.floor(Math.random() * Math.floor(numCharts));
            if (chartCounters[chartIndex] !== 0) {
                trials.push(new Trial(this.charts[chartIndex]));
                chartCounters[chartIndex] -= 1;
            }
        }
        return trials;
    }

    startTrial() {
        this.trials[this.trialCount].display(this.image);
    }

    endTrial(guess) {
        if (this.trialCount < (this.charts.length * this.trialsPerChart) - 1) {
            this.submitGuess(guess);
            this.trials[this.trialCount].chart.clear(this.image);
            this.trialCount += 1;
            this.startTrial()
        }
        else if (this.trialCount === (this.charts.length * this.trialsPerChart) - 1){
            this.submitGuess(guess);
            this.trials[this.trialCount].chart.clear(this.image);
            this.endExperiment();
        }
    }

    endExperiment() {
        // send experiment results to MongoDB
        console.log("Finished Experiments");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        // myHeaders.append("Access-Control-Allow-Headers", "Authorization");

        var raw = JSON.stringify(experiment);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://2mmpk9xi98.execute-api.us-east-1.amazonaws.com/prod/multiply?a=5&b=5", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.thankYouMessage()
    }

    thankYouMessage() {
        this.image.append("text")
            .text("Thank you for completing the Experiment")
            .attr("x", 200)
            .attr("y", 200)
    }

    submitGuess(guess) {
        this.trials[this.trialCount].guessedPercentage = Number(guess);
    }

    sumTrials(chartCounters) {
        let sum = 0;
        for(let i = 0;i < chartCounters.length; i++) {
            sum += chartCounters[i];
        }
        return sum;
    }

}