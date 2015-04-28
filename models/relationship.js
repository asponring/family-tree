var Relationship = function(type, detailsObj) {
  if (type !== 'parental' && type !== 'union') {
    throw new Error('Not a valid relationship type!');
  }
  this.type = type;

  if (this.type === 'parental') {
    this.details = {
      subtype: null,
      startDate: null
    };
    this.origin = null;
    this.child = null;
  } else {
    this.details = {
      subtype: null,
      startDate: null,
      status: null,
      endDate: null
    };
    this.person1 = null;
    this.person2 = null;
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