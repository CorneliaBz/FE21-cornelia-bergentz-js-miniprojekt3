//Lägg till din egna KEY
const KEY = 'bfba7b00bd13b5f5a597dca92c4f36f8';


//User input variabler
const btn = document.querySelector(`button`);
const btn2 = document.getElementById(`reset`);

const txtInput = document.getElementById(`text`);
const nrInput = document.getElementById(`nr`);
const sizeInput = document.getElementById(`size`);

let searchText = txtInput;
let errorMessage = document.querySelector(`#errorMessage`);

//Gör knappen klickbar
btn.addEventListener(`click`, function(){

    console.log(txtInput.value);
    console.log(nrInput.value);
    console.log(sizeInput.value);

    //Send searchvalue to function 
    searchImg(txtInput.value);
}
);

//Skapar funktion för knappen reset
btn2.addEventListener(`click`, function(){

    const div = document.querySelector('div');
    const divAll = document.querySelectorAll('div *');

    //Tar bort alla bilder
    for(let i = 0; i<divAll.length; i++){
        const all = divAll[i];
        all.remove();
    }

}
);

//Lägg till user input i URL
//Fetch url för request data

function searchImg(searchText){
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=${nrInput.value}&page=1`;

    fetch(url).then(
        function(response){
            console.log(response);
            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function(data){
            console.log(data);
            //Vi hämtar första bilden
            for(let i=0; i<data.photos.photo.length; i++){
                getImageUrl(data.photos.photo[i]); 
                console.log(data.photos.photo.length);

            };
        }
    ).catch(
        function(error) {
            console.log(error);
            errorMessage.textContent = 'Cannot find the image you are looking for. Try again!'
        }
    );
}


//Bild-URLen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = sizeInput.value; 

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//visa bilden
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    const div = document.querySelector(`div`); 
    div.appendChild(img);
}