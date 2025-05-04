const dropZone = document.getElementById('dropZone');
const tipoImagem = document.getElementById('tipoImagem');
const categoriaContainer = document.getElementById('categoriaContainer');
const categoriaImagem = document.getElementById('categoriaImagem');

let nomeArquivo = '';

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('hover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('hover');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    processarArquivo(file);
});

dropZone.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => processarArquivo(e.target.files[0]);
    input.click();
});

function processarArquivo(file) {
    if (file && file.type.startsWith('image/')) {
        nomeArquivo = file.name;
        dropZone.textContent = `Imagem carregada: ${nomeArquivo}`;
    } else {
        dropZone.textContent = "Arquivo inválido.";
        nomeArquivo = '';
    }
}

function atualizarCategoria() {
    const tipo = tipoImagem.value;
    if (tipo === 'mangá' || tipo === 'manhwa') {
        categoriaContainer.classList.remove('hidden');
    } else {
        categoriaContainer.classList.add('hidden');
    }
}

function gerarCodigo() {
    const tipo = tipoImagem.value;
    const categoria = categoriaImagem.value;
    const alt = document.getElementById('altText').value.trim();

    if (!nomeArquivo || !tipo || !alt || (tipo !== 'gestual' && !categoria)) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    let caminho = '';

    if (tipo === 'gestual') {
        caminho = `/img/imgs_gestual/${nomeArquivo}`;
    } else {
        caminho = `/img/imgs_${tipo}_${categoria}/${nomeArquivo}`;
    }

    const idImagem = 'img' + Math.floor(Math.random() * 10000);

    const cod1 = `<div class="card">
<a href="#${idImagem}">
<img src="${caminho}" alt="${alt}">
</a>
</div>`;

    const cod2 = `<div id="${idImagem}" class="lightbox">
<a href="#" class="close">&times;</a>
<img src="${caminho}" alt="${alt}">
</div>`;

    document.getElementById('codigo1').value = cod1;
    document.getElementById('codigo2').value = cod2;
}