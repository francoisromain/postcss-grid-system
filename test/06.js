const tests = {
  input: `@structure {
  unit: 20.5rem;
  gutter: 1.5rem;
  padding: 1.5rem;
  max: 8;
  min: 2;
  display: float;
  align: center;
}

.container {
  structure: container;
}

.row {
  structure: row;
}

.blob-0-1-8 {
  structure: blob 0-1/8;
}

.blob-3-1-3 {
  structure: blob 3-1/3;
}

.blob-3-2-5 {
  structure: blob 3-2/5;
}

.blob-3-3-5 {
  structure: blob 3-3/5;
}

.blob-3-4-7 {
  structure: blob 3-4/7;
}
`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto
}
.row {
    clear: both;
    margin-right: -1.5rem
}
.row:after {
    content: "";
    display: table;
    clear: both
}
.blob-0-1-8, .blob-3-1-3, .blob-3-2-5, .blob-3-3-5, .blob-3-4-7 {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    clear: both
}
.blob-0-1-8 {
    float: left;
    clear: none
}
.blob-0-1-8 {
    width: calc(12.5% - 1.5rem)
}
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
    }
}
@media (min-width: 64rem) {
    .container {
        width: 63rem
    }
    .blob-3-1-3, .blob-3-2-5, .blob-3-3-5, .blob-3-4-7 {
        float: left;
        clear: none
    }
    .blob-3-1-3 {
        width: calc(33.333333333333336% - 1.5rem)
    }
    .blob-3-2-5 {
        width: calc(40% - 1.5rem)
    }
    .blob-3-3-5 {
        width: calc(60% - 1.5rem)
    }
    .blob-3-4-7 {
        width: calc(57.142857142857146% - 1.5rem)
    }
}
@media (min-width: 84.5rem) {
    .container {
        width: 83.5rem
    }
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
    }
}
@media (min-width: 146rem) {
    .container {
        width: 145rem
    }
}
@media (min-width: 166.5rem) {
    .container {
        width: 165.5rem
    }
}
`,
};

export default tests;
