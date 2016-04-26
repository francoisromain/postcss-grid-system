# postcss-grid-system 

[![npm version][npm-img]][npm] [![Build Status][ci-img]][ci] [![Dependency Status][dep-img]][dep]

[francoisromain.github.io/postcss-grid-system][github.io]

A [PostCSS] plugin to create grids based on a fixed column width.

[github.io]: http://francoisromain.github.io/postcss-grid-system
[PostCSS]:   https://github.com/postcss/postcss
[ci-img]:    https://travis-ci.org/francoisromain/postcss-grid-system.svg
[ci]:        https://travis-ci.org/francoisromain/postcss-grid-system
[npm-img]:   https://badge.fury.io/js/postcss-grid-system.svg
[npm]:       https://badge.fury.io/js/postcss-grid-system
[dep-img]:   https://david-dm.org/francoisromain/postcss-grid-system.svg
[dep]:       https://david-dm.org/francoisromain/postcss-grid-system

* * * 

## Installation

Install the [npm package](https://www.npmjs.com/package/postcss-grid-system):

    $ npm install postcss-grid-system --save-dev

Require with PostCSS:

``` js
postcss([ require('postcss-grid-system') ])
```

See [PostCSS docs](https://github.com/postcss/postcss#usage) to setup with Gulp, Grunt, Webpack, npm scripts… 

* * * 

## Configuration

Global settings (and default values):

``` css

@gs {
  width:   20.5rem;  /* width of a single column */
  gutter:  1.5rem;   /* width of the gutter */
  padding: 1.5rem;   /* padding of the main container */
  max:     8;        /* maximum number of blocs (wide screens) */
  min:     2;        /* minimum number of blocs (mobile) */
  align:   center;   /* center or left */ 
  display: flex;     /* float or flex */  
}
```

A **breakpoint** is created for each value from _min_ to _max_. When the screen is narrower than _min_ * _width_, elements are fluids. 

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
@gs-media [breakpoint] {
    .my-class {
        …
    }
}
```

- _breakpoint_: apply classes when the screen is wider than _breakpoint_. To set the default styles (mobile first), use `@gs-media 0 { …`.

##### Example

00: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/00.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/00.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/00.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/00.html)

### Containers

`gs: container`

The container width is set for each _breakpoint_.

##### Example

``` css

.my-container {
  gs: container;
}

```

01: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/01.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/01.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/01.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/01.html)

### Rows

`gs: row`

Rows are intended to contain either a _bloc_ or a _fraction_ element. They have a negative right margin.

##### Example

``` css

.my-row {
  gs: row;
}

```

02: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/02.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/02.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/02.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/02.html)

### Blocs

`gs: bloc [width](-[offset])`

Blocs have a fixed width.

- _width_: width of the bloc.
- _offset_ (optional): remaining space before the bloc can take its width. if (_width_ + _offset_) is wider than _breakpoint_, then _width_ shrinks first.

##### Example

``` css

.my-bloc {
  gs: bloc 2;
}

.my-bloc-with-offset {
  gs: bloc 2-3;
}

```

03: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/03.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/03.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/03.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/03.html)

04: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/04.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/04.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/04.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/04.html)

### Fractions

`gs: fraction [ratio]/[total]`

- _ratio_: fraction of the _total_.
- _total_: divider, relative to _width_.

##### Example

``` css

.my-fraction {
  gs: fraction 3/2;
}

```

05: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/05.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/05.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/05.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/05.html)


### Columns

`gs: columns [columns](-[offset])`

- _columns_: number of columns.
- _offset_ (optional): remaining space before the columns are active. If (_columns_ + _offset_) is greater than _breakpoint_, then _columns_ shrinks first.

##### Example

``` css

.my-columns {
  gs: columns 4;
}

.my-columns-with-offset {
  gs: columns 4-2;
}

```

06: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/06.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/06.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/06.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/06.html)

07: [input](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/src/07.css), [output](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/dist/07.css), [markup](https://github.com/francoisromain/postcss-grid-system/blob/gh-pages/test/07.html), [demo](http://francoisromain.github.io/postcss-grid-system/test/07.html)

