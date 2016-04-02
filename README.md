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
  columns:  1,      /* activate (1) or desactivate (0) columns */
  blocs:    1       /* activate (1) or desactivate (0) blocs */

}
```

This will output a few classes to build grid. 


## To do

- [ ] Add unit to declaration (p.e.: width: 18rem) 







 



/* activate (1) or desactivate (0) columns 
/* activate (1) or desactivate (0) blocs */