---
layout: post
title: Les WebSockets en pratique
author: mlux
layout: post
---

L'HTML 5 fait bien des émules en ce moment grâce à la quantité de nouvelles fonctionnalités qu'il apporte mais aussi et surtout par l’ampleur des possibilités qu'ouvre chacune de ces fonctionnalités.

Les WebSockets en sont un parfait exemple. L'API est très simple : connexion, réception et envoi d'un message, sont ses seules fonctionnalités et pourtant cela pourrait bien révolutionner la physionomie du Web.

Maintenant, en qualité de développeur Web, voici la question que je me pose : quels sont les outils qui me sont donnés pour utiliser cette nouvelle possibilité. Avec comme sous entendu : il est hors de question que d'avoir à gérer directement une socket, il me faut des outils pour créer et manipuler les WebSockets facilement.

Objectifs
---------

Pour répondre à cette question j'ai démarré un repository GitHub regroupant l'implémentation de la même application mettant en oeuvre les WebSockets avec un panel des technologies existantes.

L'application est très simple mais met en œuvre des concepts qui ne sont pas forcément courant pour un développement client / serveur : push serveur vers client, code asynchrone, etc.

Le but était de vérifier, pour chaque implémentation, si elle est facilement mise en œuvre, compréhensible et maintenable : tous ces critères qui font que l'on est content du code produit.

Côté performances, il était trop coûteux et techniquement assez complexe de réaliser des tests de charge, je vous renverrai vers les benchmarks existant sur internet.

L'application
-------------

L'objectif est d'avoir une application très courte mais qui met en œuvre des évènements côté serveur à transmettre au client. Pour cela, rien de mieux que l'application de démonstration si populaire en ce moment : le Twitter Wall.

J'ai justement assisté récemment à une présentation d'un live coding sur Backbone JS pour un Twitter Wall. J'ai donc récupéré les sources pour avoir le code de la partie cliente clé en main et pouvoir me concentrer sur le côté serveur.

