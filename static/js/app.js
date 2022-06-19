// Create a function to import the data from data.js
const tableData = data;

// Clear the existing data
var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");

  // Use forEach to loop each object in the data file
   data.forEach((dataRow) => {

    // Append the data
    let row = tbody.append("tr");

    // Uses forEach to loop the fields in the rows; We need to add the values in the table
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1.- Create a variable to keep track the filters as an the object in an array.
var filters = [];

// 3.- Use this function to update the filters. 
function updateFilters() {

    // 4a.- Save the element that was changed as a variable. We need to use d3.select(this)
    let changedElement = d3.select(this);
    
    // 4b.- Save the value that was changed as a variable.     
    let elementValue = changedElement.property("value");
    console.log(elementValue);
    
    // 4c.- Save the id of the filter that was changed as a variable. 
    let filterId = changedElement.attr("id");
    console.log(filterId);
    
    // 5.- If a filter value was entered then add that filterId and value to the filters list, otherwise, clear tah filter. 
    // Write an if-else statement that checks if a value was changed. 
    if (elementValue) {
      filters[filterId]=elementValue;
    }
    else {
      delete filters[filterId];
    } 
    // 6.- Call function to apply the filters and recreates the table.
    filterTable();
  }
  
  // 7.- Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8.- Set the filtered data to the tableData.
    let filteredData = tableData;
 
    // 9.- Loop through all of the filters and keep any data that matches the filter values.
    Object.entries(filters).forEach(([key,value])=> {
      filteredData =  filteredData.filter(row => row[key]=== value);
    });  
  
    // 10.- Rebuild the table using the filtered data
    buildTable(filteredData);    
  }
  
  // Attach an event to listen for changes to each filter.
  d3.selectAll("input").on("change",updateFilters);
  
  // 2.- Build the table when the page loads.
  buildTable(tableData);