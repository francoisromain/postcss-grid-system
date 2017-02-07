import postcss from 'postcss'
import utils from './utils'

export default (blocs, node, opts) => {
  if (blocs.length) {
    const bloc = postcss.rule()

    bloc.selectors = utils.flatten(blocs)

    bloc.append({ prop: 'margin-right', value: `${opts.gutter}rem` })
    bloc.append({ prop: 'margin-bottom', value: `${opts.gutter}rem` })

    if (opts.display === 'flex') {
      bloc.append({ prop: 'flex', value: '0 1 100%' })
    } else if (opts.display === 'float') {
      bloc.append({ prop: 'clear', value: 'both' })
    }

    node.append(bloc)
  }
}
