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

  this.height = 0;
  
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