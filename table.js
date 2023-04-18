// Set the URL of the CSV file
const url = 'data.csv';
let parsedData;
let descIndex;
let titleIndex;
let clientIndex;
let roleIndex;
let responsibilitiesIndex;
let toolsIndex;
let dateIndex;
let typeIndex;
let slugIndex;

// Use fetch() to retrieve the CSV data
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data using Papa Parse
    parsedData = Papa.parse(data, { header: true });
    // Get the rows from the parsed data
    const rows = parsedData.data;

    // Get the indices of the required columns
    slugIndex = parsedData.meta.fields.indexOf("Slug");
    titleIndex = parsedData.meta.fields.indexOf("Title");
    clientIndex = parsedData.meta.fields.indexOf("Client");
    roleIndex = parsedData.meta.fields.indexOf("Role");
    responsibilitiesIndex = parsedData.meta.fields.indexOf("Responsibilities");
    toolsIndex = parsedData.meta.fields.indexOf("Tools");
    dateIndex = parsedData.meta.fields.indexOf("Date");
    typeIndex = parsedData.meta.fields.indexOf("Type");
    descIndex = parsedData.meta.fields.indexOf("Description");
    // console.log(parsedData.meta.fields);
    // console.log(descIndex);

    // Generate the HTML table
    const table = document.createElement('table');
    table.classList.add('portfolio-table'); // Add CSS class to the table

    const headers = ["Title", "Client", "Date", "Type"];
    const headerRow = document.createElement('tr');

    for (let header of headers) {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    }

    headerRow.classList.add("not-hoverable"); 
    table.appendChild(headerRow);

    const tbody = document.createElement('tbody');

    for (let row of rows) {
      const tr = document.createElement('tr');

      tr.dataset.img = "images/projects/" + row[parsedData.meta.fields[0]] + "/" + row[parsedData.meta.fields[0]] + ".png"; // Add custom data attribute to the row

      const title = document.createElement('td');
      title.classList.add('portfolio-title'); // Add CSS class to the cell
      title.textContent = row[parsedData.meta.fields[titleIndex]];
      tr.appendChild(title);

      const client = document.createElement('td');
      client.classList.add('portfolio-client'); // Add CSS class to the cell
      client.textContent = row[parsedData.meta.fields[clientIndex]];
      tr.appendChild(client);

      const date = document.createElement('td');
      date.classList.add('portfolio-date'); // Add CSS class to the cell
      date.textContent = row[parsedData.meta.fields[dateIndex]];
      tr.appendChild(date);

      const type = document.createElement('td');
      type.classList.add('portfolio-type'); // Add CSS class to the cell
      type.textContent = row[parsedData.meta.fields[typeIndex]];
      tr.appendChild(type);

      tbody.appendChild(tr);
    }

    tbody.setAttribute("id", "table-body");
    table.appendChild(tbody);

    // Add the table to the page
    const container = document.querySelector('#table-container');
    container.classList.add('portfolio-table-container');
    container.appendChild(table);
    addTableListeners();
  })
  .catch(error => {
    console.error(error);
  });



function addTableListeners() {
  const hoverImage = document.querySelector('.hover-image');
  const tableRows = document.querySelectorAll('tr');
  const table = document.querySelector('table');
  const myDiv = document.querySelector('#project-div');
  const rows = document.querySelectorAll('tr:not(.header)');
  const backbutton = document.getElementById('backtotablebutton');

  let selected = false;

  rows.forEach(row => {
      row.addEventListener('mouseover', () => {
          rows.forEach(r => {
              if (r !== row) {
                  r.style.opacity = '0.5';
              }
          });
      });

      row.addEventListener('mouseout', () => {
          rows.forEach(r => {
              r.style.opacity = '1';
          });
      });
  });

  backbutton.addEventListener('mousedown', () => {
      console.log("backbutton pressed");
      const selectedRow = null; // initialize as null
      table.classList.remove('moved-down');
      hoverImage.style.backgroundImage = '';
      selected = false;
  });

  table.addEventListener('transitionend', () => {
      console.log("animation end!");
      if (!selected){
        const details = document.querySelector('#projectdetails');
        details.style = "display: none;"
      }
  });

  tableRows.forEach(row => {
      row.addEventListener('mouseover', () => {
          if (!selected) {
              const imgUrl = row.dataset.img;
              hoverImage.style.backgroundImage = `url(${imgUrl})`;
          }
      });

    row.addEventListener('mousedown', () => {
      console.log("row clicked");
      const selectedRow = null; // initialize as null
      table.classList.add('moved-down');

      const details = document.querySelector('#projectdetails');
      details.style = "display: grid;"
      
      const i1 = document.querySelectorAll('#projectdetails > div:last-child > img')[0];
      const i2 = document.querySelectorAll('#projectdetails > div:last-child > img')[1];
      const h2 = document.querySelector('#projectdetails > div:last-child > p');
      const h1 = document.querySelector('#projectdetails h1');
      const clientH3 = document.querySelectorAll('#projectdetails div h3')[1];
      const roleH3 = document.querySelectorAll('#projectdetails div h3')[3];
      const responsibilitiesH3 = document.querySelectorAll('#projectdetails div h3')[5];
      const toolsH3 = document.querySelectorAll('#projectdetails div h3')[7];
      selected = true;

      const title = parsedData.data[row.rowIndex-1].Title;
      const desc = parsedData.data[row.rowIndex-1].Description;
      const client = parsedData.data[row.rowIndex-1].Client;
      const role = parsedData.data[row.rowIndex-1].Role;
      const responsibilities = parsedData.data[row.rowIndex-1].Responsibilities;
      const tools = parsedData.data[row.rowIndex-1].Tools;
      const slug = parsedData.data[row.rowIndex-1].Slug;

      h1.textContent = title;
      h2.innerHTML = desc;
      clientH3.textContent = client;
      roleH3.textContent = role;
      responsibilitiesH3.innerHTML = responsibilities;
      toolsH3.innerHTML = tools;

      const path = "images/projects/" + slug + "/";
      console.log(path);
      i1.src = path + slug + "1.png";
      i2.src = path + slug + "2.png";
  
      const imgUrl = row.dataset.img;
      hoverImage.style.backgroundImage = `url(${imgUrl})`;
    });

      row.addEventListener('mouseout', () => {
          console.log(selected);
          if (!selected) {
              hoverImage.style.backgroundImage = '';
          }
      });
  });
}

function restoreFullTable() {
  var table = document.getElementById("table-body");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    rows[i].style.display = "";
  }
}

function filterUIUX() {
  console.log("trying to filter UIUX!");
  var filter = 'ui/ux'
  var table = document.getElementById("table-body");
  let client;

  var rows = table.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    client = rows[i].getElementsByTagName("td")[3].innerHTML.toLowerCase();
    if (client == 'ui/ux') {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}


function filterClient() {
  console.log("trying to filter client!");
  var filter = 'personal'
  var table = document.getElementById("table-body");
  let client;

  var rows = table.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    client = rows[i].getElementsByTagName("td")[1].innerHTML.toLowerCase();
    if (client != 'personal') {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function filterPersonal() {
  console.log("trying to filter personal!");
  var filter = 'personal'
  var table = document.getElementById("table-body");
  let client;

  var rows = table.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    client = rows[i].getElementsByTagName("td")[1].innerHTML.toLowerCase();
    if (client.indexOf(filter) > -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

