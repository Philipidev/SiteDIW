let Movies;

function LoadMovies() {
    const xhr = new XMLHttpRequest();
    xhr.onload = LoadMoviesSucesso;
    xhr.onerror = error;
    xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/day?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR');
    xhr.send();
}

var setMovies = function(val){
    Movies = val;
    if (Movies){
        sucessoLancamento();
    };
};

function LoadMoviesSucesso() {
    setMovies(JSON.parse(this.responseText));
}

let i = 0;
async function sucessoLancamento() {
    let text = '';
    for (let j = 0; j <= 2; j++) {
        let carousel = `
            <div class="carousel-item${j == 0 ? ' active' : ''}">
                <div class="row">
                    <aside class="col-md-6 col-sm-1">
                        <iframe id="video${j}" itemid="${Movies.results[j].id}" class="video" src="https://www.youtube.com/embed/L3pk_TBkihU" alt="${Movies.results[j].title}"></iframe>
                    </aside>
                    <aside class="col-md-6 col-sm-1 sinopse">
                        <h2>${Movies.results[j].title}</h2>
                        <p>
                            <b>Sinopse: </b>${Movies.results[j].overview}
                        </p>
                        <div class="row">
                            <p class="col-md-4">
                                <b>Diretor: </b>${Movies.results[j].overview}
                            </p>
                            <p class="col-md-4">
                                <b>Roteiro: </b>${Movies.results[j].overview}
                            </p>
                            <p class="col-md-4">
                                <b>Estreia: </b>${Movies.results[j].release_date}
                            </p>
                        </div>
                        <b>Elenco:</b>
                        <p>
                            ${Movies.results[j].overview}
                        </p>
                    </aside>
                </div>
            </div>`;
        text += carousel;
        videoId = `video${j}`;
    }
    text += `
        <a class="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    `;

    document.getElementById('lancamentos-js').innerHTML = text;
    getYouTubeLink();
}

let count = 0;
function getYouTubeLink() {
    let uniqueId = $(`#video${count}`).attr('itemid');
    var xhr = new XMLHttpRequest();
    xhr.onload = sucessoKey;
    xhr.onerror = error;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${uniqueId}/videos?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR`);
    xhr.send();
}

async function sucessoKey() {
    let response = await JSON.parse(this.responseText);
    $(`#video${count++}`).attr('src', `https://www.youtube.com/embed/${response.results[0].key}`);
    if(count != 3)
        getYouTubeLink();
}

function error() { console.log('Erro', err); }