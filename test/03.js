const tests = {
  input: `@gs {}

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
    gs: bloc 2;
  }
}

@gs-media 5 {
  .bloc-5-3 {
    gs: bloc 3 right;
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
    margin-right: -1.5rem;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start
}
.row::after {
    content: "";
    display: table;
    clear: both
}
.bloc-3-2, .bloc-3-2-bis, .bloc-5-3 {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    flex: 0 1 100%
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
    .bloc-3-2,.bloc-3-2-bis {
        flex: 0 1 39.5rem
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
        margin-left: auto
    }
    .bloc-5-3 {
        flex: 0 1 60rem
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
