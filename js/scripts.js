let pokemonList = [
  {name:'bulbasaur', 
  height: .7, 
  type:['grass', 'posion']},

  {name:'charmeleon',
  height:.6,
  type:['fire']},

  {name:'squirtle',
  height:.5,
  type: ['water']},
];

for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];
  let label = '';
  
  if (pokemon.height > .6) {
    label = ' - Wow, that\'s big!';
  };

  document.write(`${pokemon.name} (${pokemon.height}m) ${label}<br>`);
};
