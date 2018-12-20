const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
let addToy = false

fetch("http://localhost:3000/toys")
.then( result => result.json() )
.then( parsedResult => {
  parsedResult.forEach( toy => {
    const newToy = new Toy(toy)
    toyCollection.innerHTML += newToy.renderToy()
  })
})

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  }
  else {
    toyForm.style.display = 'none'
  }
})

document.body.addEventListener("submit", event => {
  event.preventDefault()
  const nameValue = document.getElementsByName("name")[0].value
  const imageValue = document.getElementsByName("image")[0].value

  document.querySelector(".add-toy-form").reset()
  toyForm.style.display = 'none'

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${nameValue}`,
      "image": `${imageValue}`,
      "likes": 0
    })
  })
  .then( result => result.json() )
  .then( parsedResult => {
    const newToy = new Toy(parsedResult)
    toyCollection.innerHTML += newToy.renderToy()
  })
})

document.body.addEventListener("click", event => {
  if (event.target.className === "like-btn") {
    const toyId = event.target.dataset.id
    const toyObject = Toy.allToys.find( toy => toy.id == toyId)
    const toyIdx = Toy.allToys.findIndex( toy => toy === toyObject )
    const toyElement = document.querySelector(`#toy-${toyId}`)

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": `${++toyObject.likes}`
      })
    })
    .then( result => result.json() )
    .then( parsedResult => {
      Toy.allToys[toyIdx] = parsedResult
      toyElement.innerHTML = `
        <h2> ${parsedResult.name} </h2>
        <img src="${parsedResult.image}" class="toy-avatar">
        <p> ${parsedResult.likes} Likes </p>
        <button data-id="${parsedResult.id}" class="like-btn"> Like <3 </button>
      `
    })
  }
})
