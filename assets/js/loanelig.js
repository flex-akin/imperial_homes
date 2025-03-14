const findTenor = () => {
  const age = document.getElementById("age").value;
  const funding = document.getElementById("funding").value;
  const fhfValue = 20;
  const mofiValue = 10;
  const commercialValue = 15;
  const ageNew = 60 - age * 1;
  // console.log("first ", ageNew);
  if (age > 60) {
    document.getElementById("tenor").innerText = "You can't get a loan";
  } else {
    if (funding == "commercial") {
      document.getElementById("interest").value = "28%";
      ageNew > commercialValue
        ? (document.getElementById("tenure").value = commercialValue)
        : (document.getElementById("tenure").value = ageNew);
    }
    if (funding == "fhf") {
      document.getElementById("interest").value = "17%";
      ageNew > fhfValue
        ? (document.getElementById("tenure").value = fhfValue)
        : (document.getElementById("tenure").value = ageNew);
    }
    if (funding == "mofi") {
      document.getElementById("interest").value = "12%";
      ageNew > mofiValue
        ? (document.getElementById("tenure").value = mofiValue)
        : (document.getElementById("tenure").value = ageNew);
    }
  }
  // if (ageNew >= 20) {
  //   document.getElementById(
  //     "tenor"
  //   ).innerText = `Tenor can't be more than 20 years`;
  //   document.getElementById("tenure").setAttribute("max", 20);
  // } else if ((ageNew < 20) & (ageNew > 0)) {
  //   document.getElementById(
  //     "tenor"
  //   ).innerText = `Tenor can't be more than ${ageNew} years`;
  //   document.getElementById("tenure").setAttribute("max", ageNew);
  // } else {
  //   document.getElementById("tenor").innerText = "You can't get a loan";
  //   alert(" you can't get a loan");
  //   document.getElementById("age").value = "";
  // }
};

const coBorrowerMonthly = () => {
  const coBorrowerOptions = document.getElementsByName("coBorrowerOptions");
  const coBorrowerContainer = document.getElementById("coBorrowerContainer");
  var coBorrower = null;
  for (const radio of coBorrowerOptions) {
    if (radio.checked) {
      coBorrower = radio.value;
      coBorrower == "yes"
        ? (coBorrowerContainer.style.display = "block")
        : (coBorrowerContainer.style.display = "none");

      // console.log(coBorrowerContainer);
      break;
    }
  }
};
const findLoanAmount = () => {
  var propertyPrice = document.getElementById("propertyPrice").value;
  var equity = document.getElementById("equity").value;
  equity = parseFloat(equity.replace(/,/g, ""));
  propertyPrice = parseFloat(propertyPrice.replace(/,/g, ""));
  loanAmount = propertyPrice - propertyPrice * (equity / 100);
  document.getElementById("loanAmount").value = loanAmount.toLocaleString();
};

const calculate = async () => {
  let errors = [];
  var name = document.getElementById("name").value;
  var emailAddress = document.getElementById("emailAddress").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var propertyName = document.getElementById("propertyName").value;
  var monthlyIncome = document.getElementById("monthlyIncome").value;
  var coBorrowerMonthlyIncome = document.getElementById(
    "coBorrowerMonthlyIncome"
  ).value;
  // var rsa = document.getElementById("rsa").value;
  var propertyPrice = document.getElementById("propertyPrice").value;
  var equity = document.getElementById("equity").value;
  // var loanAmount = document.getElementById("loanAmount").value;
  var age = document.getElementById("age").value;
  var funding = document.getElementById("funding").value;
  // var tenure = document.getElementById("tenure").value;
  // var monthlyRepaymentResult = document.getElementById(
  //   "monthlyRepaymentResult"
  // ).value;
  // var dtiResult = document.getElementById("dtiResult").value;
  // console.log(coBorrower);
  const rsaRadios = document.getElementsByName("rsaOptions");

  var rsa = null;
  for (const radio of rsaRadios) {
    if (radio.checked) {
      rsa = radio.value;
      break;
    }
  }

  const coBorrowerOptions = document.getElementsByName("coBorrowerOptions");
  var coBorrower = null;
  for (const radio of coBorrowerOptions) {
    if (radio.checked) {
      coBorrower = radio.value;
      break;
    }
  }

  if (!name) errors.push("Name cannot be empty.");
  if (!emailAddress) errors.push("Email Address cannot be empty.");
  if (!phoneNumber) errors.push("Phone Number cannot be empty.");
  if (!monthlyIncome) errors.push("Monthly Income cannot be empty.");
  if (!rsa) errors.push("Please select an RSA Option.");
  if (!propertyPrice) errors.push("Property Price cannot be empty.");
  if (!equity) errors.push("Equity cannot be empty.");
  if (!age) errors.push("Age cannot be empty.");
  if (!funding) errors.push("Please select  Funding option.");
  if (!coBorrower) errors.push("Please select a coborrower option.");
  if (coBorrower == "yes" && !coBorrowerMonthlyIncome)
    errors.push("Co-Borrower Monthly Income cannot be empty.");
  const resultElement = document.getElementById("result");
  if (errors.length > 0) {
    // Display errors
    // console.log("Errors: ", errors);
    resultElement.textContent = `Error(s):\n${errors.join("\n")}`;
  } else {
    const PMT = (rate, nper, pv, fv, type) => {
      let pmt, pvif;

      fv || (fv = 0);
      type || (type = 0);

      if (rate === 0) return -(pv + fv) / nper;

      pvif = Math.pow(1 + rate, nper);
      pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

      if (type === 1) pmt /= 1 + rate;
      return pmt;
    };

    var loanAmount = document.getElementById("loanAmount").value;
    loanAmount = parseFloat(loanAmount.replace(/,/g, ""));
    var tenor = document.getElementById("tenure").value;
    tenor = parseInt(tenor);
    var rate = document.getElementById("interest").value;
    rate = parseInt(rate) / 1200;

    var monthlyRepayment = PMT(rate, tenor * 12, -1 * loanAmount);
    monthlyRepayment = monthlyRepayment + 0.001 * loanAmount;

    var monthlyIncome = document.getElementById("monthlyIncome").value;
    monthlyIncome = parseFloat(monthlyIncome.replace(/,/g, ""));

    var dti = (monthlyRepayment / monthlyIncome) * 100;

    dti = dti.toFixed(2);

    monthlyRepayment = monthlyRepayment.toLocaleString();
    // console.log(monthlyRepayment);

    monthlyIncome = document.getElementById("monthlyIncome").value;
    const jsonObject = {
      name,
      emailAddress,
      phoneNumber,
      propertyName,
      monthlyIncome,
      rsa,
      coBorrower,
      coBorrowerMonthlyIncome,
      propertyPrice,
      equity,
      loanAmount,
      age,
      funding,
      tenor,
      monthlyRepayment,
      dti,
    };
    console.log(jsonObject);
    try {
      // Post the JSON to an API
      const response = await fetch(
        "https://ahof.imperialmortgagebank.com/WEBSITE/response",
        {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonObject),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // resultElement.textContent = `Success! Response from server:\n${JSON.stringify(
        //   data,
        //   null,
        //   2
        // )}`;
        document.getElementById(
          "monthlyRepaymentResult"
        ).innerText = `₦${monthlyRepayment}`;
        document.getElementById("dtiResult").innerText = `${dti}%`;
        resultElement.textContent = "Request Submitted successfully";
      } else {
        resultElement.textContent = `Failed to submit. Status: ${response.status}`;
      }
    } catch (error) {
      resultElement.textContent = `Error: ${error.message}`;
    }
  }
};
