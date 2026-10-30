// Exercise 5.1 – vertical bar chart: energy use of 55" TVs by screen type

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", (d) => {
  return {
    screenTech: d.screenTech,
    meanEnergy: +d.meanEnergy,
  };
}).then((data) => {
  console.log("5.1 bar chart data:", data);

  data.sort((a, b) => b.meanEnergy - a.meanEnergy);

  drawBarChart(data);
});

const drawBarChart = (data) => {
  const svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr(
      "aria-label",
      "Vertical bar chart of average yearly energy use of 55 inch TVs by screen type",
    );

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.screenTech))
    .range([0, innerWidth])
    .padding(0.35);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.meanEnergy)])
    .range([innerHeight, 0])
    .nice();

  // EXTRA: gridlines
  innerChart
    .append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""));

  // axes
  const bottomAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart.append("g").attr("class", "axis-y").call(leftAxis);

  // axis labels
  svg
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + innerHeight / 2))
    .attr("y", 22)
    .attr("text-anchor", "middle")
    .text("Average energy use (kWh/year)");

  svg
    .append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 12)
    .attr("text-anchor", "middle")
    .text("Screen technology (55 inch TVs)");

  // bars
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.screenTech))
    .attr("width", xScale.bandwidth())
    .attr("fill", (d) =>
      d.screenTech === data[0].screenTech ? highlightColor : barColor,
    ) // EXTRA: highlight the highest
    .attr("y", (d) => yScale(d.meanEnergy))
    .attr("height", (d) => innerHeight - yScale(d.meanEnergy));

  // value labels
  innerChart
    .selectAll(".bar-value")
    .data(data)
    .join("text")
    .attr("class", "bar-value")
    .attr("x", (d) => xScale(d.screenTech) + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(d.meanEnergy) - 8)
    .attr("text-anchor", "middle")
    .text((d) => `${Math.round(d.meanEnergy)} kWh`);
};
