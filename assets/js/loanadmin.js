var data;
const { jsPDF } = window.jspdf;
const Auth = async () => {
  const resultElement = document.getElementById("result");
  const auth = document.getElementById("auth");
  const responseTable = document.getElementById("responseTable");
  var emailAddress = document.getElementById("emailAddress").value;
  var password = document.getElementById("password").value;
  const AuthValues = { emailAddress: emailAddress, password: password };
  try {
    // Fetch data from the backend API
    // Post the JSON to an API
    const response = await fetch("http://127.0.0.1:3200/auth", {
      // Replace with your API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AuthValues),
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        responseTable.style.display = "block";
        auth.style.display = "none";
      } else {
        resultElement.textContent = "Authentication Error";
      }
      // console.log(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

async function fetchAndDisplayData() {
  const resultElement = document.getElementById("result");
  try {
    // Fetch data from the backend API
    const response = await fetch("http://127.0.0.1:3200/response");
    if (!response.ok) {
      resultElement.textContent = `HTTP error! status: ${response.status}`;
    }

    data = await response.json();
    // console.log("Data: ", data);

    // Get the table body element
    const tableBody = document.querySelector("#dataTable tbody");

    // Clear any existing rows
    // tableBody.innerHTML = "";

    // Populate the table with data
    data.forEach((item) => {
      const row = document.createElement("tr");

      //Create and append cells
      //   const idCell = document.createElement("td");
      //   idCell.textContent = item._id;
      //   row.appendChild(idCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const ageCell = document.createElement("td");
      ageCell.textContent = item.age;
      row.appendChild(ageCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = item.emailAddress;
      row.appendChild(emailCell);

      const phoneNumberCell = document.createElement("td");
      phoneNumberCell.textContent = item.phoneNumber;
      row.appendChild(phoneNumberCell);

      const monthlyIncomeCell = document.createElement("td");
      monthlyIncomeCell.textContent = item.monthlyIncome;
      row.appendChild(monthlyIncomeCell);

      const coBorrowerCell = document.createElement("td");
      coBorrowerCell.textContent = item.coBorrower;
      row.appendChild(coBorrowerCell);

      const monthlyIncomeCoborrowerCell = document.createElement("td");
      monthlyIncomeCoborrowerCell.textContent = item.coBorrowerMonthlyIncome;
      row.appendChild(monthlyIncomeCoborrowerCell);

      const propertyNameCell = document.createElement("td");
      propertyNameCell.textContent = item.propertyName;
      row.appendChild(propertyNameCell);

      const propertyPriceCell = document.createElement("td");
      propertyPriceCell.textContent = item.propertyPrice;
      row.appendChild(propertyPriceCell);

      const equityCell = document.createElement("td");
      equityCell.textContent = item.equity;
      row.appendChild(equityCell);

      const fundingCell = document.createElement("td");
      fundingCell.textContent = item.funding;
      row.appendChild(fundingCell);

      const tenorCell = document.createElement("td");
      tenorCell.textContent = item.tenor;
      row.appendChild(tenorCell);

      const monthlyRepaymentCell = document.createElement("td");
      monthlyRepaymentCell.textContent = item.monthlyRepayment;
      row.appendChild(monthlyRepaymentCell);

      const dtiCell = document.createElement("td");
      dtiCell.textContent = item.dti;
      row.appendChild(dtiCell);

      const rsaCell = document.createElement("td");
      rsaCell.textContent = item.rsa;
      row.appendChild(rsaCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
    // data.forEach((item) => {
    //   const row = document.createElement("tr");

    //   // Create and append cells
    //   const idCell = document.createElement("td");
    //   idCell.textContent = item._id;
    //   row.appendChild(idCell);

    //   const nameCell = document.createElement("td");
    //   nameCell.textContent = item.name;
    //   row.appendChild(nameCell);

    //   const emailCell = document.createElement("td");
    //   emailCell.textContent = item.emailAddress; // Updated to match the property name in the object
    //   row.appendChild(emailCell);

    //   // Append the row to the table body
    //   tableBody.appendChild(row);
    // });
  } catch (error) {
    console.error("Error fetching data:", error);
    resultElement.textContent = `HTTP error! status: ${error}`;
  }
}

function generateCSV(
  data,
  filename = "Mortgage Pre-qualification Responses.csv"
) {
  // Convert array of objects to CSV string
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(",")); // Add headers as the first row

  data.forEach((row) => {
    const values = headers.map((header) => JSON.stringify(row[header] || ""));
    csvRows.push(values.join(","));
  });

  // Convert rows to a single string
  const csvString = csvRows.join("\n");

  // Create a blob and download the file
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const DownloadCSV = () => {
  generateCSV(data);
};
window.onload = fetchAndDisplayData;

function exportToPDF(data) {
  const doc = new jsPDF({ orientation: "portrait" }); // Portrait orientation for columns layout

  // Iterate over each data entry
  data.forEach((entry, index) => {
    // Add a new page for each entry, except the first page
    if (index !== 0) doc.addPage();

    // Add a title for the current entry
    doc.setFontSize(16);
    // doc.text(`Entry ${index + 1}`, 15, 20); // Title at the top

    // Format the data into columns: "Key" and "Value"
    const body = Object.entries(entry).map(([key, value]) => [key, value]);

    // Add the table with Key-Value columns
    doc.autoTable({
      head: [["Key", "Value"]], // Header for the two columns
      body: body, // Key-value pairs
      styles: {
        fontSize: 12, // Adjust font size for better readability
        cellPadding: 4, // Padding for table cells
      },
      startY: 30, // Start below the title
      margin: { left: 15, right: 15 }, // Margins
      tableWidth: "auto", // Automatically adjust table width
    });
  });

  // Save the PDF
  doc.save("Mortgage Pre-qualification Responses.pdf");
}

const DownloadPDF = () => {
  exportToPDF(data);
};
