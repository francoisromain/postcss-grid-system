# PostCSS-structure [![Build Status][ci-img]][ci]

http://francoisromain.github.io/postcss-structure/

A [PostCSS] plugin to create CSS grids based on a fixed block width.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

## Usage

Install PostCSS-structure from npm:

```
$ npm install postcss-structure --save-dev
```

Check [PostCSS usage instructions](https://github.com/postcss/postcss#usage) to setup with Gulp, Grunt, Webpack, Npm scripts… 

Add PostCSS-structure to the required PostCSS plugins:

``` js
postcss([ require('postcss-structure') ])
```

For example with a [Npm script](https://docs.npmjs.com/misc/scripts) and [postcss-cli](https://www.npmjs.com/package/postcss-cli), add this to package.json: 

```
"scripts": {
  "start": "postcss -u postcss-structure -i src/styles.css -o dist/styles.css"
}
// -i is the input -o is the output
```

Run the script: 

```
$ npm start
```


## Settings

- [Global](#global)
- [Container](#containers)
- [Rows](#rows)
- [Blocs](#blocs)
- [Bloc fractions](#bloc-fractions)
- [Blobs](#blobs)
- [Columns](#columns)
- [Show](#show)
- [Right](#right)

### Global

- _unit_: width of a single column
- _gutter_: width of the gutter
- _padding_: padding of the main container
- _max_: maximum number of blocs
- _min_: minimum number of blocs
- _align_: center or left
- _display_: float or flex

A media-query is created for each _unit_ multiple, from _min_ to _max_.

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


### Containers

`structure: container`

The container width is defined for each media-query.

``` css

.my-container {
  structure: container;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/01.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/01.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/01.html)

### Rows

`structure: row`

Rows have a negative right margin and are intended to contain either a _bloc_ or a _blob_ element.

``` css

.my-row {
  structure: row;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/02.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/02.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/02.html)

### Blocs

`structure: bloc [breakpoint]-[width](-[offset])`

Blocs have a fixed width.

- _breakpoint_: number of _units_ that fit into the screen. If the screen is narrower than the _breakpoint_, the bloc takes full width.
- _width_: width of the bloc.
- _offset_ (optional): remaining space before the bloc can take its width. if (_width_ + _offset_) is wider than _breakpoint_, then _width_ shrinks first.

``` css

.my-bloc {
  structure: bloc 3-2;
}

.my-bloc-with-offset {
  structure: bloc 3-2-3;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/03.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/03.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/03.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/04.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/04.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/04.html)

### Bloc fractions

`structure: fraction [ratio]/[total]`

- _ratio_: fraction of the total in one row.
- _total_: aribitrary divider, relative to _unit_.

``` css

.my-fraction {
  structure: fraction 3/2;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/05.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/05.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/05.html)

### Blobs

`structure: blob [breakpoint]-[ratio]/[total]`

Unlike blocs, blobs width will change depending on the breakpoint.

- _breakpoint_: number of _units_ that fit in the screen.
- _ratio_: fraction of the _total_.
- _total_: aribitrary divider, relative to the _breakpoint_.

``` css

.my-blob {
  structure: blob 3-2/3;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/06.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/06.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/06.html)

### Columns

`structure: columns [breakpoint]-[columns](-[offset])`

- _breakpoint_:  number of _units_ that fit into the screen. If the screen is narrower than the _breakpoint_, the element has one column.
- _columns_: number of columns.
- _offset_ (optional): remaining space before the columns are active. If (_columns_ + _offset_) is greater than _breakpoint_, then _columns_ shrinks first.

``` css

.my-columns {
  structure: columns 3-4;
}

.my-columns-with-offset {
  structure: columns 3-4-2;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/07.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/07.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/07.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/08.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/08.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/08.html)

### Show

`structure: show [breakpoint]`

- _breakpoint_: the element is made visible when the screen is wider than _breakpoint_. A class has to be defined above in the CSS to make it invisible. 

``` css
.my-element {
  structure: show 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/09.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/09.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/09.html)

### Right

`structure: right [breakpoint]`

- _breakpoint_: the element is pushed to the right when the screen is wider than _breakpoint_.

``` css
.my-element {
  structure: right 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/10.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/10.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/10.html)
