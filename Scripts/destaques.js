ListarDestaques = () => {
    setTimeout(null,2000);
    const xhr = new XMLHttpRequest();
    xhr.onload = sucessoDestaque;
    xhr.onerror = error;
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=f92cc854e44d9e9273a6dce2efc19fc1&language=pt-BR&page=1');
    xhr.send();
}

async function sucessoDestaque() {
    let response = JSON.parse(this.responseText);
    let lin1 = '';
    let lin2 = '';
    for (let j = 0; j <= 3; j++) {
        let destaque = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w500/${response.results[j].poster_path}"
                        alt="${response.results[j].title}" />
                </div>
            </div>
        `;
        lin1 += destaque;
    }
    for (let j = 0; j <= 3; j++) {
        console.log(response.results[i],j)
        let avaliacao = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="row">
                    <div class="col-md-2">
                        <img
                            src="https://image.tmdb.org/t/p/w500/${response.results[j].backdrop_path}" />
                    </div>
                    <div class="col-md-10">
                        <b>Avaliação: </b> ${response.results[j].overview}
                    </div>
                </div>
            </div>
        `;
        lin2 += avaliacao;
    }
    document.getElementById('destaques-js').innerHTML = lin1;
    document.getElementById('avaliacaoes-js').innerHTML = lin2;
}