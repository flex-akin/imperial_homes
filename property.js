document.addEventListener("DOMContentLoaded", function () {
  let data;

  fetch(
    "https://radiusv2api.ivantage.africa/api/ivantage/properties?size=40&page=1"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Process the jsonData or assign it to data array

      data = jsonData;
      console.log(data.propertyData);
      console.log(data.data.propertyData);
      renderData(
        data.data.propertyData,
        data.data.nextPage,
        data.data.previousPage,
        data.data.totalPages,
        data.data.page
      );
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
      alert("Unable to fetch property");
    });

  loadNextPage = (page) => {
    fetch(
      `https://propertyapi.ivantage.africa/api/ivantage/properties?size=52&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Process the jsonData or assign it to data array

        data = jsonData;
        console.log(data.propertyData);
        console.log(data.data.propertyData);
        renderData(
          data.data.propertyData,
          data.data.nextPage,
          data.data.previousPage,
          data.data.totalPages,
          data.data.page
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        alert("Unable to fetch property");
      });
  };

  function renderData(data, nextPage, previousPage, totalPage, page) {
    const row = document.querySelector(".row");
    row.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const col = document.createElement("div");
      const anchor = document.createElement("a");
      anchor.href = `new.html?id=${data[i].id}`;
      anchor.style.color = "black";
      const coverDiv = document.createElement("div");
      col.classList.add("col-lg-3", "p-4", "col-md-6", "col-sm-1");
      coverDiv.classList.add("card", "border-0");
      const cardImage = document.createElement("img");
      cardImage.src = `${data[i].images[0]}`;
      cardImage.classList.add("card-img-top");
      const cardBody = document.createElement("div");
      cardBody.innerHTML = `
        <div>
          <div class="top-right">${data[i].availableUnits} unit available</div>
          <div class="card-body p-0">
            <h5 class="card-title p-0" style="font-size: 17px;">${
              data[i].projectName
            }</h5>
          </div>
          <div class="felix">
            <i style="color : red" class="fa-solid fa-location-dot"> &nbsp; </i>${
              data[i].address + ", " + data[i].state
            }
          </div>
          <div class="d-flex justify-content-between flex-row p-0 ps-0 m-0">
            <div class="fw-bold fs-6 p-0">₦${data[
              i
            ].price.toLocaleString()}</div>
            <div>
              <div class="felix">
                <i class="fa-solid fa-bed p-0"></i> ${
                  " " + data[i].numberOfBedrooms
                }
              </div>
            </div>
          </div>
        </div>`;
      cardBody.classList.add("card-body");
      coverDiv.appendChild(cardImage);
      coverDiv.appendChild(cardBody);
      anchor.appendChild(coverDiv);
      col.appendChild(anchor);
      row.appendChild(col);

      const pagination = document.querySelector(".pagination");
      pagination.innerHTML = `
      <button onclick="loadNextPage(${previousPage})" class="btn btn-success">Previous</button>
      <span class="p-2 fw-bold">
      ${page} of ${totalPage}
      </span>
     
      <button onclick="loadNextPage(${nextPage})" class="btn btn-warning">Next</button>
      `;
    }
  }
});
