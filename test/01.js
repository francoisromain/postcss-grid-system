const tests = {
  input: `@gs {}

.container {
  gs: container;
}
`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto
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
` };

export default tests;
