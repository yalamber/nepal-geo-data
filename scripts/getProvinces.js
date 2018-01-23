let countries = require('../countries.json');
let request = require('request');
let fs = require('fs');
let url = 'http://103.69.124.141';
countries.features.forEach((value) => {
    let province = value.properties.TARGET;
    request(`${url}/data/${province}.json`)
        .pipe(fs.createWriteStream(`./province/${province}.json`))
        .on('finish', function () {  
            console.log(province+' done'); 
        });
})