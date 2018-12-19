let Adapter=function(baseURL){

    function makeRequestor (method){
      return function(route,data){
      return fetch(baseURL+route,setParams(method,data))
        .then((resp)=> resp.json())
      }
    }
    function setParams(method,data){
      return {method: method,
        headers:{
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
       body: JSON.stringify(data)
      }

    }
  return {
    get: makeRequestor('GET'),
    post: makeRequestor('POST'),
    patch: makeRequestor('PATCH'),
    remove: makeRequestor('DELETE')
  }
}

document.addEventListener('DOMContentLoaded', function(){

  const toyContainer=document.querySelector('#toy-collection');
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  function addToys(data){
    toyContainer.innerHTML=data.reduce(
      function(accum,toy){
      return accum= accum + `<div class="card" id=${toy.id}>
                                <h2>${toy.name}</h2>
                                <image src=${toy.image} class="toy-avatar">
                                <p> ${toy.likes}</p>
                                <button class="like-btn" data-id="${toy.id}">like</button>
                                </div>`
      },'')
  }

  // YOUR CODE HERE
  const adapter=Adapter('http://localhost:3000');
  let allToys=[]
  adapter.get('/toys').then(data => {allToys=data; addToys(data)});

  function addSingleToy(toy){
  allToys.push(toy);
  toyContainer.innerHTML+= `<div class="card" id="${toy.id}">
                            <h2>${toy.name}</h2>
                            <image src=${toy.image} class="toy-avatar">
                            <p> ${toy.likes}</p>
                            <button class="like-btn" data-id="${toy.id}">like</button>
                            </div>`
  }

  function handleToyCreate(e){
   const name= event.target.querySelector('input[name="name"]').value
    const url= event.target.querySelector('input[name="image"]').value
    data={ name: name, image: url, likes :0 }

    adapter.post('/toys',data)
    .then((toy) => {addSingleToy(toy)})
  }

  function handleLike(e){
    const id=event.target.dataset.id

    const toy=allToys.find(function(toy){return toy.id==id})
    const data= {likes: toy.likes+1 }
   adapter.patch(`/toys/${id}`, data).then((data)=>{

     toy.likes+=1;
     console.log(allToys.find(function(toy){return toy.id==id}));
     document.getElementById(`${toy.id}`).innerHTML=
                            `<h2>${toy.name}</h2>
                               <image src=${toy.image} class="toy-avatar">
                               <p> ${toy.likes}</p>
                               <button class="like-btn" data-id="${toy.id}">like</button>
                               </div>`


   })
  }
  toyContainer.addEventListener('click',function(e){handleLike(e)})
  toyForm.addEventListener('submit',handleToyCreate);
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


// OR HERE!
})
