---
layout: post
title: AngularJS la philosophie
author: mlux
tags: [angularjs]
layout: post
---

![AngularJS](http://angularjs.org/img/AngularJS-large.png)

Si tout se passe comme je l'espère, cet article sera le premier d'une série à propos d'AngularJS. Et s'il faut un premier sujet à propos d'Angular, je choisis sans hésiter ce qu'il fait que, pour moi, il se démarque des autres : sa philosophie.

Pour beaucoup, le "by Google" dans le logo est un gage de qualité, lorsque j'ai abordé AngularJS, il représentait plutôt une alerte. Il fallait déterminer si la popularité grandissante du framework était mérité où si elle provenait seulement du marketing de Google. C'est lorsque j'ai découvert les idées qu'il apporte que j'ai compris que j'avais à faire à bien plus qu'une manoeuvre marketing.

AngularJS n'est pas simplement un autre framework JavaScript pour faire des sites Web. Il vient avec une philosophie qui propose d'aborder la création d'application Web différemment. Une approche en rupture avec la façon actuelle pour la rendre plus rapide, plus propre et en accord avec le futur de la norme du Web : l'HTML.

Dans cet article, vous ne verrez pas de code, mais plutôt des idées et des grands principes. Le code qui en découle arrivera par la suite comme la matérialisation par du code d'objectifs supérieurs. Des briques très solides tantôt très caractéristiques d'AngularJS, tantôt présentes dans d'autres framework, qui servent à mettre en application les principes.

Mais attention, nombre de frameworks ont énoncé de grandes idées et ont été balayés par des codes plus pragmatiques. Je ne perds pas de vu que ces grands principes doivent aboutir à quelque chose d'utile et de performant. Vous verrez que les concepteurs d'Angular n'ont jamais perdu de vue cette problématique.

Déclaratif plutôt qu'impératif
------------------------------

Pour définir une interface utilisateur, une approche a toujours gagné en efficacité et en lisibilité : le déclaratif. Le déclaratif, c'est utiliser un langage pour décrire comment l'interface se présente à l'utilisateur. Cette approche s'oppose à l'impératif qui programmatiquement enchaîne les ordres pour construire le même résultat.

Les informaticiens sont élevés dans l'impératif, ils apprennent à programmer des modifications successives pour arriver à leur fin. Malheureusement pour nous, c'est horriblement verbeux et impossible à maintenir pour les interfaces utilisateurs. Finalement, tous les frameworks destinés à la réalisation d'interfaces possèdent aujourd'hui un langage de déclaratif en plus du langage impératif. La part de déclaratif est plus ou moins importante selon les cas. Une illustration vient à l'esprit, c'est GWT qui a commencé sans langage déclaratif et qui a dû l'ajouter après coup tant cela manquait (je parle bien sûr des UiBinder).

Le Web a déjà son langage déclaratif : l'HTML. Le JavaScript est son langage impératif associé. Aujourd'hui, grâce à (ou peut être à cause de) la puissance de jQuery, presque tout est impératif. La manière actuelle de faire du Web est de faire un contenu HTML très basique et de l'instrumenter avec beaucoup de code JavaScript. Malheureusement, le Web se retrouve aujourd'hui confronté au tout impératif difficile à maintenir et à organiser.

AngularJS se propose de ramener le déclaratif dans le développement d'application Web. S'il est lui-même écrit avec beaucoup de code JavaScript, il propose à ceux qui l'utilisent de diminuer drastiquement leur quantité de code JavaScript impératif au profit code déclaratif.

Etendre le language HTML
------------------------

Pour atteindre l'objectif d'augmenter la part de déclaratif, le principe d'AngularJS est de ne pas réinventer un langage mais d'utiliser celui qui est déjà là : l'HTML. Bien sûr, tel qu'il existe aujourd'hui, il est beaucoup trop limité. AngularJS va alors proposer un mécanisme d'extension. Par bonheur, aussi hétérogènes que puisse être les navigateurs, tous supportent l'utilisation de balises et de paramètres HTML qui n'existent pas ([ce n'est pas tout à fait vrai pour IE mais il y a des contournements](http://docs.angularjs.org/guide/ie)). Ils se contentent simplement de les ignorer.

AngularJS va donc repasser sur le DOM pour interpréter ces balises et ces paramètres supplémentaires et les instrumenter afin que du code HTML augmenté réponde aux attentes de la description d'une interface riche moderne.

Bien d'autres frameworks proposent des solutions de template côté client : un fichier, contenant du pseudo code HTML qui passe par un moteur pour créer finalement un contenu HTML valide. Mais l'approche d'AngularJS, même si elle est très proche dans son fonctionnement, propose non pas de convertir un pseudo code en HTML. Elle propose un code HTML enrichi qui représente l'interface à tout moment. Moralement, on ne génère pas du code HTML, on écrit simplement de l'HTML.

Cette extension du langage HTML a pour but de se mettre à jour en fonction de l'évolution d'un modèle de données. Pour la détection des changements dans le modèle, AngularJS utilise un système assez différenciant : le dirty checking. Je pense le détailler dans un autre article. Il permet de surveiller et de détecter toutes modifications sur un objet JavaScript standard. Par standard, on entend : sans avoir à étendre d'une classe donnée ou de réaliser des modifications en passant par des getters ou des setters.

Cette fonctionnalité incluse dans AngularJS est en passe d'être directement implémentée dans les navigateurs avec l'initiative [Object.observe()](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe). AngularJS dispose déjà d'une branche prototype s'appuyant sur cette nouvelle fonctionnalité et y gagne sensiblement en performance. Dans ce cas, AngularJS propose donc d'utiliser dès aujourd'hui une fonctionnalité à venir sur le Web et promet d'en profiter pleinement dès l'instant où elle sera déployée.

Enfin, il y a le rapprochement avec l'initiative des [WebComponents](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html). AngularJS propose de créer des nouvelles balises réutilisable au HTML ce qui s'apparente très nettement au principe des WebComponents. En ce sens également, Angular prend de l'avance sur ce que l'HTML va nous proposer à l'avenir.

Ainsi, on finit par comprendre voir même approuver toutes ces formules pompeuses pour vanter AngularJS :

- **HTML enhanced for web apps!**
- **AngularJS is HTML6**
- **Angular is what HTML would have been had it been designed for applications**

Contrepartie
-------------

Tous ces grands concepts présents dans AngularJS finissent tout de même par créer une de ses faiblesses.

Le monde du Web est largement dominé par jQuery à l'heure actuelle. Et on l'a vu, jQuery s'oppose dans sa façon de faire aux idéaux d'AngularJS. Implicitement, un développeur Web qui débute avec AngularJS se trouvera tôt ou tard confronté à la question : "comment il faut le faire avec AngularJS". C'est une attitude saine voir même indispensable car faire de l'impératif avec AngularJS revient à ne pas s'en servir. Malheureusement, elle peut finir par coûter du temps, d'autant que les ressources sur Internet matraquent les solutions mettant en oeuvre jQuery et donc incompatible avec la "façon de faire" d'AngularJS.

Ce problème peut s'aggraver quand il faut utiliser des composants exterieurs. Si de bonnes librairies de composants AngularJS commencent à voir le jour, la grande majorité aujourd'hui prennent la forme de plugin jQuery. Et donc les développeurs AngularJS se retrouvent souvent confronté à la nécessité de créer un wrapper AngularJS sur un composant jQuery et d'avoir à évaluer où doit s'arréter Angular et ou doit commencer jQuery.

Vous l'aurez compris, même si je suis conscient de ces contres parties, je considère qu'AngularJS et sa philosophie en valent le prix. Je pense même que cette contrepartie est une conséquence de la richesse du saut technologique que propose AngularJS. Avec un peu de temps, entre librairies spécialisées pour AngularJS et documentation sur Internet, on peut même espérer que cette problématique disparaisse.


