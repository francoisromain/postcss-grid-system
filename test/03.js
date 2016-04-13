const tests = {
  input: `@structure {
  unit: 18rem;
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
.bloc-3-2, .bloc-3-2-bis, .bloc-5-3 {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    clear: both
}
@media (min-width: 40.5rem) {
    .container {
        width: 37.5rem
    }
}
@media (min-width: 58.5rem) {
    .container {
        width: 55.5rem
    }
    .bloc-3-2,.bloc-3-2-bis {
        float: left;
        clear: none
    }
    .bloc-3-2,.bloc-3-2-bis {
        width: 34.5rem
    }
}
@media (min-width: 76.5rem) {
    .container {
        width: 73.5rem
    }
}
@media (min-width: 94.5rem) {
    .container {
        width: 91.5rem
    }
    .bloc-5-3 {
        float: left;
        clear: none
    }
    .bloc-5-3 {
        width: 52.5rem
    }
}
@media (min-width: 112.5rem) {
    .container {
        width: 109.5rem
    }
}
@media (min-width: 130.5rem) {
    .container {
        width: 127.5rem
    }
}
@media (min-width: 148.5rem) {
    .container {
        width: 145.5rem
    }
}
`,
};

export default tests;
