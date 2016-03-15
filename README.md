# PostCSS Structure [![Build Status][ci-img]][ci]

[PostCSS] plugin to create grids based on a fixed block width.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

PostCSS Structure creates a grid based on the width of a "bloc". This bloc has the same width whatever the size of the screen is. Media-queries are created depending the number of bloc that fits in the page. 

```css
@structure {
  width:    18;     
  gutter:   1.5;   
  padding:  1.5;  
  max:      2;        
  min:      8;        
  thumb:    3;         
  display:  flex;
  align:    center;    
}
```

## Usage

```js
postcss([ require('postcss-structure') ])
```

See [PostCSS] docs for examples for your environment.
