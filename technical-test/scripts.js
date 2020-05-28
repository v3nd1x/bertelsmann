
// Function that add's hover eventlisteners to every element that 
// meets the search query criteria. 
function addListener() {

  const individualShow = document.querySelectorAll(".output-results");

  individualShow.forEach((show) => {
    let findText = show.querySelector(".hidden-text");
    let findText2 = show.querySelector(".hidden-text2");
    let findText3 = show.querySelector(".hidden-text3");

    show.addEventListener("mouseover", (e) => {
      findText.style.opacity = 1;
      findText2.style.opacity = 1;
      findText3.style.opacity = 1;
    });

    show.addEventListener("mouseleave", (e) => {
      findText.style.opacity = 0;
      findText2.style.opacity = 0;
      findText3.style.opacity = 0;
    });
  });
}

// Place to store user input, so the information can be passed around. 

const userFilter = {
  showSearch: "",
};

// Eventlistener on input X sign that clears the main output div
// from any data + clears search input field + removes X sign itself. 

const closeSymbol = document.getElementById("close");

closeSymbol.addEventListener("click", (e) => {

  document.getElementById("searchShow").value = "";
  userFilter.showSearch = "";
  document.getElementById("output1").innerHTML = "";
  closeSymbol.style.display = "none";

});

// 1.Eventlistener on main input field that saves user inputs in userFilter.showSearch
// 2. Triggers getData function on every input change. 
// 3. Clear input field and main output div if input is empty. 

document.getElementById("searchShow").addEventListener("input", (e) => {

  userFilter.showSearch = e.target.value;
  if (!e.target.value) {
    document.getElementById("output1").innerHTML = "";
    closeSymbol.style.display = "none";
  } else {
    closeSymbol.style.display = "block";
  }
  getData();
});

// 1. Functions that fetches data from TVMaze's API
// 2. Create a variable full with all of the data that gets rendered to output1 div. 
// 3. Checks if images are NULL, if yes, then use a placeholder image. 
// 4. Checks if rating / genre are NULL, if yes use default "N/A" text. 

function getData() {
  fetch(`http://api.tvmaze.com/search/shows?q=${userFilter.showSearch}`)
    .then((res) => res.json())
    .then((data) => {

      let showInfo = "";

      data.forEach((element) => {

        let image = "";

        if (!element.show.image) {
          image = "./img/no-image.jpeg";
        } else {
          image = element.show.image.medium;
        }

        let rating = element.show.rating.average;
        let genre = element.show.genres[0];

        if (rating === null) {
          rating = "Not Available";
        }

        if (!genre) {
          genre = "Not Available";
        }

        showInfo += `
          
            <div class="col-3 output-results" id="${element.show.id}">
              <div class="output-wrap">
               <p class="hidden-text">${element.show.language}</p> 
               <p class="hidden-text2">Status: ${element.show.status}</p> 
                <img src="${image}" class="show-image"/>
                <div class="info-wrap">
                  <p class="output-name">${element.show.name}</p> 
                <div class="rating-wrap">
                  <img src="./img/star.png" alt="" class="star-img">
                  <span class="rating">${rating}</span>
                </div>
                <span class="genre">${genre}</span>
              </div>
              </div>
            </div>
          `;

        document.getElementById("output1").innerHTML = showInfo;
      });
      addListener();
    });
}
