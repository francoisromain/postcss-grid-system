# PostCSS-structure [![Build Status][ci-img]][ci]

http://francoisromain.github.io/postcss-structure/

A [PostCSS] plugin to create CSS grids based on a fixed block width.

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
}
```

## Output example

to-do


## Markup example

to-do


## To do

- [ ] Add markup example in README.md
- [ ] Add Css output example in README.md
- [ ] Add unit to declaration (p.e.: width: 18rem) 
- [ ] Make rtl
- [ ] re-write in ES6
- [ ] switch linter to airbnb
- [ ] write tests
