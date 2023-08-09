var currentData ;
document.getElementById('getDatas').addEventListener('click', async function () {
  displayData();
});

document.getElementById("getParticularDatas").addEventListener("click",async function(){
  var inputValue = document.getElementById("dataId").value;
  displayData(parseInt(inputValue));
})

const displayData = async(inputValue) =>{
  deletePreviousElement();
  const datas = await getDatas(inputValue);
  if (datas) {
    const mainHeading = createMainHeading();
    document.body.appendChild(mainHeading);

    // Heading for list items
    const listHeading = createListMainHeading();
    document.body.appendChild(listHeading);

    // Creating list items from database values
    const ulListItems = createULItems(datas);
    document.body.appendChild(ulListItems);

    // Creating the table Heading
    const tableMainHeading = createTableMainHeading();
    document.body.appendChild(tableMainHeading);

    // Creating the table from the data base values
    const tableDatas = createTableDatas(datas);

    // Append in the document body
    document.body.appendChild(tableDatas);
  }
}

const createTableDatas = (datas) => {
  let table = document.createElement('table');
  table.id = 'dataTable';
  table.cellSpacing = '0px';
  const isSingleData = datas && datas.length > 0 ? false : true;
  if (!isSingleData) {
    table = handleDatas(table, datas);
  } else if (isSingleData) {
    table = handleSingleUserData(table, datas);
  }

  return table;
};

const createMainHeading = () => {
  const mainHeading = document.createElement('h1');
  mainHeading.id = 'mainHeading';
  mainHeading.textContent = `Displaying the ${currentData} data from the data base from list and table formats`.toUpperCase();
  mainHeading.style.textAlign = 'center';

  return mainHeading;
};

const createTableMainHeading = () => {
  const tableMainHeading = document.createElement('h2');
  tableMainHeading.id = 'tableHeading';
  tableMainHeading.textContent = `Displaying the ${currentData} datas in table format`;

  return tableMainHeading;
};

const createListMainHeading = () => {
  const listHeading = document.createElement('h2');
  listHeading.id = 'listHeading';
  listHeading.textContent = `Displaying the ${currentData} datas in list`;

  return listHeading;
};

const createULItems = (datas) => {
  const ulElement = document.createElement('ul');
  ulElement.id = 'ulElement';
  const isSingleData = datas && datas.length > 0 ? false : true;
  if (!isSingleData) {
    datas.map((data, index) => {
      // Oreder list creation
      const listElement = document.createElement('li');
      listElement.id = 'liElement' + index;
      for (var dt in data) {
        listElement.innerHTML += `<b>${dt}:</b> ${data[dt]} <br>`;
      }
      ulElement.appendChild(listElement);
    });
  } else if (isSingleData) {
    const listElement = document.createElement('li');
    for (var dt in datas) {
      listElement.innerHTML += `<b>${dt}:</b> ${datas[dt]} <br>`;
    }
    ulElement.appendChild(listElement);
  }

  return ulElement;
};

// Get datas from data base
const getDatas = async (inputValue) => {
  try {
    let url = document.getElementById("datas").value;
    currentData = url.slice("https://jsonplaceholder.typicode.com/".length);  
    if(inputValue){
      url = url + "/" + inputValue;
      inputValue = null;
    }
    const API_URL = url;
    var response = await fetch(API_URL);
    if (!response.ok) {
      var noDataElement = document.createElement('div');
      noDataElement.id = 'noDataElement';
      noDataElement.textContent = 'No Data is available';
      noDataElement.style.fontWeight = 'bold';
      document.body.append(noDataElement);
      return null;
    }
    var data = await response.json();
    return data;
  } catch (err) {
    var noDataElement = document.createElement('div');
    noDataElement.id = 'noDataElement';
    noDataElement.textContent = 'No Data is available';
    noDataElement.style.font = 'bold';
    document.body.append(noDataElement);
    return null;
  }
};

const deletePreviousElement = () => {
  var table = document.getElementById('dataTable');
  if (table) {
    table.remove();
  }
  var ulElement = document.getElementById('ulElement');
  if (ulElement) {
    ulElement.remove();
  }

  var mainHeading = document.getElementById('mainHeading');
  if (mainHeading) {
    mainHeading.remove();
  }

  var listHeading = document.getElementById('listHeading');
  if (listHeading) {
    listHeading.remove();
  }

  var tableHeading = document.getElementById('tableHeading');
  if (tableHeading) {
    tableHeading.remove();
  }

  var noDataElement = document.getElementById('noDataElement');
  if (noDataElement) {
    noDataElement.remove();
  }
};

const handleDatas = (table, datas) => {
  var columnCount = Object.keys(datas[0]).length;

  // Table heading creation
  var tableHeading = document.createElement('thead');

  // Table row creation
  var tableHeadingRow = document.createElement('tr');
  for (var x = 0; x < columnCount; x++) {
    // Table heading creation
    var tableHeadingData = document.createElement('th');
    tableHeadingData.textContent = Object.keys(datas[0])[x].toUpperCase();
    tableHeadingData.style.border = '2px solid black';
    tableHeadingData.style.margin = '0px';
    tableHeadingData.style.fontSize = '18px';
    tableHeadingData.style.padding = '10px';
    tableHeadingRow.appendChild(tableHeadingData);
  }
  tableHeading.appendChild(tableHeadingRow);
  table.appendChild(tableHeading);

  // Table body creation
  const tableBody = document.createElement('tbody');
  datas.map((data) => {
    // Table body row creation
    const tableBodyRow = document.createElement('tr');
    for (let dt in data) {
      // Table body row data creation
      const tableRowData = document.createElement('td');
      tableRowData.textContent = data[dt];
      tableRowData.style.border = '2px solid black';
      tableRowData.style.margin = '0px';
      tableRowData.style.fontSize = '18px';
      tableRowData.style.padding = '10px';
      tableBodyRow.appendChild(tableRowData);
    }
    tableBody.appendChild(tableBodyRow);
  });
  table.appendChild(tableBody);
  return table;
};

const handleSingleUserData = (table, datas) => {
  // Table heading creation
  var tableHeading = document.createElement('thead');

  // Table row creation
  var tableHeadingRow = document.createElement('tr');
  for (var data in datas) {
    var tableHeadingData = document.createElement('th');
    tableHeadingData.textContent = data.toUpperCase();
    tableHeadingData.style.border = '2px solid black';
    tableHeadingData.style.margin = '0px';
    tableHeadingData.style.fontSize = '18px';
    tableHeadingData.style.padding = '10px';
    tableHeadingRow.appendChild(tableHeadingData);
  }
  tableHeading.appendChild(tableHeadingRow);
  table.appendChild(tableHeading);

  // Table body creation
  const tableBody = document.createElement('tbody');
  // Table body row creation
  const tableBodyRow = document.createElement('tr');
  for (let dt in datas) {
    // Table body row data creation
    const tableRowData = document.createElement('td');
    tableRowData.textContent = datas[dt];
    tableRowData.style.border = '2px solid black';
    tableRowData.style.margin = '0px';
    tableRowData.style.fontSize = '18px';
    tableRowData.style.padding = '10px';
    tableBodyRow.appendChild(tableRowData);
  }
  tableBody.appendChild(tableBodyRow);
  table.appendChild(tableBody);
  return table;
};
