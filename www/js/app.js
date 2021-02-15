angular.module('starter', ['ionic', 'ionic-modal-select', 'starter.controllers', 'starter.directives', 'ngCordova'])
.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    
    /*$ionicPlatform.registerBackButtonAction(function (condition) {
      if (condition) {
      } else {
      
      }
    }, 100);*/

  


    //initialiser le stockage des fiches en local
    if(localStorage.getItem('ficheSauvegarde')==null){
      
      var init = [];
      var value= {"fichev":{"actionAMener":"titobiii",
          "bracheSecteur":"tito",
          "brandingExterieur":"NON",
          "brandingInterieur":"NON",
          "connaissanceCodeEmployeTPE":"OUI",
          "dateAjout":"2018-09-22 22:27:11",
          "dispositionTPE":"OUI",
          "flyers":"OUI",
          "formulaireClient":"OUI",
          "grilleTarifVisible":"OUI",
          "montantDeposit":"100000.0",
          "niveauBatterieTPE":"Excellent",
          "niveauFormation":"Excellent",
          "photoPoint":"tito",
          "presenceConcurence":"tito",
          "idUser": "20",
          "idPointvent":"16"
        }
      };
      var value1= {"fichev":{"actionAMener":"tata",
          "bracheSecteur":"tito",
          "brandingExterieur":"NON",
          "brandingInterieur":"NON",
          "connaissanceCodeEmployeTPE":"OUI",
          "dateAjout":"2018-09-22 22:27:11",
          "dispositionTPE":"OUI",
          "flyers":"OUI",
          "formulaireClient":"OUI",
          "grilleTarifVisible":"OUI",
          "montantDeposit":"100000.0",
          "niveauBatterieTPE":"Excellent",
          "niveauFormation":"Excellent",
          "photoPoint":"tito",
          "presenceConcurence":"tito",
          "idUser": "20",
          "idPointvent":"16"
        }
      };
      //init.push(value)
     // init.push(value1)
      localStorage.setItem('ficheSauvegarde', angular.toJson(init))
      localStorage.setItem('prospectsSauvegarde', angular.toJson(init))
    }
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.show({
            title: 'Pas de connexion Internet',
            content: 'Désolé, aucune connectivité Internet détectée. Veuillez vous reconnecter pour plus d\'options.<br/>Si vous voullez poursuivre en mode hors ligne cliquez sur [OUI]',
            buttons: [
              {
                text: 'Non',
                type: 'button-assertive',
                onTap: function(e) {
                  return false;
                }
              },
              {
                text: 'OUI',
                type: 'button-energized',
                onTap: function(e) {
                  return true;
                }
              }]
          }).then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
      }
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($translateProvider) {
  $translateProvider.translations('en', translations_en);
  $translateProvider.translations('hi', translations_hi);
  $translateProvider.translations('pr', translations_pr);
  console.log("test lngge preferred");
  if(localStorage.getItem('preferredLanguage')==null){
    $translateProvider.preferredLanguage('hi');
  }else{
    var lang = localStorage.getItem('preferredLanguage');
    $translateProvider.preferredLanguage(lang);
  }
  //console.log(localStorage.getItem('preferredLanguage'));


})
//Routing
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'AppCtrl'
    })



    .state('app.accueil', {
      url: '/accueil',
      views: {
        'menuContent': {
          templateUrl: 'templates/accueil.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          //    controller: 'ProfileCtrl'

        }
      }
    })

    .state('app.compte', {
      url: '/compte',
      views: {
        'menuContent': {
          templateUrl: 'templates/compte.html',
          controller: 'AppCtrl'
        }
      }
    })


    .state('app.stocks', {
      url: '/stocks',
      views: {
        'menuContent': {
          templateUrl: 'templates/stocks.html',
          controller: 'StockCtrl'

        }
      }
    })

    .state('app.clients', {
      url: '/clients',
      views: {
        'menuContent': {
          templateUrl: 'templates/clients.html',
          controller: 'ClientCtrl'
        }
      }
    })
    .state('app.articles', {
      url: '/articles',
      views: {
        'menuContent': {
          templateUrl: 'templates/articles.html',
          controller: 'ArticleCtrl'
        }
      }
    })
    .state('app.prospects', {
      url: '/prospects',
      views: {
        'menuContent': {
          templateUrl: 'templates/prospects.html',
          controller: 'ProspectsCtrl'

        }
      }
    })
    .state('app.mesprospects', {
      url: '/mesprospects',
      views: {
        'menuContent': {
          templateUrl: 'templates/mesprospects.html',
          controller: 'MesprospectsCtrl'
        }
      }
    })
    .state('app.prcs', {
      url: '/prcs',
      views: {
        'menuContent': {
          templateUrl: 'templates/prcs.html',
          controller: 'PrcCtrl'
        }
      }
    })
    .state('app.details-prc', {
      url: '/details-prc',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-prc.html',
          controller: 'DetailPrcCtrl'
        }
      }
    })
    .state('app.nouvel-prc', {
      url: '/nouvel-prc',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-prc.html',
          controller: 'NewPrcCtrl'
        }
      }
    })


    .state('app.pdcs', {
      url: '/pdcs',
      views: {
        'menuContent': {
          templateUrl: 'templates/pdcs.html',
          controller: 'PdcCtrl'
        }
      }
    })
    .state('app.details-pdc', {
      url: '/details-pdc',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-pdc.html',
          controller: 'DetailPdcCtrl'
        }
      }
    })
    .state('app.nouvel-pdc', {
      url: '/nouvel-pdc',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-pdc.html',
          controller: 'NewPdcCtrl'
        }
      }
    })

    .state('app.pds', {
      url: '/pds',
      views: {
        'menuContent': {
          templateUrl: 'templates/pds.html',
          controller: 'PdsCtrl'
        }
      }
    })
    .state('app.details-pds', {
      url: '/details-pds',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-pds.html',
          controller: 'DetailPdsCtrl'
        }
      }
    })

    .state('app.nouvel-pds', {
      url: '/nouvel-pds',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-pds.html',
          controller: 'AddPdsCtrl'
        }
      }
    })

    .state('app.recapitulatif-pds-prc', {
      url: '/recapitulatif-pds-prc',
      views: {
        'menuContent': {
          templateUrl: 'templates/recapitulatif-pds-prc.html',
          controller: 'RecapPdsPrcCtrl'
        }
      }
    })

    .state('app.facturations', {
      url: '/facturations',
      views: {
        'menuContent': {
          templateUrl: 'templates/facturations.html',
          controller: 'FacturationsCtrl'
        }
      }
    })

    .state('app.facturation', {
      url: '/facturation',
      views: {
        'menuContent': {
          templateUrl: 'templates/facturation.html',
          controller: 'FacturationCtrl'
        }
      }
    })
    .state('app.details-facture', {
      url: '/details-facture',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-facture.html',
          controller: 'DetailsFactureCtrl'
        }
      }
    })

    .state('app.details-encaissement', {
      url: '/details-encaissement',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-encaissement.html',
          controller: 'DetailsEncaissementCtrl'
        }
      }
    })

    .state('app.planning', {
      url: '/planning',
      views: {
        'menuContent': {
          templateUrl: 'templates/planning.html',
          controller: 'PlanningCtrl'
        }
      }
    })

    .state('app.monplanning', {
      url: '/monplanning',
      views: {
        'menuContent': {
          templateUrl: 'templates/monplanning.html',
          controller: 'PlanningCtrl'
        }
      }
    })

    .state('app.details-planning', {
      url: '/details-planning',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-planning.html',
          controller: 'detailsPlanningCtrl'
        }
      }
    })

    .state('app.details-monplanning', {
      url: '/details-monplanning',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-monplanning.html',
          controller: 'detailsMonPlanningCtrl'
        }
      }
    })

    .state('app.consultationSole', {
      url: '/consultationSole',
      views: {
        'menuContent': {
          templateUrl: 'templates/consultationSole.html',
          controller: 'ConsultationSoleCtrl'
        }
      }
    })

    .state('app.details-soleGrossiste', {
      url: '/details-soleGrossiste',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-soleGrossiste.html',
          controller: 'detailsSoleGrossisteCtrl'
        }
      }
    })

    .state('app.details-soleAgent', {
      url: '/details-soleAgent',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-soleAgent.html',
          controller: 'detailsSoleAgentCtrl'
        }
      }
    })

    .state('app.envoi', {
      url: '/envoi',
      views: {
        'menuContent': {
          templateUrl: 'templates/envoi.html',
          controller: 'EnvoiCtrl'
        }
      }
    })

    .state('app.recuperation', {
      url: '/recuperation',
      views: {
        'menuContent': {
          templateUrl: 'templates/recuperation.html',
          controller: 'RecuperationCtrl'
        }
      }
    })

    .state('app.maps', {
      url: '/maps',
      views: {
        'menuContent': {
          templateUrl: 'templates/maps.html',
          controller: 'MapCtrl'

        }
      }
    })

    .state('app.coordonnees', {
      url: '/coordonnees',
      views: {
        'menuContent': {
          templateUrl: 'templates/coordonnees.html',
          controller: 'CoordonneesCtrl'

        }
      }
    })
    .state('app.addcompte', {
      url: '/addcompte',
      views: {
        'menuContent': {
          templateUrl: 'templates/addcompte.html',
          controller: 'AddcompteCtrl'

        }
      }
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: 'templates/accueil.html',
          controller: 'LogoutCtrl'

        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'

        }
      }
    })
    .state('app.bienvenue', {
      url: '/bienvenue',
      views: {
        'menuContent': {
          templateUrl: 'templates/bienvenue.html',
        }
      }
    })

    .state('app.dechargements', {
      url: '/dechargements',
      views: {
        'menuContent': {
          templateUrl: 'templates/dechargements.html',
          controller: 'dechargementsCtrl'
        }
      }
    })

    .state('app.dechargement', {
      url: '/dechargement',
      views: {
        'menuContent': {
          templateUrl: 'templates/dechargement.html',
          controller: 'DechargementCtrl'
        }
      }
    })

    .state('app.details-dechargement', {
      url: '/details-dechargement',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-dechargement.html',
          controller: 'DetailDechargementCtrl'
        }
      }
    })

    .state('app.versements', {
      url: '/versements',
      views: {
        'menuContent': {
          templateUrl: 'templates/versements.html',
          controller: 'versementsCtrl'
        }
      }
    })

    .state('app.versement', {
      url: '/versement',
      views: {
        'menuContent': {
          templateUrl: 'templates/versement.html',
          controller: 'versementCtrl'
        }
      }
    })

    .state('app.details-versement', {
      url: '/details-versement',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-versement.html',
          controller: 'DetailsVersementCtrl'
        }
      }
    })
    .state('app.nouvel-client', {
      url: '/nouvel-client',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-client.html',
          controller: 'AddClientCtrl'
        }
      }
    })
    .state('app.caclient', {
      url: '/caclient',
      views: {
        'menuContent': {
          templateUrl: 'templates/caclient.html',
          controller: 'CaClientCtrl'
        }
      }
    })

    .state('app.inventaires', {
      url: '/inventaires',
      views: {
        'menuContent': {
          templateUrl: 'templates/inventaires.html',
          controller: 'InventaireCtrl'
        }
      }
    })
    .state('app.details-inventaire', {
      url: '/details-inventaire',
      views: {
        'menuContent': {
          templateUrl: 'templates/details-inventaire.html',
          controller: 'DetailsInventaireCtrl'
        }
      }
    })
    .state('app.nouvel-inventaire', {
      url: '/nouvel-inventaire',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-inventaire.html',
          controller: 'AddInventaireCtrl'
        }
      }
    })
    .state('app.login1', {
      url: '/login1',
      views: {
        'menuContent': {
          templateUrl: 'templates/login1.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.nouvel-grossiste', {
      url: '/nouvel-grossiste',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouvel-grossiste.html',
          controller: 'nouvelGrossisteCtrl'
        }
      }
    }).state('app.account', {
      url: '/account',
      views: {
          'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
          }
      }
  });
  // if none of the above states are matched, use this as the fallback
  if (localStorage.getItem('loggedin_id')==null || localStorage.getItem('loggedin_password')==null || localStorage.getItem('loggedin_id')=='null' || localStorage.getItem('loggedin_password')=='null') {
   localStorage.setItem('isconn', false)
    $urlRouterProvider.otherwise('/app/login1');

  } else {
    localStorage.setItem('isconn', true)
    $urlRouterProvider.otherwise('/app/bienvenue');
  }
})
