

// media variable declaration
let animeImage = document.querySelector('.image');
let anime_trailer = document.querySelector('.aniTrailer')
let animeName = document.querySelector('.name');
let japaneseName = document.querySelector('.japanese_title');
let malLink = document.querySelector('#malLink');
let type = document.querySelector('#typ');
let stat = document.querySelector('#stat');
let episodeCount = document.querySelector('#epi');
let timeLapse = document.querySelector('#time-point');
let rank = document.querySelector('#ranking');
let score = document.querySelector('#sco');
let rating = document.querySelector("#rank");
let synopses = document.querySelector('.synopsis');
let season = document.querySelector('#seas');
let year = document.querySelector('#ye');
let studio = document.querySelector('#st');
let demographic = document.querySelector('.link');
let trailer = document.querySelector('.link-trailer');


// interactive component variable declaration

const backward = document.querySelector('.next');
const forward = document.querySelector('.prev');
const theme = document.querySelector('#theme');
const themeIcon = document.querySelector('.theme-icon')
const mode = document.querySelector('.mode');
const popular = document.querySelector('.popular');
const airing = document.querySelector('.airing');
const pageTurn = document.querySelector('.pagination');
const nextPage = document.querySelector('.nextPage');
const home = document.querySelector('.return');


// function to update display upon receiving the data from Jaiken api 
function updateDisplay(list) {
    
    animeImage.src = list.images.jpg['image_url'];
    // stopping the autoplay when video loads (used: autoplay = 0)
    anime_trailer.src = `${list.trailer['embed_url']}?autoplay=0`;
    animeName.textContent = list['title'];
    japaneseName.textContent = list.title_japanese;
    malLink.href = list.url;
    type.textContent = list.type;
    stat.textContent = list.status;
    episodeCount.textContent = list.episodes;
    timeLapse.textContent = list.aired['string'];
    rank.textContent = list.rank;
    score.textContent = list.score;
    rating.textContent = list.rating;
    synopses.textContent = list.synopsis;
    season.textContent = list.season;
    year.textContent = list.year;
    studio.textContent = list.studios[0].name;
    demographic.textContent = list.demographics[0].name;
    demographic.href = list.demographics[0].url;
    trailer.href = list.trailer.url;
}


// interactive button actions



//1. set prefer to anime by default
let prefer = 'anime';




// 2. Choosing anime based on popularity

// declaring variable choice with a value of airing by default
let choice = 'airing';

/* if the user clicks the popular button to sort anime by popularity,
function will check if the choice is already set to popularity
if it is then it won't do anything and return as it is, 
else choice will be set to popular and getData() will be called
*/

popular.addEventListener('click', () => {
    if (choice == 'bypopularity') return;
    else {
        choice = 'bypopularity';
        getData();
    }
})

/* if the user clicks the airing button to sort anime by airing,
function will check if the choice is already set to airing
if it is then it won't do anything and return as it is, 
else choice will be set to airing and getData() will be called
*/

airing.addEventListener('click', () => {
    if (choice == 'airing') return;
    else {
        choice = 'airing';
        getData();
    }
})


// 3. forward and backward button

let i = 0;
let page = 1;
forward.addEventListener('click', () => {
    if (i == 24) return;
    else {
        getData(i++)
    }
})
backward.addEventListener('click', () => {
    if (i == 0) return;
    else {
        pageTurn.style.display = 'none';
        getData(i--)
    }
})


// 4. pagination

// if i is already 24 and user clicks the next button again than pop-up will appear
// asking for next page or return
forward.addEventListener('click', () => {
    if (i == 24) {
        pageTurn.style.display = 'block';
    }
})

// if user clicks on next-page, page value will be incremented by one and i will reset to 0
// getData() will be called again
nextPage.addEventListener('click', () => {
    page++;
    i = 0;
    pageTurn.style.display = 'none'
    getData();
}) 

// return button functionality
home.addEventListener('click', () => {
    i = 0;
    page = 0;
    pageTurn.style.display = 'none'
    getData();
})

// 5. dark theme button
theme.checked = true;
theme.addEventListener('change', () => {
    if (theme.checked == true) {
        themeIcon.src = 'images/moon-solid.svg'
        document.documentElement.style.setProperty('--main', '#5CDB95');
        document.documentElement.style.setProperty('--day-mainText', '#EDF5E1');
        document.documentElement.style.setProperty('--day-components', '#05386B');
        document.documentElement.style.setProperty('--day-disc', '#FC4445');
        document.documentElement.style.setProperty('--fc', 'white');
    }
    else {
        themeIcon.src = 'images/lightbulb_black_24dp.svg'
        document.documentElement.style.setProperty('--main', '#1A1A1D');
        document.documentElement.style.setProperty('--day-mainText', '#52057B');
        document.documentElement.style.setProperty('--day-components', '#950740');
        document.documentElement.style.setProperty('--day-disc', '#C3073F');
        document.documentElement.style.setProperty('--fc', 'white');
        document.documentElement.style.setProperty('--stats', '#1A1A1D');
    }
})



// async function to fetch data from the api
async function getData() {
    //fetching the data 
    let res = await fetch(`https://api.jikan.moe/v4/top/${prefer}?type=tv&filter=${choice}&page=${page}`)

    let data = await res.json();
    // path to the data object is data.data

    // passing the data in in the update function to update the display
    updateDisplay(data.data[i])
}

getData()
