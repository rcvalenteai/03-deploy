class Chart {
    /**
     * initialize the Chart creator
     * @param chartType String specifying the chartType. Ex: 'bar'
     */
    constructor(chartType) {
        this.chartType = chartType;
    }

    /**
     * draw the chart on the given image area
     * @param image An SVG html element to draw the graph inside
     * @param randomValues list of 10 random numbers from 0-1. Ex: [0.35, 0.42, 0.78 ... 0.81]
     * @param randomIndices list of 2 numbers from 0-9. Ex: [3, 7]
     */
    display(image, randomValues, randomIndices) {
        console.log("Chart display not overridden")
    }

    /**
     * clear the drawn elements, override this function if needed
     * but this should clear everything in the svg element
     * @param image An SVG html element to draw the graph inside
     */
    clear(image) {
        image.selectAll("*").remove();
    }
}