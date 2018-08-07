import postcss from 'postcss';
import test from 'ava';
import test00 from './00';
import test01 from './01';
import test02 from './02';
import test03 from './03';
import test05 from './05';
import test06 from './06';
import test07 from './07';
import plugin from '../lib/index';

const run = (t, input, output, opts = {}) => postcss([plugin(opts)])
  .process(input)
  .then((result) => {
    t.deepEqual(result.css, output);
    t.deepEqual(result.warnings().length, 0);
  });

test('media queries', t => run(t, test00.input, test00.output, {}));
test('containers', t => run(t, test01.input, test01.output, {}));
test('rows', t => run(t, test02.input, test02.output, {}));
test('blocs', t => run(t, test03.input, test03.output, {}));
test('bloc fractions', t => run(t, test05.input, test05.output, {}));
test('columns', t => run(t, test06.input, test06.output, {}));
test('blocs float', t => run(t, test07.input, test07.output, {}));
