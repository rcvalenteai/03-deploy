class BarChart extends Chart {
    constructor() {
        super("bar");
    }

    display(image, randomValues, randomIndices) {
        image.selectAll("rect")
            .data(randomValues)
            .enter().append("rect")
            .attr("height", function(d) {return (d * 400)})
            .attr("width","40")
            .attr("x", function(d, i) {return (i * 60) + 25})
            .attr("y", function(d, i) {return 400 - (d * 400)});

        let c1Offset = randomIndices[0] * 60;
        let circle = image.append("circle")
            .attr("cx", 43 + c1Offset)
            .attr("cy", 425)
            .attr("r", 10);

        let c2Offset = randomIndices[1] * 60;
        let circle2 = image.append("circle")
            .attr("cx", 43 + c2Offset)
            .attr("cy", 425)
            .attr("r", 10);
    }
}
