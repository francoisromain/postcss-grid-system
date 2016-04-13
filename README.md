# PostCSS-structure [![Build Status][ci-img]][ci]

http://francoisromain.github.io/postcss-structure/

A [PostCSS] plugin to create CSS grids based on a fixed block width.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

## Usage

``` js
postcss([ require('postcss-structure') ])
```

## Settings

A media-query is created for each _unit_ multiple, from _min_ to _max_.

- unit: width of a single column
- gutter: width of the gutter
- padding: padding of the main container
- max: maximum number of blocs
- min: minimum number of blocs
- align: center or left
- display: float or flex

``` css

/* default values */ 

@structure {
  unit:    18rem,
  gutter:  1.5rem,
  padding: 1.5rem,
  max:     8,
  min:     2,
  align:   center,
  display: flex      
}
```


## Containers

`structure-element: container`

``` css

.my-container {
  structure-element: container;
}

```

## Rows

`structure-element: row`

``` css

.my-row {
  structure-element: row;
}

```


## Blocs

`structure-bloc: breakpoint-width(-offset)`

Blocs have a fixed width.

- breakpoint: defined by the number of _units_ that fit into the screen. If the screen is narrower than the _breakpoint_, the bloc takes full width.
- width: width of the bloc.
- offset (optional): remaining space before the bloc can take its width. if (_width_ + _offset_) is wider than _breakpoint_, then _width_ shrinks first.

``` css

.my-bloc {
  structure-bloc: 3-2;
}

.my-bloc-with-offset {
  structure-bloc: 3-2-3;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-1.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-1.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-1.css)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-2.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-2.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-2.css)

## Bloc fractions

`structure-fraction: ratio/total`

- ratio: fraction of the total in one row.
- total: aribitrary divider, relative to _unit_.

``` css

.my-fraction {
  structure-fraction: 3/2;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-3.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-3.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-3.css)

## Blobs

`structure-blob: breakpoint-ratio/total`

Unlike blocs, blobs width will change depending on the breakpoint.

- breakpoint: defined by the number of _units_ that fit in the screen.
- ratio: fraction of the _total_.
- total: aribitrary divider, relative to the _breakpoint_.

``` css

.my-blob {
  structure-blob: 3-2/3;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-4.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-4.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-4.css)

## Columns

`structure-columns: breakpoint-columns(-offset)`

- breakpoint:  defined by the number of _units_ that fit into the screen. If the screen is narrower than the _breakpoint_, the element has one column.
- columns: number of columns.
- offset (optional): remaining space before the columns are active. If (_columns_ + _offset_) is greater than _breakpoint_, then _columns_ shrinks first.

``` css

.my-columns {
  structure-columns: 3-4;
}

.my-columns-with-offset {
  structure-columns: 3-4-2;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-7.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-5.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-5.css)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-6.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-6.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-6.css)

## Show

`structure-show: breakpoint`

- breakpoint: the element is made visible when the screen is wider than _breakpoint_. A class has to be defined above in the CSS to make it invisible. 

``` css
.my-element {
  structure-show: 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-7.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-7.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-7.css)

## Right

`structure-right: breakpoint`

- breakpoint: the element is made visible when the screen is wider than _breakpoint_. A class has to be defined above in the CSS to make it invisible. 

``` css
.my-element {
  structure-show: 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/grid-8.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/grid-8.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/index-8.css)

## To do

- [ ] Make rtl
- [ ] write tests
