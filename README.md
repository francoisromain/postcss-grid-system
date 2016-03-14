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

```css
.container {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
}

.grid {
  clear: both;
  margin-right: -1.5rem;
}

.grid:after {
  content: "";
  display: table;
  clear: both;
}

.bloc {
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  clear: both;
}

.bloc-1/2, .bloc-1/3, .bloc-2/3, .bloc-left, .bloc-thumb {
  float: left;
  clear: none;
}

.bloc-1/2 {
  width: 7.5rem;
}

.bloc-1/3 {
  width: 4.5rem;
}

.bloc-2/3 {
  width: 10.5rem;
}

.bloc-thumb {
  width: Infinityrem;
}

.columns {
  column-gap: 1.5rem;
}

@media (min-width: 40.5rem) {
  .container {
    width: 37.5rem;
  }

  .show-2 {
    display: block !important;
    visibility: visible !important;
  }

  .right-2 {
    float: right;
  }

  .bloc-2-1, .bloc-2-2, .bloc-2-2-1, .bloc-2-2-2, .bloc-2-2-3, .bloc-2-2-4, .bloc-2-2-5, .bloc-2-2-6 {
    float: left;
    clear: none;
  }

  .bloc-2-1, .bloc-2-2-1, .bloc-2-2-2, .bloc-2-2-3, .bloc-2-2-4, .bloc-2-2-5, .bloc-2-2-6 {
    width: 16.5rem;
  }

  .columns-2-1, .columns-2-2-1, .columns-2-2-2, .columns-2-2-3, .columns-2-2-4, .columns-2-2-5, .columns-2-2-6 {
    column-count: 1;
  }

  .bloc-2-2 {
    width: 34.5rem;
  }

  .columns-2-2 {
    column-count: 2;
  }
}

@media (min-width: 58.5rem) {
  .container {
    width: 55.5rem;
  }

  .show-3 {
    display: block !important;
    visibility: visible !important;
  }

  .right-3 {
    float: right;
  }

  .bloc-3-1, .bloc-3-2, .bloc-3-2-1, .bloc-3-2-2, .bloc-3-2-3, .bloc-3-2-4, .bloc-3-2-5, .bloc-3-2-6, .bloc-3-3, .bloc-3-3-1, .bloc-3-3-2, .bloc-3-3-3, .bloc-3-3-4, .bloc-3-3-5 {
    float: left;
    clear: none;
  }

  .bloc-2-2-2, .bloc-3-1, .bloc-3-2-2, .bloc-3-2-3, .bloc-3-2-4, .bloc-3-2-5, .bloc-3-2-6, .bloc-3-3-2, .bloc-3-3-3, .bloc-3-3-4, .bloc-3-3-5 {
    width: 16.5rem;
  }

  .columns-2-2-2, .columns-3-1, .columns-3-2-2, .columns-3-2-3, .columns-3-2-4, .columns-3-2-5, .columns-3-2-6, .columns-3-3-2, .columns-3-3-3, .columns-3-3-4, .columns-3-3-5 {
    column-count: 1;
  }

  .bloc-2-2-1, .bloc-3-2, .bloc-3-2-1, .bloc-3-3-1 {
    width: 34.5rem;
  }

  .columns-2-2-1, .columns-3-2, .columns-3-2-1, .columns-3-3-1 {
    column-count: 2;
  }

  .bloc-3-3 {
    width: 52.5rem;
  }

  .columns-3-3 {
    column-count: 3;
  }

  etc. 

```

## Usage

```js
postcss([ require('postcss-structure') ])
```

See [PostCSS] docs for examples for your environment.
