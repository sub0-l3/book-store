let books = null


function init() {
    setTimeout(() => {
        books = getBooksData();
        generateBooksView(books);
    }, 1000)
    document.getElementById('search').addEventListener('keyup', handleSearch)
}

function getBooksData() {
    let books = []
    for (let i = 0; i < 10; i++) {
        let book = {
            title: faker.lorem.words(),
            author: faker.name.findName(),
            author_image: faker.image.avatar(),
            release_date: faker.date.recent(),
            image: faker.image.image(),
            price: faker.commerce.price(),
            short_description: faker.lorem.sentence(),
            long_description: faker.lorem.paragraph()
        }
        books.push(book)
    }
    console.log(books);
    return books;
}

function generateBooksView(books) {
    htmlString = ""
    books.forEach(book => {
        htmlString += generateBookCard(book)
    });
    document.getElementById("books-container").innerHTML = htmlString
}

function generateBookCard(book) {
    return `<div class='book'>
                <div class='book__img'><img src='${book.image}'/></div>
                <div class='book__content'>
                    <div class='book__title'>${book.title}</div>
                    <div class='book__long-desc'>${book.long_description.substring(0, 150)}...</div>
                    <div class='book__author'>
                        <span class='book__author-img'><img src='${book.author_image}'/></span>
                        <i>${book.author}</i>
                    </div>
                </div>
            </div>`
}

let handleSearch = function (e) {
    if (e.keyCode == 13) {
        e.target.value = "";
    } else {
        let query = e.target.value
        let filterBooks = books.filter(book => book.title.search(query) !== -1 || book.long_description.search(query) !== -1)
        debouceFilter(filterBooks)
        // console.log(filterBooks)
    }
}


const debounceFn = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            func.apply(context, args)
            console.log('debug - debounce')
        }, delay)
    }
}

let debouceFilter = debounceFn(generateBooksView, 3000)
// let debounceFilter = _.debounce(generateBooksView, 3000);

