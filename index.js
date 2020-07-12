// Application State
let currentPage = 1;
let totalPages = 0;


// DOM elements
const monsterContainer = document.getElementById('monster-container')
const monsterForm = document.getElementById('create-monster-form')
const forwardButton = document.getElementById('forward')
const backButton = document.getElementById('back')

// Event listeners
monsterForm.addEventListener('submit', event => {
  event.preventDefault()

  const newMonsterObj = {
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.description.value
  }
  createMonster(newMonsterObj)
  .then(newMonster => renderMonster(newMonster))
})

forwardButton.addEventListener('click', () => {
  // Math.ceil(monsters.length / 50) // => 21
  if (currentPage < totalPages) {
    console.log("FORWARD")
    currentPage++
    getSomeMonsters(currentPage)
  }
})

backButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--
    getSomeMonsters(currentPage)
  }
})

// Render helpers
function renderMonster(monster) {
  const div = document.createElement('div')
  const h1 = document.createElement('h1')
  h1.innerText = monster.name

  const h3 = document.createElement('h3')
  h3.innerText = monster.age

  const p = document.createElement('p')
  p.innerText = monster.description
  
  div.append(h1, h3, p)
  monsterContainer.append(div)
}

function renderAllMonsters(monsters) {
  monsterContainer.innerHTML = ""
  monsters.forEach(renderMonster)
}

// Fetch functions
function getSomeMonsters(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => {
    renderAllMonsters(monsters)
    getAllMonsters()
  })
}

function getAllMonsters() {
  fetch("http://localhost:3000/monsters")
  .then(resp => resp.json())
  .then(monsters => {
    console.log(monsters)
    totalPages = Math.ceil(monsters.length / 50)
    console.log(totalPages)
  })
}

function createMonster(newMonsterObj) {
  return fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newMonsterObj)
  })
  .then(resp => resp.json())
}

// Initial fetch and render
getSomeMonsters(currentPage)