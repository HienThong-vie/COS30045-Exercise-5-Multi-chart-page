// Exercise 5.2 – scatter plot and line chart: electricity spot price 1998–2024

d3.csv("data/ARE_Spot_Prices.csv", (d) => {
  return {
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"],
  };
}).then((data) => {
  console.log("5.2 line chart data:", data);
  drawLineChart(data);
});

const drawLineChart = (data) => {
  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr(
      "aria-label",
      "Line chart of the average Australian electricity spot price from 1998 to 2024",
    );

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.averagePrice)])
    .range([innerHeight, 0])
    .nice();

  // EXTRA: gridlines
  innerChart
    .append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""));

  // axes
  const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(9);
  const leftAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);
  innerChart.append("g").call(leftAxis);

  svg
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + innerHeight / 2))
    .attr("y", 22)
    .attr("text-anchor", "middle")
    .text("Average spot price ($ per MWh)");

  svg
    .append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 12)
    .attr("text-anchor", "middle")
    .text("Year");

  // EXTRA: area under the line
  const areaGenerator = d3
    .area()
    .x((d) => xScale(d.year))
    .y0(innerHeight)
    .y1((d) => yScale(d.averagePrice))
    .curve(d3.curveMonotoneX);

  innerChart
    .append("path")
    .attr("d", areaGenerator(data))
    .attr("fill", "#93c5fd")
    .attr("fill-opacity", 0.35);

  // line
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.averagePrice))
    .curve(d3.curveMonotoneX); // EXTRA: smooth curve

  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", lineColor)
    .attr("stroke-width", 2.5);

  // scatter points
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 4)
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.averagePrice))
    .attr("fill", highlightColor);

  // EXTRA: peak label
  const peak = data.reduce((a, b) => (b.averagePrice > a.averagePrice ? b : a));
  innerChart
    .append("text")
    .attr("x", xScale(peak.year) - 8)
    .attr("y", yScale(peak.averagePrice) - 10)
    .attr("text-anchor", "end")
    .attr("class", "bar-value")
    .text(`Peak: $${peak.averagePrice} in ${peak.year}`);
};
