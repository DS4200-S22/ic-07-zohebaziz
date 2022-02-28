/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// this creates an svg with the dimensions above at the div with the id tag "hard coded "
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// assigns variable to the max value of the data
let maxY1 = d3.max(data1, function(d) { return d.score; });

// create a y range from the data in which to plot on 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// create a x range from the data in which to plot on 
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// add the y scale axis to the data
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// add the x scale axis to the data
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// creates the tooltip that shows up when a bar is hovered
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// event handler for when the bar is moused over, shows the tooltip
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// event handler for the when the mouse is moving along the bar, tooltip moves with it
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// event handler for when the mouse is done hovering over a bar
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// creates the bar chart from all the variables and constants created above, adds in the event handlers and displays
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// create new barchart from csv data
// this creates an svg with the dimensions above at the div with the id tag "hard coded "
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {

  // assigns variable to the max value of the data
  let maxY2 = d3.max(data, function(d) { return d.score; });

  // create a y range from the data in which to plot on 
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  // create a x range from the data in which to plot on 
  let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  // add the y scale axis to the data
  svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale2)) 
    .attr("font-size", '20px'); 

  // add the x scale axis to the data
  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))  
      .attr("font-size", '20px'); 

  /* 

    Tooltip Set-up  

  */

  // creates the tooltip that shows up when a bar is hovered
  const tooltip2 = d3.select("#csv-bar") 
                  .append("div") 
                  .attr('id', "tooltip1") 
                  .style("opacity", 0) 
                  .attr("class", "tooltip"); 

  // event handler for when the bar is moused over, shows the tooltip
  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  // event handler for the when the mouse is moving along the bar, tooltip moves with it
  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.x)+"px") 
            .style("top", (event.y + yTooltipOffset) +"px"); 
  }

  // event handler for when the mouse is done hovering over a bar
  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }

  svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);

});
