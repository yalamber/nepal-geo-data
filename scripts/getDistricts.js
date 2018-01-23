let request = require('request');
let fs = require('fs');
let url = 'http://103.69.124.141';

for(let i = 1; i<=7; i++) {
    let provinceData = require(`./province/Province${i}.json`);
    provinceData.features.forEach((value) => {
        let districtName = value.properties.TARGET.substring( 0, 1 ).toUpperCase()+value.properties.TARGET.substring( 1 ).toLowerCase();
        let target = `Dist_GaPa/${districtName}`;
        request(`${url}/data/${target}.json`)
            .pipe(fs.createWriteStream(`./districts/${districtName}.json`))
            .on('finish', () => {
                console.log(districtName + ' done');
            });
    });
}