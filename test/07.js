const tests = {
  input: `@gs {}

.container {
  gs: container;
}


@gs-media 2 {
  .columns-2-2-4 {
    gs: columns 2-4;
  }

  .columns-2-2-4-bis {
    gs: columns 2-4;
  }
}

@gs-media 4 {
  .columns-4-2-2 {
    gs: columns 2-2;
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
.columns-2-2-4, .columns-2-2-4-bis, .columns-4-2-2 {
    column-gap: 1.5rem
}
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 1
    }
}
@media (min-width: 64rem) {
    .container {
        width: 63rem
    }
}
@media (min-width: 84.5rem) {
    .container {
        width: 83.5rem
    }
    .columns-4-2-2 {
        column-count: 2
    }
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 1
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 2
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
