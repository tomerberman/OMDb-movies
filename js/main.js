'use strict'

var gState = {
    list: [],
    query: '',
    page: 1,
    resultsEnded: false,
    totalResults: 0
}
const SEARCH_TERM_MIN_LENGTH = 3;

document.querySelector('form.search').addEventListener('submit', ev => {
    ev.preventDefault();
    searchQuery();
})

function searchOnline() {
    var api = `http://www.omdbapi.com/?apikey=d777cf78&s=${gState.query}&type=movie&page=${gState.page}`
    fetch(api).then(res => {
        return res.json();
    }).then(resJson => {
        if (resJson.Response && resJson.Response !== 'False') {
            gState.list = resJson.Search;
            gState.totalResults = resJson.totalResults;
            gState.resultsEnded = false;
        } else {
            gState.list = [];
        }
        renderList();
    }).catch(err => {
        console.warn('Connection Error : ', err);
    })
}

function searchQuery() {
    var query = document.querySelector('.search .movie-name').value
    if (query.length >= SEARCH_TERM_MIN_LENGTH) {
        gState.query = query;
        gState.page = 1;
        document.querySelector('.error-msg').classList.add('hide');
        document.querySelector('.load-more').removeAttribute("disabled");
        searchOnline(query);
    }
    else {
        document.querySelector('.error-msg').classList.remove('hide');
        document.querySelector('.error-msg button').focus();
    }
    document.querySelector('.search .movie-name').value = '';
}

function renderList() {
    if (gState.list.length < 10 || (gState.page * 10) === gState.totalResults) {
        gState.resultsEnded = true;
    }
    var strHtml = '';
    for (let i = 0; i < gState.list.length; i++) {
        strHtml +=
            `<li><h3>${gState.list[i].Title}</h3>`
            + `<img src="` + gState.list[i].Poster + `">`
            + `<a href="https://www.imdb.com/title/${gState.list[i].imdbID}/" target="_blank">More on IMDb</a>`
            + `</li>`
    }
    document.querySelector('ul').innerHTML = strHtml;
    if (gState.resultsEnded) {
        document.querySelector('.load-more').setAttribute("disabled", "");
    }
}

function onButtonOk(ev) {
    ev.preventDefault();
    document.querySelector('.error-msg').classList.add('hide');
}

function onLoadMore() {
    gState.page++;
    searchOnline();
}


// **************************************

// function onMovieClicked(elClicked, idx) {
    // gState.selected = idx;
    // var elList = document.querySelectorAll('li')
    // elList.forEach(el => {
    //     (el === elClicked) ? el.classList.add('selected') : el.classList.remove('selected');
    // });
    // console.log('idx=', idx);
    // console.log('ev=', elClicked);
    // console.log('details=', gState.list[idx].Year);
// }