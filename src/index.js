const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const toyCollection = document.getElementById('toy-collection')
let allToys = []

  document.addEventListener('DOMContentLoaded', ()=> {

    console.log("hello")

    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
        toys.forEach(toy =>{
          toyCollection.append(renderToyCard(toy))
        })
    })


  toyCollection.addEventListener('click', (e) => {
     if (e.target.classList.contains("like-btn")){
       let toyCard = e.target.parentNode
       let likesElement = toyCard.children[2]
       let likes = parseInt(likesElement.innerText.split(' ')[0])
       updateLikes(e.target.dataset.id,likes)
       likesElement.innerText = `${++likes} likes`
     }
  })

}) // fin del evento

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy

  let form = toyForm.querySelector('.add-toy-form')
  let inputName = Array.prototype.find.call(form.children, child => child.name === "name")
  let inputURL = Array.prototype.find.call(form.children, child => child.name === "image")
  let newToy = {
    likes: 0
  }

  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      newToy.name = inputName.value
      newToy.image = inputURL.value

      toyCollection.append(renderToyCard(newToy))
      persistNewToy(newToy)
      toyForm.style.display = 'none'
    })
  } else {
    toyForm.style.display = 'none'
  }

})
updateLikes = (toyId, likes) => {
  let like
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    body: JSON.stringify({
      likes: ++likes
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

persistNewToy = toyObj => {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    body: JSON.stringify(toyObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

renderToyCard = toyObject =>{
  let toyDiv = document.createElement('div') //el enunciado me dice que debo crearlo
  toyDiv.classList.add('card') //con esto estoy haciendo el div con una class
  toyDiv.innerHTML = ` <h2>${toyObject.name}</h2>
                       <img src='${toyObject.image}' class="toy-avatar">
                       <p>${toyObject.likes} likes</p>
                       <button data-id='${toyObject.id}' class='like-btn'>Like <3</button> `
                       //este codigo me lo da el ejercicio solo para recordar
  return toyDiv
}

// OR HERE!
