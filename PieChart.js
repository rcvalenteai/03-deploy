class PieChart extends Chart {
    constructor() {
        super("pie");
    }

    display(image, randomValues, randomIndices) {
        var labels;
        var Apos = Math.ceil(Math.random()*9);
        var Bpos = Math.ceil(Math.random()*9);
        while(Apos==Bpos){
            Bpos = Math.ceil(Math.random()*9);
        }
        labels = ['', '', '', '', '', '', '', '', '', ''];
        labels[Apos]=".";
        labels[Bpos]=".";
        
        var width = 300,
            height = 300,
            radius = Math.min(width, height) / 2;

        var pie = d3.pie().sort(null)
        .value(function(d) { return d; })(randomValues);

        var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

        var dotArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

        var g = image.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("fill", "#ffffff")
        .attr("class", "arc")
        .attr("transform", "translate(" + width/2 + "," + height/2 +")");

        g.append("path")
            .attr("d", arc)
            .attr("stroke", "#000000")

        var pos = d3.arc()
        .innerRadius(radius-19)
        .outerRadius(radius-19);

        g.append("text")
            .attr("transform", function(d) { return "translate(" + pos.centroid(d) + ")"; })
            .attr('dy', 5)
            .attr("text-anchor", "middle")
            .attr("fill", "#000000")
            .attr("font-size", "20px")
            .text(function(d, i) { return labels[i]; })
    }
}
