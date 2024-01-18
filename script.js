const library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book) {
    library.push(book)
}

function updateDisplay() {
  resetDisplay()

  library.forEach(function(book) {
    const card = document.createElement('div')
    card.classList.add('card')
    main.appendChild(card)

    const info = document.createElement('div')
    info.classList.add('info')
    card.appendChild(info)

    const titleDisplay = document.createElement('h1')
    info.appendChild(titleDisplay)
    titleDisplay.textContent = book.title

    const authorDisplay = document.createElement('h2')
    info.appendChild(authorDisplay)
    authorDisplay.textContent = `by ${book.author}`

    const pageDisplay = document.createElement('h3')
    info.appendChild(pageDisplay)
    pageDisplay.textContent = `${book.pages} pages`

    const controls = document.createElement('div')
    controls.classList.add('controls')
    card.appendChild(controls)

    const status = document.createElement('div')
    status.classList.add('status')
    controls.appendChild(status)
    if (book.read) {
      status.textContent = 'Read'
    } else status.textContent = 'Unread'

    const deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete')
    controls.appendChild(deleteBtn)
    deleteBtn.textContent = 'Delete'
  })
}

function getBookInfo() {
  const title = form.querySelector('#title').value
  const author = form.querySelector('#author').value
  const pages = form.querySelector('#pages').value
  const read = form.querySelector('#read').checked
  return new Book(title, author, pages, read)
}

function resetDisplay() {
  const card = main.querySelectorAll('div')
  card.forEach(div => div.remove())
}

// DOM elements

const main = document.querySelector('.main')
const addBookBtn = document.querySelector('#addBook')
const dialog = document.querySelector('dialog')
const form = dialog.querySelector('#form')
const submitBtn = dialog.querySelector('#submit')
const cancelBtn = dialog.querySelector('#cancel')

// Event listeners

addBookBtn.addEventListener("click", () => {
  dialog.showModal()
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault()
  addBookToLibrary(getBookInfo())
  updateDisplay()
  form.reset()
  dialog.close()
});

cancelBtn.addEventListener("click", () => {
  dialog.close()
});