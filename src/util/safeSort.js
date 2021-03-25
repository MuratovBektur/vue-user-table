Array.prototype.safeSort = function(cb) {
  let arrCopy = JSON.parse(JSON.stringify(this));
  return arrCopy.sort(cb);
};

Array.prototype.safeSortByObjParam = function(param, type = "asc") {
  if (type == "desc") {
    return this.safeSort((a, b) => {
      if (a[param] < b[param]) return 1;
      else if (a[param] > b[param]) return -1;
      return 0;
    });
  }
  return this.safeSort((a, b) => {
    if (a[param] > b[param]) return 1;
    else if (a[param] < b[param]) return -1;
    return 0;
  });
};
