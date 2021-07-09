
const newBookBtn = document.querySelector('#new-book');
const formContainer = document.querySelector('.form-container');
const bookStats = document.querySelector('.book-stats');
const card = document.querySelector('.card');
const title = document.createElement('input');
const author = document.createElement('input');
const pages = document.createElement('input');
const readStatus = document.createElement('select');
const option1 = document.createElement('option');
const option2 = document.createElement('option');
const btn = document.createElement('button');

const total = document.createElement('p');
const read = document.createElement('p');
const toRead = document.createElement('p');

let myLibrary = [
{
    title : 'The Island of Dr. Moreau',
    author : 'HG Wells',
    pages : 144,
    readStatus : 'Read'
},
{
    title : 'Carrie',
    author : 'Stephen King',
    pages : 480,
    readStatus : 'To Read'
}
];

function defaultBooks(){
    myLibrary.forEach((book) => {
        displayBooks(book);
    })
    displayBookStats();
}

function Books(title,author,pages,readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(){
    if(title.value && author.value && pages.value){
        let newBook = new Books(title.value,author.value,pages.value,readStatus.value);
        myLibrary.push(newBook);    
        displayBooks(newBook);
        displayBookStats();

        title.value = '';
        author.value = '';
        pages.value = '';
    }     
}
function createForm(){    
    
    title.classList.add('form');
    author.classList.add('form');
    pages.classList.add('form');
    pages.type = 'number';
    readStatus.classList.add('form');

    option1.textContent = 'Read';
    option1.value = 'Read';

    option2.textContent = 'To Read';
    option2.value = 'To Read';

    btn.textContent = 'Add Book';

    title.placeholder = 'Title';
    author.placeholder = 'Author';
    pages.placeholder = 'Pages';   

    formContainer.appendChild(title);
    formContainer.appendChild(author);
    formContainer.appendChild(pages);
    formContainer.appendChild(readStatus);
    formContainer.appendChild(btn);
    readStatus.appendChild(option1);
    readStatus.appendChild(option2);

    btn.addEventListener('click',addBookToLibrary);
}

function displayBooks(newBook){
    let div = document.createElement('div');
    div.classList.add('card-container')
    
    let h3 = document.createElement('h3');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn')

    let toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-btn');
    
    let toggleBtnColor = getComputedStyle(document.body).getPropertyValue('--toggleBtnRead');
    let toggleBtnColor2 = getComputedStyle(document.body).getPropertyValue('--toggleBtnToRead');
    
    h3.textContent = newBook.title;
    p1.textContent = 'Author: '+ newBook.author;
    p2.textContent = 'Pages: '+ newBook.pages;
    removeBtn.textContent = 'x';
    removeBtn.title = 'Remove';
    toggleBtn.textContent = newBook.readStatus;
    toggleBtn.title = 'Click to change';

    if(newBook.readStatus === 'Read'){
        toggleBtn.setAttribute('style',`background:${toggleBtnColor}`)
    }else if(newBook.readStatus === 'To Read'){
        toggleBtn.setAttribute('style',`background:${toggleBtnColor2}`)
    }
    
    card.appendChild(div);
    div.appendChild(removeBtn); 
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(toggleBtn);  
    
    removeBtn.addEventListener('click',() =>{
        card.removeChild(div);
        
        let index = myLibrary.indexOf(newBook);
        myLibrary.splice(index,1);

        displayBookStats();
    })

    toggleBtn.addEventListener('click',() => {
        if(newBook.readStatus === 'Read'){
            newBook.readStatus = 'To Read';
            toggleBtn.textContent = newBook.readStatus;
            toggleBtn.setAttribute('style',`background:${toggleBtnColor2}`)
        }else if(newBook.readStatus === 'To Read') {
            newBook.readStatus = 'Read';
            toggleBtn.textContent = newBook.readStatus;
            toggleBtn.setAttribute('style',`background:${toggleBtnColor}`)
        }
        displayBookStats();
    })        
}

function displayBookStats(){

    let readCounter = 0;
    let toReadCounter = 0;

    myLibrary.forEach((book) => {
        if(book.readStatus === 'Read'){
            readCounter++;
        }else toReadCounter++;
    })

    total.textContent = 'Total Books: ' + myLibrary.length;
    read.textContent = 'Read: ' + readCounter;
    toRead.textContent = 'To Read: ' + toReadCounter;

    bookStats.appendChild(total);
    bookStats.appendChild(read);
    bookStats.appendChild(toRead);
}

defaultBooks();
newBookBtn.addEventListener('click',createForm);

