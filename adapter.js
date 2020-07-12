class APIAdapter {
  constructor(baserUrl, defaultHeaders) {
    this.baserUrl = baserUrl
    this.defaultHeaders = defaultHeaders
  }

  fetchAndParse(url, options) {
    return fetch(url, options).then(resp => resp.json())
  }

  getMonsters() {
    return this.fetchAndParse(`${this.baserUrl}`)
  }

  createMonster(newMonster) {
    return this.fetchAndParse(`${this.baserUrl}`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(newMonster)
    })
  }

  deleteMonster(monsterId) {
    return fetch(`${this.baserUrl}/${monsterId}`, {
      method: "DELETE"
    })
  }
}