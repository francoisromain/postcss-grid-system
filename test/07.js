const tests = {
  input: `@gs {
  display: float;
}

.container {
  gs: container;
}

.row {
  gs: row;
}

@gs-media 3 {
  .bloc-3-2 {
    gs: bloc 2;
  }

  .bloc-3-2-bis {
    gs: bloc 2 right;
  }
}

@gs-media 5 {
  .bloc-5-3 {
    gs: bloc 3;
  }

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
.bloc-3-2-bis, .bloc-3-2, .bloc-5-3 {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    clear: both
}
@media (min-width: 42.5rem) {
    .container {
        width: 42.5rem
    }
}
@media (min-width: 63rem) {
    .container {
        width: 63rem
    }
    .bloc-3-2-bis {
        float: right;
        clear: none
    }
    .bloc-3-2 {
        float: left;
        clear: none
    }
    .bloc-3-2-bis,.bloc-3-2 {
        width: 39.5rem
    }
}
@media (min-width: 83.5rem) {
    .container {
        width: 83.5rem
    }
}
@media (min-width: 104rem) {
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
@media (min-width: 124.5rem) {
    .container {
        width: 124.5rem
    }
}
@media (min-width: 145rem) {
    .container {
        width: 145rem
    }
}
@media (min-width: 165.5rem) {
    .container {
        width: 165.5rem
    }
}
`,
};

export default tests;
