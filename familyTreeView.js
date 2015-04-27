var FamilyTreeView = function(familyTree) {
  this.familyTree = familyTree;
  this.width = 1000;
  this.height = 750;


  this.svg = d3.select(".tree-container")
    .insert("svg")
    .attr("width", this.width)
    .attr("height", this.height);

  this.newPerson();
};

FamilyTreeView.prototype.newPerson = function() {

};

FamilyTreeView.prototype.newRelationship = function() {

};

FamilyTreeView.prototype.askForDetails = function() {

};

FamilyTreeView.prototype.renderTree = function() {

};


