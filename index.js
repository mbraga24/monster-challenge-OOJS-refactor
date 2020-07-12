// DOM elements
const monsterContainer = document.getElementById('monster-container')
const monsterForm = document.getElementById('create-monster-form')

const controlledForm = new ControlledForm(monsterForm, {
  onSubmit: (formData) => {
    createMonster(formData)
    .then(newMonster => {
      const monsterCard =  new MonsterCard(newMonster, monsterContainer)
      monsterCard.renderMonster()
    })
  }
})

function renderAllMonsters(dataMonster) {
  dataMonster.forEach(monster => {
    const monsterCard =  new MonsterCard(monster, monsterContainer)
    monsterCard.renderMonster()
  })
}

function getAllMonsters() {
  fetch("http://localhost:3000/monsters")
  .then(resp => resp.json())
  .then(monsters => {
    renderAllMonsters(monsters)
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

function deleteMonster(monsterId) {
  return fetch(`http://localhost:3000/monsters/${monsterId}`, {
    method: "DELETE"
  })
}

// Initial fetch and render
getAllMonsters()