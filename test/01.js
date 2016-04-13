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
  structure-element: container;
}
`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto
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
