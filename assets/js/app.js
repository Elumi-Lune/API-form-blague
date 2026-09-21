const table = document.getElementById('table');
const formulaire = document.getElementById('joke-form');
const btnClear = document.getElementById('btn-clear');
const categorie = document.getElementById('categorie');

// On récupère les blagues déjà enregistrées si elles existent.
let blagues = JSON.parse(localStorage.getItem('blagues')) || [];

// Permet d'avoir un id différent pour chaque ligne.
const obtenirIdUnique = (() => {
    let compteur = blagues.length > 0
        ? Math.max(...blagues.map(blague => blague.id))
        : 0;

    return () => ++compteur;
})();

// Création du tableau.
table.innerHTML = `
    <thead class="table-dark">
        <tr>
            <th scope="col">Catégorie</th>
            <th scope="col">Blague</th>
            <th scope="col">Édition</th>
        </tr>
    </thead>
    <tbody id="table-body"></tbody>`;

const tbody = document.getElementById('table-body');

// Sauvegarde les blagues dans le LocalStorage.
function sauvegarderBlagues() {
    localStorage.setItem('blagues', JSON.stringify(blagues));
}

// Ajoute une blague dans le tableau HTML.
function afficherUneBlague(blague) {
    tbody.insertAdjacentHTML('beforeend', `
        <tr id="blague-${blague.id}">
            <th scope="row">${blague.category}</th>
            <td>${blague.texte}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm btn-delete" data-id="${blague.id}">
                    Supprimer la blague
                </button>
            </td>
        </tr>`);
}

// Réaffiche les blagues sauvegardées lors du chargement de la page.
function afficherBlagues() {
    tbody.innerHTML = '';

    blagues.forEach(blague => {
        afficherUneBlague(blague);
    });
}

async function getJoke() {
    const api_url = `https://v2.jokeapi.dev/joke/${categorie.value}?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

    try {
        const reponse = await fetch(api_url);

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const element = await reponse.json();

        if (element.error) {
            throw new Error(element.message);
        }

        console.log('Données reçues :', element);

        let texteBlague = '';

        // JokeAPI peut renvoyer une blague en une partie ou en deux parties.
        if (element.type === 'single') {
            texteBlague = element.joke;
        } else {
            texteBlague = `${element.setup}<br>${element.delivery}`;
        }

        const nouvelleBlague = {
            id: obtenirIdUnique(),
            category: element.category,
            texte: texteBlague
        };

        blagues.push(nouvelleBlague);
        afficherUneBlague(nouvelleBlague);
        sauvegarderBlagues();

        console.table(blagues);

    } catch (erreur) {
        console.error('Erreur lors de la requête :', erreur);
        alert('Impossible de récupérer une blague pour le moment.');
    }
}

// Envoi du formulaire : on récupère une nouvelle blague.
formulaire.addEventListener('submit', (event) => {
    event.preventDefault();
    getJoke();
});

// Suppression d'une seule ligne.
tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = Number(event.target.dataset.id);
        const ligne = document.getElementById(`blague-${id}`);

        ligne.remove();
        blagues = blagues.filter(blague => blague.id !== id);
        sauvegarderBlagues();
    }
});

// Vide complètement le tableau.
btnClear.addEventListener('click', () => {
    tbody.innerHTML = '';
    blagues = [];
    sauvegarderBlagues();
});

// Affichage des anciennes blagues au chargement de la page.
afficherBlagues();
