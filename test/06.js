const tests = {
  input: `@gs {}

.container {
  gs: container;
}

@gs-media 2 {
  .columns-2-4 {
    gs: columns 4;
  }

  .columns-2-4-bis {
    gs: columns 4;
  }
}

@gs-media 3 {
  .columns-3-8 {
    gs: columns 8;
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
@media (min-width: 42.5rem) {
    .container {
        width: 42.5rem
    }
    .columns-2-4,.columns-2-4-bis {
        column-count: 2
    }
}
@media (min-width: 63rem) {
    .container {
        width: 63rem
    }
    .columns-2-4,.columns-2-4-bis, .columns-3-8 {
        column-count: 3
    }
}
@media (min-width: 83.5rem) {
    .container {
        width: 83.5rem
    }
    .columns-2-4,.columns-2-4-bis, .columns-3-8 {
        column-count: 4
    }
}
@media (min-width: 104rem) {
    .container {
        width: 104rem
    }
    .columns-3-8 {
        column-count: 5
    }
}
@media (min-width: 124.5rem) {
    .container {
        width: 124.5rem
    }
    .columns-3-8 {
        column-count: 6
    }
}
@media (min-width: 145rem) {
    .container {
        width: 145rem
    }
    .columns-3-8 {
        column-count: 7
    }
}
@media (min-width: 165.5rem) {
    .container {
        width: 165.5rem
    }
    .columns-3-8 {
        column-count: 8
    }
}
`
}

export default tests
