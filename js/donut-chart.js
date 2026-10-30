// Exercise 5.3 – donut chart: share of small, medium and large TV models

d3.csv("data/Ex5_TV_screensize_category.csv", (d) => {
  return {
    category: d.screenSizeCategory,
    count: +d.count,
  };
}).then((data) => {
  console.log("5.3 donut chart data:", data);
  drawDonutChart(data);
});

const drawDonutChart = (data) => {
  const radius = Math.min(width, height) / 2 - 20;

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.category))
    .range(["#bfdbfe", "#2563eb", "#1e3a8a"]);

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null); // keep Small → Medium → Large order
  const arcData = pie(data);
  console.log("Pie angles:", arcData);

  const arcGenerator = d3
    .arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius)
    .padAngle(0.02)
    .cornerRadius(4);

  const svg = d3
    .select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr(
      "aria-label",
      "Donut chart of the share of small, medium and large TV models",
    );

  const donutContainer = svg
    .append("g")
    .attr("transform", `translate(${width / 2 - 120}, ${height / 2})`);

  // slices
  donutContainer
    .selectAll(".slice")
    .data(arcData)
    .join("path")
    .attr("class", "slice")
    .attr("d", arcGenerator)
    .attr("fill", (d) => colorScale(d.data.category));

  // percentage labels
  const total = d3.sum(data, (d) => d.count);
  donutContainer
    .selectAll(".slice-label")
    .data(arcData)
    .join("text")
    .attr("class", "slice-label")
    .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", (d) => (d.data.category === "Small" ? "#1e3a8a" : "#ffffff"))
    .text((d) => `${Math.round((d.data.count / total) * 100)}%`);

  // EXTRA: total in the centre
  donutContainer
    .append("text")
    .attr("class", "donut-total")
    .attr("text-anchor", "middle")
    .attr("y", -4)
    .text(d3.format(",")(total));
  donutContainer
    .append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("y", 20)
    .text("TV models");

  // EXTRA: legend
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width / 2 + 110}, ${height / 2 - 40})`);
  const legendItem = legend
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * 30})`);
  legendItem
    .append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("rx", 3)
    .attr("fill", (d) => colorScale(d.category));
  legendItem
    .append("text")
    .attr("x", 28)
    .attr("y", 14)
    .text((d) => `${d.category}: ${d3.format(",")(d.count)} models`);

  // EXTRA: donut / pie toggle
  let isPie = false;
  d3.select("#toggle-pie").on("click", function () {
    isPie = !isPie;
    d3.select(this)
      .classed("active", isPie)
      .text(isPie ? "Show as donut" : "Show as pie");
    arcGenerator.innerRadius(isPie ? 0 : radius * 0.6);
    donutContainer
      .selectAll(".slice")
      .transition()
      .duration(600)
      .attr("d", arcGenerator);
    donutContainer
      .selectAll(".slice-label")
      .transition()
      .duration(600)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`);
    donutContainer
      .selectAll(".donut-total, .axis-label")
      .style("opacity", isPie ? 0 : 1);
  });
};
