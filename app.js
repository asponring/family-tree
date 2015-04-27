d3.select(".new-tree")
  .on("click", function() {
    d3.select(this).attr("disabled", "true");
  });
  