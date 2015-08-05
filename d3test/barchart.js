nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .tooltips(true)
    .showValues(false)
  
  //chart.xAxis.tickValues(0,1,100);

  d3.select('#chart svg')
    .datum(data)
    .transition().duration(500)
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});
