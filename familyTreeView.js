var FamilyTreeView = function(familyTree) {
  this.familyTree = familyTree;
  this.width = 1000;
  this.height = 750;
  this.nodeRadius = 20;


  this.svg = d3.select(".tree-container")
    .insert("svg")
    .attr("width", this.width)
    .attr("height", this.height);
  
  this.rows = {};
  for (var i = -4; i <= 4; i++) {
    this.rows[i] = [];
  }

  d3.select(".new-person")
    .on("click", this.createNewPerson.bind(this));

  d3.select(".new-union")
    .on("click", this.createNewUnion.bind(this));

  d3.select(".new-parental")
    .on("click", this.createNewParental.bind(this));

  this.createNewPerson();
};

FamilyTreeView.prototype.createNewPerson = function() {
  var person = new Person();

  this.askForDetails(person);
};

FamilyTreeView.prototype.savePerson = function(person) {
  this.familyTree.addPerson(person);
  this.rows[person.height].push(person);

  this.renderTree();
};


FamilyTreeView.prototype.createNewUnion = function() {
  var relationship = new Relationship("union");

  var detailsArea = d3.select(".details-form");
  detailsArea.html("");

  detailsArea.append("h3")
    .text("Select a person who belongs to this union.");

  var svg = this.svg;
  var askForDetails = this.askForDetails.bind(this);
  svg.selectAll("g")
    .on("click", function(d) {
      relationship.person1 = d;
      detailsArea.select("h3")
        .text("Select the counterpart in this union.")   
      svg.selectAll("g")
        .on("click", function(d) {
          if (d !== relationship.person1) {
            relationship.person2 = d;
            askForDetails(relationship);
          } else {
            detailsArea.select("h3")
              .text("Sorry, you must select a different person.")
          }
        });
    });
};

FamilyTreeView.prototype.createNewParental = function() {
  var relationship = new Relationship("parental");

  var detailsArea = d3.select(".details-form");
  detailsArea.html("");

  detailsArea.append("h3")
    .text("Select the child.");

  var svg = this.svg;
  var askForDetails = this.askForDetails.bind(this);
  svg.selectAll("g")
    .on("click", function(d) {
      relationship.child = d;
      detailsArea.select("h3")
        .text("Select the origin of this child.")   
      svg.selectAll("g")
        .on("click", function(d) {
          if (d !== relationship.child) {
            relationship.origin = d;
            askForDetails(relationship);
          } else {
            detailsArea.select("h3")
              .text("Sorry, you must select a different person.")
          }
        });
    });
};

FamilyTreeView.prototype.saveRelationship = function(relationship) {
  this.familyTree.addRelationship(relationship);

  this.renderTree();
}

FamilyTreeView.prototype.askForDetails = function(object) {
  var detailsArea = d3.select(".details-form");
  detailsArea.html("");

  detailsArea.append("p")
    .text("Enter details about this person:")
    .attr("class", "details-header");

  var inputDivs = detailsArea.append("form")
    .attr("name", "details")
    .selectAll("div")
    .data(Object.keys(object.details), function(d) { return d; })
    .enter()
    .append("div")
    .attr("class", "form-group");

  inputDivs.append("label")
    .attr("for", function(d) { return d; })
    .text(function(d) { return d + ": "; })
    .attr("class", "details-label")
    .append("input")
    .attr("type", "text")
    .attr("class", "form-control");

  var personDetails = {};
  var savingFunction;
  if (object instanceof Person) {
    savingFunction = this.savePerson.bind(this);
  } else if (object instanceof Relationship) {
    savingFunction = this.saveRelationship.bind(this);
  }
  detailsArea.select("form").append("button")
    .attr("type", "submit")
    .attr("class", "btn btn-default")
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
  this.familyTree.orderPersons();
  var midHeight = this.height / 2;
  var heightChunk = this.height / 10;
  var currentHeight;

  for (var row in this.rows) {
    currentHeight = midHeight - heightChunk * row;

    var personView = this.svg.selectAll("g")
      .data(this.rows[row])
      .enter()
      .append("g");

    personView.append("circle")
      .attr("r", this.nodeRadius)
      .attr("fill", "#ff0000")
      .attr("stroke", "black")
      .attr("stroke-width", "3")
      .attr("class", "person")
      .attr("cy", function(d) { 
        return currentHeight;
      })
      .attr("cx", function(d, i) {
        return 50 + 200 * i;
      });

    personView.append("text")
      .attr("y", function(d) { 
        return currentHeight - 20;
      })
      .attr("x", function(d, i) {
        return 50+ 200 * i + 20;
      } )
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .text(function(d) {
        return d.details.firstName + " " + d.details.lastName;
      });
  }

  this.svg.selectAll("line")
    .data(this.familyTree.relationships)
    .enter()
    .append("line")
    .attr("x1", function(d) {
      var personToFind = d.person1 || d.child;
      return d3.selectAll("circle").filter(function(d, i) {
          return d === personToFind;
        }).attr("cx");
    })
    .attr("y1", function(d) {
      var personToFind = d.person1 || d.child;
      return d3.selectAll("circle").filter(function(d, i) {
          return d === personToFind;
        }).attr("cy");
    })
    .attr("x2", function(d) {
      var personToFind = d.person2 || d.origin;
      return d3.selectAll("circle").filter(function(d, i) {
          return d === personToFind;
        }).attr("cx");
    })
    .attr("y2", function(d) {
      var personToFind = d.person2 || d.origin;
      return d3.selectAll("circle").filter(function(d, i) {
          return d === personToFind;
        }).attr("cy");
    })
    .attr("stroke-width", 2)
    .attr("stroke", "black");

};


