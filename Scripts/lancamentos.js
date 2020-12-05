ListarLancamentos = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = sucessoLancamento;
    xhr.onerror = error;
    xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/day?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR');
    xhr.send();
}

let i = 0;
async function sucessoLancamento() {
    let response = JSON.parse(this.responseText);
    let textooo = '';
    for (let j = 0; j <= 2; j++) {
        let carousel = `
            <div class="carousel-item${j == 0 ? ' active' : ''}">
                <div class="row">
                    <aside class="col-md-6 col-sm-1">
                        <iframe id="video${j}" itemid="${response.results[j].id}" class="video" src="https://www.youtube.com/embed/L3pk_TBkihU" alt="${response.results[j].title}"></iframe>
                    </aside>
                    <aside class="col-md-6 col-sm-1 sinopse">
                        <h2>${response.results[j].title}</h2>
                        <p>
                            <b>Sinopse: </b>${response.results[j].overview}
                        </p>
                        <div class="row">
                            <p class="col-md-4">
                                <b>Diretor: </b>${response.results[j].overview}
                            </p>
                            <p class="col-md-4">
                                <b>Roteiro: </b>${response.results[j].overview}
                            </p>
                            <p class="col-md-4">
                                <b>Estreia: </b>${response.results[j].release_date}
                            </p>
                        </div>
                        <b>Elenco:</b>
                        <p>
                        ${response.results[j].overview}
                        </p>
                    </aside>
                </div>
            </div>`;
        textooo += carousel;
        videoId = `video${j}`;
    }
    textooo += `
        <a class="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    `;

    document.getElementById('lancamentos-js').innerHTML = textooo;
    //  getYouTubeLink();
}


// async function getYouTubeLink() {
//     //console.log('valor do i', i)
//     let uniqueId = $(`#video${i++}`).attr('itemid');
//     var xhr = new XMLHttpRequest();
//     xhr.onload = sucessoKey;
//     xhr.onerror = error;
//     xhr.open('GET', `https://api.themoviedb.org/3/movie/${uniqueId}/videos?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR`, false);
//     //multiples requests
//     xhr.send();
//     if (i != 3 && i != 4)
//         setTimeout(await getYouTubeLink, 2000);
// }

// let count = 0;
// async function sucessoKey() {
//     let response = await JSON.parse(this.responseText);
//     //console.log(response.results[0].key);
//     console.log(`#video${count}`);
//     let uniqueId = $(`#video${count}`).attr('itemid');
//     //console.log(count);
//     //console.log(uniqueId);
//     //console.log(response.results[0].key);
//     $(`#video${count++}`).attr('src', `https://www.youtube.com/embed/${response.results[0].key}`);
// }

function error() { console.log('Erro', err); }