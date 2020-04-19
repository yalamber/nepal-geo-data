# Nepal GEO Data
This repo contains geo data coordinates of up to Local body level. GIS data included 

# How to use
```javascript
const npGeoData = require('nepal-geo-data');
let data = await npGeoData.geoLocate(26.4831, 87.28337);
expect(data.province).toBe('Province1');
expect(data.district).toBe('MORANG');
expect(data.localBody).toBe('Biratnagar');
```
