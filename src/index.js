document.addEventListener('DOMContentLoaded', (event) => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById('toy-collection')
  const addToyForm = document.querySelector('.add-toy-form')
  let addToy = false
  let allToys = []

  // YOUR CODE HERE
  const fetchToys = () => {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(data => {
        allToys = data
        displayToys(allToys)
      })
  }

  const displayToys = (toys) => {
    toys.forEach((toy) => {
      toyCollection.innerHTML += `
        <div class='card'>
          <h2>${toy.name}</h2>
          <img class='toy-avatar' src='${toy.image}'>
          <p>Likes: ${toy.likes}</p>
          <button data-id='${toy.id}' data-action='like-btn' class='like-btn'>❤️</button>
        </div>
      `
    })
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      addToyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newToyName = document.getElementById('new-toy-name').value
        const newToyImg = document.getElementById('new-toy-img').value
        fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            name: newToyName,
            image: newToyImg,
            likes: 0
          })
        })
        .then(response => response.json())
        .then((data) => {
          allToys.push(data)
          toyCollection.innerHTML = ''
          displayToys(allToys)
        })
        toyForm.style.display = 'none'
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'like-btn') {
      let foundToy = allToys.find((toy) => {
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
      displayToys(allToys)
    }
  })

  fetchToys()


  // OR HERE!
})
