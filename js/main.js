'use strict'

var moviePrm = fetch('http://www.omdbapi.com/?apikey=d777cf78&s=love&type=movie&page=1');
var data = moviePrm.then(res => {
    return res.json();
})
.then(resJson => {
    console.log('data from api = ',resJson.Search);
    renderList(resJson.Search, 'Title');
})

function renderList(list, key){
    var strHtml = '';
    for (let i=0; i<list.length; i++){
        strHtml += `<li>Movie ${i} : ${list[i][key]}</li>`
        console.log('data[' + i + '] =',list[i][key]);
    }
    document.querySelector('ul').innerHTML = strHtml;
}
