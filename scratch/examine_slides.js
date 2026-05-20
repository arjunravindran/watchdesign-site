const fs = require('fs');
const modules = require('../data/modules.js');

const targetIds = [
  'm02-s07', 'm02-s19', 'm02-s20',
  'm03-s03', 'm03-s04', 'm03-s05', 'm03-s06',
  'm04-s05', 'm04-s06',
  'm05-s03',
  'm06-s02', 'm06-s06',
  'm07-s02', 'm07-s05',
  'm08-s02',
  'm09-s02', 'm09-s06', 'm09-s08',
  'm10-s06'
];

targetIds.forEach(id => {
  let found = null;
  modules.forEach(m => {
    m.slides.forEach(s => {
      if (s.id === id) {
        found = s;
      }
    });
  });
  if (found) {
    console.log(`=== ${id} ===`);
    console.log(JSON.stringify(found, null, 2));
  } else {
    console.log(`=== ${id} NOT FOUND ===`);
  }
});
