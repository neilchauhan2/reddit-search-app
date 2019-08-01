import reddit from "./redditapi";
const searchForm = document.getElementById("search-form");
const searchTerm = document.getElementById("search-term");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const keyword = searchTerm.value;
  if (keyword === "") {
    showAlert("Please enter a search term!!!", "is-danger");
  }
  searchTerm.value = "";
  const sortby = document.querySelector(`input[name="sortby"]:checked`).value;
  const searchLimit = document.getElementById("limit").value;

  //   Search on reddit
  reddit.search(keyword, searchLimit, sortby).then(result => {
    console.log(result);
    let output = "";
    result.forEach(post => {
      output += `
        <div class="column is-3">
        
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            
            <div class="media-content">
              <p class="title is-4">${post.title}</p>
            </div>
          </div>
      
          <div class="content">
          ${textTruncate(post.selftext, 100)}
          </div>
        </div>
      </div>
        </div>
        `;
    });

    document.getElementById("result").innerHTML = output;
  });
});

const showAlert = (msg, className) => {
  const div = document.createElement("div");
  div.className = `notification ${className} `;
  div.appendChild(document.createTextNode(msg));
  const container = document.getElementById("search-section-container");
  container.insertBefore(div, searchForm);
  setTimeout(() => {
    container.removeChild(div);
  }, 3000);
};

const textTruncate = (txt, limit) => {
  const shortText = txt.indexOf(" ", limit);
  if (shortText == -1) return txt;
  return txt.substring(0, shortText);
};
