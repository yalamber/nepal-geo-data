const fs = require('fs');
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const fetch = require('isomorphic-unfetch')
const url = 'http://103.69.124.141/gis/data';

(async function () {
    const response = await fetch(`${url}/countries.json`)
    if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`)
    }
    const data = await response.text()
    await writeFile(`../geo_data/nepal.json`, data.replace('var countries = ', ''))
})()
