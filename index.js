const fs = require('fs');
const gju = require('geojson-utils');
var waterfall = require('async-waterfall');
const nepal = require('./geo_data/nepal.json');

const getCountry = () => {
  return nepal;
};

const getProvince = (province, callback) => {
  fs.readFile(require.resolve(`./geo_data/province/${province}.json`), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};

const getDistrict = (district, callback) => {
  fs.readFile(require.resolve(`./geo_data/districts/${district}.json`), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    return callback(null, data);
  });
};

exports.getCountry = getCountry;
exports.getProvince = getProvince;
exports.getDistrict = getDistrict;

exports.geoLocate = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    waterfall([
      //find province
      function(callback) {
        let province = getCountry().features.find((province) => {
          let check = gju.pointInPolygon(
            {"type":"Point","coordinates": [ longitude, latitude]},
            province.geometry
          );
          return check;
        });
        if(province){
          callback(null, province);
        } else {
          callback(new Error('Could not determine province'));
        }
      },
      //find district
      function(province, callback) {
        getProvince(province.properties.TARGET, (err, data) => {
          if(err) {
            return callback(err);
          }
          let district = data.features.find((district) => {
            let check = gju.pointInPolygon(
              {"type":"Point","coordinates": [longitude, latitude]},
              district.geometry
            );
            return check;
          });
          if(district){
            callback(null, province, district);
          } else {
            callback(new Error('Could not determine District'));
          }
        });
      },
      //find local body
      function(province, district, callback) {
        let districtTarget = district.properties.TARGET.substring( 0, 1 ).toUpperCase()+district.properties.TARGET.substring( 1 ).toLowerCase();
        getDistrict(districtTarget, (err, data) => {
          let localBody = data.features.find((localBody) => {
            let check = gju.pointInPolygon(
              {"type":"Point","coordinates": [longitude, latitude]},
              localBody.geometry
            );
            return check;
          });
          if(localBody){
            callback(null, {province, district, localBody});
          } else {
            callback(new Error('Could not determine Local Body'));
          }
        });
      }
    ], function (err, result) {
      if(err) {
        reject(err);
      }
      console.log(result.localBody)
      result = {
        province: result.province.properties.TARGET,
        district: result.district.properties.TARGET,
        localBody: result.localBody.properties.FIRST_GaPa
      };
      resolve(result);
    });
  });
}