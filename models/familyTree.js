var FamilyTree = function() {
  this.persons = [];
  this.relationships = [];
};

FamilyTree.prototype.addPerson = function(person) {
  this.persons.push(person);
};

FamilyTree.prototype.addRelationship = function(relationship) {
  this.relationships.push(relationship);
};

FamilyTree.prototype.orderPersons = function() {
  var temp;

  for (var i = 0; i < this.relationships.length; i++) {
    var person1Index = this.persons.indexOf(this.relationships[i].person1);
    var person2Index = this.persons.indexOf(this.relationships[i].person2);
    temp = this.persons[person1Index + 1];
    this.persons[person1Index + 1] = this.persons[person2Index];
    this.persons[person2Index] = temp;
  }
}

FamilyTree.prototype.removePerson = function(person) {

};

FamilyTree.prototype.removeRelationship = function(relationship) {

};

FamilyTree.prototype.findPerson = function(person) {

};

FamilyTree.prototype.findRelationship = function(relationship) {

};

