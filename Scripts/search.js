let search;
let count3 = 0;
function Search() {
    count3 = 0;
    $("Resultado").empty();
    const xhr = new XMLHttpRequest();
    xhr.onload = setSearchSucsess;
    xhr.onerror = error;
    let valor = $(`#searchInput`).val();
    xhr.open('GET', `https://api.themoviedb.org/3/search/company?api_key=f92cc854e44d9e9273a6dce2efc19fc1&query=${valor}&page=1`);
    xhr.send();
}

var setSearch = function (val) {
    search = val;
    if (search) {
        SearchSucees();
    };
};

function setSearchSucsess() {
    setSearch(JSON.parse(this.responseText));
}

function SearchSucees() {
    let texto2 = '';
    for (let i = 0; i < search.results.length; i++) {
        texto2 += `
            <div class="col-md-3 img-card">
                <a id="sea${i}" itemid="${search.results[i].id}" href="" target="_blank">
                    <img src="" alt="${search.results[i].name ?? ''}" />
                </a>
                <br>
                ${search.results[i].name}
            </div>
            <br>
        `;
        console.log(i)
    }

    document.getElementById('Resultado').innerHTML = texto2;
    getPoster();
}


function getPoster() {
    let uniqueId = $(`#sea${count3}`).attr('itemid');
    console.log(uniqueId)
    var xhr = new XMLHttpRequest();
    xhr.onload = posterSucesso;
    xhr.onerror = error;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${uniqueId}?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR`);
    xhr.send();
}

async function posterSucesso() {
    let response = await JSON.parse(this.responseText);
    console.log(response)
    $(`#sea${count3}`).attr('href', `https://www.imdb.com/title/${response.imdb_id ?? ''}`);
    $(`#sea${count3++} > img`).attr('src', response.poster_path != null ? `https://image.tmdb.org/t/p/w500/${response.poster_path}` : "https://thumbs.dreamstime.com/b/ponto-de-interroga%C3%A7%C3%A3o-20881124.jpg");
    if (count3 <= search.results.length)
        setTimeout(getPoster(), 100);
}

function error() { console.log('Erro', err); }