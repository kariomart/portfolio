// Set the URL of the CSV file
const url = 'data.csv';
let parsedData;
let descIndex;
let titleIndex

// Use fetch() to retrieve the CSV data
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data using Papa Parse
    parsedData = Papa.parse(data, { header: true });
    // Get the rows from the parsed data
    const rows = parsedData.data;

    // Get the indices of the required columns
    titleIndex = parsedData.meta.fields.indexOf("Title");
    const clientIndex = parsedData.meta.fields.indexOf("Client");
    const dateIndex = parsedData.meta.fields.indexOf("Date");
    const typeIndex = parsedData.meta.fields.indexOf("Type");
    descIndex = parsedData.meta.fields.indexOf("Description");
    console.log(parsedData.meta.fields);
    console.log(descIndex);

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

    table.appendChild(headerRow);

    for (let row of rows) {
      const tr = document.createElement('tr');

      tr.dataset.img = "images/" + row[parsedData.meta.fields[0]] + ".png"; // Add custom data attribute to the row

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

      table.appendChild(tr);
    }

    // Add the table to the page
    const container = document.body;
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
      selected = false;
  });

  table.addEventListener('animationend', () => {
      myDiv.style.display = 'block';
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
      
      const h2 = document.querySelector('#project-div h2');
      const h1 = document.querySelector('#project-div h1');
      selected = true;

      const desc = parsedData.data[row.rowIndex-1].Description;
      const title = parsedData.data[row.rowIndex-1].Title;

      h1.textContent = title;
      h2.textContent = desc;
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

