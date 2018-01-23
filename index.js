const fs = require('fs');
const countries = require('./countries.json');

exports.getCountry = countries;

exports.getProvince = (province, callback) => {
  fs.readFile(`./province/${province}`, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    let data = JSON.parse(data);
    return callback(null, data);
  });
};

exports.getDistrict = (district) => {
  fs.readFile(`./districts/${district}`, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    let data = JSON.parse(data);
    return callback(null, data);
  });
};