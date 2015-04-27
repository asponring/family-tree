var FamilyTreeView = function(familyTree) {
  this.familyTree = familyTree;

  this.svg = d3.select(".tree-container")
    .insert("svg")
    .attr("width", "1000")
    .attr("height", "750");

  
};

FamilyTreeView.prototype.newPerson = function() {

};