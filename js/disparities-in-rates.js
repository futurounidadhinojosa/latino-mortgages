const raceths = [
    {
        "name": "Hispanic/Latino",
        'value': 0.42,
        'color': 'orange'
    },
    {
        "name": "Black",
        'value': 0.41,
        'color': 'steelblue'
    },
    {
        "name": "Native",
        'value': 0.30,
        'color': 'green'
    },
    {
        "name": "White",
        'value': 0.20,
        'color': 'red'
    },
    {
        "name": "Missing",
        'value': 0.18,
        'color': 'lightgray'
    },
    {
        "name": "Asian",
        'value': 0.08,
        'color': 'pink'
    }
]


function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height;
        
    d3.select("body").style("height", sh + "px");

    pymChild.sendHeight();
  }

const windowWidth = window.innerWidth;
const threshold = 500;

const width = windowWidth < threshold ? windowWidth * 0.9 : windowWidth * 0.4;
const height = windowWidth < threshold ? width * 0.8 : width * 0.4;

const margin = {
    left: windowWidth < threshold ? 30 : 80,
    right: windowWidth < threshold ? 80 : 170,
    top: 10,
    bottom: windowWidth < threshold ? 20 : 70
};

const svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);

const xAxis = svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")");

const xLabel = xAxis.append("g")
    .append("text")
    .attr("class", "x axis-title")
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .attr("fill", "black")
    .attr("transform", `translate(${(width - margin.right) / 2}, 25)`);

const yVars = raceths.map(d => d.name);

const leftPadding = 60;

const yScale = d3.scaleBand()
    .padding(0.1)
    .range([height - margin.bottom, margin.top])
    .domain(yVars.reverse());

const xScale = d3.scaleLinear()
    .range([margin.left + leftPadding, width - margin.right])
    .domain(d3.extent(raceths, d => d.value));

xAxis.call(d3.axisBottom(xScale).ticks(3));
// yAxis.call(d3.axisLeft(yScale))  
xAxis.selectAll(".domain").remove();
xAxis.selectAll(".tick line").attr("y2", -height + margin.top).attr("stroke", 'lightgray');

const gRaceth = svg.selectAll(".raceth")
    .data(raceths)
    .join("g")
        .attr("class", "raceth")
        .attr("transform", d => `translate(0,${yScale(d.name)})`);

gRaceth.selectAll(".raceth-name")
    .data(d => [d])
    .join("text")
        .attr("class", 'raceth-name')
        .attr("y", 6)
        .attr("fill", d => d.color)
        .text(d => d.name);

gRaceth.selectAll(".raceth-rate")
    .data(d => [d])
    .join("circle")
        .attr("class", "raceth-rate")
        .attr("cx", d => xScale(d.value))
        .attr('cy', 0)
        .attr('r', 5)
        .attr("fill", d => d.color);

gRaceth.selectAll(".raceth-value-text")
    .data(d => [d])
    .join("text")
        .attr("class", "raceth-value-text")
        .attr("x", d => xScale(d.value) + 10)
        .attr('y', 6)
        .attr("fill", d => d.color)
        .text(d => d.value)

var pymChild = new pym.Child({});
updateHeight();
