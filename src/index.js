import "./styles.css";

const populationTable = document.getElementById("my-table");
const populationTablebody = document.getElementById("my-tablebody");


getData();

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const datasetPromise = await fetch(url);
  const datasetJSON = await datasetPromise.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const datasetPromise2 = await fetch(url2);
  const datasetJSON2 = await datasetPromise2.json();

  //console.log(datasetJSON)
  //const populationData = datasetJSON.dataset.value;
  //const municipalityData = datasetJSON.dataset.dimension.Alue.category.label;

  //console.log(typeof populationData);
  //console.log(typeof municipalityData);
  const listOfMunicipality = [];
  const listOfPopulation = [];
  const listOfEmployment = [];
  const listOfPercents = [];

  for (let key in datasetJSON.dataset.dimension.Alue.category.label) {
    let item = datasetJSON.dataset.dimension.Alue.category.label[key];
    listOfMunicipality.push(item);
  }
  //console.log(listOfMunicipality);

  for (let key in datasetJSON.dataset.value) {
    let item = datasetJSON.dataset.value[key];
    listOfPopulation.push(item);
  }
  //console.log(listOfPopulation);
  for (let key in datasetJSON2.dataset.value) {
    let item = datasetJSON2.dataset.value[key];
    listOfEmployment.push(item);
  }
  for (let i = 0; i < listOfPopulation.length; i++) {
    listOfPercents.push(
      ((listOfEmployment[i] / listOfPopulation[i]) * 100).toFixed(2) + "%"
    );
  }

  const allArrays = [
    listOfMunicipality,
    listOfPopulation,
    listOfEmployment,
    listOfPercents
  ];

  buildTable();

  function buildTable() {
    //let table = document.createElement("table");
    let trOne = document.createElement("tr");
    let thOne = document.createElement("th");
    thOne.innerHTML = "Municipality";
    let thTwo = document.createElement("th");
    thTwo.innerHTML = "Population";
    let thThree = document.createElement("th");
    thThree.innerHTML = "Employment";
    let thFour = document.createElement("th");
    thFour.innerHTML = "Employment-%";
    trOne.appendChild(thOne);
    trOne.appendChild(thTwo);
    trOne.appendChild(thThree);
    trOne.appendChild(thFour);
    populationTable.appendChild(trOne);

    for (let i = 0; i < allArrays[0].length; i++) {
      let trTwo = document.createElement("tr");
      let tdOne = document.createElement("td");
      tdOne.innerHTML = allArrays[0][i];
      let tdTwo = document.createElement("td");
      tdTwo.innerHTML = allArrays[1][i];
      let tdThree = document.createElement("td");
      tdThree.innerHTML = allArrays[2][i];
      let tdFour = document.createElement("td");
      tdFour.innerHTML = allArrays[3][i];

      if (allArrays[3][i] > "45.00%") {
        //console.log("something happened" + allArrays[3][i]);
        trTwo.classList.add("overcolour");
        //trTwo.appendChild(tdFour);
      } else if (allArrays[3][i] < "25.00%") {
        //console.log("something happened in else" + allArrays[3][i]);
        trTwo.classList.add("undercolour");
      }
      trTwo.appendChild(tdOne);
      trTwo.appendChild(tdTwo);
      trTwo.appendChild(tdThree);
      trTwo.appendChild(tdFour);

      populationTablebody.appendChild(trTwo);
    }
    populationTable.appendChild(populationTablebody);
    document.body.appendChild(populationTable);
    //reference for creating buildTable(): https://stackoverflow.com/questions/47999155/how-to-create-html-table-rows-from-multiple-arrays-of-data-in-javascript
  }
}
