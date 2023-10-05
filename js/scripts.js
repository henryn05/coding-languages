let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.error("Error: Invalid data type. Only objects allowed");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemonList");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("nameButtons");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    return button;
  }

  function showLoadingMessage() {
    let loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "block";
  }

  function hideLoadingMessage() {
    let loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.style.display = "none";
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        console.log(details);
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        // Capitalize the first letter of each Pokémon's name
        pokemonList.forEach(function (pokemon) {
          pokemon.name = capitalizeFirstLetter(pokemon.name);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // A little help from Chat-GPT
  function showDetails(pokemon) {
    // Check if the height is already loaded
    let modalContainer = document.querySelector(".modalContainer");
    let overlay = document.querySelector(".overlay");

    if (typeof pokemon.height === "undefined") {
      // If not loaded, load the details first
      loadDetails(pokemon).then(function () {
        displayPokemonDetails(pokemon);
      });
    } else {
      // If already loaded, display the details immediately
      displayPokemonDetails(pokemon);
    }

    // Remove any existing event listeners from the close button
    document.getElementById("closeModal").removeEventListener("click", closeModal);

    // Add a new event listener to close the modal when the "Close" button is clicked
    document.getElementById("closeModal").addEventListener("click", closeModal);

    // Add event listener to close modal when "Esc" key is pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    // Add event listener to close modal when clicked outside of modal
    overlay.addEventListener("click", closeModal);

    modalContainer.classList.add('is-visible');
  
    function closeModal() {
      modalContainer.classList.remove("is-visible");
      overlay.classList.remove("is-visible");

      document
        .getElementById("closeModal")
        .removeEventListener("click", closeModal);
      document.removeEventListener("keydown", closeModal);
      overlay.removeEventListener("click", closeModal);
    }
  }

  function displayPokemonDetails(pokemon) {
    let modal = document.querySelector(".modal");
    let modalContainer = document.querySelector(".modalContainer");
    let overlay = document.querySelector(".overlay");
    let modalContent = modal.querySelector("p");

    modalContent.textContent = `Name: ${pokemon.name}, Height: ${pokemon.height}m`;
    modalContent.innerHTML += `<img src="${pokemon.imageUrl}" alt="${pokemon.name}">`;

    modalContainer.classList.add("is-visible");
    overlay.classList.add("is-visible");

    document.getElementById("closeModal").addEventListener("click", function () {
      overlay.classList.remove("is-visible");
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
