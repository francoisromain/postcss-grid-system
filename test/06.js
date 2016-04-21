const tests = {
  input: `@s-grid {}

.container {
  s-grid: container;
}

@s-grid-media 2 {
  .columns-2-4 {
    s-grid: columns 4;
  }

  .columns-2-4-bis {
    s-grid: columns 4;
  }
}

@s-grid-media 3 {
  .columns-3-8 {
    s-grid: columns 8;
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
.columns-2-4, .columns-2-4-bis, .columns-3-8 {
    column-gap: 1.5rem
}
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
    }
    .columns-2-4,.columns-2-4-bis {
        column-count: 2
    }
}
@media (min-width: 64rem) {
    .container {
        width: 63rem
    }
    .columns-2-4,.columns-2-4-bis, .columns-3-8 {
        column-count: 3
    }
}
@media (min-width: 84.5rem) {
    .container {
        width: 83.5rem
    }
    .columns-2-4,.columns-2-4-bis, .columns-3-8 {
        column-count: 4
    }
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
    .columns-3-8 {
        column-count: 5
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
    }
    .columns-3-8 {
        column-count: 6
    }
}
@media (min-width: 146rem) {
    .container {
        width: 145rem
    }
    .columns-3-8 {
        column-count: 7
    }
}
@media (min-width: 166.5rem) {
    .container {
        width: 165.5rem
    }
    .columns-3-8 {
        column-count: 8
    }
}
`,
};

export default tests;
