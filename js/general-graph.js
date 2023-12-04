const raceths = [
  {
    'name': 'white',
    'value': 6,
    'color': 'orange'
  },
  {
    'name': 'latino',
    'value': 7,
    'color': 'steelblue'
  },
  {
    'name': 'asian/pacific islander',
    'value': 7,
    'color': 'green'
  },
  {
    'name': 'native american',
    'value': 8,
    'color': 'red'
  },
  {
    'name': 'black',
    'value': 9,
    'color': 'pink'
  }
];

const lineHeight = 24;

function arrestedPeople(div, colorCategory) {
    const letters = ["S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C"];
  
    const peopleDiv = d3.select(`#${div}`);

    const gPeople = peopleDiv.selectAll('.people-group')
      .data(raceths)
      .join("g")
        .attr("class", 'people-group')
        .attr("transform", (d,i) => `translate(0, ${i * lineHeight})`)
        .style('color', d => d.color);

    gPeople.selectAll(".people-name")
      .data(d => [`${d.value} ${d.name}`])
      .join("span")
        .attr("class", "people-name")
        .html(d => `${d} <span class='apps'>applicants denied<span>`)
  
    gPeople.selectAll("p")
      .data(d => letters.slice(0, d.value))
      .join("p")
      .text(d => d)
      .attr('class', 'p-weepeople')
      .style('text-align', 'left');
}

function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height;
        
    d3.select("body").style("height", sh + "px");

    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

arrestedPeople("homelessness-arrests", 'orange', 45);
updateHeight();
