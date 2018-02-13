const fs = require('fs');

function addNextTickRecurs(count){
  let self = this;
  if(self.id === undefined) {
    self.id = 0;
  }

  if(self.id === count)  return;

    process.nextTick(() => {
      console.log(`process.nextTick is called using recursive function ${++self.id}`);
      addNextTickRecurs.call(self, count);
    });
}

const start = process.hrtime();
addNextTickRecurs(5);
setTimeout(() => {
  const end = process.hrtime(start);
  console.log(`timeout callback after ${end[0]} and ${end[1]/Math.pow(10, 9)} ms`);
}, 1000);

setImmediate(() => console.log(`immediate 1`));
setImmediate(() => console.log(`immediate 2`));

setTimeout(() => console.log(`timeout 1`), 0);
setTimeout(() => {
  console.log("timeout 2");
  process.nextTick(() => console.log(`inside timeout nextTick`));

}, 0);

setTimeout(() => console.log(`timeout 3`), 0);
setTimeout(() => console.log(`timeout 4`), 0);

process.nextTick(() => console.log(`nextTick 1`));
process.nextTick(() => {
  process.nextTick(() => console.log(`nextTick 1.1`));
});

process.nextTick(() => console.log(`nextTick 2`));
