const fs = require('fs');
const countries = require('./countries.json');

exports.getCountry = () => {
  return countries;
};

exports.getProvince = (province, callback) => {
  fs.readFile(require.resolve(`./province/${province}.json`), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};

exports.getDistrict = (district) => {
  fs.readFile(require.resolve(`./districts/${district}.json`), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};