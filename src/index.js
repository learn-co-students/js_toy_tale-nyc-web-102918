document.addEventListener('DOMContentLoaded', (event) => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const actualToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  let addToy = false
  let allToys = []

  fetchToys = () => {
    fetch('http://localhost:3000/toys')
    .then (response => response.json())
    .then (data => {
      allToys = data
      showAllToys(data)
    })
  }

  const showAllToys = (allToys) => {
    allToys.forEach(toy => {
      toyCollection.innerHTML += `<div class="card">
                                  <h2>${toy.name}</h2>
                                  <img src=${toy.image} class="toy-avatar" />
                                  <p>${toy.likes} Likes </p>
                                  <button data-id="${toy.id}" data-action="like-btn" class="like-btn">Like <3</button>
                                </div>`
    })
  }

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      actualToyForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const nameInput = actualToyForm.querySelector('#name-input').value
        const imageInput = actualToyForm.querySelector('#image-input').value

        fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            name: nameInput,
            image: imageInput,
            likes: 0
          })
        })
        .then (response => response.json())
        .then (data => {
          allToys.push(data)
          toyCollection.innerHTML = ''
          showAllToys(allToys)
        })
        toyForm.style.display = 'none'
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', (event) => {
    if (event.target.dataset.action === "like-btn") {

      let foundToy = allToys.find( toy => {
        return event.target.dataset.id == toy.id
      })

      let newLikes = ++foundToy.likes

      fetch(`http://localhost:3000/toys/${foundToy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })

      toyCollection.innerHTML = ''
      showAllToys(allToys)

    }
  })

  fetchToys()
})
