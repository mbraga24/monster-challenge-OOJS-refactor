class MonsterCard {

  constructor(monster, parentElement) {
    this.monster = monster
    this.parentElement = parentElement
  }

  handleButton = (event) => {
    adapter.deleteMonster(this.monster.id)
    this.div.remove()
  }

  renderMonster() {
    this.div = document.createElement('div')
    const h1 = document.createElement('h1')
    h1.innerText = this.monster.name
  
    const h3 = document.createElement('h3')
    h3.innerText = this.monster.age
  
    const p = document.createElement('p')
    p.innerText = this.monster.description
    
    const deleteBtn = document.createElement('button')
    deleteBtn.id = "delete-btn"
    deleteBtn.textContent = "Delete"
  
    this.div.append(h1, h3, p, deleteBtn)
  
    deleteBtn.addEventListener('click', this.handleButton)
    this.parentElement.append(this.div)
  }
}