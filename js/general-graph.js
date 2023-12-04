function arrestedPeople(div, colorCategory, pct) {
    const letters = ["S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C", "S", "H", "b", "c", "C", "e", "f", "h", "W", "F", "i", "l", "q", "r", "s", "t", "u", "A", "B", "L", "Q", "R", "V", "c", "C"];
  
    var peopleDiv = d3.select(`#${div}`)
  
    peopleDiv.selectAll("p")
      .data(letters)
      .join("p")
      .text(function(d, i) {
        return d;
      })
      .attr('class', 'p-weepeople')
      .style('color', function(d, i) {
        if(i >= pct) {
          return 'lightgray';
        } else {
          return colorCategory;
        }
      })
      .style('text-align', 'left')
}

function updateHeight() {
    const sh = d3.select("#viz").node().getBoundingClientRect().height;
        
    d3.select("body").style("height", sh + "px");

    pymChild.sendHeight();
  }

var pymChild = new pym.Child({});

arrestedPeople("homelessness-arrests", 'orange', 45);
updateHeight();
