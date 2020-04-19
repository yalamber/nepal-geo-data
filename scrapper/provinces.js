const fs = require('fs');
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const fetch = require('isomorphic-unfetch')
const nepal = require('../geo_data/nepal.json');
const url = 'http://103.69.124.141/gis/data';

(async function () {
    for (let province of nepal.features) {
        province = province.properties.TARGET;
        const response = await fetch(`${url}/${province}.json`)
        if (!response.ok) {
            throw new Error(`unexpected response ${response.statusText}`)
        }
        const data = await response.text()
        await writeFile(`../geo_data/province/${province}.json`, data.replace('var province  = ', ''))
    }
})()
