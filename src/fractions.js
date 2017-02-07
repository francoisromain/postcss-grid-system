import postcss from 'postcss'
import utils from './utils'

export default (fractions, node, opts) => {
  if (fractions.length) {
    const fractionFloat = postcss.rule()

    fractionFloat.selectors = utils.flatten(fractions)

    fractionFloat.append({ prop: 'margin-right', value: `${opts.gutter}rem` })
    fractionFloat.append({ prop: 'margin-bottom', value: `${opts.gutter}rem` })

    if (opts.display === 'flex') {
      fractionFloat.append({ prop: 'flex', value: '0 1 auto' })
    } else if (opts.display === 'float') {
      fractionFloat.append({ prop: 'float', value: 'left' })
    }

    node.append(fractionFloat)
  }
}
