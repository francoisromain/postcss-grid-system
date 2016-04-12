import postcss from 'postcss';
import test from 'ava';

import plugin from './src/index';

function run(t, input, output, opts = {}) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      t.deepEqual(result.css, output);
      t.deepEqual(result.warnings().length, 0);
    });
}

const containerInput = `
@structure {
  unit: 18;
  gutter: 1.5;
  padding: 1.5;
  max: 8;
  min: 2;
  display: 'float';
  align: 'center';
}

.container {
  structure-element: container
}`;

const containerOutput = `
.container {

}`;

test('does something', t => run(t, containerInput, containerOutput, {}));


