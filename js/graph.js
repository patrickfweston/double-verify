var barChart = (function() {
  var parentWidth = $('svg.visits').parent('.card__content').width();

  var margin = {top: 20, right: 30, bottom: 40, left: 30},
      width = parentWidth - margin.left - margin.right,
      height = 275 - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%d-%b-%y");

  var x = d3.scaleTime()
      .range([0, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisTop()
      .scale(x)
      .tickFormat(d3.timeFormat("%b"));

  var area = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.close); });

  var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  var svg = d3.select("svg.visits")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("/data/graph.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat("")
      );

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0,0)")
      .call(xAxis);
  });

  // function for the x grid lines
function make_x_axis() {
  return d3.axisBottom()
    .scale(x)
    .ticks(12)
}
})();
