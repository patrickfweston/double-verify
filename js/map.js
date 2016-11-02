var map = (function() {
  var svg = d3.select("svg.map"),
      width = +$('svg.map').parent('.card__content').width(),
      height = +svg.attr("height");

  var rateById = d3.map();

  var quantize = d3.scaleQuantize()
      .domain([0, 0.15])
      .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  var projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([width / 2, height / 2]);

  var path = d3.geoPath()
      .projection(projection);

  d3.queue()
      .defer(d3.json, "/data/us.json")
      .defer(d3.csv, "/data/map.csv", function(d) { rateById.set(d.id, +d.rate); })
      .await(ready);

  function ready(error, us) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
        .attr("class", function(d) { return quantize(rateById.get(d.id)); })
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "states")
        .attr("d", path);
  }
})();
