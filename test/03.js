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

.bloc-3-2 {
  structure: bloc 3-2;
}

.bloc-5-3 {
  structure: bloc 5-3;
}

.bloc-3-2-bis {
  structure: bloc 3-2;
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
.row::after {
    content: "";
    display: table;
    clear: both
}
.bloc-3-2, .bloc-3-2-bis, .bloc-5-3 {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    clear: both
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
    .bloc-3-2,.bloc-3-2-bis {
        float: left;
        clear: none
    }
    .bloc-3-2,.bloc-3-2-bis {
        width: 39.5rem
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
    .bloc-5-3 {
        float: left;
        clear: none
    }
    .bloc-5-3 {
        width: 60rem
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
