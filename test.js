import postcss from 'postcss';
import test from 'ava';
// import tests from './tests';

import plugin from './src/index';

function run(t, input, output, opts = {}) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      t.deepEqual(result.css, output);
      t.deepEqual(result.warnings().length, 0);
    });
}

test('does something', t => run(t, 'a{ }', 'a{ }', {}));
// test('does something', t => run(t, tests.containerInput, tests.containerOutput, {}));
