const tests = {
  input: `@sstm-grid {}

.container {
  sstm-grid: container;
}

.row {
  sstm-grid: row;
}

@sstm-grid-media 3 {
  .bloc-3-2-6 {
    sstm-grid: bloc 2-6;
  }

  .bloc-3-3-5 {
    sstm-grid: bloc 3-5;
  }

  .bloc-3-3-5-bis {
    sstm-grid: bloc 3-5;
  }
}

@sstm-grid-media 2 {
  .bloc-2-6-1 {
    sstm-grid: bloc 6-1;
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
.bloc-2-6-1, .bloc-3-2-6, .bloc-3-3-5, .bloc-3-3-5-bis {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    flex: 0 1 100%
}
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
    }
    .bloc-2-6-1 {
        flex: 0 1 19rem
    }
}
@media (min-width: 64rem) {
    .container {
        width: 63rem
    }
    .bloc-3-2-6, .bloc-3-3-5,.bloc-3-3-5-bis {
        flex: 0 1 19rem
    }
    .bloc-2-6-1 {
        flex: 0 1 39.5rem
    }
}
@media (min-width: 84.5rem) {
    .container {
        width: 83.5rem
    }
    .bloc-2-6-1 {
        flex: 0 1 60rem
    }
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
    .bloc-2-6-1 {
        flex: 0 1 80.5rem
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
    }
    .bloc-2-6-1 {
        flex: 0 1 101rem
    }
}
@media (min-width: 146rem) {
    .container {
        width: 145rem
    }
    .bloc-3-3-5,.bloc-3-3-5-bis {
        flex: 0 1 39.5rem
    }
    .bloc-2-6-1 {
        flex: 0 1 121.5rem
    }
}
@media (min-width: 166.5rem) {
    .container {
        width: 165.5rem
    }
    .bloc-3-2-6 {
        flex: 0 1 39.5rem
    }
    .bloc-3-3-5,.bloc-3-3-5-bis {
        flex: 0 1 60rem
    }
}
`,
};

export default tests;
