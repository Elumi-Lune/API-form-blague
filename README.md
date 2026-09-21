# TP API - JokeAPI

Ce projet permet de récupérer des blagues depuis l'API JokeAPI et de les afficher dans un tableau.

## Technologies utilisées

- HTML
- CSS
- JavaScript
- Bootstrap 5
- JokeAPI

## Fonctionnalités

- Récupération d'une blague avec `fetch()`.
- Blagues demandées en français.
- Blocage des contenus NSFW, religieux, politiques, racistes, sexistes et explicites.
- Gestion des blagues de type `single` et `twopart`.
- Affichage de la catégorie et de la blague dans un tableau.
- Suppression d'une blague individuellement.
- Possibilité de vider tout le tableau.
- Choix de la catégorie de blague.
- Sauvegarde des blagues dans le LocalStorage.

## Choix techniques

J'ai utilisé `async/await` avec `fetch()` pour effectuer l'appel à l'API.
Bootstrap est utilisé pour la mise en forme de la page et des boutons.
Le LocalStorage permet de garder les blagues même après avoir actualisé ou fermé la page.