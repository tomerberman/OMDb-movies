'use strict'

var gState = {
    list: [],
    selected: null,
    page: 1
}
const SEARCH_TERM_MIN_MENGTH = 3;

document.querySelector('form.search').addEventListener('submit', ev => {
    ev.preventDefault();
    searchQuery();
})

function searchOnline(query) {
    var moviePrm = fetch(`http://www.omdbapi.com/?apikey=d777cf78&s=${query}&type=movie&page=${gState.page}`);
    moviePrm.then(res => {
        return res.json();
    }).then(resJson => {
        gState.list = resJson.Search;
        renderList();
        
        console.log('data from api = ', resJson.Search);
    })
}

function searchQuery() {
    var query = document.querySelector('.search .movie-name').value
    console.log('query of input el=', query);

    if (query.length >= SEARCH_TERM_MIN_MENGTH) {
        searchOnline(query);
    }  // else show message
}

function renderList() {
    var strHtml = '';
    for (let i = 0; i < gState.list.length; i++) {
        strHtml += `<li onclick="onMovieClicked(this,` + i
            + `)">Movie ${i} Title: ${gState.list[i].Title}` +
            `<img src="` + gState.list[i].Poster + `"></li>`
            
        console.log('data[' + i + '] =', gState.list[i].Title);
    }
    document.querySelector('ul').innerHTML = strHtml;
}

function onMovieClicked(elClicked, idx) {
    gState.selected = idx;
    var elList = document.querySelectorAll('li')
    elList.forEach(el => {
        (el === elClicked) ? el.classList.add('selected') : el.classList.remove('selected');
    });

    console.log('idx=', idx);
    console.log('ev=', elClicked);
    console.log('details=', gState.list[idx].Year);
}



