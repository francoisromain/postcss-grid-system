# PostCSS-structure [![Build Status][ci-img]][ci]

[PostCSS] plugin to create grids based on a fixed block width.

See in action here: [structure.css](http://francoisromain.github.io/structure.css/#grids)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

PostCSS-structure creates a grid based on the width of a "bloc". This bloc has the same width whatever the size of the screen is. Media-queries are created depending the number of bloc that fits in the page. 

## Usage

``` js
postcss([ require('postcss-structure') ])
```

``` css
@structure {
  width: 18,
  gutter: 1.5,
  padding: 1.5,
  max: 8,
  min: 2,
  thumb: 3,
  align: 'center',
  display: 'flex'   
}
```

This will output a few classes to build grid. 


## To do

- [ ] Add unit to declaration (p.e.: width: 18rem) 



