var barChart = (function() {
  var parentWidth = $('svg.insurance').parent('.card__content').width();
  var barHeight = 20;

  var width = d3.scaleLinear()
      .range([0, parentWidth]);

  var colorR = d3.scaleLinear()
      .range([194, 19]);

  var colorG = d3.scaleLinear()
      .range([235, 150]);

  var colorB = d3.scaleLinear()
      .range([255, 254]);

  var chart = d3.select(".insurance")
      .attr("width", parentWidth);

  d3.csv("/data/bar-chart.csv", type, function(error, data) {
    width.domain([0, d3.max(data, function(d) { return d.value; })]);
    colorR.domain([0, d3.max(data, function(d) { return d.value; })]);
    colorG.domain([0, d3.max(data, function(d) { return d.value; })]);
    colorB.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return width(d.value); })
        .attr("height", barHeight - 1)
        .attr("fill", function(d) { return colorScale(colorR(d.value), colorG(d.value), colorB(d.value)); });
  });

  function colorScale(r, g, b) {
    return "#" + componentToHex(Math.round(r)) + componentToHex(Math.round(g)) + componentToHex(Math.round(b)) ;
  }

  function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();
