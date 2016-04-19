const tests = {
  input: `@structure {
  unit: 20.5rem;
  gutter: 1.5rem;
  padding: 1.5rem;
  max: 8;
  min: 2;
  display: flex;
  align: center;
}

.container {
  structure: container;
}

@structure-media 0 {
  .custom-1 {
    background-color: plum;
  }
}

@structure-media 1 {
  .custom-1 {
    background-color: palegreen;
  }
}

@structure-media 2 {
  .custom-1 {
    background-color: deeppink;
  }
}

@structure-media 3 {
  .custom-1 {
    background-color: orangered;
  }
}

@structure-media 4 {
  .custom-1 {
    background-color: dodgerblue;
  }
}

@structure-media 5 {
  .custom-1 {
    background-color: lightcoral;
  }
}

@structure-media 6 {
  .custom-1 {
    background-color: gold;
  }
}

@structure-media 0 {
  .custom-2 {
    background-color: plum;
    color: white;
  }
}

@structure-media 2 {
  .custom-2 {
    background-color: deeppink;
    color: silver;
  }
}
`,
  output: `.container {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
}

.custom-1 {
  background-color: plum;
}

.custom-2 {
  background-color: plum;
  color: white;
}

@media (min-width: 43.5rem) {

  .container {
    width: 42.5rem;
  }

  .custom-1 {
    background-color: deeppink;
  }

  .custom-2 {
    background-color: deeppink;
    color: silver;
  }
}

@media (min-width: 64rem) {

  .container {
    width: 63rem;
  }

  .custom-1 {
    background-color: orangered;
  }
}

@media (min-width: 84.5rem) {

  .container {
    width: 83.5rem;
  }

  .custom-1 {
    background-color: dodgerblue;
  }
}

@media (min-width: 105rem) {

  .container {
    width: 104rem;
  }

  .custom-1 {
    background-color: lightcoral;
  }
}

@media (min-width: 125.5rem) {

  .container {
    width: 124.5rem;
  }

  .custom-1 {
    background-color: gold;
  }
}

@media (min-width: 146rem) {

  .container {
    width: 145rem;
  }
}

@media (min-width: 166.5rem) {

  .container {
    width: 165.5rem;
  }
}

@structure-media 0 {
  .custom-1 {
    background-color: plum;
  }
}

@structure-media 1 {
  .custom-1 {
    background-color: palegreen;
  }
}

@structure-media 2 {
  .custom-1 {
    background-color: deeppink;
  }
}

@structure-media 3 {
  .custom-1 {
    background-color: orangered;
  }
}

@structure-media 4 {
  .custom-1 {
    background-color: dodgerblue;
  }
}

@structure-media 5 {
  .custom-1 {
    background-color: lightcoral;
  }
}

@structure-media 6 {
  .custom-1 {
    background-color: gold;
  }
}

@structure-media 0 {
  .custom-2 {
    background-color: plum;
    color: white;
  }
}

@structure-media 2 {
  .custom-2 {
    background-color: deeppink;
    color: silver;
  }
}
`,
};

export default tests;
