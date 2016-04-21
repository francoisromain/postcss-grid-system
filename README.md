# postcss-s-grid [![Build Status][ci-img]][ci]

[francoisromain.github.io/postcss-s-grid](http://francoisromain.github.io/postcss-s-grid)

A [PostCSS] plugin to create grids based on a fixed column width.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-s-grid.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-s-grid

* * * 

## Installation

Install the [npm module](https://www.npmjs.com/package/postcss-s-grid):

    $ npm install postcss-s-grid --save-dev

Require the PostCSS plugin:

``` js
postcss([ require('postcss-s-grid') ])
```

See [PostCSS usage](https://github.com/postcss/postcss#usage) to setup with Gulp, Grunt, Webpack, npm scripts… 

##### Example with a [npm script](https://docs.npmjs.com/misc/scripts) and [postcss-cli](https://www.npmjs.com/package/postcss-cli):

    $ npm install postcss-cli --save-dev

Add a script to package.json:

``` js
"scripts": {
  "build": "postcss -u postcss-s-grid -i src/styles.css -o dist/styles.css"
}
```

    $ npm run build

* * * 

## Configuration

Global settings rule (and default values):

``` css

@s-grid {
  unit:    20.5rem,  /* width of a single column */
  gutter:  1.5rem,   /* width of the gutter */
  padding: 1.5rem,   /* padding of the main container */
  max:     8,        /* maximum number of blocs (wide screens) */
  min:     2,        /* minimum number of blocs (mobile) */
  align:   center,   /* center or left */ 
  display: flex      /* float or flex */  
}
```

A **breakpoint** is created for each value from _min_ to _max_. When the screen is narrower than _min_ * _unit_, elements are fluids. 

* * * 

## Usage

- [Media-queries](#media-queries)
- [Containers](#containers)
- [Rows](#rows)
- [Blocs](#blocs)
- [Fractions](#fractions)
- [Columns](#columns)


### Media queries

``` css
@s-grid-media [breakpoint] {
    .my-class {
        …
    }
}
```

- _breakpoint_: apply classes when the screen is wider than _breakpoint_. To set the default styles (mobile first), use `@s-grid-media 0 { …`.

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/00.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/00.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/00.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/00.html)

### Containers

`s-grid: container`

The container width is set for each _breakpoint_.

``` css

.my-container {
  s-grid: container;
}

```

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/01.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/01.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/01.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/01.html)

### Rows

`s-grid: row`

Rows are intended to contain either a _bloc_ or a _fraction_ element. They have a negative right margin.

``` css

.my-row {
  s-grid: row;
}

```

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/02.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/02.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/02.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/02.html)

### Blocs

`s-grid: bloc [width](-[offset])`

Blocs have a fixed width.

- _width_: width of the bloc.
- _offset_ (optional): remaining space before the bloc can take its width. if (_width_ + _offset_) is wider than _breakpoint_, then _width_ shrinks first.

``` css

.my-bloc {
  s-grid: bloc 2;
}

.my-bloc-with-offset {
  s-grid: bloc 2-3;
}

```

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/03.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/03.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/03.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/03.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/04.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/04.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/04.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/04.html)

### Fractions

`s-grid: fraction [ratio]/[total]`

- _ratio_: fraction of the _total_.
- _total_: divider, relative to _unit_.

``` css

.my-fraction {
  s-grid: fraction 3/2;
}

```

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/05.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/05.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/05.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/05.html)


### Columns

`s-grid: columns [columns](-[offset])`

- _columns_: number of columns.
- _offset_ (optional): remaining space before the columns are active. If (_columns_ + _offset_) is greater than _breakpoint_, then _columns_ shrinks first.

``` css

.my-columns {
  s-grid: columns 4;
}

.my-columns-with-offset {
  s-grid: columns 4-2;
}

```

Example: [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/06.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/06.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/06.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/06.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/src/07.css), [output](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/dist/07.css), [markup](https://github.com/francoisromain/postcss-s-grid/blob/gh-pages/test/07.html), [demo](http://localhost/francoisromain.github.io/postcss-s-grid/test/07.html)

