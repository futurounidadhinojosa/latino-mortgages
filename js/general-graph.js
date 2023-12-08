const raceths = [
  {
    'name': 'Hispanic/Latino',
    'value': 11,
    'color': '#f28500',
    'letters': ["S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i"]
  },
  {
    'name': 'Overall',
    'value': 8,
    'color': '#aaa',
    'letters': ["l", "q", "r", "s", "T", "u", "A", "B"]
  },
  {
    'name': 'White',
    'value': 6,
    'color': '#5e0B15',
    'letters': ["L", "Q", "R", "V", "c", "C"]
  }
];

const lineHeight = 24;

const windowWidth = window.innerWidth;
const threshold = 500;

const width = windowWidth < threshold ? windowWidth * 1.0 : windowWidth * 0.8;
const height = windowWidth < threshold ? width * 0.4 : width * 0.3;

const margin = {
    left: windowWidth < threshold ? 60 : 80,
    right: windowWidth < threshold ? 80 : 170,
    top: 20,
    bottom: windowWidth < threshold ? 40 : 70
};

function createBarChart(divId, field, percent=false) {
  const svg = d3.select("#" + divId).append("svg")
      .attr("width", width)
      .attr("height", height);

  const xAxis = svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")");

  // const xLabel = xAxis.append("g")
  //     .append("text")
  //     .attr("class", "x axis-title")
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "10px")
  //     .attr("fill", "black")
  //     .attr("transform", `translate(${(width - margin.right) / 2}, 25)`);

  const yVars = raceths.map(d => d.name);

  const leftPadding = 60;

  const yScale = d3.scaleBand()
      .padding(0.1)
      .range([height - margin.bottom, margin.top])
      .domain(yVars.reverse());

  const xScale = d3.scaleLinear()
      .range([margin.left + leftPadding, width - margin.right])
      .domain([0, percent === true ? 15 : d3.max(raceths, d => d[field])]);

  xAxis.call(d3.axisBottom(xScale).ticks(3).tickFormat(d => percent === true ? d + '%' : d));
  // yAxis.call(d3.axisLeft(yScale))  
  xAxis.selectAll(".domain").remove();
  // xAxis.selectAll(".tick line").attr("y2", -height + margin.top).attr("stroke", 'lightgray');

  // svg.selectAll(".title")
  //     .data(['Denial rates'])
  //     .join('text')
  //         .attr("class", 'title')
  //         .attr('x', 0)
  //         .attr('y', 16)
  //         .style("font-weight", 600)
  //         .style("font-size", 18)
  //         .text(d => d)

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
      .join("rect")
          .attr("class", "raceth-rate")
          .attr("x", margin.left + leftPadding)
          .attr("y", - yScale.bandwidth() / 2)
          .attr("width", d => xScale(d[field]) - margin.left - leftPadding)
          .attr("height", yScale.bandwidth())
          // .attr("cx", d => xScale(d.value))
          // .attr('cy', 0)
          // .attr('r', 5)
          .attr("fill", d => d.color);

  gRaceth.selectAll(".raceth-value-text")
      .data(d => [d])
      .join("text")
          .attr("class", "raceth-value-text")
          .attr("x", d => xScale(d[field]) + 6)
          .attr('y', 6)
          .attr("fill", d => d.color)
          .style("font-size", 14)
          .text(d => percent === true ? d[field] + '%' : d[field])
}

function updateHeight() {
    const vh = d3.select("#viz").node().getBoundingClientRect().height,
      th = d3.select("#title").node().getBoundingClientRect().height,
      sth = d3.select("#subtitle").node().getBoundingClientRect().height
      sh = d3.select("#source").node().getBoundingClientRect().height;
    d3.select("body").style("height", (vh + th + sth + sh + 40) + "px");
    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

createBarChart("denied-applications", 'value', percent=true);
updateHeight();
