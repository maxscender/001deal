// load data into grid container
const container = document.querySelector(".grid");

// get data from the file, using loadData(), inside it populateContainer
function loadData() {
  const request = new XMLHttpRequest();
  request.open("get", "data.json");
  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateContainer(json);
    } catch (e) {
      console.warn("error");
    }
  };

  request.send();
}

function populateContainer(json) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // <div class="button Electronics" data-filter="[data-category='Electronics']">

  json.forEach((row) => {
    const card = document.createElement("div");
    card.setAttribute("class", `grid-item ${row[7]}`);
    card.setAttribute("data-category", `${row[7]}`);

    // header
    let header = document.createElement("div");
    header.setAttribute("class", "card-header");
    header.innerHTML = `Current = ${row[1]}$ Original Price = ${row[2]}$ / Discount = ${row[3]}%`;
    card.appendChild(header);

    // pic
    let img = document.createElement("img");
    img.setAttribute("class", "card-image");
    img.src = `https://${row[6]}`;
    card.appendChild(img);

    // BODY
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-content");
    card.appendChild(cardBody);

    // -->Title + link
    let cardTitle = document.createElement("h4");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerHTML = `<a href='https://${row[4]}'>${row[0]}</a>`;
    cardBody.appendChild(cardTitle);

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});