/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// add an svg to build within using deminsions set above
const svg = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {
    // find max X
    let maxX = d3.max(data, (d) => { return d.day; }); 

    // find max Y 
    let maxY = d3.max(data, (d) => { return d.score; }); 

    // Now that we have our maxes we define scale functions that
    // map our data values (domain for the scale function) to our
    // pixel values (range for the scale function)

    let xScale = d3.scaleLinear() // linear scale because we have 
        .domain([0, maxX])  // inputs for the function
        .range([margin.left, width - margin.right]); 

    let yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height - margin.bottom, margin.top]); 

    // Add x axis to svg6  
    svg.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    // ^ moves axis to bottom of svg 
    .call(d3.axisBottom(xScale)) // built in function for bottom
                        // axis given a scale function 
    .attr("font-size", '20px'); // set font size

    // Add y axis to svg6 
    svg.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(${margin.left}, 0)`) 
    // ^ move axis inside of left margin
    .call(d3.axisLeft(yScale)) // built in function for left
                        // axis given a scale function 
    .attr("font-size", '20px'); // set font size

    // creates the tooltip that shows up when a bar is hovered
    const tooltip = d3.select("#csv-scatter") 
        .append("div") 
        .attr('id', "tooltip1") 
        .style("opacity", 0) 
        .attr("class", "tooltip"); 

    // event handler for when the bar is moused over, shows the tooltip
    const mouseover = function(event, d) {
    tooltip.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
    }

    // event handler for the when the mouse is moving along the bar, tooltip moves with it
    const mousemove = function(event, d) {
    tooltip.style("left", (event.x)+"px") 
        .style("top", (event.pageY + yTooltipOffset) +"px"); 
    }

    // event handler for when the mouse is done hovering over a bar
    const mouseleave = function(event, d) { 
        tooltip.style("opacity", 0); 
    }

    svg.selectAll("circle") 
    .data(data)
    .enter()  
    .append("circle")
    .attr("cx", (d) => xScale(d.day)) // use xScale to return 
                                // pixel value for given
                                // datum 
    .attr("cy", (d) => yScale(d.score)) // use yScale to return 
                                // pixel value for given
                                // datum 
    .attr("r", 10)
    .on("mouseover", mouseover) 
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);


});