var FamilyTreeView = function(familyTree) {
  this.familyTree = familyTree;
  this.width = 1000;
  this.height = 750;
  this.nodeRadius = 20;


  this.svg = d3.select(".tree-container")
    .insert("svg")
    .attr("width", this.width)
    .attr("height", this.height);

  this.newPerson();
};

FamilyTreeView.prototype.newPerson = function() {
  var person = new Person();
  var personView = this.svg.append("circle")
    .attr("r", this.nodeRadius)
    .attr("fill", "#ff0000")
    .attr("stroke", "black")
    .attr("stroke-width", "3")
    .attr("class", "person");

  if (this.svg.size() === 1) {
    personView.attr("cx", this.width/2)
      .attr("cy", this.height/2);
  }

  this.askForDetails(person);
};

FamilyTreeView.prototype.newRelationship = function() {

};

FamilyTreeView.prototype.askForDetails = function(object) {
  var detailsArea = d3.select(".details-form");

  detailsArea.append("p")
    .text("Enter details about this person:")
    .attr("class", "details-header");

  var inputDivs = detailsArea.append("form")
    .selectAll("div")
    .data(Object.keys(object.details), function(d) { return d; })
    .enter()
    .append("div");

  inputDivs.append("label")
    .attr("for", function(d) { return d; })
    .text(function(d) { return d + ": "; })
    .attr("class", "details-label")
    .append("input")
    .attr("type", "text");

  detailsArea.append("button")
    .attr("type", "submit")
    .text("Save Details");
};

FamilyTreeView.prototype.renderTree = function() {

};


