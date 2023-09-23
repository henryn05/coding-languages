let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      } else {
        console.error("Error: Invalid data type. Only objects allowed");
      }
    },
    addListItem: function (pokemon) {
      let pokemonList = document.querySelector('.pokemonList');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('nameButtons');
      button.addEventListener('click', function () {
        pokemonRepository.showDetails(pokemon);
      });

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
    },
    showDetails: function (pokemon) {
      console.log(pokemon);
    },
  };
  
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
