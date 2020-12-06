let Destaques;

ListarDestaques = () => {
    const xhr = new XMLHttpRequest();
    console.log("asd");
    xhr.onload = ListarDestaquesSuceso;
    xhr.onerror = error;
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR&page=1');
    xhr.send();
}

function ListarDestaquesSuceso() {
    setDestaques(JSON.parse(this.responseText));
}

var setDestaques = function (val) {
    Destaques = val;
    if (Destaques) {
        sucessoDestaque();
    };
};

async function sucessoDestaque() {
    let lin1 = '';
    let lin2 = '';
    for (let j = 0; j <= 3; j++) {
        let destaque = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="img-card">
                    <a id="dest${j}" itemid="${Destaques.results[j].id}" href="" target="_blank">
                        <img src="https://image.tmdb.org/t/p/w500/${Destaques.results[j].poster_path}"
                            alt="${Destaques.results[j].title}" />
                    </a>
                </div>
            </div>
        `;
        lin1 += destaque;
    }
    for (let j = 0; j <= 3; j++) {
        let avaliacao = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="row">
                    <div class="col-md-2">
                        <img
                            src="https://image.tmdb.org/t/p/w500/${Destaques.results[j].backdrop_path}" />
                    </div>
                    <div class="col-md-10">
                        <b>Avaliação: </b> ${Destaques.results[j].overview}
                    </div>
                </div>
            </div>
        `;
        lin2 += avaliacao;
    }
    
   
    document.getElementById('destaques-js').innerHTML = lin1;
    document.getElementById('avaliacaoes-js').innerHTML = lin2;
    getLink();
}

let count2 = 0;
function getLink() {
    let uniqueId = $(`#dest${count2}`).attr('itemid');
    var xhr = new XMLHttpRequest();
    xhr.onload = sucessoLink;
    xhr.onerror = error;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${uniqueId}/external_ids?api_key=f92cc854e44d9e9273a6dce2efc19fc1`, false);
    xhr.send();
}

async function sucessoLink() {
    let response = await JSON.parse(this.responseText);
    console.log(response, `#dest${count2}`);   

    $(`#dest${count2++}`).attr('href', `https://www.imdb.com/title/${response.imdb_id}`);
    if(count2 <= 3)
        getLink();
}