---
layout: post
title: 'AngularJS : Getting Started'
author: mlux
tags: [angularjs]
layout: post
---

Voici enfin la suite des articles pour AngularJS. Après la théorie, nous allons nous lancer dans la création d’un projet avec AngularJS afin de voir à quoi cela ressemble vraiment.

Quitte à décevoir ceux qui ont vu mon livecoding, j’ai choisi d’en reprendre les grandes lignes dans cet article. Il était justement pensé pour être didactique sur le démarrage avec AngularJS et d’en montrer rapidement les fonctionnalités vraiment intéressantes.

Le choix du code que nous allons parcourir a été fait dans le but d’éviter le désormais célèbre Twitter Wall et de faire quelque chose que nous devons tous, en tant que développeur, réaliser trop souvent : une interface de CRUD. Il s’agit en somme d’afficher des données et de permettre de les modifier avec un formulaire. Si d’autres solutions demandent souvent beaucoup de code passe plats pour réaliser ce genre d’interfaces, nous verrons qu’AngularJS est vraiment très optimisé dans ce cas d’utilisation.

Afin que l’exemple soit réellement complet, nous allons partir de la page blanche et en profiter pour parler d’un outil vraiment intéressant, qui permet d’accélérer et de consolider les développements Web : Yeoman.

J’ai été largement aidé dans la rédaction de cet article par Cédric Nisio qui travaille également sur AngularJS chez Zenika.

