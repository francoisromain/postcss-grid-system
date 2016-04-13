const tests = {
  input: `.row {
  clear: both;
  margin-right: -1.5rem
}

.row:after {
  content: "";
  display: table;
  clear: both
}

.bloc {
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  float: left;
  width: 16.5rem;
}

@structure {
  unit: 20.5rem;
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

.right-3 {
  structure: right 3;
}

.right-5 {
  structure: right 5;
}
`,
  output: `.row {
  clear: both;
  margin-right: -1.5rem
}

.row:after {
  content: "";
  display: table;
  clear: both
}

.bloc {
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  float: left;
  width: 16.5rem;
}

.container {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto
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

  .right-3 {
    float: right
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

  .right-5 {
    float: right
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