Voici les références : Bodil Stokke ([@bodiltv](https://twitter.com/#!/bodiltv)), présentation au [Mix IT 2012](http://www.mix-it.fr) intitullé "[Painless Web App Development with Backbone](http://www.mix-it.fr/session/95/painless-web-app-development-with-backbone)" (la conversion CS > JS est de moi par contre).

Toutes mes sources sont disponibles sur GitHub : [https://github.com/Swiip/hello-twitter](https://github.com/Swiip/hello-twitter)

Les technologies choisies
-------------------------

En tant que développeur Web Java, j'ai une plutôt bonne vision des mondes Java et JavaScript. Je ne sais pas si c'est le sentiment général, mais ma vision en commençant est que le leader pour faire du WebSocket n'est pas côté Java mais côté JavaScript avec [Socket.IO](http://socket.io/). Si je cible principalement des technologies Java, j'ai pris cette implémentation JavaScript comme référence.

J'ai récemment assisté à une présentation de Play Framework qui parlait notamment de sa gestion des WebSockets. Comme il est très populaire et que j'avais envie de l'essayer de toute façon, je l'ai choisis pour ma première implémentation.

Et puis il y a la percée de [Vert.x](http://vertx.io/) avec des benchs tonitruant sur internet le plaçant devant node.js, je l'ai donc choisi comme deuxième implémentation dans l'idée de voir si le fonctionnel proposé était à la hauteur.

Pour compléter le panel avec une technologie JEE, j'ai pris comme dernière implémentation la WebSocketServlet de Jetty (je détaillerai pourquoi celle ci et pas Atmosphere ou Tomcat 7).

node.js & Socket.IO
-------------------

L'implémentation node.js et Socket.IO n'a pas démenti sa qualité. Coupons court aux évidences, on est en JavaScript, cela en rebute encore certains. Mais ce serait vraiment dommage de passer à côté de Socket.IO seulement pour ça.

Après avoir installé quelques modules avec le très bon npm, l'API est parfaite : socket.listen, socket.on, le site et donc la doc sont de bonne qualité et on ne rencontre aucun problème de sérialisation des données puisqu'on est en JSON côté serveur et côté client.

Un focus sur le système d'évènement que je trouve très pratique : avec Socket.IO, on ne se positionne pas directement sur la socket mais au-dessus d'un bus d'évènement. Chaque message est un évènement avec un nom. C'est très pratique et cela évite à avoir à gérer un dispatch manuel en fonction du contenu de chaque message.

En plus de cela, Socket.IO a une compatibilité navigateur très large avec un "transport fallback" sur énormément de technologies Web : WebSocket, Adobe Flash Socket, Ajax long polling, Ajax multipart streaming, Forever Iframe, JSONP Polling !

Voici l'extrait du code :

    io.sockets.on("connection", function(socket) {
        socket.on("filter", function(text) {
            console.log("open stream on ", text);
            t.stream("statuses/filter", {
                track: text
            }, function(s) {
                s.on("data", function(data) {
                    console.log("received tweet ", data)
                    socket.emit("tweet", data);
                });
                s.on("error", function(error) {
                    console.log(util.inspect(error));
                });
                s.on("end", function() {
                    console.log("****** ERROR: Twitter stream terminated!")
                });
            });
        });
        socket.on("disconnect", function() {
            console.log("socket closed");
        });
    });

Play 2
------

Je n'ai pas une grand expérience de Play Framework, mais lors du [Mix IT 2012](http://www.mix-it.fr), j'ai vu la présentation [Play 2.0](http://www.mix-it.fr/session/99/play-2-0) qui parlait de sa gestion des I/O asynchrone et d'un support des WebSocket, j'ai donc essayé.

Il a d'abord fallu démarrer le projet : avec l’écosystème Scala pour le build et les templates notamment, cela déstabilise un peu. Passer cette étape, le framework est assez simple d'utilisation et on arrive vite à l’implémentation de la WebSocket. Si la documentation ne regorge pas d'exemples, il y a tout de même ce qu'il faut.

Une WebSocket en Play 2, cela veut dire implémenter la classe WebSocket et la retourner comme valeur au contrôleur, c'est assez clair. Dans la WebSocket, on trouve des méthodes onReady et onMessage bien compréhensibles et le système de Callback Java de Play, cela se code assez bien.

Après Socket.IO on est obligé de regretter la sérialisation manuelle en String et l'absence de système de "transport fallback" : s'il y a un mauvais proxy sur le chemin ou un vieux navigateur rien ne fonctionnera.

Et voici pour le code :

    return new WebSocket<String>() {
        @Override
        public void onReady(WebSocket.In<String> in, final WebSocket.Out<String> out) {
            debug("web socket ready");
    
            final StatusListener statusListener = new StatusAdapter() {
                @Override
                public void onStatus(twitter4j.Status status) {
                    if (status.getInReplyToScreenName() == null) {
                        out.write(Json.toJson(status).toString());
                    }
                }
            };
    
            // For each event received on the socket,
            in.onMessage(new Callback<String>() {
                @Override
                public void invoke(String message) throws Throwable {
                    twitterStream.cleanUp();
                    twitterStream.addListener(statusListener);
                    FilterQuery filterQuery = new FilterQuery();
                    filterQuery.track(new String[] { message });
                    twitterStream.filter(filterQuery);
                }
            });
    
            // When the socket is closed.
            in.onClose(new Callback0() {
                public void invoke() {
                    debug("on close");
                }
            });
        }
    };

vert.x
------

vert.x est le petit nouveau des frameworks "asynchrones" qui se veut polyglotte et plus performant que node.js, il est donc très prometteur.

Pour démarrer le projet, la documentation est très complète et le premier "hello world" arrive rapidement. Pour lancer le projet, il suffit d'un script qui lance une classe Java, c'est très simple et cela fonctionne bien. Attention, il faudra un Java 7 au minimum pour vert.x.

Pour la WebSocket, c'est une bonne nouvelle : ce n'est pas "juste" une WebSocket (même si c'est possible) mais une implémentation de SockJS. SockJS ressemble beaucoup à Socket.IO à la différence qu'il est polyglotte (node.js, erlang, python, Java etc.).

Un peu plus jeune que Socket.IO, il semble tout de même être au point et gère tout autant de "transport fallback". On regrettera par contre, la sérialisation en String manuelle et le système d'évènement de Socket.IO.

Côté API, vertx.createSockJSServer, sockJSServer.installApp et sock.dataHandler on retrouve rapidement les différents concepts.

Et le code complet :

    SockJSServer sockJSServer = vertx.createSockJSServer(httpServer);
    
    JsonObject config = new JsonObject().putString("prefix", "/twitter");
    
    sockJSServer.installApp(config, new Handler<SockJSSocket>() {
        public void handle(final SockJSSocket sock) {
            final StatusListener statusListener = new StatusAdapter() {
                @Override
                public void onStatus(twitter4j.Status status) {
                    if (status.getInReplyToScreenName() == null) {
                        Buffer buffer = new Buffer(Json.encode(status));
                        sock.writeBuffer(buffer);
                    }
                }
            };
    
            sock.dataHandler(new Handler<Buffer>() {
                public void handle(Buffer buffer) {
                    twitterStream.cleanUp();
                    twitterStream.addListener(statusListener);
                    FilterQuery filterQuery = new FilterQuery();
                    filterQuery.track(new String[] { buffer.toString() });
                    twitterStream.filter(filterQuery);
                }
            });
        }
    });

WebSocketServlet
----------------

Cette implémentation m'a donné du fil à retordre et pourtant je voulais au moins un exemple avec une technologie JEE.

Premier étonnement, la norme Servlet 3 toute neuve réputé pour être asynchrone... Ne gère pas les WebSocket ! Elle propose de faire des traitements asynchrones dans une servlet normale, mais pas de gérer les WebSocket.

Ensuite il y a le cas d'[Atmosphere](https://github.com/Atmosphere/atmosphere/). Ici j'admets ne pas être très objectif et je ne m’étendrai pas sur le sujet mais pour aller droit au but : je n'ai rien compris. J'ai lu des articles, regardé des exemples de code, je ne retrouvais pas les différents concepts dans l'API et je n'étais toujours pas capable de faire mon Twitter Wall, j'ai fini par passer mon chemin.

Il restait donc les implémentations spécialisées d'une WebSocketServlet par Jetty ou Tomcat 7 (qui ne sont malheureusement pas les mêmes), l'API proposé par Jetty était un tout petit peu plus plaisante à mes yeux, c'est donc celle que j'ai choisi.

A partir de là c'est allé mieux : "public class TwitterServlet extends WebSocketServlet", doWebSocketConnect, onMessage, j'ai pu reproduire rapidement le fonctionnel des autres implémentations.

Par contre, tout comme dans l'implémentation avec Play 2, on manipule directement la WebSocket, nous ne disposons donc pas de fonctionnalités avancées comme un système de transport fallback.

Voici une partie du code :

    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new WebSocket.OnTextMessage() {
            private Connection connection;
    
            private final StatusListener statusListener = new StatusAdapter() {
                @Override
                public void onStatus(twitter4j.Status status) {
                    if (status.getInReplyToScreenName() == null) {
                        try {
                            connection.sendMessage(new ObjectMapper().writeValueAsString(status));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            };
    
            @Override
            public void onOpen(Connection connection) {
                this.connection = connection;
                System.out.println("open");
            }
    
            @Override
            public void onMessage(String message) {
                twitterStream.cleanUp();
                twitterStream.addListener(statusListener);
                FilterQuery filterQuery = new FilterQuery();
                filterQuery.track(new String[] { message });
                twitterStream.filter(filterQuery);
            }
    
            @Override
            public void onClose(int arg0, String arg1) {
                System.out.println("close");
            }
        };
    } 

Conclusion
----------

En conclusion Socket.IO est effectivement très bien placé. Très bonne API, de bonnes idées, une bonne documentation et toutes les fonctionnalités nécessaires. Les autres sont obligés de s'y comparer.

Le petit nouveau vert.x s'en sort très bien, c'est le seul à proposer du transport fallback facilement. Évidemment, il ne sera pas toujours facile de convaincre un DSI de mettre cela en production tout de suite.

Si vous avez un site Play, vous avez un support intéressant, si vous n'en avez pas encore, je ne pense pas qu'il faille y aller juste pour cela.

Enfin, dans le monde des normes et du JEE, cela fonctionne bien sur Jetty ou Tomcat 7 spécifiquement mais il n'y a rien encore qui fasse référence.

Rappel de la localisation des sources : [https://github.com/Swiip/hello-twitter](https://github.com/Swiip/hello-twitter)