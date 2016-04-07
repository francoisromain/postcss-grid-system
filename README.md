# PostCSS-structure [![Build Status][ci-img]][ci]

[PostCSS] plugin to create a grid based on a fixed block width.

See in action here: [structure.css](http://francoisromain.github.io/structure.css/#grids)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

PostCSS-structure outputs a few CSS classes to make grids. 

The idea behind PostCSS-structure is that the bloc width doesn't change depending on the screen-size. Media-queries are created depending the number of units that fit into the page. 

## Usage

``` js
postcss([ require('postcss-structure') ])
```

## Options and default values

``` css
@structure {
  unit:    18,       /* width of a single bloc (rem) */  
  gutter:  1.5,      /* width of the gutter (rem) */  
  padding: 1.5,      /* padding of the main container (rem) */  
  max:     8,        /* maximum number of blocs */ 
  min:     2,        /* minimum number of blocs */  
  thumb:   3,        /* number of .bloc-thumb fitting in one bloc */ 
  align:   'center', /* 'center' or 'left' */     
  display: 'flex',   /* 'float' or 'flex' */
  blocs:   1         /* 1 or 0 (on / off) .bloc-(screen-size)-(col)-(offset) */
  blobs:   1         /* 1 or 0 (on / off) .blob-(screen-size)-(ratio)-(total) */
  columns: 1,        /* 1 or 0 (on / off) .columns-(screen-size)-(col) */
  rights:  1         /* 1 or 0 (on / off) .right-(screen-size) */
  shows:   1         /* 1 or 0 (on / off) .show-(screen-size) */
}
```

## Output example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/dist/css/styles.css#L1286)


## Markup example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/index.html#L265)


## To do

- [ ] Add markup example in README.md
- [ ] Add Css output example in README.md
- [ ] Add unit to declaration (p.e.: width: 18rem) 
- [ ] Make rtl
