var width = 960,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .domain(["England", "Scotland", "Wales", "N. Ireland", "Ireland", "Other"])
    .range(["#FE0000", "#0073C5", "#00AB39", "#ffffff", "#FF7900", "#ccc"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 50);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.tweets; });

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data/tweetRegionProportions.json", loadData);

function loadData(error, data) {
    if (!error) {
        generateVizPiechart(data);
    }
}

function generateVizPiechart(data) {
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data.region); 
        });

    g.append("text")
        .attr("transform", function(d) { 
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { 
            return d.data.region; 
        });
}