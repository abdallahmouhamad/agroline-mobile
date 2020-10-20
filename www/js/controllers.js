angular.module('starter.controllers', ['pascalprecht.translate'])
  // Accueil Controller

  .controller('DashCtrl', function ($scope) {
    console.log('DashCtrl');
    $scope.data = {};
    $scope.data.isconn = localStorage.getItem('isconn');
  })

  .controller('AppCtrl', function ($scope,
    $ionicModal,
    $timeout,
    $state,
    $translate,
    $http,
    $ionicPopup,
    $ionicLoading,
    urlPhp,
    urlJava) {
    $scope.menu = true;
    $scope.scroll = false;
    $scope.menutab = false;
    $scope.data = {};

    if (localStorage.getItem('loggedin_name') == null || localStorage.getItem('loggedin_name') == 'null') {
      console.log('non autoriser')
      $scope.scroll = false;
    } else {
      $scope.scroll = true;
      // $scope.menu = true;
      console.log('autoriser')
    }
    $scope.majStat = function () {
      if ($scope.menutab) {
        //if($scope.scroll){
        $scope.menu = true;
        $scope.menutab = false;
        // }
      } else {

        $scope.menutab = true;
        $scope.menu = false;
      }
    }


    if (localStorage.length != 0) {
      $scope.connectedyet = true;
      $scope.sessionloginid = localStorage.getItem('loggedin_id');
      $scope.sessionlogininame = localStorage.getItem('loggedin_name');
      $scope.sessionpassword = localStorage.getItem('loggedin_password');
      $scope.sessionloginiduser = localStorage.getItem('loggedin_iduser');
      $scope.sessionprofile = localStorage.getItem('loggedin_profil')

      sessionStorage.setItem('loggedin_id', $scope.sessionloginid);
      sessionStorage.setItem('loggedin_name', $scope.sessionlogininame);
      sessionStorage.setItem('loggedin_password', $scope.sessionpassword);
      sessionStorage.setItem('loggedin_iduser', $scope.sessionloginiduser);
      sessionStorage.setItem('loggedin_profil', $scope.sessionprofile);

    }
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };



  })
  .controller('MyApp', function ($scope, $translate) {
    $scope.reloadPage = function () {
      window.location.reload();
    }
  })
  // Login Controller
  .controller('LoginCtrl', function ($scope,
    $http,
    $ionicPopup,
    $state,
    $cordovaSQLite,
    $ionicLoading,
    $ionicHistory,
    $translate,
    urlPhp,
    SendSms) {

    $scope.user = {
      login: '',
      password: ''
    };
    //test connexion abou
    $scope.sowmenu = function () {
      console.log("ici ici")
    }
    $scope.login = function () {
      console.log('abou0')
      if (window.Connection) {
        console.log('abou1')
        if (navigator.connection.type == Connection.NONE) {
          console.log('abou2')
          $translate('alert_header_ofline').then(function (header) {
            console.log('abou3')
            $translate('alert_content_ofline_home').then(function (content) {

            });
          });

        } else {
          var url = urlPhp.getUrl();
          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          //  var str = url + "/login1.php?login=" + $scope.user.login + "&password=" + $scope.user.password;
          var str = url + "/utilisateur/connexion.php";
          var params = { "login": $scope.user.login, "motDePasse": $scope.user.password };

          $http.post(str, params)
            .success(function (res) { // if login request is Accepted
              console.log(res);
              $ionicLoading.hide();
              // records is the 'server response array' variable name.
              $scope.user_details = res; // copy response values to user-details object.

              sessionStorage.setItem('loggedin_id', $scope.user_details.id);
              sessionStorage.setItem('loggedin_password', $scope.user_details.motDePasse);
              sessionStorage.setItem('loggedin_iduser', $scope.user_details.id);
              // localStorage.setItem('loggedin_id', $scope.user_details.idUtilisateursPointVent);
              localStorage.setItem('loggedin_id', $scope.user_details.id);
              localStorage.setItem('loggedin_password', $scope.user_details.motDePasse);
              localStorage.setItem('loggedin_iduser', $scope.user_details.id);
              localStorage.setItem('user', JSON.stringify($scope.user_details));


              localStorage.setItem('isconn', true)
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
              $translate('alert_connexion_reussi_header').then(function (header) {
                $translate('alert_connexion_reussi_content').then(function (content) {
                  var alertPopup = $ionicPopup.alert({
                    title: header,
                    template: content + $scope.user_details.prenom + ' ' + $scope.user_details.prenom + ' !'
                  });
                });
              });

              $state.transitionTo('app.bienvenue', {}, {
                reload: true,
                inherit: true,
                notify: true
              });

            }).error(function () { //if login failed
              $ionicLoading.hide();
              $translate('alert_connexion_lost_header').then(function (header) {
                $translate('alert_connexion_lost_content').then(function (content) {
                  var alertPopup = $ionicPopup.alert({
                    title: header,
                    template: content
                  });
                });
              });

            });
        }
      }
    };


    $scope.sms_function = function(){
      SendSms.sendSMS('Bissmillah','776726045');
}
  })

  .controller('SignupCtrl', function ($scope, $http, $ionicPopup, $state, $translate, urlPhp) {

  })

  .controller('LogoutCtrl', function () {

    sessionStorage.clear();
    localStorage.setItem('loggedin_name', 'null')
    localStorage.setItem('loggedin_password', 'null')

  })
  .controller('ProfileCtrl', function ($scope, $http, $ionicPopup, $state, $translate, urlPhp) {
    $scope.data = {};
    $scope.myusername = localStorage.getItem("username");
    //console.log($scope.myusername);
    $scope.submit = function () {
      // var link = 'http://vps101245.ovh.net:84/webservice/compte.php';
      var url = urlPhp.getUrl();
      $http.get(url + '/password.php?username=' + localStorage.getItem("username")).then(function (res) {
        $scope.response = res.data;
        //console.log($scope.response);

        $translate('alert_header_reussi').then(function (header) {
          $translate('alert_content_reussi').then(function (content) {
            $ionicPopup.show({
              title: header,
              template: content,
              scope: $scope,
              buttons: [
                {
                  text: 'Ok',
                  type: 'button-positive'
                }
              ]
            });
          });
        });

        if (res.data == "Changement  success !") {
          $state.go('app.login1');
        }
      });
    };
  })

  .controller('CompteCtrl', function ($state) {
    /*
    var login = sessionStorage.loggedin_name;
    //alert(login);
    if(typeof sessionStorage!='undefined') {
                   //if login failed
              $ionicPopup.alert({
                title: 'Connexion requise !',
                template: 'SVP, Connectez vous d\'abord !'
              });


               $state.go('app.login1');

    }

    */
    $state.go('app.compte');



  })

  .controller('MapCtrl', function ($scope, $cordovaGeolocation, $http, urlPhp, ChekConnect,
    $translate,
    ProfilUser,
    $ionicLoading,
    ChekConnect,
    $translate,
    ProfilUser,
    urlJava,) {
    $scope.data.payschoisit = null
    $scope.pvtempon = [];
    $scope.index;
    $scope.size = 0;
    $scope.idregions;
    $scope.data.regionchoisit
    $scope.data.villechoisit
    $scope.data.cache = true;
    $scope.getOptPays = function (option) {
      // console.log(option)
      return option;
    };


    $scope.cacheselect = function () {
      if ($scope.data.cache) {
        $scope.data.cache = false;
      } else {
        $scope.data.cache = true;
      }

    }
    $scope.getOptRegion = function (option) {
      //   console.log($scope.data.regionchoisit)
      return option;
    };
    $scope.getOptVille = function (option) {

      return option;
    };
    $scope.testProfile = function () {
      $scope.data.profile = ProfilUser.profilUser();
    }
    $scope.checkConnect = function () {
      $scope.connect = ChekConnect.getConnectivite();
      $scope.testProfile();
    }
    $scope.checkConnect();
    $scope.initMap = function () {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);


        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {

          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: 'img/marker.png'
          });
        });
      });
    }
    $scope.listpays = function () {
      // $scope.data.profil = ProfilUser.profilUser();
      $scope.initMap();
      var pays;
      var listdespays;
      var payschoisit;
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          connect = false;

        }
        else {

          connect = true;
          var url = urlPhp.getUrl();
          $http.get(url + "/pays.php")
            .success(function (response) {
              // $ionicLoading.hide();
              console.log(response)
              pays = response;

              $scope.data.listpays = [];
              for (var i = 0; i < response.length; i++) {
                var pv = { name: response[i].pays, id: response[i].idpays, code: response[i].code }
                $scope.data.listpays.push(pv);
              }
              if ($scope.data.listpays.length > 0) {
                $scope.data.payschoisit = $scope.data.listpays[0];
                $scope.listPvByPays($scope.data.payschoisit);

              }

            }).catch(function (error) {
              // $ionicLoading.hide();
              console.log(error)
            });

        }
      }

    }
    $scope.listDesregionsByPaysID = function () {

      if ($scope.connect == true) {
        //Recuperer la liste des regions
        var url = urlPhp.getUrl();
        $http.get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion }
              $scope.listregions.push(pv);
            }

          }).catch(function (error) {
            $ionicLoading.hide();

          });
      }
    }
    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        $scope.refreshville();
        var url = urlPhp.getUrl();
        $http.get(url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville }
              $scope.listvilles.push(pv);
            }
            //    console.log($scope.listvilles)
          }).catch(function (error) {
            $ionicLoading.hide();
          });
      } else {

      }

    }
    $scope.refreshville = function () {
      $scope.initMap();
      $scope.listvilles = null
      $scope.data.villechoisit = null
    }

    $scope.listpays();
    $scope.listpointdevnte = function () {
      $scope.pvtempon = [];
      $scope.data.pvchoisit = null;
      console.log($scope.data.payschoisit.code);
      var url = urlJava.getUrl();
      var link = url + "/yup/mespointVente"
      iduser = sessionStorage.getItem('loggedin_iduser')
      var user = {
        user: {
          "nom": "",
          "prenom": "",
          "telephone": "",
          "langue": "",
          "pays": "",
          "profil": "",
          "reseauxagent": "",
          "login": "",
          "password": "",
          "id": "" + iduser,
          "codePays": $scope.data.payschoisit.code
        }
      }
      //   console.log(user)
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      $http.post(link, user).then(function (res) {
        var options = {
          timeout: 10000,
          enableHighAccuracy: true
        };
        $ionicLoading.hide();
        $scope.pointvente = angular.fromJson(res.data).sort();
        if ($scope.pointvente && $scope.pointvente.length > 0) {
          console.log("depart ")
          console.log($scope.pointvente)

          $scope.pvv = [];
          $scope.pvvv = [];
          $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
              center: latLng,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);


            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function () {

              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: 'img/marker.png'
              });
              $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
              while ($scope.pvtempon.length < $scope.pointvente.length - 1) {

                if ($scope.size == 0) {
                  $scope.index = 0;
                  $scope.size = 10;
                } else {
                  $scope.index = $scope.size;
                  $scope.size = $scope.size + 10;
                }

                $scope.pvv = $scope.pointvente.slice($scope.index, $scope.size);
                $scope.pvtempon = $scope.pvtempon.concat($scope.pvv)
                $scope.pvv.forEach(function (pv) {
                  if (pv.latitude !== 0 && pv.longitude !== 0 && pv.latitude !== '' && pv.longitude !== '' && pv.latitude !== null && pv.longitude !== null) {
                    var marker = new google.maps.Marker({
                      map: $scope.map,
                      animation: google.maps.Animation.DROP,
                      position: new google.maps.LatLng(pv.latitude, pv.longitude),
                      icon: 'img/map-marker.png'
                    });

                    var infoWindow = new google.maps.InfoWindow({
                      content: "Point: " + pv.client + "<br/>Code: " + pv.codePointVente + "<br/>Telephone: " + pv.telephone + "<br/>Longitude: " + pv.longitude + "<br/>Latitude: " + pv.latitude
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                      infoWindow.open($scope.map, marker);
                    })

                  }

                });
              }
              $ionicLoading.hide();


            });
          });
        }

        /*   $scope.pvv =$scope.pointvente.slice(0, 9)
           $scope.pvvv =$scope.pointvente.slice(10, 19)

           console.log("premiere ")
           console.log($scope.pvv)
           console.log("Deuxieme ")
           console.log($scope.pvvv)

           $scope.con = $scope.pvv.concat($scope.pvvv)
           console.log("Concat ")
           console.log($scope.con )*/
        /* for(var i = 0; i< 10; i++){
           $scope.pvv.push($scope.pointvente[i]);
         }*/


      });

    }
    //Charger les points par pays sur la carte
    $scope.listPvByPays = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      $http.get(url + '/pointdeventByPays.php?idpays=' + $scope.data.payschoisit.id).then(function (res) {

        $scope.pointventes = angular.fromJson(res.data).sort();
        console.log("Pays")
        console.log($scope.pointventes)
        //Charger la carte
        $scope.initMapPv($scope.pointventes);
        $scope.listDesregionsByPaysID();
      });
    }
    //Charger les points par region sur la carte
    $scope.listPvByRegion = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      $http.get(url + '/pointdeventByRegion.php?idregion=' + $scope.data.regionchoisit.id).then(function (res) {

        $scope.pointventes = angular.fromJson(res.data).sort();
        console.log("Regions")
        console.log($scope.pointventes)
        //Charger la carte
        $scope.initMapPv($scope.pointventes);
        $scope.listVillesByRegionID();
      });
    }

    $scope.initMapPv = function (listpointvente) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);

        google.maps.event.addListenerOnce($scope.map, 'idle', function () {

          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: 'img/marker.png'
          });

          if (listpointvente.length > 0) {
            listpointvente.forEach(function (pv) {
              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(pv.latitude, pv.longitude),
                icon: 'img/map-marker.png'
              });

              var infoWindow = new google.maps.InfoWindow({
                content: "Point: " + pv.gerant + "<br/>Telephone: " + pv.telephonegerant + "<br/>Longitude: " + pv.longitude + "<br/>Latitude: " + pv.latitude
              });

              google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
              })
              $ionicLoading.hide();
            });
          } else {
            $ionicLoading.hide();
          }
          $ionicLoading.hide();
        });
      });
    }
    $scope.listPvPhp = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      $http.get(url + '/pointventesutilisateurmap.php?idville=' + $scope.data.villechoisit.id + "&idutilisateur=" + localStorage.getItem('loggedin_id')).then(function (res) {
        var options = {
          timeout: 10000,
          enableHighAccuracy: true
        };

        $scope.pointventes = angular.fromJson(res.data).sort();

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          var mapOptions = {
            center: latLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);


          //Wait until the map is loaded
          google.maps.event.addListenerOnce($scope.map, 'idle', function () {

            var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng,
              icon: 'img/marker.png'
            });
            console.log($scope.pointventes)
            $scope.pointventes.forEach(function (pv) {
              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(pv.latitude, pv.longitude),
                icon: 'img/map-marker.png'
              });

              var infoWindow = new google.maps.InfoWindow({
                content: "Point: " + pv.gerant + "<br/>Telephone: " + pv.telephonegerant + "<br/>Longitude: " + pv.longitude + "<br/>Latitude: " + pv.latitude
              });

              google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
              })
              $ionicLoading.hide();
            });


          });
        });
      });
    }
  })

  .controller('MesprospectsCtrl', function ($scope,
    $http, $ionicLoading, ChekConnect,
    $ionicPopup, $translate, urlPhp, $state) {
    $scope.data = {};
    $scope.data.regionchoisit = null;
    $scope.data.villechoisit = null;
    $scope.data.payschoisit = null;
    $scope.data.datefilter = null;
    $scope.connect = null;
    $scope.data = {};

    $scope.goToNewProspect = function () {
      $state.transitionTo('app.prospects', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
    $scope.$watch('datefilter', function (newValue, oldValue) {
      console.log('-----------------La valeur de la dte a change-----------------');
      console.log(newValue);
    });

    $scope.filterByDate = function () {
      if ($scope.data.villechoisit) {
        $scope.lispvByRegion();
      } else {
        $scope.lispvByBays();
      }
    }

    //Tester la connectiviteee
    $scope.checkConnect = function () {
      $scope.connect = ChekConnect.getConnectivite();
    }
    //Tester la connectiviteee
    $scope.getOptPays = function (option) {

      return option;
    };
    $scope.getOptVille = function (option) {

      return option;
    };
    $scope.getOptRegion = function (option) {

      return option;
    };
    //  $scope.checkConnect();
    /* if ($scope.connect == true) {
       $scope.data.connect = true;

     } else {
       $scope.data.connect = false;
       $translate('alert_header_ofline').then(function (header) {
         $translate('alert_content_ofline_list').then(function (content) {
           $translate('alert_button_non').then(function (non) {
             $translate('alert_button_oui').then(function (oui) {
               $ionicPopup.show({
                 title: header,
                 content: content,
                 buttons: [
                   {
                     text: non,
                     type: 'button-assertive',
                     onTap: function (e) {
                       return false;
                     }
                   },
                   {
                     text: oui,
                     type: 'button-energized',
                     onTap: function (e) {
                       return true;
                     }
                   }]
               })
                 .then(function (result) {
                   if (!result) {
                     ionic.Platform.exitApp();
                   } else {
                     $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
                     var flocal = angular.fromJson(localStorage.getItem('prospectsSauvegarde'));
                     console.log(flocal)
                     $scope.mesprospectsocal = flocal;
                     $ionicLoading.hide();
                   }
                 });
             });
           });
         });
       });

     }*/
    $scope.initReg = function () {
      if ($scope.connect == true) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000
        });
        console.log('Je suis ici')
        var url = urlPhp.getUrl();
        $http.get(url + "/pays.php")
          .success(function (response) {
            $ionicLoading.hide();
            //$scope.pays = response;
            console.log(response)

            // localStorage.setItem('paysOnline', angular.toJson($scope.pays));
            $scope.listdespays = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].pays, id: response[i].idpays }
              $scope.listdespays.push(pv);
            }
            if ($scope.listdespays.length != 0) {
              $scope.data.payschoisit = $scope.listdespays[0];
              $scope.lispvByBays();

            }
          }).catch(function (error) {
            $ionicLoading.hide();
          });

      } else {

      }
    }

    $scope.listDesregionsByPaysID = function () {

      if ($scope.connect == true) {
        //Recuperer la liste des regions
        console.log($scope.data.payschoisit.id)
        var url = urlPhp.getUrl();
        $http.get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion }
              $scope.listregions.push(pv);
            }

          }).catch(function (error) {
            $ionicLoading.hide();

          });
      } else {
        $scope.region = []
        $scope.region = angular.fromJson(localStorage.getItem('regionsOnline'))
        // console.log($scope.pointvente)
        $scope.listregions = [];
        if ($scope.data.profile == 'super') {
          //   $scope.listregions =  $scope.region;
          for (var i = 0; i < $scope.region.length; i++) {

            var pv = { name: $scope.region[i].region, id: $scope.region[i].idregion }
            $scope.listregions.push(pv);


          }
        } else {

          if ($scope.region != null) {
            for (var i = 0; i < $scope.region.length; i++) {
              if ($scope.region[i].idpays == $scope.data.payschoisit.id) {
                var pv = { name: $scope.region[i].region, id: $scope.region[i].idregion }
                $scope.listregions.push(pv);
              }

            }
          }
        }
      }

    }
    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        var url = urlPhp.getUrl();
        $http.get(url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville }
              $scope.listvilles.push(pv);
            }

          }).catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.ville = []
        $scope.ville = angular.fromJson(localStorage.getItem('villesOnline'))
        // console.log($scope.pointvente)
        $scope.listvilles = [];
        if ($scope.ville != null) {
          for (var i = 0; i < $scope.ville.length; i++) {
            if ($scope.ville[i].idregion == $scope.data.regionchoisit.id) {
              var pv = { name: $scope.ville[i].ville, id: $scope.ville[i].idville }
              $scope.listvilles.push(pv);
            }

          }
        }
      }

    }
    //$scope.initReg();
    $scope.lispvByBays = function () {
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 3000 });
      var url = urlPhp.getUrl();
      $http.get(url + "/pointdeventByPays.php?idpays=" + $scope.data.payschoisit.id + "&date=" + $scope.data.datefilter)
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response)
          $scope.pvs = response;
          $scope.listDesregionsByPaysID();
        }).catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    }
    $scope.lispvByRegion = function () {
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 3000 });
      var url = urlPhp.getUrl();
      $http.get(url + "/pointdeventByRegion.php?idregion=" + $scope.data.regionchoisit.id + "&date=" + $scope.data.datefilter)
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response)
          $scope.pvs = response;

        }).catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    }
    $scope.lispvPhp = function () {
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 3000 });
      var url = urlPhp.getUrl();
      $http.get(url + "/pointventesutilisateur.php?idville=" + $scope.data.villechoisit.id + "&idutilisateur=" + localStorage.getItem('loggedin_iduser'))
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response)
          $scope.pvs = response;

        }).catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    }

  })

  .controller('ProspectsCtrl', function ($scope,
    $http,
    $ionicLoading,
    $ionicPopup,
    $cordovaGeolocation,
    ChekConnect,
    $translate,
    $cordovaCamera,
    $ionicModal,
    ProfilUser,
    urlPhp, $q) {

    $scope.data = {};
    $scope.data.regionchoisit = null;
    $scope.data.villechoisit = null;
    $scope.data.payschoisit = null;
    $scope.connect = null;
    $scope.data.date = new Date();
    $scope.data.longitude = '0';
    $scope.data.longitudeDepart = '0';
    $scope.data.latitude = '0';
    $scope.data.latitudeDepart = '0';
    $scope.data.profile = 'limite';
    $scope.photo = null;
    $scope.img = '';
    $scope.showphoto = true;
    $scope.commentaire = '';
    $scope.data.heureDepart = null;
    $scope.data.outils = '';

    $scope.abonnement = 1;

    /*abonnement
    .getAbonnement()
    .success(function (response) {
     console.log('------------------Get abonnement--------------------');

     if(response){
        $scope.abonnement = response[0].abonnement;
        console.log(response);
        console.log(response[0].abonnement);

     }
    })
    .catch(function (error) {
      console.log(error)
    });*/
    $scope.testProfile = function () {

      $scope.data.profile = ProfilUser.profilUser();
    }
    //Tester la connectiviteee
    $scope.checkConnect = function () {
      $scope.testProfile();
      $scope.connect = ChekConnect.getConnectivite();
    }
    $scope.initCtrl = function () {
      $scope.checkConnect();
      if ($scope.connect == false) {
        $scope.showphoto = false;
        $translate('alert_header_ofline').then(function (header) {
          $translate('alert_content_ofline_list').then(function (content) {
            $translate('alert_button_oui').then(function (oui) {
              $translate('alert_button_non').then(function (non) {
                $ionicPopup.show({
                  title: header,
                  content: content,
                  buttons: [
                    {
                      text: non,
                      type: 'button-assertive',
                      onTap: function (e) {
                        return false;
                      }
                    },
                    {
                      text: oui,
                      type: 'button-energized',
                      onTap: function (e) {
                        return true;
                      }
                    }]
                })
                  .then(function (result) {
                    if (!result) {
                      ionic.Platform.exitApp();
                    }
                  });
              });
            });
          });
        });

      }
    }
    //Tester la connectiviteee
    //    $scope.initCtrl();
    //Initialiser la liste de regions selon le connectivite
    $scope.initReg = function () {
      if ($scope.connect == true) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000
        });
        console.log('Je suis ici')
        var url = urlPhp.getUrl();
        $http.get(url + "/pays.php")
          .success(function (response) {
            $ionicLoading.hide();
            //$scope.pays = response;
            console.log(response)

            // localStorage.setItem('paysOnline', angular.toJson($scope.pays));
            $scope.listdespays = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].pays, id: response[i].idpays }
              $scope.listdespays.push(pv);
            }
            if ($scope.listdespays.length != 0) {
              $scope.data.payschoisit = $scope.listdespays[0];
              $scope.listDesregionsByPaysID();
            }
          }).catch(function (error) {
            $ionicLoading.hide();
          });


      } else {
        //console.log('eerror connexion')
        $scope.pays = []
        $scope.pays = angular.fromJson(localStorage.getItem('paysOnline'))
        // console.log($scope.pointvente)
        $scope.listdespays = [];
        if ($scope.pays != null) {
          for (var i = 0; i < $scope.pays.length; i++) {
            var pv = { name: $scope.pays[i].pays, id: $scope.pays[i].idpays }
            $scope.listdespays.push(pv);
          }
        }
        if ($scope.data.profile == 'limite') {
          $scope.data.payschoisit = $scope.listdespays[0]
        }
        $scope.listDesregionsByPaysID();
      }
    }

    $scope.listDesregionsByPaysID = function () {

      if ($scope.connect == true) {
        //Recuperer la liste des regions
        console.log($scope.data.payschoisit.id)
        var url = urlPhp.getUrl();
        $http.get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion }
              $scope.listregions.push(pv);
            }

          }).catch(function (error) {
            $ionicLoading.hide();

          });
      } else {
        $scope.region = []
        $scope.region = angular.fromJson(localStorage.getItem('regionsOnline'))
        // console.log($scope.pointvente)
        $scope.listregions = [];
        if ($scope.data.profile == 'super') {
          //   $scope.listregions =  $scope.region;
          for (var i = 0; i < $scope.region.length; i++) {

            var pv = { name: $scope.region[i].region, id: $scope.region[i].idregion }
            $scope.listregions.push(pv);


          }
        } else {

          if ($scope.region != null) {
            for (var i = 0; i < $scope.region.length; i++) {
              if ($scope.region[i].idpays == $scope.data.payschoisit.id) {
                var pv = { name: $scope.region[i].region, id: $scope.region[i].idregion }
                $scope.listregions.push(pv);
              }

            }
          }
        }
      }

    }

    $scope.addImage = function () {
      // 2
      $scope.photo = null;
      $ionicLoading.show({
        template: 'Chargement...'
      });
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      // 3
      $cordovaCamera.getPicture(options).then(function (imageData) {
        // 4
        //onImageSuccess(imageData);
        $scope.photo = "data:image/jpeg;base64," + imageData;
        $scope.getRxcui($scope.photo, 'photo');
        $scope.img = imageData;
        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    }
    $scope.initvar = function () {
      $scope.data.adresse = null
      $scope.data.telephone = null
      $scope.data.gerant = null
      $scope.data.latitude = null
      $scope.data.longitude = null
      $scope.data.latitudeDepart = null
      $scope.data.longitudeDepart = null
      $scope.data.villechoisit = null
      $scope.data.date = new Date();
      $scope.data.idutilisateur = localStorage.getItem('loggedin_iduser');
      $scope.data.commentaire = '';
      $scope.data.outils = '';
      $scope.heureArrivee = null;
      $scope.heureDepart = null;
      $scope.photo = null;

      //  localStorage.setItem('fichearrivee',null);
      var retrievedObject = localStorage.getItem('fichearrivee');
      console.log('-----------------Verif--------------');
      var view = JSON.parse(retrievedObject);
      console.log(view);
      if (retrievedObject != 'null' && retrievedObject != null) {

        retrievedObject = JSON.parse(retrievedObject);

        $scope.data.longitude = retrievedObject.longitude;
        $scope.data.latitude = retrievedObject.latitude;
        $scope.data.adresse = retrievedObject.adresse;
        $scope.data.gerant = retrievedObject.gerant;
        $scope.data.date = retrievedObject.dateAjout;
        $scope.data.commentaire = retrievedObject.commentaire;
        $scope.data.outils = retrievedObject.outils;
        $scope.heureArrivee = retrievedObject.heureArrivee;
        $scope.photo = retrievedObject.photo;
        $scope.data.regionchoisit = retrievedObject.regionchoisi;

      }

    }

    $scope.getRxcui = function (value, field) {
      var medValue = value;
      console.log(medValue);
      var retrievedObject = localStorage.getItem('fichearrivee');
      if (retrievedObject != 'null' && retrievedObject != null) {
        retrievedObject = JSON.parse(retrievedObject);
        console.log(retrievedObject);
        retrievedObject[field] = value;
        console.log(retrievedObject);
        //   localStorage.setItem('fichearrivee', retrievedObject);
        localStorage.setItem('fichearrivee', JSON.stringify(retrievedObject));

      } else {
        var values = {
          adresse: medValue
        }
        localStorage.setItem('fichearrivee', JSON.stringify(values));
      }

    }

    $scope.$watch('data.regionchoisit', function () {
      $scope.getRxcui($scope.data.regionchoisit, 'regionchoisi');
    });

    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        var url = urlPhp.getUrl();
        $http.get(url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville }
              $scope.listvilles.push(pv);
            }
            //    console.log($scope.listvilles)
          }).catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.ville = []
        $scope.ville = angular.fromJson(localStorage.getItem('villesOnline'))
        // console.log($scope.pointvente)
        $scope.listvilles = [];
        if ($scope.ville != null) {
          for (var i = 0; i < $scope.ville.length; i++) {
            if ($scope.ville[i].idregion == $scope.data.regionchoisit.id) {
              var pv = { name: $scope.ville[i].ville, id: $scope.ville[i].idville }
              $scope.listvilles.push(pv);
            }

          }
        }
      }

    }

    //Initialiser la liste de regions selon le connectivite
    $scope.initReg();

    $scope.initvar();

    $scope.selectables = [
      1, 2, 3
    ];
    $scope.longList = [];
    for (var i = 0; i < 1000; i++) {
      $scope.longList.push(i);
    }

    $scope.getOptPays = function (option) {

      return option;
    };
    $scope.getOptRegion = function (option) {
      return option;
    };
    $scope.getOptVille = function (option) {
      return option;
    };

    $scope.shoutLoud = function (newValuea, oldValue) {
      alert("changed from " + JSON.stringify(oldValue) + " to " + JSON.stringify(newValuea));
    };

    $scope.shoutReset = function () {
      alert("value was reset!");
    };

    var intervalGetPosition;

    $scope.jsonPositionsLog = [];
    $scope.isTrackingPosition = false;

    $scope.startTracking = function () {

      //   $scope.getCurrentPosition();
      console.log('*--------------------La position en fonction---------------');
      $scope.getPosition().then(function (position) {
        console.log(position);
        console.log(position.latitude);
        console.log(position.longitude);
      });

    }

    $scope.stopTrackingPosition = function () {
      navigator.geolocation.clearWatch(intervalGetPosition);
    }

    $scope.getCurrentPosition = function () {
      $ionicLoading.show({
        template: 'Localisation en cours...'
      });
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position.coords.latitude);
        $ionicLoading.hide();
        var date = new Date();
        $scope.heureArrivee = date.getHours() + ":" + date.getMinutes();
        document.getElementById("heureArrivee").value = $scope.heureArrivee;
        // get lat and long
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $scope.data.latitude = position.coords.latitude;
        $scope.data.longitude = position.coords.longitude;
        $scope.submit('arrivee');
        // add positions to array
        $scope.jsonPositionsLog.push({
          latitude: latitude,
          longitude: longitude
        });

        $scope.$apply();
      }, function (error) {
        $ionicLoading.hide();
        if ($scope.connect == true) {
          $scope.oui = '';
          $scope.non = '';
          $translate('alert_button_oui').then(function (oui) {
            $scope.oui = oui;
            console.log(oui);
            $translate('alert_button_non').then(function (non) {
              $scope.non = non;
              //  console.log(non);

              $ionicPopup.show({
                title: '',
                content: '{{ "alert_content_position" | translate }}',
                buttons: [
                  {
                    text: non,
                    type: 'button-assertive',
                    onTap: function (e) {
                      return false;
                    }
                  },
                  {
                    text: oui,
                    type: 'button-energized',
                    onTap: function (e) {
                      return true;
                    }
                  }]
              })
                .then(function (result) {
                  if (!result) {

                  } else {
                    ionic.Platform.exitApp();
                  }
                });
            });

          });


        }
      });
    }

    initGetLocationListener = function () {
      // init location listener
      intervalGetPosition = navigator.geolocation.watchPosition(function (position) {

        $scope.jsonPositionsLog.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        $scope.$apply();
      },
        function (error) {
          //  $scope.submit();
        }, {
        timeout: 3000
      });
    }

    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("mapp"), mapOptions);


      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Je suis ici !"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      });

    }, function (error) {
      console.log("Could not get location");
    });

    $scope.getPosition = function () {
      var deferred = $q.defer();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var crd = position.coords;
          console.log('Latitude : ' + crd.latitude);
          console.log('Longitude: ' + crd.longitude);
          deferred.resolve(crd);
        });
      }
      return deferred.promise;
    }


    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
      $scope.gridModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    })
    $scope.openModal = function (data) {
      $scope.inspectionItem = data;
      $scope.gridModal.show();
    }
    $scope.closeModal = function () {
      $scope.gridModal.hide();
    }

    $scope.submit = function (sens) {
      $scope.checkConnect();

      /**  if ($scope.data.adresse == null ||
         $scope.data.gerant == null) {
         $translate('alert_header_formulairvide').then(function (header) {
           $translate('alert_content_formulairvide').then(function (content) {
             $ionicPopup.show({
               title: header,
               template: content,
               scope: $scope,
               buttons: [{
                 text: 'Ok',
                 type: 'button-positive'
               }]
             });
           });
         });*/

      //  } else {

      if ($scope.data.latitude == null || $scope.data.latitude == 'null') {
        $scope.data.latitude = "0";
        $scope.data.longitude = "0";
      }

      $scope.value = {
        longitude: $scope.data.longitude,
        latitude: $scope.data.latitude,
        adresse: $scope.data.adresse,
        gerant: "" + $scope.data.gerant,
        idutilisateur: localStorage.getItem('loggedin_iduser'),
        ville: 1,
        region: $scope.data.regionchoisit ? $scope.data.regionchoisit.id : null,
        pays: $scope.data.payschoisit ? $scope.data.payschoisit.id : null,
        dateajout: $scope.data.date,
        //telephone: $scope.data.telephone,
        commentaire: $scope.data.commentaire,
        outils: $scope.data.outils,
        heureArrivee: $scope.heureArrivee,
        heureDepart: null,
        photo: $scope.photo,
        regionchoisi: $scope.data.regionchoisit
      }

      if (sens == 'arrivee') {

        if ($scope.heureArrivee && $scope.heureArrivee != '' && $scope.heureArrivee != null) {
          $ionicPopup.show({
            title: 'Confirmation',
            content: 'Valider l\'arrivée?',
            buttons: [
              {
                text: 'OK',
                type: 'button-assertive',
                onTap: function (e) {
                  return false;
                }
              },
            ]
          })
            .then(function (result) {
              if (!result) {
                console.log("OUI");

              } else {
                console.log("NON");

              }
            });
          localStorage.setItem('fichearrivee', JSON.stringify($scope.value));

        } else {
          $ionicPopup.show({
            title: 'Alert',
            content: 'Veuillez renseigner l\'heure d\'arrivée',
            buttons: [
              {
                text: 'OK',
                type: 'button-assertive',
                onTap: function (e) {
                  return false;
                }
              },
            ]
          })
            .then(function (result) {

            });
        }


      } else {
        console.log('Remot');

        if ($scope.connect == true) {

          console.log("Objet a envoyer")

          var url = urlPhp.getUrl();
          var link = url + '/pointventeccbm.php';
          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          console.log($scope.value)
          var date = new Date();

          $scope.value['heureDepart'] = date.getHours() + ":" + date.getMinutes();

          console.log($scope.value);

          $http.post(link, $scope.value)
            .then(function (res) {
              console.log("Retour insert prospect")
              console.log(res)
              if (res.data == "1") {
                localStorage.setItem('fichearrivee', null);
                $scope.initvar();
                $ionicPopup.show({
                  title: "Infos",
                  template: "Insertion réussit",
                  scope: $scope,
                  buttons: [{
                    text: 'Ok',
                    type: 'button-positive'
                  }]
                });


              }

              $ionicLoading.hide();

            }).catch(function (error) {
              console.log(error)
              $ionicLoading.hide();
              alert(error);
            });
        }
      }

      //  }
    }

  })

  .controller('StockCtrl', function ($scope, $state, $ionicLoading, ApiListStock) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.listStock = [];
    }

    //Init variables of controller
    $scope.initvar();
    console.log('This is stock module');
    $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
    ApiListStock.getListStock().
      success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.listStock = response;
        }
        console.log(response);
      },
        error => {
          console.log(error);
          $ionicLoading.hide();
        });

  })
  .controller('ClientCtrl', function ($scope, $state, $ionicLoading, ApiListClient) {
    $scope.data = {};


    $scope.initvar = function () {
      $scope.data.clients = [];
    }
    //Init variables of controller
    $scope.initvar();
    console.log('This is stock module');
    $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
    ApiListClient.getListClient().
      success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.clients = response;
        }
        console.log(response);
      }, error => {
        $ionicLoading.hide();
      });

  })
  .controller('ArticleCtrl', function ($scope, $state, $ionicLoading, ApiListArticle) {
    $scope.data = {};


    $scope.initvar = function () {
      $scope.data.articles = [];
      $scope.data.detailArticle = {};
      $scope.data.codeArticle = sessionStorage.getItem('codeArticle');
    }
    //Init variables of controller
    $scope.initvar();
    console.log('This is stock module');
    $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
    ApiListArticle.getListArticle().
      success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.articles = response;
        }
        console.log(response);
      }, error => { $ionicLoading.hide(); });

    $scope.getDetailAticle = function () {
      if ($scope.data.codeArticle !== null && $scope.data.codeArticle !== '') {
        ApiDetailArticle.getDetailArticle($scope.data.codeArticle)
          .success(function (response) {
            if (response) {
              $scope.data.detailArticle = response;
              console.log($scope.data.detailArticle)
              sessionStorage.setItem('codeArticle', '');
            }
          })
      }
    }

    $scope.goToNewArticle = function (code) {
      sessionStorage.setItem('codeArticle', code);
      $state.transitionTo('app.details-article', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
    $scope.goToNewArticle = function () {

      $state.transitionTo('app.nouvel-article', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

  })
  .controller('PrcCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, SendSms) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.listarticles = [];
      $scope.data.prcs = [];
      $scope.data.detailPrc = {};
      $scope.data.codePrc = sessionStorage.getItem('codePrc');
      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      $scope.data.clientchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      $scope.data.idMotif = 0;
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.sms_function = function(){
             SendSms.sendSMS('Bissmillah','776726045');
      }


      //  console.log('--------------get number --------------');
      //  console.log($scope.getCodePrc());
      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      $scope.data.codePrc = localStorage.getItem('codeArticle');
      // vA isAdd = sessionStorage.setItem('newPrc', true);

      var codeClient = { "codeCommerciale": $scope.data.user.code };
      // console.log('-----------------------list prc----------------------');
      // console.log($scope.data.user);
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      ApiListPrc.getListPrc(codeClient).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.prcs = response;
          }
          console.log(response);
        }, error => { $ionicLoading.hide(); });
    }

    $scope.getCodePrc = function () {
      var rd_code = Math.floor((Math.random() * 1000) + 1);
      console.log((rd_code + '').length);
      var code_chaine = '';
      if (rd_code) {
        if ((rd_code + '').length === 1) {
          code_chaine = '000' + (rd_code + '').length;
        }
        else if ((rd_code + '').length === 2) {
          code_chaine = '00' + rd_code;
        }
        else if ((rd_code + '').length === 3) {
          code_chaine = '0' + rd_code;
        }
        else if ((rd_code + '').length === 4) {
          code_chaine = '' + rd_code;
        }
      }
      return code_chaine;
    }

    //Init variables of controller
    $scope.initvar();

    ApiListArticle.getListArticle().
      success(function (response) {
        if (response) {
          $scope.data.listarticles = response;
        }
        //  console.log('-----------------------list article----------------------');
        //  console.log(response);
      });

    ApiListClient.getListClient()
      .success(function (response) {
        if (response) {
          $scope.data.listclients = response;
        }
        //     console.log('-----------------------list client----------------------');
        //     console.log(response);
      })


    ApiListMotif.getListMotif().
      success(function (response) {
        if (response) {
          $scope.data.listmotifs = response;
        }
        console.log('-----------------------list motif----------------------');
        console.log(response);
      });


    $scope.getOptClient = function (option) {
      return option;
    };
    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.getOptArticle = function (option) {
      return option;
    };

    $scope.getDetailPrc = function () {

      if ($scope.data.codePrc !== null && $scope.data.codePrc !== '') {
        ApiDetailPrc.getDetailPrc($scope.data.codePrc)
          .success(function (response) {
            if (response) {
              console.log('---------------------Detail prc--------------');

              $scope.data.detailsPRC = response;

              console.log(response);
             // console.log($scope.data.detailsPRC[0]);


              //sessionStorage.setItem('codePrc', '');
            }
          })
      }
    }

    $scope.getDetailPrc();

    $scope.ajouter = function () {
   //   $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      $scope.data.detailsPRC.push({
        index: $scope.data.detailsPRC.length + 1,
        codeDetail: "DPRC" + $scope.data.user.code + $scope.getCodePrc(),
        codeArticle: $scope.data.artcilechoisit.code,
        quantite: $scope.data.quantite,
        isCanceled: false,
        artcilechoisit: $scope.data.artcilechoisit,
        idMotif: $scope.data.motifchoisit.idMotif,
        motifchoisit: $scope.data.motifchoisit
      });
     // $ionicLoading.hide();
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      console.log('----------------------Detail-------------------');
      console.log($scope.data.detailsPRC);
    }



    $scope.goToDetailPrc = function (code) {
      localStorage.setItem('codeArticle', code);
      $state.transitionTo('app.details-prc', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.goToNewPrc = function () {
      sessionStorage.setItem('newPrc', true);
      $state.transitionTo('app.nouvel-prc', {}, {

        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.goToRecapPrc = function (code) {

      localStorage.setItem('codeCommerciale', code);
      $state.transitionTo('app.recapitulatif-pds-prc', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.goToFact = function (prc) {

      localStorage.setItem('prc', JSON.stringify(prc));
      $state.transitionTo('app.facturation', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

  })
  .controller('NewPrcCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,CodeGenere, ApiListModePaiement ) {

      $scope.data = {};

      $scope.initvar = function () {
        $scope.data.listarticles = [];
        $scope.data.prcs = [];
        $scope.data.detailPrc = {};
        $scope.data.codePrc = sessionStorage.getItem('codePrc');
        $scope.data.listclients = [];
        $scope.data.listmotifs = [];
        $scope.data.clientchoisit = null;
        $scope.data.artcilechoisit = null;
        $scope.data.listmodereglements = null;
        $scope.data.modereglementchoisit = null;
        $scope.data.motifchoisit = null;
        $scope.data.quantite = 0;
        $scope.data.idMotif = 0;
        $scope.data.idModepaiement = 0;
        var user = localStorage.getItem('user');
        $scope.data.user = JSON.parse(user);

        $scope.data.detailsPRC = [];
        $scope.isLoaded = false;
        $scope.isCanceled = false;


        var codeClient = { "codeCommerciale": $scope.data.user.code };

      }

      $scope.initvar();

      ApiListArticle.getListArticle().
      success(function (response) {
        if (response) {
          $scope.data.listarticles = response;
        }
        //  console.log('-----------------------list article----------------------');
        //  console.log(response);
      });

    ApiListClient.getListClient()
      .success(function (response) {
        if (response) {
          $scope.data.listclients = response;
        }
        //     console.log('-----------------------list client----------------------');
        //     console.log(response);
      })


      ApiListModePaiement.getListModePaiement()
    .success(function (response) {
      if (response) {
        $scope.data.listmodereglements = response;
      }
           console.log('-----------------------list mode paiement----------------------');
          console.log(response);
    })

    $scope.changeCLient = function(){
      console.log('client choisi')
      console.log($scope.data.clientchoisit)
      $scope.data.idModepaiement = $scope.data.clientchoisit.idModepaiement;
      //$scope.data.idModepaiement = 2;
    }

     $scope.showPopUp = function(libelle, etat, code = '') {
      $ionicPopup.show({
        title: etat == 1 ? "Code: "+ code: '',
        template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }]
      });
     }

     $scope.deletObject = function(item){
      let index = $scope.data.detailsPRC.indexOf(item);

      if(index > -1){
        $scope.data.detailsPRC.splice(index, 1);
      }
     }



      $scope.getOptClient = function (option) {
        return option;
      };
      $scope.getOptMotif = function (option) {
        return option;
      };

      $scope.getOptArticle = function (option) {
        return option;
      };
      $scope.getOptModereglement = function (option) {
        return option;
      };

      $scope.ajouter = function () {
        //   $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
           $scope.data.detailsPRC.push({
             index: $scope.data.detailsPRC.length + 1,
             codeDetail: "DPRC" + $scope.data.user.code + CodeGenere.getCodeGenere(),
             codeArticle: $scope.data.artcilechoisit.code,
             quantite: $scope.data.quantite,
             isCanceled: false,
             artcilechoisit: $scope.data.artcilechoisit,
             idMotif: 0,
            // motifchoisit: $scope.data.motifchoisit
           });
          // $ionicLoading.hide();
           $scope.data.artcilechoisit = null;
           $scope.data.motifchoisit = null;
           $scope.data.quantite = 0;
           console.log('----------------------Detail-------------------');
           console.log($scope.data.detailsPRC);
         }

      $scope.submit = function () {
        console.log('client choisi')
        console.log($scope.data.clientchoisit)
        if($scope.data.clientchoisit.idModepaiement == 1 || $scope.data.modereglementchoisit !==null){
          var values = {
            codePRC: 'PRC-' + $scope.data.user.code + "-" +CodeGenere.getCodeGenere(),
            codeClient: $scope.data.clientchoisit.codeClient,
            dateAjout: new Date(),
            idModepaiement: $scope.data.idModepaiement == 2 ? $scope.data.modereglementchoisit.idModepaiement :  $scope.data.idModepaiement,
            codeCommerciale: $scope.data.user.code,
            isLoaded: 0,
            isCanceled: 0,
            idMotif: $scope.data.idMotif,
            // detailsPRC : [{codeDetail:"DPRC"+$scope.data.user.code+$scope.getCodePrc(), codeArticle: $scope.data.artcilechoisit.code, quantite:10, isCanceled:false, idMotif:$scope.data.motifchoisit.idMotif}]
            detailsPRC: $scope.data.detailsPRC

          };
          console.log('---------------------Value to submit--------------------');
          console.log(values);

          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          ApiAjoutPrc.ajoutPrc(values)
            .success(function (response) {
              $ionicLoading.hide();

              if (response.reponse == 1) {

                $scope.initvar();
                $ionicPopup.show({
                  title: "Infos",
                  template: "Insertion réussit",
                  scope: $scope,
                  buttons: [{
                    text: 'Ok',
                    type: 'button-positive'
                  }]
                });

              }
            }, error => {
              $ionicLoading.hide();
            });

        }else{
          $ionicPopup.show({
            title: "Infos",
            template: "Vous devez choisir un mode de paiement",
            scope: $scope,
            buttons: [{
              text: 'Ok',
              type: 'button-positive'
            }]
          });
        }


      }

    })
  .controller('RecapPdsPrcCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc) {

    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeCommerciale = localStorage.getItem('codeCommerciale');
      $scope.data.user = localStorage.getItem('user');
      $scope.data.recapPrc = [];
     // var code = {codeCommerciale: $scope.data.codeCommerciale};

    }
    $scope.initRecap = function () {

      if ($scope.data.codeCommerciale) {
        var code = {codeCommerciale: $scope.data.codeCommerciale};

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiRecapPdsPrc.getRecapPdsPrc(code).
          success(function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.recapPrc = response;
            }
            console.log('-----------------------Recap PRC----------------------');
            console.log(response);
          },error=>{
            $ionicLoading.hide();
          });
      }
    }
    $scope.initvar();
    $scope.initRecap();

    $scope.demandePDS = function (recap) {

    //  localStorage.setItem('recapPRC',  angular.toJson(recap));
      localStorage.setItem('recapPRC', JSON.stringify(recap));
      $state.transitionTo('app.nouvel-pds', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.showPopUp = function(libelle, etat, code = '') {
      $ionicPopup.show({
        title: etat == 1 ? "Code: "+ code: '',
        template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }]
      });
     }

     $scope.editObject = function(item) {

     }


  })

  .controller('PdsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,ApiListPds,ApiRecapPdsPrc) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.listarticles = [];
      $scope.data.pds = [];
      $scope.data.detailPrc = {};
      $scope.data.codePrc = sessionStorage.getItem('codePrc');
      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      $scope.data.codePrc = localStorage.getItem('codeArticle');
      // vA isAdd = sessionStorage.setItem('newPrc', true);

      var codeClient = { "codeCommerciale": $scope.data.user.code };
      // console.log('-----------------------list prc----------------------');
      // console.log($scope.data.user);
      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      ApiListPds.getListPds(codeClient).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.pds = response;
          }
          console.log('-----------------------LIst pds ---------------------');
          console.log(response);
        }, error => { $ionicLoading.hide(); });
    }

    $scope.initvar();

    $scope.goToDetailPds = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.details-pds', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.goToNewPds = function (sens) {
     if(sens == 'nouvelle'){
      localStorage.setItem('sens', 'nouvelle');
      localStorage.setItem('recapPRC', []);
      $state.transitionTo('app.nouvel-pds', {}, {

        reload: true,
        inherit: true,
        notify: true
      });
     }else if(sens == 'recap'){
      localStorage.setItem('sens', 'recap');

      $scope.data.user = JSON.parse(localStorage.getItem('user'));;
        if ($scope.data.user) {
          console.log($scope.data.user)
          var code = {codeCommerciale: $scope.data.user.code};

          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          ApiRecapPdsPrc.getRecapPdsPrc(code).
            success(function (response) {
              $ionicLoading.hide();
              if (response) {
                $scope.data.recapPrc = response;
              }
              console.log('-----------------------Recap PRC----------------------');
              console.log(response);

              localStorage.setItem('recapPRC', JSON.stringify(response));
              $state.transitionTo('app.nouvel-pds', {}, {

                reload: true,
                inherit: true,
                notify: true
              });
            },error=>{
              $ionicLoading.hide();
            });
        }


     }


    }

  })

  
  .controller('dechargementsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc,ApiListDechargement) {
     
console.log('dechargements');
    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeCommerciale = localStorage.getItem('codeCommerciale');
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.dechargements = [];

    }

    $scope.initDechargements = function () {
        console.log($scope.data.user);
      if ($scope.data.user.code) {
        var code = {codeCommerciale: $scope.data.user.code};

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiListDechargement.getListDechargement(code).
          success(function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.dechargements = response;
            }
            console.log('-----------------------Dechargement----------------------');
            console.log(response);
          },error=>{
            $ionicLoading.hide();
          });
      }
    }
    $scope.initvar();
    $scope.initDechargements();

    $scope.goToDetailsDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.details-dechargement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }


  })
  .controller('DetailPdsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,ApiDetailPds) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.codePDS = localStorage.getItem('codePDS');
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsPDC = [];

      var codePDS = { "codePDS": $scope.data.codePDS };

      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      console.log('-----------------------Detail pds ---------------------');
      console.log(codePDS);
      ApiDetailPds.getDetailPds(codePDS).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.detailsPDC = response;
          }
          console.log('-----------------------Detail pds ---------------------');
          console.log(response);
        }, error => { $ionicLoading.hide();
    });
    }

    $scope.initvar();
  })

  .controller('DetailsLibelleCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,ApiDetailPds) {
    $scope.data = {};
   
    $scope.initvar = function () {
      $scope.data.codePDS = localStorage.getItem('codePDS');
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsDechargement= [];

      var codePDS = { "codePDS": $scope.data.codePDS };

      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      console.log('-----------------------Detail libelle ---------------------');
      console.log(codePDS);
      ApiDetailPds.getDetailsPds(codePDS).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.detailsDechargement.details = response;
          }
          console.log('-----------------------Detail libelle ---------------------');
          console.log(response);
        }, error => { $ionicLoading.hide();
    });
    }

    $scope.initvar();

    $scope.goToDetailsDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.details-libelle', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })

   


  .controller('DetailDechargementCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,ApiDetailPds) {
    $scope.data = {};
   
    $scope.initvar = function () {
      $scope.data.codePDS = localStorage.getItem('codePDS');
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsDechargement= [];

      var codePDS = { "codePDS": $scope.data.codePDS };

      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      console.log('-----------------------Detail dechargement ---------------------');
      console.log(codePDS);
      ApiDetailPds.getDetailsPds(codePDS).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.detailsDechargement = response;
          }
          console.log('-----------------------Detail dechargement ---------------------');
          console.log(response);
        }, error => { $ionicLoading.hide();
    });
    }

    $scope.initvar();

    $scope.showPopUp = function(libelle, etat, code = '') {
      $ionicPopup.show({
        title: etat == 1 ? "Code: "+ code: '',
        template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }]
      });
     }

    $scope.goToDetailsDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.details-dechargement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })

  .controller('AddPdsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,CodeGenere ,ApiListGrossiste,ApiAjoutPdsFromRecap,SendSms) {
      $scope.data = {};

      $scope.initvar = function () {
        $scope.data.pds              = {}
        $scope.code = 'initiale'
        var pds= JSON.parse(localStorage.getItem('pds'));
        if(pds && pds.codeGenere !==null){
          console.log('pds loc');
          console.log(pds);
          $scope.data.pds = pds
          $scope.code = 'attente'
          console.log('code');
          console.log($scope.data.pds.codeGenere);
        }

        $scope.edit = false
        $scope.data.user             = JSON.parse(localStorage.getItem('user'));
       console.log('-------user in pds add ------')
       console.log($scope.data.user);
        $scope.data.recapPRC         = localStorage.getItem('recapPRC') ? JSON.parse(localStorage.getItem('recapPRC')) : [];
        $scope.data.codeCommerciale  = $scope.data.recapPRC && $scope.data.recapPRC.length > 0 ? $scope.data.recapPRC[0].codeCommerciale : $scope.data.user.code;
        $scope.data.codePRC          = $scope.data.recapPRC && $scope.data.recapPRC.length > 0 ? $scope.data.recapPRC[0].details[0].codePRC : null;

        $scope.data.idMotif          = 0;
        $scope.data.detailsPDS       = [];
        $scope.data.listmotifs       = [];
        $scope.data.grossistes       = [];
        $scope.data.motifchoisit     = null;
        $scope.data.grossistechoisit = null;
        $scope.data.listarticles     = [];
        $scope.data.artcilechoisit   = null;
        $scope.data.codePDS          = 'PDS'+'-'+$scope.data.codeCommerciale+'-'+CodeGenere.getCodeGenere();
        $scope.data.detail           = {}

        $scope.data.quantite         = 0;

        $scope.initDetailPDS();

      }

      $scope.showPopUp = function(libelle, etat, code = '') {
        $ionicPopup.show({
          title: etat == 1 ? "Code: "+ code: '',
          template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
          scope: $scope,
          buttons: [{
            text: 'Ok',
            type: 'button-assertive'
          }]
        });
       }

       $scope.editDetail = function (item){

        $scope.data.artcilechoisit = {};

        $scope.data.artcilechoisit.libelle = item.article
        $scope.data.artcilechoisit.code = item.codeArticle
        console.log('--------------Quantite---------------');
        console.log(item.quantite);
        $scope.data.quantite = +item.quantite;
        //document.getElementById("quantite").value = item.quantite;

        $scope.edit = true;
        item.idMotif = "edit";

        for(var i = 0; i< $scope.data.detailsPDS.length; i++){
              if($scope.data.detailsPDS[i].idMotif === 'edit' && $scope.data.detailsPDS[i].codeArticle !==item.codeArticle ){
                     $scope.data.detailsPDS[i].idMotif = 0;
              }
        }
        $scope.itemEdit = item;
     }
     $scope.valideEdit = function(){
       if($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif!==''){
         for(var i = 0; i< $scope.data.detailsPDS.length; i++){
              if($scope.data.detailsPDS[i].idMotif === 'edit' && $scope.data.detailsPDS[i].codeArticle === $scope.itemEdit.codeArticle ){

                  $scope.data.detailsPDS[i].idMotif = $scope.data.motifchoisit.idMotif;
                  $scope.data.detailsPDS[i].codeArticle = $scope.data.artcilechoisit.code;
                  $scope.data.detailsPDS[i].quantite = $scope.data.quantite;

                  $scope.edit = false;

                  break;
              }
        }
       }else{
         $ionicPopup.show({
              title: "Erreur",
              template: "Veuillez choisir un motif",
              scope: $scope,
              buttons: [{
                text: 'Ok',
                type: 'button-danger'
              }]
            });
       }

     }
      $scope.initDetailPDS = function (){

        if($scope.data.recapPRC && $scope.data.recapPRC.length > 0){
          if($scope.data.recapPRC[0].details && $scope.data.recapPRC[0].details.length > 0){
            $scope.data.detailsPDS =[];
            for(var i = 0; i< $scope.data.recapPRC[0].details.length ; i++){
              $scope.data.detail           = {
                codeDetail     : null,
                codePRC        : $scope.data.codePRC,
                codePDS        : $scope.data.codePDS,
                codeArticle    : null,
                quantite       : 0,
                isCanceled     : false,
                idMotif        : null,
                isUnloaded     : false,
                motifchoisit   : null,
                artcilechoisit : null,
                index          : 0,
                montant        : 0,
                article        : null
              }
              $scope.data.detail.codeDetail     = 'DPDS'+'-'+CodeGenere.getCodeGenere();
              $scope.data.detail.codeArticle    = $scope.data.recapPRC[0].details[i].codeArticle;
              $scope.data.detail.quantite       = $scope.data.recapPRC[0].details[i].quantite;
              $scope.data.detail.idMotif        = 0;
              $scope.data.detail.motifchoisit   = null;
              $scope.data.detail.article        = $scope.data.recapPRC[0].details[i].article;
              $scope.data.detail.index          = $scope.data.detailsPDS.length + 1;

              $scope.data.detailsPDS.push($scope.data.detail);

            }
          }

        }else{
          $scope.data.detail           = {
                codeDetail     : null,
                codePRC        : $scope.data.codePRC,
                codePDS        : $scope.data.codePDS,
                codeArticle    : null,
                quantite       : 0,
                isCanceled     : false,
                idMotif        : null,
                isUnloaded     : false,
                motifchoisit   : null,
                artcilechoisit : null,
                index          : 0,
                montant        : 0,
                article        : null
              }
        }



      }

      $scope.initPDS = function () {
        $scope.data.pds               = {
          codePDS         : $scope.data.codePDS,
          codeCommerciale : $scope.data.codeCommerciale,
          codeGrossiste   : $scope.data.grossistechoisit ? $scope.data.grossistechoisit.codeGrossiste : null,
          dateAjout       : new Date(),
          isCanceled      : false,
          idMotif         : $scope.data.idMotif,
          isCurrent       : false,
          isLoaded        : false,
          isUnloaded      : false,
          isChecked       : false,
          codeGenere      : CodeGenere.getCodeGenere(),
          detailsPDS      : $scope.data.detailsPDS
       }
      }

      ApiListMotif.getListMotif().
      success(function (response) {
        if (response) {
          $scope.data.listmotifs = response;
        }
        console.log('-----------------------list motif----------------------');
        console.log(response);
      });

      ApiListArticle.getListArticle().
      success(function (response) {
        if (response) {
          $scope.data.listarticles = response;
        }
        //  console.log('-----------------------list article----------------------');
        //  console.log(response);
      });

      ApiListGrossiste.getListGrossiste().
      success(function (response) {
        if (response) {
          $scope.data.grossistes = response;
        }
        //  console.log('-----------------------list article----------------------');
        //  console.log(response);
      });

      $scope.initvar();

      $scope.ajouter = function(){
        $scope.initDetailPDS();

        $scope.data.detail.codeDetail     = 'DPDS'+'-'+CodeGenere.getCodeGenere();
        $scope.data.detail.codeArticle    = $scope.data.artcilechoisit.code;
        $scope.data.detail.quantite       = $scope.data.quantite;
        $scope.data.detail.idMotif        =  $scope.data.idMotif;
        $scope.data.detail.article        = $scope.data.artcilechoisit.libelle
      //  $scope.data.detail.motifchoisit   = $scope.data.motifchoisit;
        $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
        $scope.data.detail.index          = $scope.data.detailsPDS.length + 1;

        $scope.data.detailsPDS.push($scope.data.detail);

        $scope.initDetailPDS();
        $scope.data.quantite       = 0;
        $scope.data.artcilechoisit = null;
        $scope.data.motifchoisit   = null;
      }
      $scope.getOptGrossiste = function (option) {
        return option;
      };
      $scope.getOptMotif = function (option) {
        return option;
      };

      $scope.getOptArticle = function (option) {
        return option;
      };
      $scope.validerPdsAndSendCode = function(){
        if($scope.data.grossistechoisit){
          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });

        $scope.initPDS();
        //$scope.data.pds.codeGenere;

        //Article, quatite, valeur et en bas valeur total et code de securite

        var message = '';
        for(var i = 0; i< $scope.data.pds.detailsPDS.length; i++){
          var index =  i+1;
          console.log($scope.data.pds.detailsPDS[i]);
           message = message+ ''+ index + ')  ' + $scope.data.pds.detailsPDS[i].article+ ' '+'\n \n Quantité: '+ $scope.data.pds.detailsPDS[i].quantite+''+ '\n \n \n';
        }
        var messageMontant = '';
        if($scope.data.recapPRC && $scope.data.recapPRC.length > 0){
          messageMontant = '\n Montant total:   '+$scope.data.recapPRC[0].montant + 'FCFA';
        }

        var messageCode = '\n Code::    '+$scope.data.pds.codeGenere;
        var MessageGlobal = message + messageMontant + messageCode;
        console.log(message);
        console.log($scope.data.grossistechoisit);



        //test
        $scope.data.grossistechoisit.telephone = '775329312';
        SendSms.sendSMS(MessageGlobal,$scope.data.grossistechoisit.telephone);

        localStorage.setItem('pds', JSON.stringify($scope.data.pds));

        $scope.code = 'attente';

        $ionicLoading.hide();
        }else{
          $ionicPopup.show({
            title: "Erreur",
            template: "Veuillez choisir un grossiste.",
            scope: $scope,
            buttons: [{
              text: 'Ok',
              type: 'button-positive'
            }]
});
        }
      }
      $scope.submit = function() {
        console.log('-----------------Value PDS-------------');
        console.log($scope.data.pds);
        console.log($scope.data.code);
        if($scope.data.pds.codeGenere === $scope.data.code){
          $scope.data.pds.isLoaded = 1;
          $scope.data.pds.isCurrent = 1 ;
          for(var i = 0 ; i< $scope.data.pds.detailsPDS.length; i++){
            $scope.data.pds.detailsPDS[i].isLoaded = 1
          }

          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          ApiAjoutPdsFromRecap.ajoutPdsFromRecap($scope.data.pds)
            .success(function (response) {
              $ionicLoading.hide();

              if (response.reponse == 1) {

                $scope.data.detailsPDS = [];
                $scope.data.pds              = {}
                $scope.code = 'initiale'
                localStorage.setItem('pds',null);

                $state.transitionTo('app.pds', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });


              }
            }, error => {
              $ionicLoading.hide();
            });

        }else{
        $ionicPopup.show({
                  title: "Erreur de code",
                  template: "Le code saisi ne correspond pas. Reesayer svp.",
                  scope: $scope,
                  buttons: [{
                    text: 'Ok',
                    type: 'button-positive'
                  }]
      });
 }

   }



  })

  .controller('FacturationsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc,ApiListFacturation) {
      console.log('Facture')

    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeCommerciale = localStorage.getItem('codeCommerciale');
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.facturations = [];

    }

    $scope.initFacturations = function () {
        console.log($scope.data.user);
      if ($scope.data.user.code) {
        var code = {codeCommerciale: $scope.data.user.code};

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiListFacturation.getListFacturation(code).
          success(function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.facturations = response;
            }
            console.log('-----------------------Facturation----------------------');
            console.log(response);
          },error=>{
            $ionicLoading.hide();
          });
      }
    }
    $scope.initvar();
    $scope.initFacturations();

    $scope.goToNewFact = function () {

    //  localStorage.setItem('recapPRC', JSON.stringify(recap));
      $state.transitionTo('app.facturation', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.goToDetailFact = function (code) {
      localStorage.setItem('codeFacture', code);
      $state.transitionTo('app.details-facture', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

  })
  .controller('DetailsFactureCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc,ApiListFacturation) {
      console.log('Facture')

    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeFacture = localStorage.getItem('codeFacture');
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.detailsfactues = [];

    }
    $scope.goToDetailFact = function (code) {
      localStorage.setItem('codeFacture', code);
      $state.transitionTo('app.details-facture', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
    $scope.initDetailsFacturations = function () {


        var code = {codeFacture: $scope.data.codeFacture};
        console.log(code);
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiDeatilsFacture.getDeatilsFacture(code).
          success(function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.detailsfactures = response;
            }
            console.log('-----------------------Facturation----------------------');
            console.log(response);
          },error=>{
            $ionicLoading.hide();
          });

    }
    $scope.initvar();
    $scope.initDetailsFacturations();

    $scope.goToNewFact = function () {

    //  localStorage.setItem('recapPRC', JSON.stringify(recap));
      $state.transitionTo('app.facturation', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

  })

  .controller('FacturationCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,CodeGenere ,ApiListGrossiste,ApiAjoutFacturation,ApiRecapPdsPrc,ApiRecapFactPrc) {
      $scope.data = {};

      $scope.initvar = function () {

       // JSON.parse(localStorage.getItem('recapPRC'))
       $scope.edit = false;
        $scope.data.prc = JSON.parse(localStorage.getItem('prc'));
        console.log('----------------Value PRC----------------');
        console.log($scope.data.prc);
        console.log($scope.data.prc);
        $scope.data.codeCommerciale  = $scope.data.prc.codeCommerciale;
        $scope.data.codePRC          = $scope.data.prc.codePRC;
        $scope.data.idModepaiement   = $scope.data.prc.idModepaiement;
        $scope.data.user             = localStorage.getItem('user');
        $scope.data.idMotif          = 0;
        $scope.data.listmotifs       = [];
        $scope.data.clients          = [];
        $scope.data.motifchoisit     = null;
        $scope.data.clientchoisit    = null;
        $scope.data.codeFacture      = 'FCT'+'-'+$scope.data.codeCommerciale+'-'+CodeGenere.getCodeGenere();

        $scope.data.detail           = {}
        $scope.data.fact             = {}
        $scope.data.quantite         = 0;

      }
      $scope.showPopUp = function(libelle, etat, code = '') {
        $ionicPopup.show({
          title: etat == 1 ? "Code: "+ code: '',
          template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
          scope: $scope,
          buttons: [{
            text: 'Ok',
            type: 'button-assertive'
          }]
        });
       }
       $scope.editDetail = function (item){
        $scope.edit = true;
        item.idMotif = "edit";

        /*$scope.data.artcilechoisit = {};

        $scope.data.artcilechoisit.libelle = item.article
        $scope.data.artcilechoisit.code = item.codeArticle*/
        console.log('--------------Quantite---------------');
        console.log(item.quantite);
        $scope.data.quantite = +item.quantite;

        for(var i = 0; i< $scope.data.recapPrc.details.length; i++){
              if($scope.data.recapPrc.details[i].idMotif === 'edit' && $scope.data.recapPrc.details[i].codeArticle !==item.codeArticle ){
                     $scope.data.recapPrc.details[i].idMotif = 0;
              }
        }
        $scope.itemEdit = item;
     }
     $scope.valideEdit = function(){
       if($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif!==''){
         for(var i = 0; i< $scope.data.recapPrc.details.length; i++){
              if($scope.data.recapPrc.details[i].idMotif === 'edit' && $scope.data.recapPrc.details[i].codeArticle === $scope.itemEdit.codeArticle ){

                  $scope.data.recapPrc.details[i].idMotif = $scope.data.motifchoisit.idMotif;
                  $scope.data.recapPrc.details[i].quantite = $scope.data.quantite;

                  $scope.edit = false;

                  break;
              }
        }
       }else{
         $ionicPopup.show({
              title: "Erreur",
              template: "Veuillez choisir un motif",
              scope: $scope,
              buttons: [{
                text: 'Ok',
                type: 'button-danger'
              }]
            });
       }

     }

      $scope.initFact = function () {
        $scope.data.fact      = {
          codeFacture         : $scope.data.codeFacture,
          codeCommerciale     : $scope.data.codeCommerciale,
          codePRC             : $scope.data.codePRC,
          dateAjout           : new Date(),
          codeClient          : $scope.data.codeClient,
          isCanceled          : false,
          position            : null,
          idModepaiement      : $scope.data.idModepaiement,
          idMotif             : $scope.data.idMotif,
          codePDS             : $scope.data.codePDS,
       }
      }

      $scope.initRecap = function () {

        if ($scope.data.codePRC) {
          var code = {codePRC: $scope.data.codePRC};

          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });

          ApiRecapFactPrc.getRecapFactPrc(code).
            success(function (response) {
              $ionicLoading.hide();
              if (response) {
                $scope.data.recapPrc = response;
                console.log('-----------------------Recap PRC Fact----------------------');
                console.log($scope.data.recapPrc);
                if($scope.data.recapPrc){
                  $scope.data.codePDS    = $scope.data.recapPrc.codePDS;
                  $scope.data.codeClient = $scope.data.recapPrc.codeClient;

                }
              }

            },error=>{
              $ionicLoading.hide();
            });
        }
      }

      ApiListMotif.getListMotif().
      success(function (response) {
        if (response) {
          $scope.data.listmotifs = response;
        }
        /*console.log('-----------------------list motif----------------------');
        console.log(response);*/
      });

      ApiListClient.getListClient().
      success(function (response) {
        if (response) {
          $scope.data.listclients = response;
        }
      });


      $scope.initvar();
      $scope.initRecap();

      $scope.ajouter = function(){
        $scope.initDetailPDS();

        $scope.data.detail.codeDetail     = 'DPDS'+'-'+CodeGenere.getCodeGenere();
        $scope.data.detail.codeArticle    = $scope.data.artcilechoisit.code;
        $scope.data.detail.quantite       = $scope.data.quantite;
        $scope.data.detail.idMotif        = $scope.data.motifchoisit.idMotif;
        $scope.data.detail.motifchoisit   = $scope.data.motifchoisit;
        $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
        $scope.data.detail.index          = $scope.data.detailsPDS.length + 1;

        $scope.data.detailsPDS.push($scope.data.detail);

        $scope.initDetailPDS();
        $scope.data.quantite       = 0;
        $scope.data.artcilechoisit = null;
        $scope.data.motifchoisit   = null;
      }
      $scope.getOptClient = function (option) {
        return option;
      };
      $scope.getOptMotif = function (option) {
        return option;
      };


      $scope.submit = function() {
        $scope.initFact();


        $scope.data.fact.idMotif    = $scope.data.motifchoisit ? $scope.data.motifchoisit.idMotif : 0;
       // $scope.data.fact.codeClient = $scope.data.clientchoisit.codeClient;

        console.log($scope.data.fact);

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiAjoutFacturation.ajoutFacturation($scope.data.fact)
        .success(function (response) {
          $ionicLoading.hide();

          if (response.reponse == 1) {

            $scope.data.motifchoisit = null;
            $scope.data.clientchoisit = null;
            $state.transitionTo('app.facturations', {}, {
              reload: true,
              inherit: true,
              notify: true
            });
            /*$ionicPopup.show({
              title: "Infos",
              template: "Insertion réussit",
              scope: $scope,
              buttons: [{
                text: 'Ok',
                type: 'button-positive'
              }]
            });*/

          }
        }, error => {
          $ionicLoading.hide();
        });
      }

  })


  .controller('DechargementCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,CodeGenere ,ApiListGrossiste,ApiAjoutFacturation,ApiRecapPdsPrc,ApiRecapFactPrc) {
      $scope.data = {};

      $scope.initvar = function () {

       // JSON.parse(localStorage.getItem('recapPRC'))
       $scope.edit = false;
        $scope.data.prc = JSON.parse(localStorage.getItem('prc'));
        console.log('----------------Value PRC----------------');
        console.log($scope.data.prc);
        console.log($scope.data.prc);
        $scope.data.codeCommerciale  = $scope.data.prc.codeCommerciale;
        $scope.data.codePRC          = $scope.data.prc.codePRC;
        $scope.data.idModepaiement   = $scope.data.prc.idModepaiement;
        $scope.data.user             = localStorage.getItem('user');
        $scope.data.idMotif          = 0;
        $scope.data.listmotifs       = [];
        $scope.data.clients          = [];
        $scope.data.motifchoisit     = null;
        $scope.data.clientchoisit    = null;
        $scope.data.codeFacture      = 'FCT'+'-'+$scope.data.codeCommerciale+'-'+CodeGenere.getCodeGenere();

        $scope.data.detail           = {}
        $scope.data.fact             = {}
        $scope.data.quantite         = 0;

      }
      $scope.showPopUp = function(libelle, etat, code = '') {
        $ionicPopup.show({
          title: etat == 1 ? "Code: "+ code: '',
          template: etat == 1 ? libelle :  '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
          scope: $scope,
          buttons: [{
            text: 'Ok',
            type: 'button-assertive'
          }]
        });
       }
       $scope.editDetail = function (item){
        $scope.edit = true;
        item.idMotif = "edit";

        /*$scope.data.artcilechoisit = {};

        $scope.data.artcilechoisit.libelle = item.article
        $scope.data.artcilechoisit.code = item.codeArticle*/
        console.log('--------------Quantite---------------');
        console.log(item.quantite);
        $scope.data.quantite = +item.quantite;

        for(var i = 0; i< $scope.data.recapPrc.details.length; i++){
              if($scope.data.recapPrc.details[i].idMotif === 'edit' && $scope.data.recapPrc.details[i].codeArticle !==item.codeArticle ){
                     $scope.data.recapPrc.details[i].idMotif = 0;
              }
        }
        $scope.itemEdit = item;
     }
     $scope.valideEdit = function(){
       if($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif!==''){
         for(var i = 0; i< $scope.data.recapPrc.details.length; i++){
              if($scope.data.recapPrc.details[i].idMotif === 'edit' && $scope.data.recapPrc.details[i].codeArticle === $scope.itemEdit.codeArticle ){

                  $scope.data.recapPrc.details[i].idMotif = $scope.data.motifchoisit.idMotif;
                  $scope.data.recapPrc.details[i].quantite = $scope.data.quantite;

                  $scope.edit = false;

                  break;
              }
        }
       }else{
         $ionicPopup.show({
              title: "Erreur",
              template: "Veuillez choisir un motif",
              scope: $scope,
              buttons: [{
                text: 'Ok',
                type: 'button-danger'
              }]
            });
       }

     }

      $scope.initFact = function () {
        $scope.data.fact      = {
          codeFacture         : $scope.data.codeFacture,
          codeCommerciale     : $scope.data.codeCommerciale,
          codePRC             : $scope.data.codePRC,
          dateAjout           : new Date(),
          codeClient          : $scope.data.codeClient,
          isCanceled          : false,
          position            : null,
          idModepaiement      : $scope.data.idModepaiement,
          idMotif             : $scope.data.idMotif,
          codePDS             : $scope.data.codePDS,
       }
      }

      $scope.initRecap = function () {

        if ($scope.data.codePRC) {
          var code = {codePRC: $scope.data.codePRC};

          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });

          ApiRecapFactPrc.getRecapFactPrc(code).
            success(function (response) {
              $ionicLoading.hide();
              if (response) {
                $scope.data.recapPrc = response;
                console.log('-----------------------Recap PRC Fact----------------------');
                console.log($scope.data.recapPrc);
                if($scope.data.recapPrc){
                  $scope.data.codePDS    = $scope.data.recapPrc.codePDS;
                  $scope.data.codeClient = $scope.data.recapPrc.codeClient;

                }
              }

            },error=>{
              $ionicLoading.hide();
            });
        }
      }

      ApiListMotif.getListMotif().
      success(function (response) {
        if (response) {
          $scope.data.listmotifs = response;
        }
        /*console.log('-----------------------list motif----------------------');
        console.log(response);*/
      });

      ApiListClient.getListClient().
      success(function (response) {
        if (response) {
          $scope.data.listclients = response;
        }
      });


      $scope.initvar();
      $scope.initRecap();

      $scope.ajouter = function(){
        $scope.initDetailPDS();

        $scope.data.detail.codeDetail     = 'DPDS'+'-'+CodeGenere.getCodeGenere();
        $scope.data.detail.codeArticle    = $scope.data.artcilechoisit.code;
        $scope.data.detail.quantite       = $scope.data.quantite;
        $scope.data.detail.idMotif        = $scope.data.motifchoisit.idMotif;
        $scope.data.detail.motifchoisit   = $scope.data.motifchoisit;
        $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
        $scope.data.detail.index          = $scope.data.detailsPDS.length + 1;

        $scope.data.detailsPDS.push($scope.data.detail);

        $scope.initDetailPDS();
        $scope.data.quantite       = 0;
        $scope.data.artcilechoisit = null;
        $scope.data.motifchoisit   = null;
      }
      $scope.getOptClient = function (option) {
        return option;
      };
      $scope.getOptMotif = function (option) {
        return option;
      };


      $scope.submit = function() {
        $scope.initFact();


        $scope.data.fact.idMotif    = $scope.data.motifchoisit ? $scope.data.motifchoisit.idMotif : 0;
       // $scope.data.fact.codeClient = $scope.data.clientchoisit.codeClient;

        console.log($scope.data.fact);

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiAjoutFacturation.ajoutFacturation($scope.data.fact)
        .success(function (response) {
          $ionicLoading.hide();

          if (response.reponse == 1) {

            $scope.data.motifchoisit = null;
            $scope.data.clientchoisit = null;
            $state.transitionTo('app.facturations', {}, {
              reload: true,
              inherit: true,
              notify: true
            });
            /*$ionicPopup.show({
              title: "Infos",
              template: "Insertion réussit",
              scope: $scope,
              buttons: [{
                text: 'Ok',
                type: 'button-positive'
              }]
            });*/

          }
        }, error => {
          $ionicLoading.hide();
        });
      }

  })


  .factory('ApiListStock', function ($http, urlPhp) {
    return {
      getListStock: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        var params = { codeUtilisateur: user.code }
        return $http.post(url + '/utilisateur/stock.php', params);
      }
    }
  })
  .factory('ApiListClient', function ($http, urlPhp) {
    return {
      getListClient: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + '/client/liste.php');
      }
    }
  })
  .factory('ApiListArticle', function ($http, urlPhp) {
    return {
      getListArticle: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + '/article/liste.php');
      }
    }
  })
  .factory('ApiListPrc', function ($http, urlPhp) {
    return {
      getListPrc: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/prc/liste.php', codeCommerciale);
      }
    }
  })
  .factory('ApiDetailPrc', function ($http, urlPhp) {
    return {
      getDetailPrc: function (codePRC) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        var code = { codePRC: codePRC };
        return $http.post(url + '/prc/details.php', code);
      }
    }
  })
  .factory('ApiAjoutPrc', function ($http, urlPhp) {
    return {
      ajoutPrc: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/prc/ajout.php', values);
      }
    }
  })
  .factory('ApiListMotif', function ($http, urlPhp) {
    return {
      getListMotif: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + '/motif/liste.php');
      }
    }
  })
  .factory('ApiRecapPdsPrc', function ($http, urlPhp) {
    return {
      getRecapPdsPrc: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/prc/recapPRC.php', code);
      }
    }
  })
  .factory('ApiListPds', function ($http, urlPhp) {
    return {
      getListPds: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/pds/liste.php', codeCommerciale);
      }
    }
  })

  .factory('ApiDetailPds', function ($http, urlPhp) {
    return {
     getDetailPds: function (codePDS) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
      //  var code = { codePDS: codePDS };
        return $http.post(url + '/pds/details.php', codePDS);
      }
    }
  })
  .factory('ApiAjoutPds', function ($http, urlPhp) {
    return {
      ajoutPds: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/prc/ajout.php', values);
      }
    }
  })
  .factory('ApiListGrossiste', function ($http, urlPhp) {
    return {
      getListGrossiste: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + '/grossiste/liste.php');
      }
    }
  })
  .factory('ApiAjoutPdsFromRecap', function ($http, urlPhp) {
    return {
      ajoutPdsFromRecap: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/pds/demandeFromPRC.php', values);
      }
    }
  })
  .factory('ApiListFacturation', function ($http, urlPhp) {
    return {
      getListFacturation: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/facture/liste.php', codeCommerciale);
      }
    }
  })
  .factory('ApiAjoutFacturation', function ($http, urlPhp) {
    return {
      ajoutFacturation: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/facture/ajoutFromprc.php', values);
      }
    }
  })
  .factory('ApiListModePaiement', function ($http, urlPhp) {
    return {
      getListModePaiement: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + '/modepaiement/liste.php');
      }
    }
  })
  .factory('ApiRecapFactPrc', function ($http, urlPhp) {
    return {
      getRecapFactPrc: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/prc/details.php', code);
      }
    }
  })

  .factory('ApiRecapDchmnt', function ($http, urlPhp) {
    return {
      getRecapDchmnt: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/dechargement/recap.php', code);
      }
    }
  })
    .factory('ApiStockGrossiste', function ($http, urlPhp) {
    return {
      getStockGrossiste: function (codeArticle) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);

        return $http.post(url + '/article/stockGrossiste.php', codeArticle);
      }
    }
  })
  .factory('ApiDeatilsFacture', function ($http, urlPhp) {
    return {
      getDeatilsFacture: function (codeFact) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);

        return $http.post(url + '/facture/details.php', codeFact);
      }
    }
  })

  .factory('ApiListDechargement', function ($http, urlPhp) {
    return {
      getListDechargement: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/dechargement/listePDS.php', codeCommerciale);
      }
    }
  })

  .factory('ApiDetailPds', function ($http, urlPhp) {
    return {
      getDetailsPds: function (codePDS) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + '/pds/details.php', codePDS);
      }
    }
  })

  .factory('ChekConnect', function () {
    var connect;

    return {
      getConnectivite: function () {
        if (window.Connection) {
          if (navigator.connection.type == Connection.NONE) {
            connect = false;
          }
          else {
            connect = true;
          }
        }
        return connect;
      }
    }
  })
  .factory('urlPhp', function () {
    var connect;

    return {
      getUrl: function () {

        return "http://test-test.h-tsoft.com/apiagroline";
        //return "http://htsoftdemo.com/apiccbm";
        //return "http://192.168.1.34/CCBM-serveur";
        //  return "http://mob-test.yosard.com/webservice";
        // return "http://mob.yosard.com:89/webservice";
      }
    }
  })
  .factory('urlJava', function () {
    var connect;

    return {
      getUrl: function () {
        return "http://v-beta.yosard.com:8080/yup/rest";
        // return "http://www.yosard.com:8080/yup/rest";
      }
    }
  })
  .factory('ProfilUser', function () {
    var profil = 'limite';
    //$scope.data.profile = sessionStorage.getItem("")
    return {
      profilUser: function () {

        if (sessionStorage.getItem('loggedin_profil') == 'Codir YUP Mgt' || sessionStorage.getItem('loggedin_profil') == 'Direction Commerciale YUP Mgt'
          || sessionStorage.getItem('loggedin_profil') == 'Marketing YUP Mgt' || sessionStorage.getItem('loggedin_profil') == 'Call Center YUP Mgt'
          || sessionStorage.getItem('loggedin_profil') == 'Administrateur Maintenance') {
          // $scope.data.profile = 'super';
          profil = 'super';
        }
        return profil;
      }
    }
  })
  .controller('AddcompteCtrl', function ($scope,
    $http,
    $ionicLoading,
    $ionicPopup,
    $cordovaGeolocation,
    ChekConnect,
    $translate,
    $cordovaCamera,
    $ionicModal,
    ProfilUser,
    urlPhp,
    urlJava,
    $ionicHistory,
    $translate,
    $state,
    SendSms) {
    $scope.user = {}
    console.log('creation de compte');
    $scope.initvar = function () {
      $scope.user.nom = '';
      $scope.user.prenom = '';
      $scope.user.telephone = '';
      $scope.user.adresse = '';
      $scope.user.email = '';
      $scope.user.password = '';
      $scope.user.passwordconfirm = '';
    }
    $scope.initvar();
    $scope.login = function () {

      if ($scope.user.nom !== '' &&
        $scope.user.prenom !== '' &&
        $scope.user.telephone !== '' &&
        $scope.user.adresse !== '' &&
        $scope.user.email !== '' &&
        $scope.user.password !== '' &&
        $scope.user.passwordconfirm !== ''
      ) {
        if ($scope.user.password == $scope.user.passwordconfirm) {
          console.log($scope.user);
          $scope.user.profil = 'Administrateur';
          $scope.user.dateajout = new Date()

          var url = urlPhp.getUrl();
          var link = url + '/utilisateur.php';
          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          console.log($scope.user)
          $http.post(link, $scope.user)
            .then(function (res) {
              console.log(res)
              if (res.data !== "error") {
                //     $scope.showDialog('Infos', 'reussi')
                sessionStorage.setItem('loggedin_name', $scope.user.email);
                sessionStorage.setItem('loggedin_password', $scope.user.password);
                sessionStorage.setItem('loggedin_iduser', res.data);
                sessionStorage.setItem('loggedin_profil', 'Agent recenseur');


                localStorage.setItem('loggedin_name', $scope.user.email);
                localStorage.setItem('loggedin_password', $scope.user.password);
                localStorage.setItem('loggedin_iduser', res.data);
                localStorage.setItem('loggedin_profil', 'Agent recenseur');
                localStorage.setItem('isconn', true)
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                });
                $translate('alert_connexion_reussi_header').then(function (header) {
                  $translate('alert_connexion_reussi_content').then(function (content) {
                    var alertPopup = $ionicPopup.alert({
                      title: header,
                      template: content + $scope.user.email + ' !'
                    });
                  });
                });

                $state.transitionTo('app.bienvenue', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              } else {
                $scope.showDialog('erreur', 'echec')
              }

              $ionicLoading.hide();

            }).catch(function (error) {
              console.log(error)
              $ionicLoading.hide();
              alert(error);
            });
        } else {
          $scope.showDialog('erreur', 'Les mots de passe ne sont pas conformes')
        }
      } else {
        $scope.showDialog('erreur', 'Remplire tout le formulaire')
      }
    }
    $scope.showDialog = function (header, content) {
      $ionicPopup.show({
        title: header,
        template: content,
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-positive'
        }]
      });
    }

     $scope.sms_function = function(){
             SendSms.sendSMS('Bissmillah','776726045');
      }





  })
  .factory('CodeGenere', function ($http, urlPhp) {
    return {
      getCodeGenere: function () {
        var rd_code = Math.floor((Math.random() * 1000) + 1);
          var code_chaine = '';
          if (rd_code) {
            if ((rd_code + '').length === 1) {
              code_chaine = '000' + (rd_code + '').length;
            }
            else if ((rd_code + '').length === 2) {
              code_chaine = '00' + rd_code;
            }
            else if ((rd_code + '').length === 3) {
              code_chaine = '0' + rd_code;
            }
            else if ((rd_code + '').length === 4) {
              code_chaine = '' + rd_code;
            }
          }

          return code_chaine;
      }
    }
  })

  .factory('SendSms', function ($http, urlPhp) {
    return {
      sendSMS: function (text,number) {

        //var number = document.getElementById('numberTxt').value.toString(); /* iOS: ensure number is actually a string */
        //var message = document.getElementById('messageTxt').value;
        //console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
          replaceLineBreaks:true, // true to replace \n by a new line, false by default
            android: {
               // intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
            }
        };

        var success = function () { console.log('reussi'); };
        var error = function (e) { console.log(e);  };
        sms.send(number, text, options, success, error);


      }
    }
  })
  .factory('ListpaysByProfil', function ($http, urlPhp) {
    var connect;
    var listdespays;
    var payschoisit;
    var pays;
    return {
      listpaysByProfil: function (profil) {
        console.log(profil)
        if (window.Connection) {
          if (navigator.connection.type == Connection.NONE) {
            connect = false;
          }
          else {
            connect = true;
            if (profil == 'super') {
              var url = urlPhp.getUrl();
              $http.get(url + "/pays.php")
                .success(function (response) {
                  // $ionicLoading.hide();
                  pays = response;
                  localStorage.setItem('paysOnline', angular.toJson(pays));
                  listdespays = [];
                  for (var i = 0; i < response.length; i++) {
                    var pv = { name: response[i].pays, id: response[i].idpays }
                    listdespays.push(pv);
                  }
                }).catch(function (error) {
                  // $ionicLoading.hide();
                  console.log(error)
                });
              //
            } else {
              //Recuperer la liste des pays
              var url = urlPhp.getUrl();
              $http.get(url + "/paysByUser.php?idutilisateurs=" + sessionStorage.getItem('loggedin_iduser'))
                .success(function (response) {
                  //  $ionicLoading.hide();
                  pays = response;
                  localStorage.setItem('paysOnline', angular.toJson(pays));
                  listdespays = [];
                  for (var i = 0; i < response.length; i++) {
                    var pv = { name: response[i].pays, id: response[i].idpays }
                    listdespays.push(pv);
                  }
                  if (listdespays.length != 0) {
                    payschoisit = listdespays[0];
                  }
                  listdespays = [];
                  listdespays.push(payschoisit);
                  // $scope.listDesregionsByPaysID();
                }).catch(function (error) {
                  // $ionicLoading.hide();
                });
              //Recuperer la liste des villes
            }
          }
        }
        return listdespays;
      }
    }
  });
