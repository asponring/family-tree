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
    .attr("fill", "#ff0000");

  if (this.svg.size() === 1) {
    personView.attr("cx", this.width/2)
      .attr("cy", this.height/2);
  }
};

FamilyTreeView.prototype.newRelationship = function() {

};

FamilyTreeView.prototype.askForDetails = function(detailsRequested) {


};

FamilyTreeView.prototype.renderTree = function() {

};


