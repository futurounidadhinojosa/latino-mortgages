const raceths = [
  {
    'name': 'latino',
    'value': 11,
    'color': '#4682b4',
    'letters': ["S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i"]
  },
  {
    'name': 'overall',
    'value': 8,
    'color': 'lightgray',
    'letters': ["l", "q", "r", "s", "T", "u", "A", "B"]
  },
  {
    'name': 'white',
    'value': 6,
    'color': '#ff9912',
    'letters': ["L", "Q", "R", "V", "c", "C"]
  }
];

const lineHeight = 24;

function arrestedPeople(div, colorCategory) {
  
    const peopleDiv = d3.select(`#${div}`);

    const gPeople = peopleDiv.selectAll('.people-group')
      .data(raceths)
      .join("g")
        .attr("class", 'people-group')
        .attr("transform", (d,i) => `translate(0, ${i * lineHeight})`)
        .style('color', d => d.color);

    gPeople.selectAll(".people-name")
      .data(d => [d])
      .join("span")
        .attr("class", "people-name")
        .html(d => d.name === 'latino' ? `<span class='apps'>Out of 100 applications submitted by latinos,</span> <span class='value'>${d.value} were denied</span>` : d.name === 'overall' ? `<span class='apps'>Compared to</span> <span class='value'>only ${d.value} overall</span>` : `<span class='apps'>And</span> <span class='value'>${d.value} for white</span>`)
  
    gPeople.selectAll("p")
      .data(d => d.letters)
      .join("p")
      .text(d => d)
      .attr('class', 'p-weepeople')
      .style('text-align', 'left');
}

function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height,
      nh = d3.select(".source").node().getBoundingClientRect().height;
    d3.select("body").style("height", (sh + nh) + "px");
    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

arrestedPeople("denied-applications", 'orange', 45);
updateHeight();
