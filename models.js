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

FamilyTree.prototype.removePerson = function(person) {

};

FamilyTree.prototype.removeRelationship = function(relationship) {

};

FamilyTree.prototype.findPerson = function(person) {

};

FamilyTree.prototype.findRelationship = function(relationship) {

};

var Person = function(detailsObj) {
  this.details = {
    firstName: null,
    lastName: null,
    otherNames: null,
    gender: null,
    birthdate: null,
    birthPlace: null,
    deathdate: null,
    deathPlace: null,
    ethnicity: null
  };
  
  if (detailsObj) {
    this.addDetails(detailsObj);
  }
};

Person.prototype.addDetails = function(detailsObj) {
  for (var attr in detailsObj) {
    if (this.details.hasOwnProperty(attr)) {
      this.details[attr] = detailsObj[attr];
    }
  }
};

var Relationship = function(type, detailsObj) {
  if (type !== 'parental' && type !== 'union') {
    throw new Error('Not a valid relationship type!');
  }
  this.type = type;

  if (this.type === 'parental') {
    this.details = {
      origin: null,
      subtype: null,
      startDate: null
    };
  } else {
    this.details = {
      person1: null,
      person2: null,
      subtype: null,
      startDate: null,
      status: null,
      endDate: null
    };
  }

  if (detailsObj) {
    this.addDetails(detailsObj);
  }
};

Relationship.prototype.addDetails = function(detailsObj) {
  for (var attr in detailsObj) {
    if (this.details.hasOwnProperty(attr)) {
      this.details[attr] = detailsObj[attr];
    }
  }
};

// var andy = new Person({
//   firstName: 'Andy',
//   lastName: 'Sponring',
//   gender: 'male'
// });

// var jarrie = new Person({
//   firstName: 'Jarrie',
//   lastName: 'Chang',
//   gender: 'female'
// });

// var sponring = new FamilyTree();

// sponring.addPerson(andy);
// sponring.addPerson(jarrie);

// var marriage = new Relationship('union', {
//   person1: jarrie,
//   person2: andy,
//   subtype: 'marriage',
//   startDate: new Date(2015, 11, 6)
// });

// sponring.addRelationship(marriage);
// console.log(sponring.relationships);

