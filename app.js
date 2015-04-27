d3.select(".new-tree")
  .on("click", function() {
    d3.select(this).style("display", "none");
    createNewTree();
  });

var createNewTree = function(elem) {
  d3.select(".tree-container")
    .append("svg")
    .attr("width", "1000")
    .attr("height", "750");
};