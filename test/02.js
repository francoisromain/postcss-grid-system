const tests = {
  input: `@gs {}

.container {
  gs: container;
}

.row {
  gs: row;
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
@media (min-width: 43.5rem) {
    .container {
        width: 42.5rem
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
}
@media (min-width: 105rem) {
    .container {
        width: 104rem
    }
}
@media (min-width: 125.5rem) {
    .container {
        width: 124.5rem
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
