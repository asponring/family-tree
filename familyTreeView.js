var FamilyTreeView = function(familyTree) {
  this.familyTree = familyTree;
  this.width = 1000;
  this.height = 750;
  this.nodeRadius = 20;


  this.svg = d3.select(".tree-container")
    .insert("svg")
    .attr("width", this.width)
    .attr("height", this.height);
  
  d3.select(".new-person")
    .on("click", this.createNewPerson.bind(this));

  this.createNewPerson();
};

FamilyTreeView.prototype.createNewPerson = function() {
  var person = new Person();


  this.askForDetails(person);
};

FamilyTreeView.prototype.savePerson = function(person) {
  this.familyTree.addPerson(person);

  this.renderTree();


}


FamilyTreeView.prototype.newRelationship = function() {

};

FamilyTreeView.prototype.saveRelationship = function(relationship) {

}

FamilyTreeView.prototype.askForDetails = function(object) {
  var detailsArea = d3.select(".details-form");

  detailsArea.append("p")
    .text("Enter details about this person:")
    .attr("class", "details-header");

  var inputDivs = detailsArea.append("form")
    .attr("name", "details")
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

  var personDetails = {};
  var savingFunction;
  if (object instanceof Person) {
    savingFunction = this.savePerson.bind(this);
  } else if (object instanceof Relationship) {
    savingFunction = this.saveRelationship.bind(this);
  }
  detailsArea.select("form").append("button")
    .attr("type", "submit")
    .text("Save Details")
    .on("click", function(event) {
      d3.event.preventDefault();
      inputDivs.each(function(d, i) {
        personDetails[d] = d3.event.toElement.form[i].value;
      });
      detailsArea.html("");
      object.addDetails(personDetails);
      savingFunction(object);
    });

};

FamilyTreeView.prototype.renderTree = function() {
  var midHeight = this.height / 2;
  var heightChunk = this.height / 8;
  var personView = this.svg.selectAll("g")
    .data(this.familyTree.persons)
    .enter()
    .append("g");

  // console.log(personView)
  personView.append("circle")
    .attr("r", this.nodeRadius)
    .attr("fill", "#ff0000")
    .attr("stroke", "black")
    .attr("stroke-width", "3")
    .attr("class", "person")
    .attr("cy", function(d) { 
      return midHeight + d.height * heightChunk;
    })
    .attr("cx", this.width/2);

  personView.append("text")
    .attr("y", function(d) { 
      return midHeight + d.height * heightChunk;
    })
    .attr("x", this.width/2)
    .text(function(d) {
      return d.details.firstName;
    });

  // if (this.svg.size() === 1) {
  //   personView.attr("cx", this.width/2)
  //     .attr("cy", this.height/2);
  // }
  // this.svg.selectAll("g")
  //   .data(familyTree.persons, function(d, i) {
  //     return d;
  //   })
  //   .enter();
  // this.svg.selectAll("circle").enter()  
};


