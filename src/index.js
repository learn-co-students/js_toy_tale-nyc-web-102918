document.addEventListener('DOMContentLoaded', (event) => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  let addToy = false

  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then((toys) => {
    let toyCollection = document.querySelector('#toy-collection')

    for (let toy of toys){
      toyCollection.innerHTML += ` <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" data-id= "${toy.id}">Like <3</button>
    </div>`
    }
  })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let name = event.target.name.value
    let image = event.target.image.value

    fetch('http://localhost:3000/toys',{
      method: 'POST', 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(r => r.json())
    .then((toy) => {
      let toyCollection = document.querySelector('#toy-collection')
      toyCollection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" data-id= "${toy.id}">Like <3 </button>
    </div>`

    })

  })

  document.addEventListener('click', (event) => {
    event.preventDefault()
    if(event.target.className === "like-btn"){
     
      let toy_id = event.target.dataset.id
      let toy_likes = parseInt(event.target.parentNode.querySelector('p').innerHTML.split(' ')[0])

      fetch(`http://localhost:3000/toys/${toy_id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({likes: toy_likes+=1})
      })
      .then(r => r.json())
      .then(toy => {

        let toyLikes = event.target.parentNode.querySelector('p')

        toyLikes.innerHTML = `${toy.likes} Likes`
      })

    }
  })


  


})

