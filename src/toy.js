class Toy {
  constructor(toyObject) {
    this.id = toyObject.id
    this.name = toyObject.name
    this.image = toyObject.image
    this.likes = toyObject.likes

    Toy.allToys.push(this)
  }

  renderToy() {
    return `
      <div id="toy-${this.id}" class="card">
        <h2> ${this.name} </h2>
        <img src="${this.image}" class="toy-avatar">
        <p> ${this.likes} Likes </p>
        <button data-id="${this.id}" class="like-btn"> Like <3 </button>
      </div>
    `
  }
}

Toy.allToys = []
