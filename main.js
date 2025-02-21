document.addEventListener("DOMContentLoaded", function () {
  let data;
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  // fetch(`https://propertyapi.ivantage.africa/api/ivantage/property/${id}`)
  fetch(`https://radiusv2api.ivantage.africa/api/ivantage/property/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Process the jsonData or assign it to data array
      data = jsonData;
      console.log(data);
      data = data.property;

      var imageThumbs = document.getElementById("image-thumbs");
      var currentImage = document.getElementById("current-image");
      var project = document.querySelector("#projectname");
      var loc = document.querySelector("#location");
      var price = document.querySelector("#price");
      var bed = document.querySelector("#bed");
      var unit = document.querySelector("#unit");
      var propertyLocation = document.getElementById(
        "exampleFormControlInput5"
      );
      var propertyPrice = document.getElementById("propertyPrice");
      var propertyName = document.getElementById("propertyName");
      var propertyID = document.getElementById("propertyID");
      var propertyCode = document.getElementById("propertyCode");
      var propertyNameOne = document.getElementById(
        "exampleFormControlInput18"
      );
      propertyLocation.value =
        data.propertyType + " " + data.address + ", " + data.state;
      propertyNameOne.value =
        data.propertyType + " " + data.address + ", " + data.state;
      bed.innerHTML = `<p>${data.numberOfBedrooms}</p>`;
      price.innerHTML = `<p>₦${(data.price * 1).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      })}</p>`;
      propertyPrice.innerHTML = `<p>₦${data.price.toLocaleString()}</p>`;
      propertyName.value = `${data.projectName} (${data.propertyType})`;
      propertyID.innerHTML = `<p>${data.id}</p>`;
      propertyCode.innerHTML = `<p>${data.propertyCode}</p>`;
      unit.innerHTML = `<p>${data.availableUnits}</p>`;
      loc.innerHTML = `
              <i class="fa-solid fa-location-dot"></i> ${
                data.address + ", " + data.state
              }
          `;
      const textNode = document.createTextNode(
        data.projectName + " " + `(${data.propertyType})`
      );
      project.appendChild(textNode);

      currentImage.style.backgroundImage = `url(${data.images[0]})`;
      for (var i = 0; i < data.images.length; i++) {
        var thumb = document.createElement("img");
        thumb.src = data.images[i];
        thumb.classList.add("thumb");
        imageThumbs.appendChild(thumb);
        thumb.addEventListener("click", function () {
          currentImage.style.backgroundImage = `url(${this.src})`;
          console.log(this.src);
        });
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
      alert("Unable to fetch property");
    });

  const buyReal = (x) => {
    var remove = document.querySelector(".remove");

    if (x == "Realtor") {
      remove.style.display = "none";
    } else if (x == "Buyer") {
      remove.style.display = "block";
    }
  };
});
