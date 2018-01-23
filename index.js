const fs = require('fs');
const countries = require('./countries.json');

exports.getCountry = () => {
  return countries;
};

exports.getProvince = (province, callback) => {
  fs.readFile(`./province/${province}.json`, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};

exports.getDistrict = (district) => {
  fs.readFile(`./districts/${district}.json`, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};