let pokemonRepository = (function() {
  let pokemonList = [ 
    {name: 'Bulbasaur', height: .7, type: ['Grass', 'Poison']},
    {name: 'Charmander', height: .6, type: ['Fire']},
    {name: 'Squirtle', height: .5, type: ['Water']},
];

return {
  getAll: function() {
    return pokemonList;
  },
  add: function(pokemon) {
    pokemonList.push(pokemon);
  },
}
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(
      'Name: ' + pokemon.name +
      ' | Height: ' + pokemon.height + 'm<br>'
      );
});