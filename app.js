
const superHeroToken = 1228540011320371 // access token
const baseUrl = `https://www.superheroapi.com/api.php/${superHeroToken}`  // api website
const heroImageDiv =  document.querySelector(".hero-div")
const btn = document.querySelector(".randBtn")
const searchInput  = document.querySelector(".search-box")
const searchBtn  = document.querySelector(".search-btn")

const getSuperHero = (id) => {
    fetch(`${baseUrl}/${id}`) // fetch superhero data via the id
    .then(response => response.json()) // return  the response in json format
    .then(json => {
        let superhero = json  // return the json object
         showHeroInfo(superhero) // show hero info. The superhero argument will overide the character parameter in the showHeroInfo function
    })
}
const showHeroInfo = (character) => {
    let name = `<h1 class="name"> ${character.name}</h1>` //get the name of the suoerhero
    let img = `<img class="hero-img" alt="hero-image" src="${character.image.url}">`// get the image of the superhero
  let stats = Object.keys(character.powerstats).map(stat => { // convert the powerstats object into an array and then map its details into a p tag
    if (character.powerstats[stat] == null || character.powerstats[stat] == "null") { // check if the powerstat is available
        return `<p class="stats">${stat}: Unavailable</p>`
    }else{
      return  `<p class="stats">${stat}: ${character.powerstats[stat]}/100</p>`
    }
  }).join("")
  heroImageDiv.innerHTML = `${name} ${img} ${stats}`
}
const getSearchHero = (name) => {
    fetch(`${baseUrl}/search/${name}`) // fetch hero based on the name entered in the searchbox
    .then(response => response.json()) // return  the response in json format
    .then(json => {
        let hero = json.results[0]  // get the first object in the results array
        showHeroInfo(hero) // show hero info based on that object
    })
}
function getRand() { 
    let superHeroLength = 731
    return Math.floor(Math.random() * superHeroLength) // return a random index
}


btn.addEventListener("click", ()=>{
    getSuperHero(getRand())
    // console.log(`The current superhero id is ${getRand()}`);
})

searchBtn.addEventListener("click", ()=>{
    let heroInput = searchInput.value;
    if (heroInput == "") {
        let errorMsg = document.querySelector(".error")
        errorMsg.innerText = "Oops! The search box is empty."
        setTimeout(() => {
            errorMsg.innerText = ""
        }, 3000);
    }else{
        getSearchHero(heroInput)
    }
})



