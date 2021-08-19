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
        'appContent': {
          templateUrl: 'templates/accueil.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'appContent': {
          templateUrl: 'templates/profile.html',
          //    controller: 'ProfileCtrl'

        }
      }
    })

    .state('app.compte', {
      url: '/compte',
      views: {
        'appContent': {
          templateUrl: 'templates/compte.html',
          controller: 'AppCtrl'
        }
      }
    })


    .state('app.stocks', {
      url: '/stocks',
      views: {
        'appContent': {
          templateUrl: 'templates/stocks.html',
          controller: 'StockCtrl'

        }
      }
    })

    .state('app.clients', {
      url: '/clients',
      views: {
        'appContent': {
          templateUrl: 'templates/clients.html',
          controller: 'ClientCtrl'
        }
      }
    })
    .state('app.articles', {
      url: '/articles',
      views: {
        'appContent': {
          templateUrl: 'templates/articles.html',
          controller: 'ArticleCtrl'
        }
      }
    })
    .state('app.prospects', {
      url: '/prospects',
      views: {
        'appContent': {
          templateUrl: 'templates/prospects.html',
          controller: 'ProspectsCtrl'

        }
      }
    })
    .state('app.mesprospects', {
      url: '/mesprospects',
      views: {
        'appContent': {
          templateUrl: 'templates/mesprospects.html',
          controller: 'MesprospectsCtrl'
        }
      }
    })
    .state('app.prcs', {
      url: '/prcs',
      views: {
        'appContent': {
          templateUrl: 'templates/prcs.html',
          controller: 'PrcCtrl'
        }
      }
    })
    .state('app.details-prc', {
      url: '/details-prc',
      views: {
        'appContent': {
          templateUrl: 'templates/details-prc.html',
          controller: 'DetailPrcCtrl'
        }
      }
    })
    .state('app.nouvel-prc', {
      url: '/nouvel-prc',
      views: {
        'appContent': {
          templateUrl: 'templates/nouvel-prc.html',
          controller: 'NewPrcCtrl'
        }
      }
    })


    .state('app.pdcs', {
      url: '/pdcs',
      views: {
        'appContent': {
          templateUrl: 'templates/pdcs.html',
          controller: 'PdcCtrl'
        }
      }
    })
    .state('app.details-pdc', {
      url: '/details-pdc',
      views: {
        'appContent': {
          templateUrl: 'templates/details-pdc.html',
          controller: 'DetailPdcCtrl'
        }
      }
    })
    .state('app.nouvel-pdc', {
      url: '/nouvel-pdc',
      views: {
        'appContent': {
          templateUrl: 'templates/nouvel-pdc.html',
          controller: 'NewPdcCtrl'
        }
      }
    })

    .state('app.pds', {
      url: '/pds',
      views: {
        'appContent': {
          templateUrl: 'templates/pds.html',
          controller: 'PdsCtrl'
        }
      }
    })
    .state('app.details-pds', {
      url: '/details-pds',
      views: {
        'appContent': {
          templateUrl: 'templates/details-pds.html',
          controller: 'DetailPdsCtrl'
        }
      }
    })

    .state('app.nouvel-pds', {
      url: '/nouvel-pds',
      views: {
        'appContent': {
          templateUrl: 'templates/nouvel-pds.html',
          controller: 'AddPdsCtrl'
        }
      }
    })

    .state('app.recapitulatif-pds-prc', {
      url: '/recapitulatif-pds-prc',
      views: {
        'appContent': {
          templateUrl: 'templates/recapitulatif-pds-prc.html',
          controller: 'RecapPdsPrcCtrl'
        }
      }
    })

    .state('app.facturations', {
      url: '/facturations',
      views: {
        'appContent': {
          templateUrl: 'templates/facturations.html',
          controller: 'FacturationsCtrl'
        }
      }
    })

    .state('app.facturation', {
      url: '/facturation',
      views: {
        'appContent': {
          templateUrl: 'templates/facturation.html',
          controller: 'FacturationCtrl'
        }
      }
    })
    .state('app.details-facture', {
      url: '/details-facture',
      views: {
        'appContent': {
          templateUrl: 'templates/details-facture.html',
          controller: 'DetailsFactureCtrl'
        }
      }
    })

    .state('app.details-encaissement', {
      url: '/details-encaissement',
      views: {
        'appContent': {
          templateUrl: 'templates/details-encaissement.html',
          controller: 'DetailsEncaissementCtrl'
        }
      }
    })

    .state('app.planning', {
      url: '/planning',
      views: {
        'appContent': {
          templateUrl: 'templates/planning.html',
          controller: 'PlanningCtrl'
        }
      }
    })

    .state('app.monplanning', {
      url: '/monplanning',
      views: {
        'appContent': {
          templateUrl: 'templates/monplanning.html',
          controller: 'PlanningCtrl'
        }
      }
    })
    .state('app.planninguser', {
      url: '/planninguser',
      views: {
        'appContent': {
          templateUrl: 'templates/planninguser.html',
          controller: 'PlanningUserCtrl'
        }
      }
    })
    .state('app.details-planninguser', {
      url: '/details-planninguser',
      views: {
        'appContent': {
          templateUrl: 'templates/details-planninguser.html',
          controller: 'detailsPlanningUserCtrl'
        }
      }
    })

    .state('app.details-planning', {
      url: '/details-planning',
      views: {
        'appContent': {
          templateUrl: 'templates/details-planning.html',
          controller: 'detailsPlanningCtrl'
        }
      }
    })

    .state('app.details-monplanning', {
      url: '/details-monplanning',
      views: {
        'appContent': {
          templateUrl: 'templates/details-monplanning.html',
          controller: 'detailsMonPlanningCtrl'
        }
      }
    })
    .state('app.details-dateplanning', {
      url: '/details-dateplanning',
      views: {
        'appContent': {
          templateUrl: 'templates/details-dateplanning.html',
          controller: 'detailsDatePlanningCtrl'
        }
      }
    })

    .state('app.consultationSole', {
      url: '/consultationSole',
      views: {
        'appContent': {
          templateUrl: 'templates/consultationSole.html',
          controller: 'ConsultationSoleCtrl'
        }
      }
    })

    .state('app.details-soleGrossiste', {
      url: '/details-soleGrossiste',
      views: {
        'appContent': {
          templateUrl: 'templates/details-soleGrossiste.html',
          controller: 'detailsSoleGrossisteCtrl'
        }
      }
    })

    .state('app.details-soleAgent', {
      url: '/details-soleAgent',
      views: {
        'appContent': {
          templateUrl: 'templates/details-soleAgent.html',
          controller: 'detailsSoleAgentCtrl'
        }
      }
    })

    .state('app.envoi', {
      url: '/envoi',
      views: {
        'appContent': {
          templateUrl: 'templates/envoi.html',
          controller: 'EnvoiCtrl'
        }
      }
    })

    .state('app.recuperation', {
      url: '/recuperation',
      views: {
        'appContent': {
          templateUrl: 'templates/recuperation.html',
          controller: 'RecuperationCtrl'
        }
      }
    })

    .state('app.maps', {
      url: '/maps',
      views: {
        'appContent': {
          templateUrl: 'templates/maps.html',
          controller: 'MapCtrl'

        }
      }
    })

    .state('app.coordonnees', {
      url: '/coordonnees',
      views: {
        'appContent': {
          templateUrl: 'templates/coordonnees.html',
          controller: 'CoordonneesCtrl'

        }
      }
    })
    .state('app.addcompte', {
      url: '/addcompte',
      views: {
        'appContent': {
          templateUrl: 'templates/addcompte.html',
          controller: 'AddcompteCtrl'

        }
      }
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'appContent': {
          templateUrl: 'templates/accueil.html',
          controller: 'LogoutCtrl'

        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'appContent': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'

        }
      }
    })
    .state('app.bienvenue', {
      url: '/bienvenue',
      views: {
        'appContent': {
          templateUrl: 'templates/bienvenue.html',
        }
      }
    })

    .state('app.dechargements', {
      url: '/dechargements',
      views: {
        'appContent': {
          templateUrl: 'templates/dechargements.html',
          controller: 'dechargementsCtrl'
        }
      }
    })

 

    .state('app.dechargement', {
      url: '/dechargement',
      views: {
        'appContent': {
          templateUrl: 'templates/dechargement.html',
          controller: 'DechargementCtrl'
        }
      }
    })


    .state('app.paiements', {
      url: '/paiements',
      views: {
        'appContent': {
          templateUrl: 'templates/paiements.html',
          controller: 'PaiementsCtrl'
        }
      }
    })

    .state('app.details-dechargement', {
      url: '/details-dechargement',
      views: {
        'appContent': {
          templateUrl: 'templates/details-dechargement.html',
          controller: 'DetailDechargementCtrl'
        }
      }
    })

    .state('app.versements', {
      url: '/versements',
      views: {
        'appContent': {
          templateUrl: 'templates/versements.html',
          controller: 'versementsCtrl'
        }
      }
    })

    .state('app.versement', {
      url: '/versement',
      views: {
        'appContent': {
          templateUrl: 'templates/versement.html',
          controller: 'versementCtrl'
        }
      }
    })

    .state('app.details-versement', {
      url: '/details-versement',
      views: {
        'appContent': {
          templateUrl: 'templates/details-versement.html',
          controller: 'DetailsVersementCtrl'
        }
      }
    })
    .state('app.nouvel-client', {
      url: '/nouvel-client',
      views: {
        'appContent': {
          templateUrl: 'templates/nouvel-client.html',
          controller: 'AddClientCtrl'
        }
      }
    })
    .state('app.caclient', {
      url: '/caclient',
      views: {
        'appContent': {
          templateUrl: 'templates/caclient.html',
          controller: 'CaClientCtrl'
        }
      }
    })

    .state('app.inventaires', {
      url: '/inventaires',
      views: {
        'appContent': {
          templateUrl: 'templates/inventaires.html',
          controller: 'InventaireCtrl'
        }
      }
    })
    .state('app.details-inventaire', {
      url: '/details-inventaire',
      views: {
        'appContent': {
          templateUrl: 'templates/details-inventaire.html',
          controller: 'DetailsInventaireCtrl'
        }
      }
    })
    .state('app.nouvel-inventaire', {
      url: '/nouvel-inventaire',
      views: {
        'appContent': {
          templateUrl: 'templates/nouvel-inventaire.html',
          controller: 'AddInventaireCtrl'
        }
      }
    })
    .state('app.login1', {
      url: '/login1',
      views: {
        'appContent': {
          templateUrl: 'templates/login1.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.nouvel-grossiste', {
      url: '/nouvel-grossiste',
      views: {
        'appContent': {
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
  })
  .state('app.paiementgrossiste', {
    url: '/paiementgrossiste',
    views: {
      'appContent': {
        templateUrl: 'templates/paiementgrossiste.html',
        controller: 'PaiementGrossisteCtrl'
      }
    }
  })
  .state('app.recouvrementclient', {
    url: '/recouvrementclient',
    views: {
      'appContent': {
        templateUrl: 'templates/recouvrementclient.html',
        controller: 'RecouvrementClientCtrl'
      }
    }
  })
  .state('app.recouvrement', {
    url: '/recouvrement',
    views: {
      'appContent': {
        templateUrl: 'templates/recouvrement.html',
        controller: 'recouvrementCtrl'
      }
    }
  })
  .state('app.ventedestockage', {
    url: '/ventedestockage',
    views: {
      'appContent': {
        templateUrl: 'templates/ventedestockage.html',
      }
    }
  })
  .state('app.pointfinancier', {
    url: '/pointfinancier',
    views: {
      'appContent': {
        templateUrl: 'templates/pointfinancier.html'
      }
    }
  })

  .state('app.duaugrossiste', {
    url: '/duaugrossiste',
    views: {
      'appContent': {
        templateUrl: 'templates/duaugrossiste.html',
        controller: 'DuaugrossisteCtrl'
      }
    }
  })

  .state('app.enportefeuille', {
    url: '/enportefeuille',
    views: {
      'appContent': {
        templateUrl: 'templates/enportefeuille.html',
        controller: 'EnportefeuilleCtrl'
      }
    }
  })
  .state('app.valeurcamion', {
    url: '/valeurcamion',
    views: {
      'appContent': {
        templateUrl: 'templates/valeurcamion.html',
        controller: 'ValeurcamionCtrl'
      }
    }
  })

  .state('app.creditclient', {
    url: '/creditclient',
    views: {
      'appContent': {
        templateUrl: 'templates/creditclient.html',
        controller: 'CreditclientCtrl'
      }
    }
  })
  .state('app.ventedujour', {
    url: '/ventedujour',
    views: {
      'appContent': {
        templateUrl: 'templates/ventedujour.html',
        controller: 'VentedujourCtrl'
      }
    }
  })

  .state('app.tauxdepresences', {
    url: '/tauxdepresences',
    views: {
      'appContent': {
        templateUrl: 'templates/tauxdepresences.html',
        controller: 'TauxdepresencesCtrl'
      }
    }
  })
  .state('app.detailstaux', {
    url: '/detailstaux',
    views: {
      'appContent': {
        templateUrl: 'templates/detailstaux.html',
        controller: 'TauxdepresencesCtrl'
      }
    }
  })

  .state('app.tauxpresence', {
    url: '/tauxpresence',
    views: {
      'appContent': {
        templateUrl: 'templates/tauxpresence.html',
        controller: 'TauxpresenceCtrl'
      }
    }
  })
  
  ;

  // if none of the above states are matched, use this as the fallback
  if (localStorage.getItem('loggedin_id')==null || localStorage.getItem('loggedin_password')==null || localStorage.getItem('loggedin_id')=='null' || localStorage.getItem('loggedin_password')=='null') {
   localStorage.setItem('isconn', false)
    $urlRouterProvider.otherwise('/app/login1');

  } else {
    localStorage.setItem('isconn', true)
    $urlRouterProvider.otherwise('/app/bienvenue');
  }
})