Les sources présentées ici sont toutes disponibles sur GitHub : [https://github.com/Swiip/yeoman-angular](https://github.com/Swiip/yeoman-angular). Le repository contient également les slides (une version OpenOffice et une JavaScript) que j’ai utilisé lors des présentations.

## Yeoman

Yeoman est un projet lancé par des grands noms du Web tel que Paul Irish ou Addy Osmani, dans le but d’améliorer le workflow des développements d’interfaces Web. Pour cela, Yeoman propose un enchainement de trois outils : Yo, qui permet de générer la base d’un projet, Bower, qui gère les dépendances des librairies, et Grunt, qui réalise les tâches de Build.

Ces outils sont écrits en JavaScript et fonctionnent avec NodeJS (mais n’imposent aucune dépendance à NodeJS pour le fonctionnement du site produit). L’installation se fait avec le gestionnaire de paquets de NodeJS, npm (Node Package Manager) et la ligne de commande suivante :

    npm install -g yo grunt-cli bower

Plus d’informations sur [http://yeoman.io/](http://yeoman.io/)

Si l’installation de Yeoman pose problème ou si cette partie ne vous intéresse pas, vous pouvez également partir du projet angular-seed [https://github.com/angular/angular-seed](https://github.com/angular/angular-seed).

# Yo

La commande yo permet de générer la base de notre projet web. Il existe de nombreux “generator” qui permettent de démarrer des projets avec différents frameworks (EmberJS, BackboneJS...). Nous utiliserons bien entendu le générateur spécifique à AngularJS dont voici quelques utilisations courantes :

    yo angular <appName>            : génère l’application avec le nom <appName>App avec un contrôleur et une vue par défaut.
    yo angular:<templateName>       : génère les fichiers correspondant au template <templateName>. Les différents templates disponibles sont : controller, service, directive, view, route, filter et app par défaut.

Exemple :

    yo angular:route <routeName>    : génère le contrôleur <routeName>Ctrl, la vue <routeName> et ajoute la règle de routage dans le fichier de déclaration du module Angular.

# Bower

Avec bower, le Web bénéficie aujourd’hui de son propre gestionnaire de dépendances :

    bower search <libName>      rechercher une librairie dans la base de bower
    bower install <libName>     installer une librairie
    bower update <libName>      mettre à jour une librairie
    bower list                  générer l’arbre des dépendances

# Grunt

Grunt est l’outil de build du monde JavaScript. Il est très outillé en vue de réaliser très simplement les tâches courantes du Web. Dans un projet produit par un générateur Yeoman, la configuration de Grunt est déjà très complète : le build contient par défaut plusieurs étapes telles que le lancement des tests avec Karma, la concaténation et minification du JavaScript, la compilation des langages comme CoffeeScript. On obtient, si les tests passent, un répertoire dist contenant tout le nécessaire pour déployer notre application.

    grunt server        lancer un serveur afin de tester notre application, avec une fonctionnalité notable : le LiveReload, qui permet au serveur de recharger la page automatiquement dès qu’une des sources a été modifiée.
    grunt test          lancer les tests
    grunt               construire l’application


## Hello World

Tout d’abord, nous allons écrire le classique Hello World, mais avec un petit plus, pour montrer une fonctionnalité au coeur d’AngularJS, le databinding.

Si vous ne l’avez pas déjà fait, commençons par générer la base de notre projet avec la commande suivante :

    yo angular myApp

Acceptez les différentes options proposées par le générateur, notamment Twitter Bootstrap, afin d’avoir un rendu plus propre, et angular-resource, que nous utiliserons par la suite.

Remplacez le code généré dans le fichier `app/views/main.html` par :

    <div class="hero-unit">
        <h1>{{hello}}</h1>
        <input type="text" ng-model="hello" />
    </div>

La notation entre double accolades signifie qu’il s’agit d’un appel AngularJS. L’attribut `ng-model` dans la balise input est une balise AngularJS, qui permet ici de lier la variable `hello` au champ de texte.
En appelant `grunt server` maintenant, vous ne verrez qu’un champ de texte vide, mais si vous y écrivez quelque chose, la balise `h1` sera mise à jour immédiatement.

Nous allons maintenant initialiser la variable `hello` à `“Hello World!”` dans le contrôleur de cette vue. Pour ceci, dans le fichier `app/scripts/controllers/main.js` remplacez le code entre accolades par :

    $scope.hello = 'Hello World !';

La variable `$scope` correspond à l’environnement des variables disponibles dans la vue, par les appels entre double accolades ou dans les attributs AngularJS.
En enregistrant le fichier, si vous avez laissé le serveur grunt tourner, la page devrait se rafraîchir automatiquement et afficher le “Hello World !” tant attendu.

## Démarrage du serveur

Par la suite, nous utiliserons un serveur exposant des ressources en REST, pour simuler un backend. Le contenu du répertoire server du dépôt github permet de lancer un serveur RESTful en NodeJS / ExpressJS à partir d'un serveur MongoDB. Il y en a deux versions, une qui demande un serveur MongoDB en local sur la machine : `offline.js` et l'autre qui utilise le service MongoHQ : `app.js`.
Lancez le serveur, en exécutant l’une des commandes suivantes :

    node offline

ou

    node app

## Service REST AngularJS

Interressons nous maintenant à l’accès à des données via une interface REST afin de réaliser une application CRUD.

Dans notre exemple, nous utiliserons la librairie angular ngResource. Si elle fait partie du projet AngularJS, elle reste sous forme de librairie optionnelle. Pour l’ajouter aux dépendances, il faut modifier le fichier de déclaration du module angular, `app/scripts/app.js`, comme ceci :

    angular.module('myApp', ['ngResource'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        });

Appelez ensuite la commande suivante depuis la racine du projet :

    yo angular:service Frameworks

Puis, modifiez le code du fichier généré, `app/scripts/services/Frameworks.js`, comme ceci :

    angular.module('myApp').factory('Frameworks', function($resource) {
        return $resource('http://localhost\\:1234/frameworks/:id', {
            id: '@_id'
        });
    });

`$resource` est un objet fourni par la librairie ngResource qui sera injecté automatiquement par le système d’injection de dépendance d’AngularJS. L’URL spécifiée en paramètre est en fait un template d’URL. Le paramètre `:id` sera ignoré pour les requêtes s’adressant à la ressource en général (comme get all) et sera automatiquement remplacé par la valeur de la propriété `“_id”` pour les requêtes unitaires (comme update ou delete).

## Affichage des données

Passons à l’affichage des frameworks, dans le fichier `app/views/main.html` :

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>URL</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="framework in frameworks" ng-click="edit(framework)">
                <td>{{framework.name}}</td>
                <td>{{framework.url}}</td>
            </tr>
        </tbody>
    </table>


Regardons de plus près la balise `ng-repeat`. Elle permet de définir un traitement à appliquer à chaque élément d’un array. Ainsi la balise `tr` (et tout son contenu) sera répétée autant de fois qu’il y a d’éléments dans le tableau frameworks. À l’intérieur de la balise `tr`, la variable `framework` correspond à l’élément courant du tableau.

L’attribut `ng-click` permet de spécifier un comportement sur un clic, ici sur une ligne du tableau.

Notez que nous n’avons pas encore défini la fonction `edit` prenant un framework en paramètre. Nous y viendrons.

Si vous rafraîchissez la page, vous ne verrez qu’un tableau vide. Ajoutons-lui quelques lignes en récupérant les données du backend. Dans le fichier `app/spcripts/controllers/main.js`, déclarez la dépendance au service `Framework` et récupérez les données du backend dans la variable `frameworks` comme ceci :

    angular.module('myApp').controller('MainCtrl', function ($scope, Frameworks) {
        $scope.frameworks = Frameworks.query();
    }


Bien que l’appel derrière `Frameworks.query()` soit asynchrone, il n’est pas utile d’utiliser un callback. La fonction retourne un objet vide qui sera par la suite enrichie avec les données récupérée. Lorsque ce sera le cas, le databinding bidirectionnel d’AngularJS mettra automatiquement à jour la vue.

Notre tableau devrait maintenant contenir quelques lignes.

## Modification, ajout et suppression

Pour la modification et l’ajout, déclarez une modal bootstrap dans la vue `app/views/main.html`

    <button class="btn" ng-click="edit({})">Add</button>
    <div class="modal hide fade">
        <div class="modal-header">
            <h3>Edit</h3>
        </div>
        <div class="modal-body">
            <label>Name</label>
            <input type="text" ng-model="framework.name"/>
            <label>URL</label>
            <input type="text" ng-model="framework.url"/>
        </div>
        <div class="modal-footer">
            <button class="btn" ng-click="save()">Save</button>
        </div>
    </div>


Ajoutez une cellule au tableau, pour accueillir le bouton de suppression :

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>URL</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="framework in frameworks" ng-click="edit(framework)">
                <td>{{framework.name}}</td>
                <td>{{framework.url}}</td>
                <td><button class="btn btn-danger" ng-click="delete(framework, $index, $event)">Delete</button></td>
            </tr>
        </tbody>
    </table>

Pour cette dernière étape nous aurons besoin du code JavaScript de Bootstrap pour manipuler la modal. Bootstrap dépend de jQuery mais Bower va gérer cette dépendance pour nous :

    bower install bootstrap

N’oubliez pas que Bower télécharge les dépendances mais ne les importe pas dans le site Web, ajouter donc les balises scripts dans `app/index.html`.
Il ne reste plus qu’à écrire les différentes méthodes appelées par les boutons que nous venons de déclarer. Pour ceci, complétez le contrôleur `MainCtrl`, dans le fichier `app/scripts/controllers/main.js`, avec le code suivant :

    var modal = $('.modal');

    $scope.edit = function(framework) {
        $scope.framework = framework;
        modal.modal('show');
    }
    $scope.save = function() {
        if($scope.framework.$save) {
            $scope.framework.$save();
        } else {
            $scope.frameworks.push(Frameworks.save($scope.framework));
        }
        modal.modal('hide');
    }

    $scope.delete = function(framework, $index, $event) {
        $event.stopPropagation();
        $scope.frameworks.splice($index, 1);
        framework.$delete();
    }


L’utilisation des méthodes `framework.$save()` et `framework.$delete()` est rendue possible par le module ngResource : celui-ci ajoute des méthodes supplémentaires aux objets qu’il renvoie. Ainsi, si l’on est en train d’éditer un objet qui nous a été fourni par le service `Frameworks` qui utilise `$resource`, les méthodes `$save()` et `$delete()` sont disponibles. Cependant, si l’on est en train de créer un contact, et non d’en modifier un, l’objet que nous manipulons est `{}`, l’objet JavaScript vide, qui ne contient pas ces méthodes. Il convient donc de vérifier que la méthode `$save` existe bien avant de l’utiliser.

## Conclusion

Dès l’initialisation d’un nouveau projet AngularJS, les composants importants ressortent et structurent le code : injection de dépendances, services REST, binding.

En très peu de lignes de code, nos données sont associées à un tableau et à un formulaire ce qui permet de réaliser ce genre d’interface à une vitesse record.

Bien sûr, cet exemple est optimisé pour mettre en valeur les avantages d’AngularJS et nous verrons dans les articles suivants, des applications plus complètes, qui demandent un peu plus de code, telles que la création de nouvelles directives.




