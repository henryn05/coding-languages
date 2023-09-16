let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["Grass", "Poison"] },
    { name: "Charmander", height: 0.6, type: ["Fire"] },
    { name: "Squirtle", height: 0.5, type: ["Water"] },
  ];

  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (pokemon) {
      if (typeof pokemon === object) {
        pokemonList.push(pokemon);
      } else {
        console.error("Error: Invalid data type. Only objects allowed");
      }
    },
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    "Name: " + pokemon.name + " | Height: " + pokemon.height + "m<br>"
  );
});
