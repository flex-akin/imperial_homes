const Auth = () => {
  const resultElement = document.getElementById("result");
  const auth = document.getElementById("auth");
  const responseTable = document.getElementById("responseTable");
  var emailAddress = document.getElementById("emailAddress").value;
  var password = document.getElementById("password").value;
  console.log("AuthValues: ", emailAddress, password);
  if (emailAddress == "qozimidris@gmail.com" && password == "12345") {
    responseTable.style.display = "block";
    auth.style.display = "none";
  } else {
    resultElement.textContent = "Authentication Error";
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

    const data = await response.json();
    console.log("Data: ", data);

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
window.onload = fetchAndDisplayData;
