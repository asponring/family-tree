var Relationship = function(type, detailsObj) {
  if (type !== 'parental' && type !== 'union') {
    throw new Error('Not a valid relationship type!');
  }
  this.type = type;

  if (this.type === 'parental') {
    this.details = {
      origin: null,
      child: null,
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