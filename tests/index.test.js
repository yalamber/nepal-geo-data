const geoData = require('../index');

test('get geo data from lat lng', async () => {
  let data = await geoData.geoLocate(26.4831, 87.28337);
  expect(data.province).toBe('Province1');
  expect(data.district).toBe('MORANG');
  expect(data.localBody).toBe('Biratnagar');
});