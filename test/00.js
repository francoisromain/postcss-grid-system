const tests = {
  input: `@gs {}

.container {
  gs: container;
}

@gs-media 0 {
  .one {
    background-color: plum;
    & .three {
      color: red;
    }
  }
}

@gs-media 1 {
  .one {
    background-color: palegreen;
  }
}

@gs-media 2 {
  .one {
    background-color: deeppink;
  }
}

@gs-media 3 {
  .one {
    background-color: orangered;
  }
}

@gs-media 4 {
  .one {
    background-color: dodgerblue;
  }
}

@gs-media 5 {
  .one {
    background-color: lightcoral;
  }
}

@gs-media 6 {
  .one {
    background-color: gold;
  }
}

@gs-media 0 {
  .two {
    background-color: plum;
    color: white;
  }
}

@gs-media 2 {
  .two {
    background-color: deeppink;
    color: silver;
  }
}`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
}
  .one {
    background-color: plum;
    & .three {
      color: red;
    }
  }
  .two {
    background-color: plum;
    color: white;
  }
  @media (min-width: 42.5rem) {
    .container {
        width: 42.5rem;
    }
  .one {
    background-color: deeppink;
  }
  .two {
    background-color: deeppink;
    color: silver;
  }
}
  @media (min-width: 63rem) {
    .container {
        width: 63rem;
    }
  .one {
    background-color: orangered;
  }
}
  @media (min-width: 83.5rem) {
    .container {
        width: 83.5rem;
    }
  .one {
    background-color: dodgerblue;
  }
}
  @media (min-width: 104rem) {
    .container {
        width: 104rem;
    }
  .one {
    background-color: lightcoral;
  }
}
  @media (min-width: 124.5rem) {
    .container {
        width: 124.5rem;
    }
  .one {
    background-color: gold;
  }
}
  @media (min-width: 145rem) {
    .container {
        width: 145rem;
    }
}
  @media (min-width: 165.5rem) {
    .container {
        width: 165.5rem;
    }
}` };

export default tests;
