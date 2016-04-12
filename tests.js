const tests = {
  containerInput: `@structure {
  unit: 18;
  gutter: 1.5;
  padding: 1.5;
  max: 8;
  min: 2;
  display: 'float';
  align: 'center';
}

.container {
  structure-element: container;
}

.row {
  structure-element: row;
}

.bloc-2-6-1 {
  structure-bloc: 2-6-1;
}

.bloc-3-6-2 {
  structure-bloc: 3-6-2;
}`,
  containerOutput: `.container {
padding-left: 24px;
padding-left: 1.5rem;
padding-right: 24px;
padding-right: 1.5rem;
margin-left: auto;
margin-right: auto;

}

.row {
clear: both;
margin-right: -24px;
margin-right: -1.5rem;

}

.row:after {
content: "";
display: table;
clear: both;

}

.bloc-2-6-1, .bloc-3-6-2 {
margin-right: 24px;
margin-right: 1.5rem;
margin-bottom: 24px;
margin-bottom: 1.5rem;
clear: both;

}

@media (min-width: 40.501rem) {

.container {
width: 37.5rem;

}

.bloc-2-6-1 {
float: left;
clear: none;

}

.bloc-2-6-1 {
width: 16.5rem;

}

}

@media (min-width: 58.501rem) {

.container {
width: 55.5rem;

}

.bloc-3-6-2 {
float: left;
clear: none;

}

.bloc-2-6-1 {
width: 34.5rem;

}

}

@media (min-width: 76.501rem) {

.container {
width: 73.5rem;

}

}

@media (min-width: 94.501rem) {

.container {
width: 91.5rem;

}

}

@media (min-width: 112.501rem) {

.container {
width: 109.5rem;

}

}

@media (min-width: 130.501rem) {

.container {
width: 127.5rem;

}

}

@media (min-width: 148.501rem) {

.container {
width: 145.5rem;

}

}`,
};

export default tests;
