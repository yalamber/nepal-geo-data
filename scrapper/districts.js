const fs = require('fs');
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const fetch = require('isomorphic-unfetch')
const url = 'http://103.69.124.141/gis/data';

(async function () {
    for (let i = 1; i <= 7; i++) {
        const provinceData = require(`../geo_data/province/Province${i}.json`);
        for (district of provinceData.features) {
            const districtName = district.properties.TARGET.substring(0, 1).toUpperCase() + district.properties.TARGET.substring(1).toLowerCase();
            const target = `Dist_GaPa/${districtName}`;
            const response = await fetch(`${url}/${target}.json`)
            if (!response.ok) {
                throw new Error(`unexpected response ${response.statusText}`)
            }
            const data = await response.text()
            await writeFile(`../geo_data/districts/${districtName}.json`, data.replace('var district  = ', ''))
        }
    }
})()