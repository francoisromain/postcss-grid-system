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

``` css
@structure {
  unit:    18,       /* width of a single bloc in rem */  
  gutter:  1.5,      /* width of the gutter in rem */  
  padding: 1.5,      /* padding of the main conatiner in rem */  
  max:     8,        /* maximum number of blocs */ 
  min:     2,        /* minimum number of blocs */  
  thumb:   3,        /* number of .bloc-thumb fitting in one bloc */ 
  align:   'center', /* center or left */     
  display: 'flex',   /* float or flex */
  blocs:   1         /* on (1) / off (0) .bloc-(screen-size)-(col)-(offset) */
  blobs:   1         /* on (1) / off (0) .blob-(screen-size)-(ratio)-(total) */
  columns: 1,        /* on (1) / off (0) .columns-(screen-size)-(col) */
  rights:  1         /* on (1) / off (0) .right-(screen-size) */
  shows:   1         /* on (1) / off (0) .show-(screen-size) */
}
```

## Options

- unit: the width of a single bloc (in rem): integer, default to `18`.
- gutter: the width of the gutter between blocs (in rem): integer, default to `1.5`.
- padding: the padding of the main container (in rem): integer, default to `1.5`.
- max: the maximum amount of blocs on wide screens: integer, default to `8`. 
- min: the minimum amount of blocs on narrow screens: integer, default to `2`.
- thumb: the number of .bloc-thumb fitting in one bloc: integer, default to `3`. This output something like: `.bloc-thumb { width: width / thumb }`. 
- align: center or align-left the main container: `'center'` (default) or `'left'`.
- display: use floats or flexbox: `'flex'` (default) or `'float'`.
- blocs: output .blocs classes: `1` (default) or `0`. 
- blobs: output .blobs classes: `1` (default) or `0`. 
- columns: output .columns classes: `1` (default) or `0`. 
- rights: output .rights classes: `1` (default) or `0`. 
- shows: output .shows classes: `1` (default) or `0`. 

## Output example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/dist/css/styles.css#L1286)


## Markup example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/index.html#L265)


## To do

- [ ] Add markup example in README.md
- [ ] Add Css output example in README.md
- [ ] Add unit to declaration (p.e.: width: 18rem) 
- [ ] Make rtl
