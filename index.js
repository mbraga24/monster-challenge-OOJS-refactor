const adapter = new APIAdapter("http://localhost:3000/monsters", {
  "Content-Type": "application/json",
  Accept: "application/json"
})

// DOM elements
const monsterContainer = document.getElementById('monster-container')
const monsterForm = document.getElementById('create-monster-form')

const controlledForm = new ControlledForm(monsterForm, {
  onSubmit: (formData) => {
    adapter.createMonster(formData)
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

// Initial fetch and render
adapter.getMonsters().then(monsters => {
  renderAllMonsters(monsters)
})