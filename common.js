const tableSelector = document.getElementsByClassName("table-select");
const dataTable = document.getElementById('data-table');
const tableselect = document.getElementById('table-selector')
const tableselect1 = document.getElementById('table-selector1')
var parsedUrl = new URL(window.location.href);


// Fetch the list of tables from the server
fetch('/api/tables')
    .then((response) => response.json())
    .then((data) => {
        // Populate all dropdowns with table names
        const tableSelectors = document.querySelectorAll('.table-select');
        tableSelectors.forEach((tableSelector) => {
            data.tables.forEach((tableName) => {
                const option = document.createElement('option');
                option.value = tableName;
                option.textContent = tableName;
                tableSelector.appendChild(option);
            });
        });
    })
    .catch((error) => console.error('Error:', error));



    function fillTable() {
        // Get the selected table from the dropdown
        const tableselect = document.getElementById('table-selector'); // Assuming 'table-selector' is the ID of your dropdown
        const selectedTable = tableselect.value;
        console.log(selectedTable);
    
        // Clear existing table data
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; // Clear the table by setting innerHTML to an empty string
    
        // JavaScript to populate the table
        fetch(`/api/data?table=${selectedTable}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(row => {
                    const newRow = tableBody.insertRow();
                    newRow.insertCell(0).textContent = row.pop;
                    newRow.insertCell(1).textContent = row.number;
                    newRow.insertCell(2).textContent = row.price;
                    newRow.insertCell(3).textContent = row.auto;
                    // Add more cells and data as needed
                });
            })
            .catch(error => console.error('Error:', error));
    }
    

document.addEventListener('DOMContentLoaded', () => {
const dataForm = document.getElementById('data-form');
const tableSelector = document.getElementById('table-selector1');

    // Your code here

dataForm.addEventListener('submit', (event) => {
    
    
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(tableSelector.value);
    console.log("here1")

    const formData = new FormData(dataForm);
    console.log(formData.get('new-table'));
    const data = {
        pop: formData.get('pop'),
        number: formData.get('number'),
        price: formData.get('price'),
        auto: formData.get('auto'),
        table: tableSelector.value,
        newTable: formData.get('new-table'),
    };

    fetch('http://'+parsedUrl.host+'/addData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert('Data added successfully!');
            // Refresh or update the table with the new data
            // You can call a function to refresh the table or reload the page
        } else {
            alert('Error adding data. Please try again.');
        }
    })
    .catch((error) => console.error('Error:', error));
});

});
