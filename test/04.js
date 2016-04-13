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

.bloc-3-2-6 {
  structure: bloc 3-2-6;
}

.bloc-3-3-5 {
  structure: bloc 3-3-5;
}

.bloc-2-6-1 {
  structure: bloc 2-6-1;
}

.bloc-3-3-5-bis {
  structure: bloc 3-3-5;
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
.bloc-2-6-1, .bloc-3-2-6, .bloc-3-3-5, .bloc-3-3-5-bis {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    clear: both
}
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
    }
    .bloc-2-6-1 {
        float: left;
        clear: none
    }
    .bloc-2-6-1 {
        width: 19rem
    }
}
@media (min-width: 64rem) {
    .container {
        width: 63rem
    }
    .bloc-3-3-5,.bloc-3-3-5-bis, .bloc-3-2-6 {
        float: left;
        clear: none
    }
    .bloc-3-2-6, .bloc-3-3-5,.bloc-3-3-5-bis {
        width: 19rem
    }
    .bloc-2-6-1 {
        width: 39.5rem
    }
}
@media (min-width: 84.5rem) {
    .container {
        width: 83.5rem
    }
    .bloc-2-6-1 {
        width: 60rem
    }
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
    .bloc-2-6-1 {
        width: 80.5rem
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
    }
    .bloc-2-6-1 {
        width: 101rem
    }
}
@media (min-width: 146rem) {
    .container {
        width: 145rem
    }
    .bloc-3-3-5,.bloc-3-3-5-bis {
        width: 39.5rem
    }
    .bloc-2-6-1 {
        width: 121.5rem
    }
}
@media (min-width: 166.5rem) {
    .container {
        width: 165.5rem
    }
    .bloc-3-2-6 {
        width: 39.5rem
    }
    .bloc-3-3-5,.bloc-3-3-5-bis {
        width: 60rem
    }
}
`,
};

export default tests;
