---
layout: post
title: Retour du dotJS
author: mlux
tags: [dotjs]
layout: post
---

Vendredi 30 novembre s’est déroulée à Paris, au prestigieux Théâtre des Variétés, la conférence dotJS dont le pitch annonçait fièrement et je pense à juste titre « La plus grande conférence sur le JavaScript en France ». J’ai eu la chance d’y être et je vais vous proposer ici mon compte rendu.

![dotJS](http://svay.com/photos/2012-11-30_dotjs/conference/2012-11-30_10-17-17.jpg)

Le format
---------

Le format était plutôt atypique, il me parait intéressant de s’y attarder une minute. Pour commencer le cadre : un grand théâtre parisien ! Un peu impressionnant pour un geek français et j’imagine complètement dépaysant pour un geek étranger. J’ai trouvé cela très sympathique même si certains rabat-joie ont regretté le manque de place et la difficulté de voir l’écran depuis les balcons.

Maintenant les présentations. Il n’y avait qu’une track (on aurait eu bien du mal à imaginer autre chose vu le lieu ceci étant dit), des talks rapides de 20’ qui s’enchainent mais surtout des speakers extrêmement connu qui avaient carte blanche pour le sujet. Résultat : tous les types de talks, parfois même un peu philosophique ! Si j’ai trouvé cela très intéressant grâce à la qualité des speakers, on pourra regretter le côté un peu star système et le manque de découverte technique puisque peu ont parlé de leurs projets.

Mathias Bynens : le talk JavaScript technique
---------------------------------------------

Le premier à monter sur scène a été Mathias Bynens, freelance belge, il est connu pour sa collaboration à des projets très importants : jsperf.com et html5boilerplate.com.

Il a choisi de parler d’un problème précis dans le développement en JavaScript : la manipulation de caractères unicodes. Manipuler les caractères qui dépassent 4 caractères hexadécimaux peut devenir un vrai casse-tête puisqu’ils sont bizarrement encodés sur deux caractères mais affiché sur un seul. Il a bien sûr illustré son discours avec un caractère qu’on croise fréquemment à savoir la « pile of poo »  dont le code est "1F4A9" mais qui doit s’écrire en JS "\uD83D\uDCA9".


Kevin Schaaf : la présentation de framework
-------------------------------------------

Kevin Schaaf travaille chez HP sur webOS et Enyo framework. Sponsor important de l’évènement, il est venu présenter le framework issu de webOS pour le développement d’application.

Sa présentation très bien huilée avec des slides très travaillés a commencé sur l’HTML 5 en général avec notamment une remarque qui m’a interpelé : les applications HTML 5 ne sont plus comparées aux anciens sites Web mais aux applications les plus abouties d’iOS et Android. Le challenge est donc bien plus important ! Il a ensuite enchainé sur le mécanisme d’Enyo à base de composants. Chaque élément de l’interface Web est un composant avec un cycle de vie, et un composant peut être construit avec d’autres composants afin de progressivement travailler à un niveau de plus en plus haut.


Addy Osmani : le talk du googler passionné
------------------------------------------

Addy Osmani travaille chez Google, est connu pour ses contributions à jQuery, son blog, il est l’instigateur de TodoMVC et récemment de Yeoman.

Il nous a présenté les nouveautés des Chrome Dev Tools. Il a réalisé du debugging et du profiling en live avec les options méconnus mais tellement puissantes se trouvant dans notre Chrome. Il avait manifestement prévu de nous parler également de Yeoman mais s’étant laissé emporter, il a dû écourter. Tant son discours était passionné, je pense que personne ne lui en a tenu rigueur. N’hésitez pas à consulter ce projet très prometteur : http://yeoman.io/


Bert Belder : le talk technique node.js
---------------------------------------

Bert Belder travaille chez Cloud 9 et est un membre actif et commiter de node.js.

Mon niveau en node.js est encore celui d’un utilisateur émerveillé mais occasionnel, son talk m’a donc un peu dépassé, mais voici ce que j’en ai retenu. Déjà, node.js n’est pas en 1.0 mais en 0.8, la prochaine ne sera toujours pas la 1.0 mais la 0.10 tout simplement parce que l’équipe n’est pas satisfaite de certaines APIs. La 1.0 arrivera quand le projet sera satisfaisant. Il a ensuite parlé de deux nouvelles fonctionnalités : les domains http://nodejs.org/api/domain.html et l’API stream 2.


Charlie Robbins : le talk de management à l’américaine
------------------------------------------------------

Charlie Robbins est le (co)fondateur et CEO de Nodejitsu.

Charlie Robbins nous a proposé un cours de management. A mi-chemin entre son expérience de CEO chez Nodejitsu et la gestion de communauté Open Source il a donné ses conseils de management dans le monde actuel. J’espère ne pas trop déformer son discours en le résumant à établir que l’organisation pyramidale ne fonctionne pas, que les ingénieurs sont maintenant au sommet et que les CEO ou responsables de projets Open Source sont plus des facilitateurs que des dictateurs.


Jeremy Ashkenas : l’état de l’art et les perspectives par le boss
-----------------------------------------------------------------

Jeremy Ashkenas travaille actuellement pour le New York Times mais est principalement connu pour n’être pas moins que l’instigateur de projets CoffeeScript, BackboneJS et UnderscoreJS. On peut dire qu’il était la tête d’affiche de la journée.

Il nous a parlé des langages « symbiotiques ». A savoir tous ces langages qui se compilent pour fonctionner dans une architecture en place : Java, JavaScript, Python... Il explique la popularité de ces langages par la lourdeur des architectures qui ne sont plus réellement remplaçable. Les évolutions se font donc par la compatibilité avec les plateformes en place. Etant le créateur d’un des plus importants langages symbiotiques avec CoffeeScript, il l’a utilisé comme référence. Il a expliqué son succès par son lien étroit avec sa plateforme cible à savoir le JavaScript. CoffeeScript a pour but d’écrire du JavaScript plus proprement et plus rapidement. Il n'est pas là pour forcer des concepts qui n’existent pas à la base comme notamment le typage fort.


Brian Leroux : s’amuser avec le JavaScript
------------------------------------------

Brian Leroux travaille actuellement pour Adobe sur le projet PhoneGap et Apache Cordova dont il est l’un des créateurs. Il est connu pour son travail pour le Web mobile.

Il a choisi de faire une présentation des choses les plus étonnantes que le langage JavaScript nous réserve. Pour cela, rien de mieux qu’une console node.js avec une police en 80 ! Aidé de son script sur son iPad, il a parcouru bien des cas particulier du JavaScript que vous pourrez tous retrouver sur le site wtfjs.com. Heureusement, il a pensé à préciser en entrée qu’il aime le JavaScript !


Christian Amor Kvalheim : l’ingénieur rencontre le gamer
--------------------------------------------------------

Il travaille chez 10gen sur MongoDB et est notamment le créateur du driver MongoDB pour node.js.

Dans son talk, il s’est permis de retourner en enfance, lorsqu’il était fan des premiers jeux vidéo dont notamment Pacman. Il nous a décrit un projet qu’il a réalisé utilisant ses connaissances sur MongoDB et node.js qui a pour but de reproduire cet illustre jeu, mais en version Web et multijoueur. Il nous a détaillé les défis techniques que représente le temps réel dans le jeu multijoueur.


Vojta Jina : le talk inspirant
------------------------------

Vojta Jina travaille chez Google sur le projet AngularJS. Il est également celui qui est à l’origine du framework de test pour AngularJS : TestacularJS.

Même si AngularJS fait beaucoup parler de lui actuellement, Vojta Jina a choisi de ne pas du tout en parler. Il a parlé avec passion des grands inventeurs du monde JavaScript : Ryan Dhal (node.js), John Resig (jQuery) mais aussi en dehors du JavaScript avec Dennis Ritchie (C & Unix). Il a insisté sur le fait que ces « inventeurs » ne se sont pas levés un jour avec une idée miraculeuse. Ils ont simplement chercher à concevoir l’outil qui leur manquait à un instant donné. Il en a fait de même, à son échelle, avec TestacularJS et que nous pouvions tous le faire.


Mr Doob : un geek chez les geeks
--------------------------------

Mr Doob est le créateur de three.js, un framework remarquable pour manipuler les capacités graphiques des nouveaux navigateurs.

Quand j’utilise geek dans le titre, c’est de façon positive bien sûr. Au milieu d’un théatre plein de geeks, Mr Doob m’est apparu comme un geek en comparaison : un bon vieux t-shirt les mains dans les poches, à parler vite de choses manifestement compliqués. Sa présentation n’était pas facile à suivre. J’espère ne pas trop pervertir le sens en la résumant ainsi. La 3D desktop s’est progressivement enrichie d’outils de modélisation. Aujourd'hui le Web sait afficher la même 3D mais n’a pas ces outils de modélisation. Il a présenté les premiers écrans de son nouveau projet frame.js qui a pour but de proposer une interface de modélisation pour three.js.


Jacob Thornton (@fat) : le show !
---------------------------------

Jacob Thornton plus connu sous le nom de @fat est l’auteur de Twitter Bootstrap, Ender et Hogan.js.

Nous étions en fin de journée et il était alors peut être difficile de remotiver l’assistance mais il l’a fait de main de maître. Sur la base de supports réalisés sous forme de dessin à main levé et pixélisé à souhait, il a commencé par décrire l’origine de l’« OpenSource » notamment avec Richard Stallman et Linus Torvalds. Il a ensuite enchainé sur les problèmes auxquels sont confrontés les instigateurs des grands projets Open Source qui amènent la plupart de ces leaders à se désengager progressivement de leur invention.

Conclusion
----------

Une journée bien remplie, des illustres personnalités et donc une belle réussite, toutes les photos de la journée sont disponibles ici. Il est bien sûr important de remercier Sylvain Zimmer et Thomas Bassetto de Joshfire pour avoir organisé l’évènement et de relayer l’annonce qu’ils ont faite en clôture : non seulement le renouvellement du dotJS pour 2013 mais le lancement d’une série de conférence sur le même modèle : http://www.dotconferences.eu/.