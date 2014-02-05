app.Models.articleCommande = Backbone.Model.extend({
    defaults: {
        count: 1,
        supplements: '',
        etat: '',
    },
    idAttribute: "id",
    initialize: function Doc() {
        this.set({
            htmlId: this.cid
        })
    },
    toggleActive: function() {
        if (this.get('etat') === '') {
            this.set({
                etat: 'active'
            });
        } else {
            this.set({
                etat: ''
            });
        }
    }
});


app.Collections.commande = Backbone.Collection.extend({
    model: app.Models.articleCommande,
    initialize: function() {},
    count: function() {
        console.log('count');
        var total = 0;
        app.collections.commande.each(function(article) {
            var articlePrix = parseFloat(article.get('prix'));
            var supplements = article.get('supplements');
            var count = article.get('count');
            var prix_supplement = 0;
            if (supplements != undefined) {
                $.each(supplements, function(i, supplement) {
                    var prix_supplement = parseFloat(supplement['fois_prix']) * parseFloat(articlePrix) - parseFloat(articlePrix) + parseFloat(supplement['plus_prix']);
                    articlePrix += prix_supplement;
                });
            }
            total += articlePrix.toFixed(2) * count;
        });
        return total;
    },
    chargerTable: function(table_id) {
        this.reset();
        url = app.config.url + '/get/commande/table_id/' + table_id + '.json';
        $.getJSON(url, function(data) {
            if (data['articles'] !== undefined) {
                $.each(data['articles'], function(key, val) {
                    for (i = 0; i < val['count']; i++) {
                        var article = {
                            'prix': val['prix'],
                            'name': val['name'],
                            'id_article': val['id'],
                            'supplements': val['supplements'],
                            'comment': val['comment']
                        };
                        app.collections.commande.addArticle(article);
                    }
                });

                // on vient de charger les commandes d'une table. Elle devient donc active
                app.infos.set('tableId', table_id);
            } else {
                navigator.notification.alert('La commande est vide');
            }

        });
    },
    chargerClient: function(infos) {
        if (infos['hash'] !== undefined) {
            var param = infos['hash'];
        } else {
            var param = infos['username'];
        }
        this.reset();
        url = app.config.url + '/get/commande/client/' + param;
        $.getJSON(url, function(data) {
            if (data['articles'] !== undefined) {
                $.each(data['articles'], function(key, val) {
                    for (i = 0; i < val['count']; i++) {
                        var article = {
                            'prix': val['prix'],
                            'name': val['name'],
                            'id_article': val['id'],
                            'supplements': val['supplements'],
                            'comment': val['comment']
                        };
                        app.collections.commande.addArticle(article);
                    }
                });

            } else {
                navigator.notification.alert('La commande est vide');
            }

        });
    },
    chargerId: function(id) {
        this.reset();
        url = app.config.url + '/get/commande/id/' + id + '.json';
        $.getJSON(url, function(data) {
            if (data['articles'] !== undefined) {
                $.each(data['articles'], function(key, val) {
                    for (i = 0; i < val['count']; i++) {
                        var article = {
                            'prix': val['prix'],
                            'name': val['name'],
                            'id_article': val['id'],
                            'supplements': val['supplements'],
                            'comment': val['comment']
                        };
                        app.collections.commande.addArticle(article);
                    }
                });

                // on vient de charger une commande. Elle devient donc active
                app.infos.set('commandeId', id);
                app.infos.set('statutId', data['statut_commande']);
            } else {
                navigator.notification.alert('La commande est vide');
            }
        });
    },

    enregister: function(table_id) {
        $.ajax({
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            url: app.config.url + '/save/commande/' + table_id,
            data: {
                table_id: table_id,
                commande: app.collections.commande.toJSON(),
                commande_id: app.infos.get('commandeId'),
            },
            // Il faudra lancer l'impression du ticket ici
            success: function() {
                app.infos.annuler();
                navigator.notification.alert('La commande a été enregistrée');
            },
        });
    },
    modifier: function() {
        if (app.infos.get('statutId') !== 0 && app.infos.get('statutId') !== 1) {
            console.log(app.infos.get('statutId'));

            navigator.notification.alert('Vous ne pouvez plus modifier la commande');
        } else {
            console.log(app.infos.get('statutId'));
            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                url: app.config.url + '/modif/commande',
                data: {
                    table_id: app.infos.get('tableId'),
                    commande: app.collections.commande.toJSON(),
                    commande_id: app.infos.get('commandeId'),
                },
                // Il faudra lancer l'impression du ticket ici
                success: function() {
                    app.infos.annuler();
                    navigator.notification.alert('La commande a été modifiée');
                },

            });
        }
    },
    encaisser: function(type) {
        if (app.infos.get('tableId') > 0) {
            var url = app.config.url + '/commande/archiver/' + app.infos.get('tableId');
        } else if (app.infos.get('commandeId') > 0) {
            var url = app.config.url + '/commande/archiver/commande/' + app.infos.get('commandeId');
        } else {
            var url = app.config.url + '/save/commande/' + app.infos.get('tableId');
        }
        if (type === -1) {
            console.log('commande cash');
            app.infos.set({
                cash: app.collections.commande.count()
            })
        }
        // on a encaisse directement le compte juste
        else if (type === -2) {
            console.log('commande bancontact')
            app.infos.set({
                bancontact: app.collections.commande.count()
            })
        }
        // on offre la commande
        else if (type === -3) {
            console.log('commande offerte');
            app.infos.set({
                statut: 5
            });
        }
        // on envoit les données pour enregistrer la commande
        $.ajax({
            type: 'POST',
            url: url,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                bancontact: app.infos.get('bancontact'),
                cash: app.infos.get('cash'),
                commande: app.collections.commande.toJSON(),
                table_id: app.infos.get('tableId'),
                commande_id: app.infos.get('commandeId'),
                statut_id: app.infos.get('statut'),
            },
            success: function() {
                navigator.notification.alert('La commande a été finalisée');
                app.infos.annuler();
            }
        });
    },
    deleteArticle: function() {
        this.remove(this.where({
            etat: "active"
        }));
    },
    addArticle: function(article) {
        findArticle = app.collections.commande.findWhere({
            'id_article': article.id_article
        });
        if (article.supplements === undefined) {
            article['supplements'] = '';
        }
        if (article.comment === undefined) {
            article['comment'] = '';
        }

        if (findArticle != undefined && JSON.stringify(findArticle.get('supplements')) == JSON.stringify(article.supplements) && findArticle.get('comment') == article.comment) {
            findArticle.set({
                'count': findArticle.get('count') + 1
            });
        } else {
            app.collections.commande.add(article);
        }

    },
    addArticleId: function(id) {
        var article = app.collections.articles.findWhere({
            'id_article': id
        });
        var article = {
            'prix': article.get('prix'),
            'name': article.get('name'),
            'id_article': article.get('id_article'),
        };
        app.collections.commande.addArticle(article);
    },
    addArticleOptions: function(options) {
        var count = options['count'];
        if (isNaN(count) || count === '') {
            count = 1;
        }
        var id = options['id'];
        var article = app.collections.articles.findWhere({
            'id_article': id
        });
        var article = {
            'prix': article.get('prix'),
            'name': article.get('name'),
            'id_article': article.get('id_article'),
            'comment': options.comment
        };
        for (i = 0; i < count; i++) {
            app.collections.commande.addArticle(article);
        }
    }
});