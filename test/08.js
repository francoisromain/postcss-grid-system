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

.columns-2-2-4 {
  structure: columns 2-2-4;
}

.columns-4-2-2 {
  structure: columns 4-2-2;
}

.columns-2-2-4-bis {
  structure: columns 2-2-4;
}
`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto
}
.columns-2-2-4, .columns-2-2-4-bis, .columns-4-2-2 {
    column-gap: 1.5rem
}
@media (min-width: 40.5rem) {
    .container {
        width: 37.5rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 1
    }
}
@media (min-width: 58.5rem) {
    .container {
        width: 55.5rem
    }
}
@media (min-width: 76.5rem) {
    .container {
        width: 73.5rem
    }
    .columns-4-2-2 {
        column-count: 2
    }
}
@media (min-width: 94.5rem) {
    .container {
        width: 91.5rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 1
    }
}
@media (min-width: 112.5rem) {
    .container {
        width: 109.5rem
    }
    .columns-2-2-4,.columns-2-2-4-bis {
        column-count: 2
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
