// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', () => {
  // Send PUT Request here
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task: 'Rest',
      description: 'Screw it all take a rest'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})


//deletes rest task
deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task: 'Rest'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No more Rest Tasks to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(/* ... */)
})