# PostCSS-structure [![Build Status][ci-img]][ci]

[PostCSS] plugin to create grids based on a fixed block width.

See in action here: [structure.css](http://francoisromain.github.io/structure.css/#grids)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/francoisromain/postcss-structure.svg
[ci]:      https://travis-ci.org/francoisromain/postcss-structure

PostCSS-structure outputs a few CSS classes to make grids. 

The idea behind PostCSS-structure is that the bloc width is fixed and doesn't change depending on the screen-size. Media-queries are created depending the number of bloc that fits in the page. 

## Usage

``` js
postcss([ require('postcss-structure') ])
```

``` css
@structure {
  width:   18,       /* width of a bloc in rem */  
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

##### width

The width of one bloc (in rem): integer, default to `18`.

#### gutter

The width of the gutter between blocs (in rem): integer, default to `1.5`. 

#### padding

The padding of the main container (in rem): integer, default to `1.5`.

#### max

The maximum amount of blocs on wide screens: integer, default to `8`. 

#### min 

The minimum amount of blocs on narrow screens: integer, default to `2`.

#### thumb

The number of .bloc-thumb fitting in one bloc: integer, default to `3`. This output something like: `.bloc-thumb { width: width / thumb }`. 

#### align

Center or align-left the main container: `'center'` (default) or `'left'`.

#### display

Use floats or flexbox: `'flex'` (default) or `'float'`.

#### blocs

Output .blocs classes: `1` (default) or `0`. 

#### blobs

Output .blobs classes: `1` (default) or `0`. 

#### columns

Output .columns classes: `1` (default) or `0`. 

#### rights

Output .rights classes: `1` (default) or `0`. 

#### shows

Output .shows classes: `1` (default) or `0`. 

## Output example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/dist/css/styles.css#L1286)


## Markup example

See here: [structure.css](https://github.com/francoisromain/structure.css/blob/gh-pages/index.html#L265)


## To do

- [ ] Add markup example in README.md
- [ ] Add Css output example in README.md
- [ ] Add unit to declaration (p.e.: width: 18rem) 
- [ ] Make rtl
