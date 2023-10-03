var data = [
  {
    id: 1,
    counter: 0,
    name: "Cat 1",
    imgUri:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    counter: 0,
    name: "Cat 2",
    imgUri:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    counter: 0,
    name: "Cat 3",
    imgUri:
      "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    counter: 0,
    name: "Cat 4",
    imgUri:
      "https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    counter: 0,
    name: "Cat 5",
    imgUri:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    counter: 0,
    name: "Cat 6",
    imgUri: "https://video.udacity-data.com/topher/2018/December/5c087775_catte/catte.jpg"
  }
];

var model = {
  catData: data,
  currentCataData: null,
  init: function () {
    var cats = JSON.stringify(this.catData);
    localStorage.setItem('catsData', cats);
  },
  loadCats: function() {
    var cats = JSON.parse(localStorage.getItem('catsData'));
    return cats;
  },
  getAllCats: function () {
    return this.loadCats().sort((a, b) => a.id - b.id);
  },
  updateAllCats: function(cats) {
    var parsedCats = JSON.stringify(cats);
    localStorage.setItem('catsData', parsedCats);
  }
};

var octopus = {
  getCats: function () {
    return model.getAllCats();
  },

  getCurrentCat: function() {
    return model.currentCataData;
  },

  setCurrentCat: function(cat) {
    model.currentCataData = cat;
  },

  updateSingleCat: function(cat) {
    var cats = model.getAllCats();
    var catIndex = cats.findIndex((query) => query.id === cat.id);
    cats.splice(catIndex, 1, cat);
    console.log(cats);
    model.updateAllCats(cats);
    model.currentCataData = cat;
  },

  incrementCounter: function() {
    model.currentCataData.counter++;
    catView.render();
  },

  init: function () {
    model.init();
    model.currentCataData = model.getAllCats()[0];
    catListView.init();
    catView.init();
  },
};

var catListView = {
  catListContainer: document.getElementById("list_container"),
  displayCatContainer: document.getElementById("display_cat_container"),

  init: function () {
    catListView.render();
  },

  render: function () {
    var cats = octopus.getCats();
    this.catListContainer.innerHTML = '';

    for(let i = 0; i < cats.length; i++) {
      var cat = cats[i];

      var newPElem = document.createElement("p");
      newPElem.id = cat.name;
      newPElem.innerHTML = cat.name;

      newPElem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat({
            id: catCopy.id,
            name: catCopy.name,
            imgUri: catCopy.imgUri,
            counter: catCopy.counter,
          });
          catView.render();
        }
      })(cat));

      this.catListContainer.appendChild(newPElem);
    }
  },
};

var catView = {
  catIdElem: document.getElementById("cat-id"),
  catNameElem: document.getElementById("cat-name"),
  catImageElem: document.getElementById("cat-image"),
  counterElem: document.getElementById("counter"),
  displayCatContainer: document.getElementById("display_cat_container"),
  
  // Form elements
  catFormBtn: document.getElementById("cat-form-display-btn"),
  catFormContainer: document.getElementById("cat-form-container"),
  catForm: document.getElementById("cat-form"),
  cancelButton: document.getElementById("cancel"),
  submitButton: document.getElementById("submit"),
  // Input Elements
  catNameInput: document.getElementById("cat-name-input"),
  catImageInput: document.getElementById("cat-image-input"),
  catClicksInput: document.getElementById("cat-clicks-input"),
  
  init: function() {
    this.catImageElem.addEventListener('click', () => {
      octopus.incrementCounter();
    });

    this.catFormBtn.addEventListener("click", () => {
      if (this.catFormContainer.style.display === "block") {
        this.catFormContainer.style.display = "none";
      } else {
        this.catFormContainer.style.display = "block";
      }
    });

    this.cancelButton.addEventListener("click", () => {
      if (this.catFormContainer.style.display === "block") {
        this.catFormContainer.style.display = "none";
      }
    });

    this.submitButton.addEventListener("click", () => {
      var cat = {
        id: parseInt(this.catIdElem.innerHTML),
        name: this.catNameInput.value,
        imgUri: this.catImageInput.value,
        counter: Number(this.catClicksInput.value),
      }
      console.log(this.catIdElem.innerHTML);
      octopus.updateSingleCat(cat);
      catListView.render();
      catView.render();

      if (this.catFormContainer.style.display === "block") {
        this.catFormContainer.style.display = "none";
      }
    })

    catView.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catIdElem.innerHTML = `${currentCat.id}`;
    this.catImageElem.src = currentCat.imgUri;
    this.catNameElem.innerHTML = currentCat.name;
    this.counterElem.innerHTML = currentCat.counter;

    this.catNameInput.value = currentCat.name;
    this.catImageInput.value = currentCat.imgUri;
    this.catClicksInput.value = currentCat.counter;
  },
};

octopus.init();
