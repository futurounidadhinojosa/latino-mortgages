const counties = [
    {
        "name": "Gloucester County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 5.3
            },
            {
                'category': 'white', 
                'value': 3.6,
            },
            {
                'category': 'hl',
                'value': 11.7
            }
        ]
    },
    {
        "name": "Burlington County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 5.7
            },
            {
                'category': 'white', 
                'value': 3.9,
            },
            {
                'category': 'hl',
                'value': 11.1
            }
        ]
    },
    {
        "name": "Essex County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 8.7
            },
            {
                'category': 'white', 
                'value': 4.8,
            },
            {
                'category': 'hl',
                'value': 12.9
            }
        ]
    },
    {
        "name": "Somerset County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 6.4
            },
            {
                'category': 'white', 
                'value': 4.5,
            },
            {
                'category': 'hl',
                'value': 9.4
            }
        ]
    },
    {
        "name": "Union County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 7.9
            },
            {
                'category': 'white', 
                'value': 4.8,
            },
            {
                'category': 'hl',
                'value': 10.6
            }
        ]
    },
    {
        "name": "Passaic County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 8.2
            },
            {
                'category': 'white', 
                'value': 6.0,
            },
            {
                'category': 'hl',
                'value': 10.3
            }
        ]
    },
    {
        "name": "Mercer County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 7.7
            },
            {
                'category': 'white', 
                'value': 4.7,
            },
            {
                'category': 'hl',
                'value': 12.2
            }
        ]
    },
    {
        "name": "Ocean County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 6.5
            },
            {
                'category': 'white', 
                'value': 5.9,
            },
            {
                'category': 'hl',
                'value': 9.4
            }
        ]
    },
    {
        "name": "Middlesex County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 8.4
            },
            {
                'category': 'white', 
                'value': 5.9,
            },
            {
                'category': 'hl',
                'value': 9.8
            }
        ]
    },
    {
        "name": "Monmouth County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 6.7
            },
            {
                'category': 'white', 
                'value': 5.8,
            },
            {
                'category': 'hl',
                'value': 8.6
            }
        ]
    },
    {
        "name": "Camden County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 5.9
            },
            {
                'category': 'white', 
                'value': 3.8,
            },
            {
                'category': 'hl',
                'value': 8.8
            }
        ]
    },
    {
        "name": "Bergen County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 7.9
            },
            {
                'category': 'white', 
                'value': 6.0,
            },
            {
                'category': 'hl',
                'value': 9.3
            }
        ]
    },
    {
        "name": "Morris County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 5.9
            },
            {
                'category': 'white', 
                'value': 4.7,
            },
            {
                'category': 'hl',
                'value': 8.4
            }
        ]
    },
    {
        "name": "Sussex County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 7.5
            },
            {
                'category': 'white', 
                'value': 6.4,
            },
            {
                'category': 'hl',
                'value': 9.9
            }
        ]
    },
    {
        "name": "Hunterdon County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 6.1
            },
            {
                'category': 'white', 
                'value': 5.4,
            },
            {
                'category': 'hl',
                'value': 7.5
            }
        ]
    },
    {
        "name": "Atlantic County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 8.3
            },
            {
                'category': 'white', 
                'value': 6.3,
            },
            {
                'category': 'hl',
                'value': 11.4
            }
        ]
    },
    {
        "name": "Hudson County",
        'denial_rates': [
            {
                'category': 'overall',
                'value': 9.7
            },
            {
                'category': 'white', 
                'value': 7.6,
            },
            {
                'category': 'hl',
                'value': 12.0
            }
        ]
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
const height = windowWidth < threshold ? width * 0.8 : width * 0.7;

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

const xMax = d3.max(counties, d => d3.max(d.denial_rates, dr => dr.value));
const xMin = d3.min(counties, d => d3.min(d.denial_rates, dr => dr.value));
const yVars = counties.map(d => d.name);

const leftPadding = 80;

const yScale = d3.scaleBand()
    .padding(0.1)
    .range([height - margin.bottom, margin.top])
    .domain(yVars.reverse());

const xScale = d3.scaleLinear()
    .range([margin.left + leftPadding, width - margin.right])
    .domain([xMin, xMax]);

xAxis.call(d3.axisBottom(xScale).ticks(3).tickFormat(d => d + '%'));
// yAxis.call(d3.axisLeft(yScale))  
xAxis.selectAll(".domain").remove();
xAxis.selectAll(".tick line").attr("y2", -height + margin.top).attr("stroke", 'lightgray');

const gCounty = svg.selectAll(".county")
    .data(counties)
    .join("g")
        .attr("class", "county")
        .attr("transform", d => `translate(0,${yScale(d.name)})`);

gCounty.selectAll(".county-name")
    .data(d => [d.name])
    .join("text")
        .attr("class", 'county-name')
        .attr("y", 6)
        .text(d => d);

gCounty.selectAll(".county-line")
    .data(d => [[d3.min(d.denial_rates, dr => dr.value), d3.max(d.denial_rates, dr => dr.value)]])
    .join("line")
        .attr("class", "county-line")
        .attr("x1", d => xScale(d[0]))
        .attr('x2', d => xScale(d[1]))
        .attr('y1', 0)
        .attr('y2', 0)
        .attr("stroke", 'lightgray');

gCounty.selectAll(".county-rate")
    .data(d => d.denial_rates)
    .join("circle")
        .attr("class", "county-rate")
        .attr("cx", d => xScale(d.value))
        .attr('cy', 0)
        .attr('r', 5)
        .attr("fill", d => d.category === 'white' ? 'orange' : d.category === 'hl' ? 'steelblue' : 'lightgray');

var pymChild = new pym.Child({});
updateHeight();
