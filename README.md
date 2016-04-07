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
  width: 18,        /* width of a bloc in rem */  
  gutter: 1.5,      /* width of the gutter in rem */  
  padding: 1.5,     /* padding of the main conatiner in rem */  
  max: 8,           /* maximum number of blocs */ 
  min: 2,           /* minimum number of blocs */  
  thumb: 3,         /* number of .bloc-thumb fitting in one bloc */ 
  align: 'center',  /* center or left */     
  display: 'flex',  /* float or flex */
  columns:  1,      /* on (1) / off (0) .columns-(screen-size)-(col) */
  blocs:    1       /* on (1) / off (0) .bloc-(screen-size)-(col)-(offset) */
  blobs:    1       /* on (1) / off (0) .blob-(screen-size)-(ratio)-(total) */
  rights:    1      /* on (1) / off (0) .right-(screen-size) */
  shows:     1      /* on (1) / off (0) .show-(screen-size) */
}
```

This will output a few classes to build grid. 

### Output example

(to-do)

### Markup example

(to-do)


## To do

- [ ] Add markup example in README.md
- [ ] Add Css output example in README.md
- [ ] Add unit to declaration (p.e.: width: 18rem) 
