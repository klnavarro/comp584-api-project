const apiUrl = 'https://pokeapi.co/api/v2/pokemon'; // Replace with the actual API URL

function getPokemon() {
  var pokemonID = getRandomNumber(); // Replace with the Pokémon you want to look up

  var pokemonUrl = `${apiUrl}/${pokemonID}`;

  return fetch(pokemonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function printFrontDefaultSprite(pokemonData) {
  // Access the "front_default" sprite URL
  const frontDefaultSprite = pokemonData.sprites.front_default;

  // Create an image element and set its source to the sprite URL
  const spriteImage = document.createElement("img");
  spriteImage.src = frontDefaultSprite;

  // Append the image element to the DOM
  const spriteContainer = document.getElementById("spriteContainer");
  spriteContainer.innerHTML = '';
  spriteContainer.appendChild(spriteImage);
}

function printPokemon(pokemonData) {
  
  var array = [];
  array.push(`name: ${pokemonData.name}`)
  
  const typeArray = pokemonData.types;
  typeArray.forEach((typeObject) => {
    const type = typeObject.type.name;


    array.push(`type: ${type}`);
  });
  
  array.push(`id: ${pokemonData.id}`)
  array.push(`height: ${pokemonData.height} m`)
  array.push(`weight: ${pokemonData.weight} kg`)
  // Loop through the "stats" array and print each object
  const statsArray = pokemonData.stats;
  statsArray.forEach((statObject) => {
    const statName = statObject.stat.name;
    const baseStat = statObject.base_stat;

    array.push(`${statName}: ${baseStat}`);
  });
  
  var arrayString = array.join('\n')

  const jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.textContent = arrayString;
  //jsonOutput.textContent = pokemonData.jsonString;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 1017) + 1;
}

// Attach the event listener after the HTML content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const printButton = document.getElementById("printButton");

  printButton.addEventListener("click", function () {
    getPokemon().then((pokemonData) => {
      // Call both functions with the same pokemonData
      printFrontDefaultSprite(pokemonData);
      printPokemon(pokemonData);
    });
  });
});
