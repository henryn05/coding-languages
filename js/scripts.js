let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Function to add a Pokémon to the list
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.error("Error: Invalid data type. Only objects allowed");
    }
  }

  // Function to get all Pokémon
  function getAll() {
    return pokemonList;
  }

  // Function to create a list item for a Pokémon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemonList");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("nameButtons", "list-group-item");
    button.classList.add("btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  // Function to show a loading message
  function showLoadingMessage() {
    let loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "block";
  }

  // Function to hide the loading message
  function hideLoadingMessage() {
    let loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "none";
  }

  // Function to load details for a Pokémon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function (typeData) {
          return typeData.type.name;
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // Function to load a list of Pokémon
function loadList() {
  showLoadingMessage();
  return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize the first letter
          detailsUrl: item.url,
          types: [] // Initialize an empty array to store types
        };

        // Fetch additional data for the Pokémon
        return fetch(item.url)
          .then(function (response) {
            return response.json();
          })
          .then(function (details) {
            // Append type data to the Pokémon object
            pokemon.types = details.types.map(function (typeData) {
              return typeData.type.name;
            });

            // Add the Pokémon to the list
            add(pokemon);
          })
          .catch(function (e) {
            hideLoadingMessage();
            console.error(e);
          });
      });
    })
    .then(function () {
      hideLoadingMessage();
    })
    .catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
}

  // Function to show details of a Pokémon
  function showDetails(pokemon) {
    if (typeof pokemon.height === "undefined") {
      loadDetails(pokemon).then(function () {
        displayPokemonDetails(pokemon);
      });
    } else {
      displayPokemonDetails(pokemon);
    }
  }

  // Function to display Pokémon details in a modal
  function displayPokemonDetails(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    let types = pokemon.types.map(function (type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    });

    modalTitle.innerHTML = `<p>${pokemon.name}</p>`;
    modalBody.innerHTML = `<p class="height">Height: ${
      pokemon.height
    }m</p><p class="type">Type: ${types.join(", ")}</p> <img src="${
      pokemon.imageUrl
    }" alt="${pokemon.name} class="image">`;

  }

  // Function to set up the search functionality
  function setupSearch() {
    let searchInput = document.getElementById("searchInput");
    let pokemonList = document.querySelectorAll(".list-group-item");

    searchInput.addEventListener("input", function () {
      let searchQuery = searchInput.value.toLowerCase();

      pokemonList.forEach(function (pokemonItem) {
        let pokemonName = pokemonItem.innerText.toLowerCase();

        if (pokemonName.startsWith(searchQuery)) {
          pokemonItem.style.display = "block";
        } else {
          pokemonItem.style.display = "none";
        }
      });
    });
  }

  // Function to set up the filter functionality
function setupFilter() {
  let selectedTypes = []; // Store the selected types
  let typeDropdown = document.getElementById("typeDropdown");

  if (typeDropdown) {
    typeDropdown.addEventListener("change", function () {
      // Get the selected type from the dropdown
      let selectedType = typeDropdown.value;

      if (selectedTypes.includes(selectedType)) {
        // Type is already selected, remove it
        selectedTypes = selectedTypes.filter((type) => type !== selectedType);
      } else {
        // Type is not selected, add it
        selectedTypes.push(selectedType);
      }

      updateFilter(selectedTypes); // Pass the array of selected types
      updateSelectedTypesDisplay(selectedTypes); // Update the selected types display
    });
  } else {
    console.error("No element found with the 'typeDropdown' id.");
  }
}

  // Function to update the filter
  function updateFilter(selectedTypes, types) {
    types.forEach(function (pokemonItem) {
      let itemTypes = pokemonItem.getAttribute("data-type");
      console.log(itemTypes);
      let shouldDisplay =
        selectedTypes.length === 0 ||
        selectedTypes.every((type) => itemTypes.includes(type));

      if (shouldDisplay) {
        pokemonItem.style.display = "block";
      } else {
        pokemonItem.style.display = "none";
      }
    });
  }

  //Function to display currently selected types (can be up to two)
  function updateSelectedTypesDisplay(selectedTypes) {
    let typeDropdownButton = document.querySelector("#typeDropdown");
    let selectedTypesDisplay = document.querySelector("#selectedTypesDisplay");

    if (selectedTypes.length === 0) {
      typeDropdownButton.innerText = "Select Type";
      selectedTypesDisplay.innerText = "";
    } else {
      typeDropdownButton.innerText = "Types Selected";
      selectedTypesDisplay.innerText = selectedTypes.join(", ");
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    setupSearch: setupSearch,
    setupFilter: setupFilter,
    updateFilter: updateFilter,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
  pokemonRepository.setupSearch();
  pokemonRepository.setupFilter();
  pokemonRepository.updateFilter("");
});
