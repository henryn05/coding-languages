let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
    { name: 'Charmander', height: 0.6, type: ['Fire'] },
    { name: 'Squirtle', height: 0.5, type: ['Water'] },
  ];

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
})();

document.addEventListener('DOMContentLoaded', function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
