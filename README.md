# postcss-structure [![Build Status][ci-img]][ci]

[francoisromain.github.io/postcss-structure](http://francoisromain.github.io/postcss-structure)

A [PostCSS] plugin to create grid systems based on a fixed column width.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

* * * 

## Installation

Install the [npm module](https://www.npmjs.com/package/postcss-structure):

    $ npm install postcss-structure --save-dev

Require the PostCSS plugin:

``` js
postcss([ require('postcss-structure') ])
```

See [PostCSS usage](https://github.com/postcss/postcss#usage) to setup with Gulp, Grunt, Webpack, npm scripts… 

##### Example with a [npm script](https://docs.npmjs.com/misc/scripts) and [postcss-cli](https://www.npmjs.com/package/postcss-cli):

    $ npm install postcss-cli --save-dev

Add a script to package.json:

``` js
"scripts": {
  "build": "postcss -u postcss-structure -i src/styles.css -o dist/styles.css"
}
```

    $ npm run build

* * * 

## Configuration

Global settings rule (and default values):

``` css

@structure {
  unit:    20.5rem,  /* width of a single column */
  gutter:  1.5rem,   /* width of the gutter */
  padding: 1.5rem,   /* padding of the main container */
  max:     8,        /* maximum number of blocs (wide screens) */
  min:     2,        /* minimum number of blocs (mobile) */
  align:   center,   /* center or left */ 
  display: flex      /* float or flex */  
}
```

A media-query is created for each _unit_ multiple, from _min_ to _max_. When the screen is narrower than _min_ * _unit_, elements are fluids. 

* * * 

## Usage

- [Containers](#containers)
- [Rows](#rows)
- [Blocs](#blocs)
- [Fractions](#fractions)
- [Blobs](#blobs)
- [Columns](#columns)
- [Show](#show)
- [Hide](#hide)
- [Right](#right)
- [Custom styles](#custom-styles)

### Containers

`structure: container`

The container width is set for each media-query.

``` css

.my-container {
  structure: container;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/01.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/01.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/01.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/01.html)

### Rows

`structure: row`

Rows are intended to contain either a _bloc_ or a _blob_ element. They have a negative right margin.

``` css

.my-row {
  structure: row;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/02.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/02.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/02.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/02.html)

### Blocs

`structure: bloc [breakpoint]-[width](-[offset])`

Blocs have a fixed width.

- _breakpoint_: number of _units_ that fit into the screen. If the screen is narrower than the _breakpoint_, the bloc is fluid and takes full width.
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

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/03.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/03.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/03.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/03.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/04.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/04.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/04.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/04.html)

### Fractions

`structure: fraction [ratio]/[total]`

- _ratio_: fraction of the _total_.
- _total_: divider, relative to _unit_.

``` css

.my-fraction {
  structure: fraction 3/2;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/05.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/05.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/05.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/05.html)

### Blobs

`structure: blob [breakpoint]-[ratio]/[total]`

Unlike blocs, blobs width will change depending on the breakpoint.

- _breakpoint_: number of _units_ that fit in the screen.
- _ratio_: fraction of the _total_.
- _total_: divider, relative to the _breakpoint_.

``` css

.my-blob {
  structure: blob 3-2/3;
}

```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/06.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/06.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/06.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/06.html)

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

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/07.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/07.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/07.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/07.html)

Example (with offset): [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/08.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/08.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/08.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/08.html)

### Show

`structure: show [breakpoint]`

- _breakpoint_: the element is made visible when the screen is wider than _breakpoint_. A class has to be defined above in the CSS to make it invisible. 

``` css
.my-element {
  structure: show 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/09.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/09.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/09.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/09.html)

### Hide

`structure: hide [breakpoint]`

- _breakpoint_: the element is hidden when the screen is wider than _breakpoint_. 

``` css
.my-element {
  structure: hide 3;
}
```

### Right

`structure: right [breakpoint]`

- _breakpoint_: the element is pushed to the right when the screen is wider than _breakpoint_.

``` css
.my-element {
  structure: right 3;
}
```

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/10.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/10.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/10.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/10.html)

### Custom styles

``` css
@structure-media [breakpoint] {
    .myClass {
        …
    }
}
```

- _breakpoint_: classes are applied when the screen is wider than breakpoint. To set the default styles (mobile first), use `@structure-media 0 { …`.

Example: [input](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/src/11.css), [output](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/dist/11.css), [markup](https://github.com/francoisromain/postcss-structure/blob/gh-pages/test/11.html), [demo](http://localhost/francoisromain.github.io/postcss-structure/test/11.html)
