const reasons = [
    {
        "name": "Debt-to-income ratio",
        "conventional hl": 34.4,
        "conventional no hl": 31.1,
        "fha hl": 38.3,
        "fha no hl": 34.1
    },
    {
        "name": "Collateral",
        "conventional hl": 17.3,
        "conventional no hl": 19.7,
        "fha hl": 13.1,
        "fha no hl": 14.9
    },
    {
        "name": "Credit application incomplete",
        "conventional hl":  9.9,
        "conventional no hl": 14.2,
        "fha hl": 9.3,
        "fha no hl": 8.6
    },
    {
        "name": "Credit history",
        "conventional hl": 11.9,
        "conventional no hl": 10.5,
        "fha hl": 10.8,
        "fha no hl": 17.8
    },
    {
        "name": "Other",
        "conventional hl": 12.0,
        "conventional no hl": 10.3,
        "fha hl": 11.7,
        "fha no hl": 8.9
    },
    {
        "name": "Insufficient cash",
        "conventional hl":  5.7,
        "conventional no hl": 6.0,
        "fha hl": 5.8,
        "fha no hl": 6.0
    },
    {
        "name": "Unverifiable information",
        "conventional hl":  5.9,
        "conventional no hl": 5.2,
        "fha hl": 5.8,
        "fha no hl": 4.7
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
const colorW = d3.interpolate("#FFF", "#ff9912");
const colorHL = d3.interpolate("#FFF", "#4682b4");
const cols = ["conventional no hl", "conventional hl"];

const windowWidth = window.innerWidth;
const threshold = 500;
const rectWidth = windowWidth < threshold ? 60 : 70;
const gapRect = 4;

const width = windowWidth < threshold ? windowWidth * 0.9 : windowWidth * 0.8;
const height = windowWidth < threshold ? width * 0.8 : width * 0.6;

const margin = {
    left: windowWidth < threshold ? 30 : 80,
    right: windowWidth < threshold ? 80 : 170,
    top: windowWidth < threshold ? 60 : 80,
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

// svg.selectAll(".reason-title")
//     .data(['Conventional', 'FHA'])
//     .join("text")
//         .attr("class", "reason-title")
//         .attr("stroke", 'none')
//         .style("text-anchor", 'middle')
//         .style("fill", 'black')
//         .style('font-weight', 600)
//         .text(d => d)
//         .attr("x", (d,i) => margin.left + leftPadding + i * (2*rectWidth + gapRect) + rectWidth)
//         .attr("y", yScale.bandwidth() - 6);

svg.selectAll(".reason-subtitle")
    .data(['White', 'H/L'])
    .join("text")
        .attr("class", "reason-subtitle")
        .attr("stroke", 'none')
        .style("text-anchor", 'middle')
        .style("fill", 'black')
        .style('font-weight', 600)
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
        .style("font-size", windowWidth < threshold ? 12 : 14)
        .text(d => d.name)

gReasons.selectAll(".reason-rect")
    .data(d => cols.map(col => {
        return {
            'value': d[col],
            'color': col === "conventional no hl" ? colorW(d[col]/40) : colorHL(d[col]/40)
        }
    }))
    .join("rect")
        .attr("class", 'reason-rect')
        .attr("fill", d => d.color)
        .attr("x", (d,i) => margin.left + leftPadding + i * (rectWidth + gapRect))
        .attr("y", - yScale.bandwidth() / 2)
        // .style("stroke", "black")
        .attr("width", rectWidth)
        .attr("height", yScale.bandwidth());

gReasons.selectAll(".reason-value")
    .data(d => {
        const values = cols.map(col => d[col]);
        const maxVal = d3.max(values);

        return values.map(val => {
            return {
                'value': val,
                'max': val === maxVal
            }
        })
    })
    .join("text")
        .attr("class", 'reason-value')
        .attr("stroke", 'none')
        .style("text-anchor", 'middle')
        .style("fill", d => d.value > 20 ? 'white' : 'black')
        .style('font-size', 12)
        .style('font-weight', d => d.max === true ? 700 : 400)
        .text(d => d.value.toFixed(1) + '%')
        .attr("x", (d,i) => margin.left + leftPadding + i * (rectWidth + gapRect) + rectWidth / 2)
        .attr("y", 5);

function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height;
        
    d3.select("body").style("height", sh + "px");

    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

updateHeight();