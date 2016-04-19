import postcss from 'postcss';
import test from 'ava';
import test01 from './01';
import test02 from './02';
import test03 from './03';
import test04 from './04';
import test05 from './05';
import test06 from './06';
import test07 from './07';
import test08 from './08';
import test09 from './09';
import test10 from './10';
import test11 from './11';
import plugin from '../src/index';

function run(t, input, output, opts = {}) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      t.deepEqual(result.css, output);
      t.deepEqual(result.warnings().length, 0);
    });
}

test('containers', t => run(t, test01.input, test01.output, {}));
test('rows', t => run(t, test02.input, test02.output, {}));
test('blocs', t => run(t, test03.input, test03.output, {}));
test('blocs with offset', t => run(t, test04.input, test04.output, {}));
test('bloc fractions', t => run(t, test05.input, test05.output, {}));
test('blobs', t => run(t, test06.input, test06.output, {}));
test('columns', t => run(t, test07.input, test07.output, {}));
test('columns with offset', t => run(t, test08.input, test08.output, {}));
test('show', t => run(t, test09.input, test09.output, {}));
test('right', t => run(t, test10.input, test10.output, {}));
test('custom styles', t => run(t, test11.input, test11.output, {}));
