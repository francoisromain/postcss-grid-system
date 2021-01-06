import containers from './containers';
import rows from './rows';
import blocs from './blocs';
import fractions from './fractions';
import columns from './columns';
import containersQuery from './containers-query';
import blocsQuery from './blocs-query';
import fractionsQuery from './fractions-query';
import columnsQuery from './columns-query';
import rulesQuery from './rules-query';
// import util from 'util';

export default (e, opts, { rule, root, atRule }) => {
  const rootNode = root();

  if (e.containers.length) {
    const container = containers(e.containers, opts, { rule });
    rootNode.append(container);
  }

  if (e.rows.length) {
    const { row, rowClearFix } = rows(e.rows, opts, { rule });
    rootNode.append(row);
    rootNode.append(rowClearFix);
  }

  if (e.blocs.length) {
    const bloc = blocs(e.blocs, opts, { rule });
    rootNode.append(bloc);
  }

  if (e.fractions.length) {
    const fraction = fractions(e.fractions, opts, { rule });
    rootNode.append(fraction);
  }

  if (e.fractions[0] && e.fractions[0].length) {
    const frs = fractionsQuery(e.fractions[0], opts, { rule });
    frs.forEach((fraction) => {
      rootNode.append(fraction);
    });
  }

  if (e.columns.length) {
    const columnsGap = columns(e.columns, opts, { rule });
    rootNode.append(columnsGap);

    const cols = columnsQuery(e.columns, opts, 0, { rule });
    cols.forEach((col) => {
      rootNode.append(col);
    });
  }

  if (e.rules[0]) {
    const res = rulesQuery(e.rules[0]);
    res.forEach((r) => {
      rootNode.append(r);
    });
  }

  for (let breakpoint = 1; breakpoint <= opts.max; breakpoint += 1) {
    const queryWidth = breakpoint * opts.width - opts.gutter + 2 * opts.padding;
    const mediaQuery = atRule({
      name: 'media',
      params: `(min-width: ${queryWidth}rem)`,
    });

    if (e.blocs.length) {
      const { blocWidths, blocLefts, blocRights } = blocsQuery(
        e.blocs,
        opts,
        breakpoint,
        { rule }
      );

      blocWidths.forEach((bloc) => {
        mediaQuery.append(bloc);
      });

      blocLefts.forEach((bloc) => {
        mediaQuery.append(bloc);
      });

      blocRights.forEach((bloc) => {
        mediaQuery.append(bloc);
      });
    }

    if (breakpoint >= opts.min) {
      if (e.containers.length) {
        const res = containersQuery(e.containers, opts, breakpoint, { rule });
        mediaQuery.append(res);
      }

      if (e.fractions[breakpoint]) {
        const frs = fractionsQuery(e.fractions[breakpoint], opts, { rule });
        frs.forEach((fraction) => {
          mediaQuery.append(fraction);
        });
      }

      if (e.columns && e.columns.length) {
        const cols = columnsQuery(e.columns, opts, breakpoint, { rule });
        cols.forEach((col) => {
          mediaQuery.append(col);
        });
      }

      if (e.rules[breakpoint]) {
        const res = rulesQuery(e.rules[breakpoint]);
        res.forEach((r) => {
          mediaQuery.append(r);
        });
      }
    }

    if (mediaQuery.nodes && mediaQuery.nodes.length) {
      // console.log('booo', util.inspect(mediaQuery.nodes.length, false, null))
      rootNode.append(mediaQuery);
    }
  }

  return rootNode;
};
