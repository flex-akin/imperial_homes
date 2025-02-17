const age = document.getElementById("age").value;

const findTenor = () => {
  const age = document.getElementById("age").value;
  const ageNew = 60 - age;
  if (ageNew >= 20) {
    document.getElementById(
      "tenor"
    ).innerText = `Tenor can't be more than 20 years`;
    document.getElementById("tenure").setAttribute("max", 20);
  } else if ((ageNew < 20) & (ageNew > 0)) {
    document.getElementById(
      "tenor"
    ).innerText = `Tenor can't be more than ${ageNew} years`;
    document.getElementById("tenure").setAttribute("max", ageNew);
  } else {
    document.getElementById("tenor").innerText = "You can't get a loan";
    alert(" you can't get a loan");
    document.getElementById("age").value = "";
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

const calculate = () => {
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
  const rate = 27 / 1200;

  var monthlyRepayment = PMT(rate, tenor * 12, -1 * loanAmount);
  monthlyRepayment = monthlyRepayment + 0.001 * loanAmount;

  var monthlyIncome = document.getElementById("monthlyIncome").value;
  monthlyIncome = parseFloat(monthlyIncome.replace(/,/g, ""));

  var dti = (monthlyRepayment / monthlyIncome) * 100;

  dti = dti.toFixed(2);

  monthlyRepayment = monthlyRepayment.toLocaleString();
  console.log(monthlyRepayment);

  document.getElementById(
    "monthlyRepaymentResult"
  ).innerText = `₦${monthlyRepayment}`;
  document.getElementById("dtiResult").innerText = `${dti}%`;
};
