const reasons = [
    {
        "name": "Debt-to-income ratio",
        "conventional hl": 34.4,
        "conventional no hl": 32.0,
        "fha hl": 38.3,
        "fha no hl": 34.1
    },
    {
        "name": "Collateral",
        "conventional hl": 17.3,
        "conventional no hl": 19.0,
        "fha hl": 13.1,
        "fha no hl": 14.9
    },
    {
        "name": "Other",
        "conventional hl": 12.0,
        "conventional no hl": 10.1,
        "fha hl": 11.7,
        "fha no hl": 8.9
    },
    {
        "name": "Credit history",
        "conventional hl": 11.9,
        "conventional no hl": 10.3,
        "fha hl": 10.8,
        "fha no hl": 17.8
    },
    {
        "name": "Credit application incomplete",
        "conventional hl":  9.9,
        "conventional no hl": 14.1,
        "fha hl": 9.3,
        "fha no hl": 8.6
    },
    {
        "name": "Unverifiable information",
        "conventional hl":  5.9,
        "conventional no hl": 5.4,
        "fha hl": 5.8,
        "fha no hl": 4.7
    },
    {
        "name": "Insufficient cash",
        "conventional hl":  5.7,
        "conventional no hl": 6.3,
        "fha hl": 5.8,
        "fha no hl": 6.0
    },
    {
        "name": "Employment history",
        "conventional hl":  2.6,
        "conventional no hl": 2.6,
        "fha hl": 5.0,
        "fha no hl": 4.7
    },
    {
        "name": "Mortgage insurance denied",
        "conventional hl":  0.2,
        "conventional no hl": 0.1,
        "fha hl": 0.2,
        "fha no hl": 0.2
    }
];

const color = d3.scaleSequential([0, 40], d3.interpolateReds);
const cols = ["conventional hl", "conventional no hl", "fha hl", "fha no hl"];

const windowWidth = window.innerWidth;
const threshold = 500;
const rectWidth = 70;
const gapRect = 2;

const width = windowWidth < threshold ? windowWidth * 0.9 : windowWidth * 0.4;
const height = windowWidth < threshold ? width * 0.8 : width * 0.7;

const margin = {
    left: windowWidth < threshold ? 30 : 80,
    right: windowWidth < threshold ? 80 : 170,
    top: 60,
    bottom: windowWidth < threshold ? 20 : 70
};

const svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);

const yVars = reasons.map(d => d.name);

const leftPadding = 160;

const yScale = d3.scaleBand()
    .padding(0.1)
    .range([height - margin.bottom, margin.top])
    .domain(yVars.reverse());

svg.selectAll(".reason-title")
    .data(['Conventional', 'FHA'])
    .join("text")
        .attr("class", "reason-title")
        .attr("stroke", 'none')
        .style("text-anchor", 'middle')
        .style("fill", 'black')
        .text(d => d)
        .attr("x", (d,i) => margin.left + leftPadding + i * (2*rectWidth + gapRect) + rectWidth)
        .attr("y", yScale.bandwidth() - 6);

svg.selectAll(".reason-subtitle")
    .data(['H/L', 'Not H/L', 'H/L', 'Not H/L'])
    .join("text")
        .attr("class", "reason-subtitle")
        .attr("stroke", 'none')
        .style("text-anchor", 'middle')
        .style("fill", 'black')
        .text(d => d)
        .attr("x", (d,i) => margin.left + leftPadding + i * (rectWidth + gapRect) + rectWidth / 2)
        .attr("y", yScale.bandwidth() * 2 - 8);

const gReasons = svg.selectAll(".reason")
    .data(reasons)
    .join("g")
        .attr("class", "reason")
        .attr("transform", d => `translate(0,${yScale(d.name)})`);

gReasons.selectAll(".reason-name")
    .data(d => [d])
    .join("text")
        .attr("class", 'reason-name')
        .attr("y", 6)
        .text(d => d.name)

gReasons.selectAll(".reason-rect")
    .data(d => cols.map(col => d[col]))
    .join("rect")
        .attr("class", 'reason-rect')
        .attr("fill", d => color(d))
        .attr("x", (d,i) => margin.left + leftPadding + i * (rectWidth + gapRect))
        .attr("y", - yScale.bandwidth() / 2)
        .attr("width", rectWidth)
        .attr("height", yScale.bandwidth());

gReasons.selectAll(".reason-value")
    .data(d => cols.map(col => d[col]))
    .join("text")
        .attr("class", 'reason-value')
        .attr("stroke", 'none')
        .style("text-anchor", 'middle')
        .style("fill", d => d > 20 ? 'white' : 'black')
        .text(d => d + '%')
        .attr("x", (d,i) => margin.left + leftPadding + i * (rectWidth + gapRect) + rectWidth / 2)
        .attr("y", yScale.bandwidth() / 4);

function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height;
        
    d3.select("body").style("height", sh + "px");

    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

updateHeight();