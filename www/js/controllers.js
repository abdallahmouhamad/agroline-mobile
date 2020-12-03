angular
  .module("starter.controllers", ["pascalprecht.translate"])
  // Accueil Controller

  .controller("DashCtrl", function ($scope) {
    console.log("DashCtrl");
    $scope.data = {};
    $scope.data.isconn = localStorage.getItem("isconn");
  })

  .controller("AppCtrl", function (
    $scope,
    $ionicModal,
    $timeout,
    $state,
    $translate,
    $http,
    $ionicPopup,
    $ionicLoading,
    urlPhp,
    urlJava,
    ApiListStock,
    ApiListArticle,

    ApiListRegions,
    ApiListVilles,
    ApiListMarches,
    ApiListZones,
    ApiListPrc,
    $cordovaPrinter
  ) {
    $scope.menu = true;
    $scope.scroll = false;
    $scope.menutab = false;
    $scope.data = {};
    var user = localStorage.getItem("user");
    $scope.data.user = JSON.parse(user);
    $scope.data.prcs = [];

    // cordova.plugins.printer.print("Hello\nWorld!");


    $scope.synchroStock = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      ApiListStock.getListStock().success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.listStock = response;
            for (var i = 0; i < $scope.data.listStock.length; i++) {

              if ($scope.data.listStock.quantite != " ") {
                $scope.data.listStock.quantite = parseInt($scope.data.listStock[i].quantite);
    
              } else {
                console.log($scope.data.listStock.quantite);
              }
            }
    
            
            localStorage.setItem("stocks", JSON.stringify($scope.data.listStock));
            console.log(JSON.parse(localStorage.getItem("stocks")))
          }
         
          console.log(response);
        },
        (error) => {
          console.log(error);
          $ionicLoading.hide();
        }
      );
    }

    $scope.synchroArticle = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });

      ApiListArticle.getListArticle().success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.listarticles = response;
          localStorage.setItem("articles", JSON.stringify($scope.data.listarticles));
          console.log(JSON.parse(localStorage.getItem("articles")))
        }
      },
        (error) => {
          console.log(error);
          $ionicLoading.hide();
        }
      );
    }

    $scope.listPRCNoPDS = function () {
      ApiListPrc.getListPrc($scope.codeClient, 0).success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            console.log('------PRC LOCAL');
            console.log($scope.data.prcs)
            $scope.data.prcs = response;
            console.log('------PRC EN LIGN');
            console.log(response)
          }
          console.log(response);
        },
        (error) => {
          $ionicLoading.hide();
        }
      );
    }

    $scope.goToClient = function () {
      $state.transitionTo(
        "app.clients",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }

    $scope.goToDechargement = function () {
      $state.transitionTo(
        "app.dechargements",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }
    $scope.goToInventaire = function () {
      $state.transitionTo(
        "app.inventaires",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }

    $scope.goToVersement = function () {
      $state.transitionTo(
        "app.versements",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }

    $scope.goToPrc = function () {
      $state.transitionTo(
        "app.prcs",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }


    $scope.goToFacture = function () {
      $state.transitionTo(
        "app.facturations",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }

    $scope.goToPds = function () {
      $state.transitionTo(
        "app.pds",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }



    if (!$scope.data.user) {
      console.log("non autoriser");
      $scope.scroll = false;
    } else {
      $scope.scroll = true;
      // $scope.menu = true;
      console.log("autoriser");
      //var user = localStorage.getItem("user");
      // $scope.data.user = JSON.parse(user);
      $scope.codeClient = { codeCommerciale: $scope.data.user.code };
      $scope.listPRCNoPDS();
      $scope.synchroStock();
      $scope.synchroArticle();
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
    };

    if (localStorage.length != 0) {
      $scope.connectedyet = true;
      $scope.sessionloginid = localStorage.getItem("loggedin_id");
      $scope.sessionlogininame = localStorage.getItem("loggedin_name");
      $scope.sessionpassword = localStorage.getItem("loggedin_password");
      $scope.sessionloginiduser = localStorage.getItem("loggedin_iduser");
      $scope.sessionprofile = localStorage.getItem("loggedin_profil");

      sessionStorage.setItem("loggedin_id", $scope.sessionloginid);
      sessionStorage.setItem("loggedin_name", $scope.sessionlogininame);
      sessionStorage.setItem("loggedin_password", $scope.sessionpassword);
      sessionStorage.setItem("loggedin_iduser", $scope.sessionloginiduser);
      sessionStorage.setItem("loggedin_profil", $scope.sessionprofile);
    }
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal
      .fromTemplateUrl("templates/login.html", {
        scope: $scope,
      })
      .then(function (modal) {
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
      console.log("Doing login", $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })
  .controller("MyApp", function ($scope, $translate) {
    $scope.reloadPage = function () {
      window.location.reload();
    };
  })
  // Login Controller
  .controller("LoginCtrl", function (
    $scope,
    $http,
    $ionicPopup,
    $state,
    $cordovaSQLite,
    $ionicLoading,
    $ionicHistory,
    $translate,
    urlPhp,
    SendSms
  ) {
    $scope.user = {
      login: "",
      password: "",
    };
    //test connexion abou
    $scope.sowmenu = function () {
      console.log("ici ici");
    };
    $scope.login = function () {
      console.log("abou0");
      //if (window.Connection) {
      console.log("abou1");
      //  if (navigator.connection.type == Connection.NONE) {
      console.log("abou2");
      $translate("alert_header_ofline").then(function (header) {
        console.log("abou3");
        $translate("alert_content_ofline_home").then(function (content) { });
      });
      //   } else {
      var url = urlPhp.getUrl();
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      //  var str = url + "/login1.php?login=" + $scope.user.login + "&password=" + $scope.user.password;
      var str = url + "/utilisateur/connexion.php";
      var params = {
        login: $scope.user.login,
        motDePasse: $scope.user.password,
      };

      $http
        .post(str, params)
        .success(function (res) {
          // if login request is Accepted
          console.log(res);
          $ionicLoading.hide();
          // records is the 'server response array' variable name.
          $scope.user_details = res; // copy response values to user-details object.

          sessionStorage.setItem("loggedin_id", $scope.user_details.id);
          sessionStorage.setItem(
            "loggedin_password",
            $scope.user_details.motDePasse
          );
          sessionStorage.setItem("loggedin_iduser", $scope.user_details.id);
          // localStorage.setItem('loggedin_id', $scope.user_details.idUtilisateursPointVent);
          localStorage.setItem("loggedin_id", $scope.user_details.id);
          localStorage.setItem(
            "loggedin_password",
            $scope.user_details.motDePasse
          );
          localStorage.setItem("loggedin_iduser", $scope.user_details.id);
          localStorage.setItem("user", JSON.stringify($scope.user_details));

          localStorage.setItem("isconn", true);
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
          });
          $translate("alert_connexion_reussi_header").then(function (
            header
          ) {
            $translate("alert_connexion_reussi_content").then(function (
              content
            ) {
              var alertPopup = $ionicPopup.alert({
                title: header,
                template:
                  content +
                  $scope.user_details.prenom +
                  " " +
                  $scope.user_details.prenom +
                  " !",
              });
            });
          });

          $state.transitionTo(
            "app.bienvenue",
            {},
            {
              reload: true,
              inherit: true,
              notify: true,
            }
          );
        })
        .error(function () {
          //if login failed
          $ionicLoading.hide();
          $translate("alert_connexion_lost_header").then(function (header) {
            $translate("alert_connexion_lost_content").then(function (
              content
            ) {
              var alertPopup = $ionicPopup.alert({
                title: header,
                template: content,
              });
            });
          });
        });
      // }
      // }
    };

    $scope.sms_function = function () {
      SendSms.sendSMS("Bissmillah", "776294380");
    };
  })

  .controller("SignupCtrl", function (
    $scope,
    $http,
    $ionicPopup,
    $state,
    $translate,
    urlPhp
  ) { })

  .controller("LogoutCtrl", function () {
    sessionStorage.clear();
    localStorage.setItem("loggedin_name", "null");
    localStorage.setItem("loggedin_password", "null");
  })
  .controller("ProfileCtrl", function (
    $scope,
    $http,
    $ionicPopup,
    $state,
    $translate,
    urlPhp
  ) {
    $scope.data = {};
    $scope.myusername = localStorage.getItem("username");
    //console.log($scope.myusername);
    $scope.submit = function () {
      // var link = 'http://vps101245.ovh.net:84/webservice/compte.php';
      var url = urlPhp.getUrl();
      $http
        .get(url + "/password.php?username=" + localStorage.getItem("username"))
        .then(function (res) {
          $scope.response = res.data;
          //console.log($scope.response);

          $translate("alert_header_reussi").then(function (header) {
            $translate("alert_content_reussi").then(function (content) {
              $ionicPopup.show({
                title: header,
                template: content,
                scope: $scope,
                buttons: [
                  {
                    text: "Ok",
                    type: "button-positive",
                  },
                ],
              });
            });
          });

          if (res.data == "Changement  success !") {
            $state.go("app.login1");
          }
        });
    };
  })

  .controller("CompteCtrl", function ($state) {
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
    $state.go("app.compte");
  })

  .controller("MapCtrl", function (
    $scope,
    $cordovaGeolocation,
    $http,
    urlPhp,
    ChekConnect,
    $translate,
    ProfilUser,
    $ionicLoading,
    ChekConnect,
    $translate,
    ProfilUser,
    urlJava
  ) {
    $scope.data.payschoisit = null;
    $scope.pvtempon = [];
    $scope.index;
    $scope.size = 0;
    $scope.idregions;
    $scope.data.regionchoisit;
    $scope.data.villechoisit;
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
    };
    $scope.getOptRegion = function (option) {
      //   console.log($scope.data.regionchoisit)
      return option;
    };
    $scope.getOptVille = function (option) {
      return option;
    };
    $scope.testProfile = function () {
      $scope.data.profile = ProfilUser.profilUser();
    };
    $scope.checkConnect = function () {
      $scope.connect = ChekConnect.getConnectivite();
      $scope.testProfile();
    };
    $scope.checkConnect();
    $scope.initMap = function () {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true,
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        $scope.map = new google.maps.Map(
          document.getElementById("map2"),
          mapOptions
        );

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, "idle", function () {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: "img/marker.png",
          });
        });
      });
    };
    $scope.listpays = function () {
      // $scope.data.profil = ProfilUser.profilUser();
      $scope.initMap();
      var pays;
      var listdespays;
      var payschoisit;
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          connect = false;
        } else {
          connect = true;
          var url = urlPhp.getUrl();
          $http
            .get(url + "/pays.php")
            .success(function (response) {
              // $ionicLoading.hide();
              console.log(response);
              pays = response;

              $scope.data.listpays = [];
              for (var i = 0; i < response.length; i++) {
                var pv = {
                  name: response[i].pays,
                  id: response[i].idpays,
                  code: response[i].code,
                };
                $scope.data.listpays.push(pv);
              }
              if ($scope.data.listpays.length > 0) {
                $scope.data.payschoisit = $scope.data.listpays[0];
                $scope.listPvByPays($scope.data.payschoisit);
              }
            })
            .catch(function (error) {
              // $ionicLoading.hide();
              console.log(error);
            });
        }
      }
    };
    $scope.listDesregionsByPaysID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des regions
        var url = urlPhp.getUrl();
        $http
          .get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion };
              $scope.listregions.push(pv);
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      }
    };
    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        $scope.refreshville();
        var url = urlPhp.getUrl();
        $http
          .get(
            url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id
          )
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville };
              $scope.listvilles.push(pv);
            }
            //    console.log($scope.listvilles)
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
      }
    };
    $scope.refreshville = function () {
      $scope.initMap();
      $scope.listvilles = null;
      $scope.data.villechoisit = null;
    };

    $scope.listpays();
    $scope.listpointdevnte = function () {
      $scope.pvtempon = [];
      $scope.data.pvchoisit = null;
      console.log($scope.data.payschoisit.code);
      var url = urlJava.getUrl();
      var link = url + "/yup/mespointVente";
      iduser = sessionStorage.getItem("loggedin_iduser");
      var user = {
        user: {
          nom: "",
          prenom: "",
          telephone: "",
          langue: "",
          pays: "",
          profil: "",
          reseauxagent: "",
          login: "",
          password: "",
          id: "" + iduser,
          codePays: $scope.data.payschoisit.code,
        },
      };
      //   console.log(user)
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      $http.post(link, user).then(function (res) {
        var options = {
          timeout: 10000,
          enableHighAccuracy: true,
        };
        $ionicLoading.hide();
        $scope.pointvente = angular.fromJson(res.data).sort();
        if ($scope.pointvente && $scope.pointvente.length > 0) {
          console.log("depart ");
          console.log($scope.pointvente);

          $scope.pvv = [];
          $scope.pvvv = [];
          $cordovaGeolocation
            .getCurrentPosition(options)
            .then(function (position) {
              var latLng = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );

              var mapOptions = {
                center: latLng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
              };

              $scope.map = new google.maps.Map(
                document.getElementById("map2"),
                mapOptions
              );

              //Wait until the map is loaded
              google.maps.event.addListenerOnce(
                $scope.map,
                "idle",
                function () {
                  var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: "img/marker.png",
                  });
                  $ionicLoading.show({
                    content: "Loading",
                    animation: "fade-in",
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0,
                    duration: 10000,
                  });
                  while (
                    $scope.pvtempon.length <
                    $scope.pointvente.length - 1
                  ) {
                    if ($scope.size == 0) {
                      $scope.index = 0;
                      $scope.size = 10;
                    } else {
                      $scope.index = $scope.size;
                      $scope.size = $scope.size + 10;
                    }

                    $scope.pvv = $scope.pointvente.slice(
                      $scope.index,
                      $scope.size
                    );
                    $scope.pvtempon = $scope.pvtempon.concat($scope.pvv);
                    $scope.pvv.forEach(function (pv) {
                      if (
                        pv.latitude !== 0 &&
                        pv.longitude !== 0 &&
                        pv.latitude !== "" &&
                        pv.longitude !== "" &&
                        pv.latitude !== null &&
                        pv.longitude !== null
                      ) {
                        var marker = new google.maps.Marker({
                          map: $scope.map,
                          animation: google.maps.Animation.DROP,
                          position: new google.maps.LatLng(
                            pv.latitude,
                            pv.longitude
                          ),
                          icon: "img/map-marker.png",
                        });

                        var infoWindow = new google.maps.InfoWindow({
                          content:
                            "Point: " +
                            pv.client +
                            "<br/>Code: " +
                            pv.codePointVente +
                            "<br/>Telephone: " +
                            pv.telephone +
                            "<br/>Longitude: " +
                            pv.longitude +
                            "<br/>Latitude: " +
                            pv.latitude,
                        });

                        google.maps.event.addListener(
                          marker,
                          "click",
                          function () {
                            infoWindow.open($scope.map, marker);
                          }
                        );
                      }
                    });
                  }
                  $ionicLoading.hide();
                }
              );
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
    };
    //Charger les points par pays sur la carte
    $scope.listPvByPays = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      $http
        .get(
          url + "/pointdeventByPays.php?idpays=" + $scope.data.payschoisit.id
        )
        .then(function (res) {
          $scope.pointventes = angular.fromJson(res.data).sort();
          console.log("Pays");
          console.log($scope.pointventes);
          //Charger la carte
          $scope.initMapPv($scope.pointventes);
          $scope.listDesregionsByPaysID();
        });
    };
    //Charger les points par region sur la carte
    $scope.listPvByRegion = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      $http
        .get(
          url +
          "/pointdeventByRegion.php?idregion=" +
          $scope.data.regionchoisit.id
        )
        .then(function (res) {
          $scope.pointventes = angular.fromJson(res.data).sort();
          console.log("Regions");
          console.log($scope.pointventes);
          //Charger la carte
          $scope.initMapPv($scope.pointventes);
          $scope.listVillesByRegionID();
        });
    };

    $scope.initMapPv = function (listpointvente) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true,
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        $scope.map = new google.maps.Map(
          document.getElementById("map2"),
          mapOptions
        );

        google.maps.event.addListenerOnce($scope.map, "idle", function () {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: "img/marker.png",
          });

          if (listpointvente.length > 0) {
            listpointvente.forEach(function (pv) {
              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(pv.latitude, pv.longitude),
                icon: "img/map-marker.png",
              });

              var infoWindow = new google.maps.InfoWindow({
                content:
                  "Point: " +
                  pv.gerant +
                  "<br/>Telephone: " +
                  pv.telephonegerant +
                  "<br/>Longitude: " +
                  pv.longitude +
                  "<br/>Latitude: " +
                  pv.latitude,
              });

              google.maps.event.addListener(marker, "click", function () {
                infoWindow.open($scope.map, marker);
              });
              $ionicLoading.hide();
            });
          } else {
            $ionicLoading.hide();
          }
          $ionicLoading.hide();
        });
      });
    };
    $scope.listPvPhp = function () {
      var url = urlPhp.getUrl();
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      $http
        .get(
          url +
          "/pointventesutilisateurmap.php?idville=" +
          $scope.data.villechoisit.id +
          "&idutilisateur=" +
          localStorage.getItem("loggedin_id")
        )
        .then(function (res) {
          var options = {
            timeout: 10000,
            enableHighAccuracy: true,
          };

          $scope.pointventes = angular.fromJson(res.data).sort();

          $cordovaGeolocation
            .getCurrentPosition(options)
            .then(function (position) {
              var latLng = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );

              var mapOptions = {
                center: latLng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
              };

              $scope.map = new google.maps.Map(
                document.getElementById("map2"),
                mapOptions
              );

              //Wait until the map is loaded
              google.maps.event.addListenerOnce(
                $scope.map,
                "idle",
                function () {
                  var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: "img/marker.png",
                  });
                  console.log($scope.pointventes);
                  $scope.pointventes.forEach(function (pv) {
                    var marker = new google.maps.Marker({
                      map: $scope.map,
                      animation: google.maps.Animation.DROP,
                      position: new google.maps.LatLng(
                        pv.latitude,
                        pv.longitude
                      ),
                      icon: "img/map-marker.png",
                    });

                    var infoWindow = new google.maps.InfoWindow({
                      content:
                        "Point: " +
                        pv.gerant +
                        "<br/>Telephone: " +
                        pv.telephonegerant +
                        "<br/>Longitude: " +
                        pv.longitude +
                        "<br/>Latitude: " +
                        pv.latitude,
                    });

                    google.maps.event.addListener(marker, "click", function () {
                      infoWindow.open($scope.map, marker);
                    });
                    $ionicLoading.hide();
                  });
                }
              );
            });
        });
    };
  })

  .controller("MesprospectsCtrl", function (
    $scope,
    $http,
    $ionicLoading,
    ChekConnect,
    $ionicPopup,
    $translate,
    urlPhp,
    $state
  ) {
    $scope.data = {};
    $scope.data.regionchoisit = null;
    $scope.data.villechoisit = null;
    $scope.data.payschoisit = null;
    $scope.data.datefilter = null;
    $scope.connect = null;
    $scope.data = {};

    $scope.goToNewProspect = function () {
      $state.transitionTo(
        "app.prospects",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };
    $scope.$watch("datefilter", function (newValue, oldValue) {
      console.log(
        "-----------------La valeur de la dte a change-----------------"
      );
      console.log(newValue);
    });

    $scope.filterByDate = function () {
      if ($scope.data.villechoisit) {
        $scope.lispvByRegion();
      } else {
        $scope.lispvByBays();
      }
    };

    //Tester la connectiviteee
    $scope.checkConnect = function () {
      $scope.connect = ChekConnect.getConnectivite();
    };
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
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        console.log("Je suis ici");
        var url = urlPhp.getUrl();
        $http
          .get(url + "/pays.php")
          .success(function (response) {
            $ionicLoading.hide();
            //$scope.pays = response;
            console.log(response);

            // localStorage.setItem('paysOnline', angular.toJson($scope.pays));
            $scope.listdespays = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].pays, id: response[i].idpays };
              $scope.listdespays.push(pv);
            }
            if ($scope.listdespays.length != 0) {
              $scope.data.payschoisit = $scope.listdespays[0];
              $scope.lispvByBays();
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
      }
    };

    $scope.listDesregionsByPaysID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des regions
        console.log($scope.data.payschoisit.id);
        var url = urlPhp.getUrl();
        $http
          .get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion };
              $scope.listregions.push(pv);
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.region = [];
        $scope.region = angular.fromJson(localStorage.getItem("regionsOnline"));
        // console.log($scope.pointvente)
        $scope.listregions = [];
        if ($scope.data.profile == "super") {
          //   $scope.listregions =  $scope.region;
          for (var i = 0; i < $scope.region.length; i++) {
            var pv = {
              name: $scope.region[i].region,
              id: $scope.region[i].idregion,
            };
            $scope.listregions.push(pv);
          }
        } else {
          if ($scope.region != null) {
            for (var i = 0; i < $scope.region.length; i++) {
              if ($scope.region[i].idpays == $scope.data.payschoisit.id) {
                var pv = {
                  name: $scope.region[i].region,
                  id: $scope.region[i].idregion,
                };
                $scope.listregions.push(pv);
              }
            }
          }
        }
      }
    };
    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        var url = urlPhp.getUrl();
        $http
          .get(
            url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id
          )
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville };
              $scope.listvilles.push(pv);
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.ville = [];
        $scope.ville = angular.fromJson(localStorage.getItem("villesOnline"));
        // console.log($scope.pointvente)
        $scope.listvilles = [];
        if ($scope.ville != null) {
          for (var i = 0; i < $scope.ville.length; i++) {
            if ($scope.ville[i].idregion == $scope.data.regionchoisit.id) {
              var pv = {
                name: $scope.ville[i].ville,
                id: $scope.ville[i].idville,
              };
              $scope.listvilles.push(pv);
            }
          }
        }
      }
    };
    //$scope.initReg();
    $scope.lispvByBays = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000,
      });
      var url = urlPhp.getUrl();
      $http
        .get(
          url +
          "/pointdeventByPays.php?idpays=" +
          $scope.data.payschoisit.id +
          "&date=" +
          $scope.data.datefilter
        )
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response);
          $scope.pvs = response;
          $scope.listDesregionsByPaysID();
        })
        .catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    };
    $scope.lispvByRegion = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000,
      });
      var url = urlPhp.getUrl();
      $http
        .get(
          url +
          "/pointdeventByRegion.php?idregion=" +
          $scope.data.regionchoisit.id +
          "&date=" +
          $scope.data.datefilter
        )
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response);
          $scope.pvs = response;
        })
        .catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    };
    $scope.lispvPhp = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000,
      });
      var url = urlPhp.getUrl();
      $http
        .get(
          url +
          "/pointventesutilisateur.php?idville=" +
          $scope.data.villechoisit.id +
          "&idutilisateur=" +
          localStorage.getItem("loggedin_iduser")
        )
        .success(function (response) {
          $ionicLoading.hide();
          console.log(response);
          $scope.pvs = response;
        })
        .catch(function (error) {
          $ionicLoading.hide();
          alert(error);
        });
    };
  })

  .controller("ProspectsCtrl", function (
    $scope,
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
    $q
  ) {
    $scope.data = {};
    $scope.data.regionchoisit = null;
    $scope.data.villechoisit = null;
    $scope.data.payschoisit = null;
    $scope.connect = null;
    $scope.data.date = new Date();
    $scope.data.longitude = "0";
    $scope.data.longitudeDepart = "0";
    $scope.data.latitude = "0";
    $scope.data.latitudeDepart = "0";
    $scope.data.profile = "limite";
    $scope.photo = null;
    $scope.img = "";
    $scope.showphoto = true;
    $scope.commentaire = "";
    $scope.data.heureDepart = null;
    $scope.data.outils = "";

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
    };
    //Tester la connectiviteee
    $scope.checkConnect = function () {
      $scope.testProfile();
      $scope.connect = ChekConnect.getConnectivite();
    };
    $scope.initCtrl = function () {
      $scope.checkConnect();
      if ($scope.connect == false) {
        $scope.showphoto = false;
        $translate("alert_header_ofline").then(function (header) {
          $translate("alert_content_ofline_list").then(function (content) {
            $translate("alert_button_oui").then(function (oui) {
              $translate("alert_button_non").then(function (non) {
                $ionicPopup
                  .show({
                    title: header,
                    content: content,
                    buttons: [
                      {
                        text: non,
                        type: "button-assertive",
                        onTap: function (e) {
                          return false;
                        },
                      },
                      {
                        text: oui,
                        type: "button-energized",
                        onTap: function (e) {
                          return true;
                        },
                      },
                    ],
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
    };
    //Tester la connectiviteee
    //    $scope.initCtrl();
    //Initialiser la liste de regions selon le connectivite
    $scope.initReg = function () {
      if ($scope.connect == true) {
        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        console.log("Je suis ici");
        var url = urlPhp.getUrl();
        $http
          .get(url + "/pays.php")
          .success(function (response) {
            $ionicLoading.hide();
            //$scope.pays = response;
            console.log(response);

            // localStorage.setItem('paysOnline', angular.toJson($scope.pays));
            $scope.listdespays = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].pays, id: response[i].idpays };
              $scope.listdespays.push(pv);
            }
            if ($scope.listdespays.length != 0) {
              $scope.data.payschoisit = $scope.listdespays[0];
              $scope.listDesregionsByPaysID();
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        //console.log('eerror connexion')
        $scope.pays = [];
        $scope.pays = angular.fromJson(localStorage.getItem("paysOnline"));
        // console.log($scope.pointvente)
        $scope.listdespays = [];
        if ($scope.pays != null) {
          for (var i = 0; i < $scope.pays.length; i++) {
            var pv = { name: $scope.pays[i].pays, id: $scope.pays[i].idpays };
            $scope.listdespays.push(pv);
          }
        }
        if ($scope.data.profile == "limite") {
          $scope.data.payschoisit = $scope.listdespays[0];
        }
        $scope.listDesregionsByPaysID();
      }
    };

    $scope.listDesregionsByPaysID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des regions
        console.log($scope.data.payschoisit.id);
        var url = urlPhp.getUrl();
        $http
          .get(url + "/regionsByPays.php?idpays=" + $scope.data.payschoisit.id)
          .success(function (response) {
            $ionicLoading.hide();
            $scope.region = response;
            //  localStorage.setItem('regionsOnline', angular.toJson($scope.region));
            $scope.listregions = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].region, id: response[i].idregion };
              $scope.listregions.push(pv);
            }
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.region = [];
        $scope.region = angular.fromJson(localStorage.getItem("regionsOnline"));
        // console.log($scope.pointvente)
        $scope.listregions = [];
        if ($scope.data.profile == "super") {
          //   $scope.listregions =  $scope.region;
          for (var i = 0; i < $scope.region.length; i++) {
            var pv = {
              name: $scope.region[i].region,
              id: $scope.region[i].idregion,
            };
            $scope.listregions.push(pv);
          }
        } else {
          if ($scope.region != null) {
            for (var i = 0; i < $scope.region.length; i++) {
              if ($scope.region[i].idpays == $scope.data.payschoisit.id) {
                var pv = {
                  name: $scope.region[i].region,
                  id: $scope.region[i].idregion,
                };
                $scope.listregions.push(pv);
              }
            }
          }
        }
      }
    };

    $scope.addImage = function () {
      // 2
      $scope.photo = null;
      $ionicLoading.show({
        template: "Chargement...",
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
        correctOrientation: true,
      };

      // 3
      $cordovaCamera.getPicture(options).then(
        function (imageData) {
          // 4
          //onImageSuccess(imageData);
          $scope.photo = "data:image/jpeg;base64," + imageData;
          $scope.getRxcui($scope.photo, "photo");
          $scope.img = imageData;
          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          console.log(err);
        }
      );
    };
    $scope.initvar = function () {
      $scope.data.adresse = null;
      $scope.data.telephone = null;
      $scope.data.gerant = null;
      $scope.data.latitude = null;
      $scope.data.longitude = null;
      $scope.data.latitudeDepart = null;
      $scope.data.longitudeDepart = null;
      $scope.data.villechoisit = null;
      $scope.data.date = new Date();
      $scope.data.idutilisateur = localStorage.getItem("loggedin_iduser");
      $scope.data.commentaire = "";
      $scope.data.outils = "";
      $scope.heureArrivee = null;
      $scope.heureDepart = null;
      $scope.photo = null;

      //  localStorage.setItem('fichearrivee',null);
      var retrievedObject = localStorage.getItem("fichearrivee");
      console.log("-----------------Verif--------------");
      var view = JSON.parse(retrievedObject);
      console.log(view);
      if (retrievedObject != "null" && retrievedObject != null) {
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
    };

    $scope.getRxcui = function (value, field) {
      var medValue = value;
      console.log(medValue);
      var retrievedObject = localStorage.getItem("fichearrivee");
      if (retrievedObject != "null" && retrievedObject != null) {
        retrievedObject = JSON.parse(retrievedObject);
        console.log(retrievedObject);
        retrievedObject[field] = value;
        console.log(retrievedObject);
        //   localStorage.setItem('fichearrivee', retrievedObject);
        localStorage.setItem("fichearrivee", JSON.stringify(retrievedObject));
      } else {
        var values = {
          adresse: medValue,
        };
        localStorage.setItem("fichearrivee", JSON.stringify(values));
      }
    };

    $scope.$watch("data.regionchoisit", function () {
      $scope.getRxcui($scope.data.regionchoisit, "regionchoisi");
    });

    $scope.listVillesByRegionID = function () {
      if ($scope.connect == true) {
        //Recuperer la liste des villes
        var url = urlPhp.getUrl();
        $http
          .get(
            url + "/villeByRegion.php?idregion=" + $scope.data.regionchoisit.id
          )
          .success(function (response) {
            $ionicLoading.hide();
            $scope.ville = response;
            // localStorage.setItem('villesOnline', angular.toJson($scope.ville));
            $scope.listvilles = [];
            for (var i = 0; i < response.length; i++) {
              var pv = { name: response[i].ville, id: response[i].idville };
              $scope.listvilles.push(pv);
            }
            //    console.log($scope.listvilles)
          })
          .catch(function (error) {
            $ionicLoading.hide();
          });
      } else {
        $scope.ville = [];
        $scope.ville = angular.fromJson(localStorage.getItem("villesOnline"));
        // console.log($scope.pointvente)
        $scope.listvilles = [];
        if ($scope.ville != null) {
          for (var i = 0; i < $scope.ville.length; i++) {
            if ($scope.ville[i].idregion == $scope.data.regionchoisit.id) {
              var pv = {
                name: $scope.ville[i].ville,
                id: $scope.ville[i].idville,
              };
              $scope.listvilles.push(pv);
            }
          }
        }
      }
    };

    //Initialiser la liste de regions selon le connectivite
    $scope.initReg();

    $scope.initvar();

    $scope.selectables = [1, 2, 3];
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
      alert(
        "changed from " +
        JSON.stringify(oldValue) +
        " to " +
        JSON.stringify(newValuea)
      );
    };

    $scope.shoutReset = function () {
      alert("value was reset!");
    };

    var intervalGetPosition;

    $scope.jsonPositionsLog = [];
    $scope.isTrackingPosition = false;

    $scope.startTracking = function () {
      //   $scope.getCurrentPosition();
      console.log(
        "*--------------------La position en fonction---------------"
      );
      $scope.getPosition().then(function (position) {
        console.log(position);
        console.log(position.latitude);
        console.log(position.longitude);
      });
    };

    $scope.stopTrackingPosition = function () {
      navigator.geolocation.clearWatch(intervalGetPosition);
    };

    $scope.getCurrentPosition = function () {
      $ionicLoading.show({
        template: "Localisation en cours...",
      });
      $cordovaGeolocation.getCurrentPosition(options).then(
        function (position) {
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
          $scope.submit("arrivee");
          // add positions to array
          $scope.jsonPositionsLog.push({
            latitude: latitude,
            longitude: longitude,
          });

          $scope.$apply();
        },
        function (error) {
          $ionicLoading.hide();
          if ($scope.connect == true) {
            $scope.oui = "";
            $scope.non = "";
            $translate("alert_button_oui").then(function (oui) {
              $scope.oui = oui;
              console.log(oui);
              $translate("alert_button_non").then(function (non) {
                $scope.non = non;
                //  console.log(non);

                $ionicPopup
                  .show({
                    title: "",
                    content: '{{ "alert_content_position" | translate }}',
                    buttons: [
                      {
                        text: non,
                        type: "button-assertive",
                        onTap: function (e) {
                          return false;
                        },
                      },
                      {
                        text: oui,
                        type: "button-energized",
                        onTap: function (e) {
                          return true;
                        },
                      },
                    ],
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
        }
      );
    };

    initGetLocationListener = function () {
      // init location listener
      intervalGetPosition = navigator.geolocation.watchPosition(
        function (position) {
          $scope.jsonPositionsLog.push({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          $scope.$apply();
        },
        function (error) {
          //  $scope.submit();
        },
        {
          timeout: 3000,
        }
      );
    };

    var options = {
      timeout: 10000,
      enableHighAccuracy: true,
    };

    $cordovaGeolocation.getCurrentPosition(options).then(
      function (position) {
        var latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        $scope.map = new google.maps.Map(
          document.getElementById("mapp"),
          mapOptions
        );

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, "idle", function () {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
          });

          var infoWindow = new google.maps.InfoWindow({
            content: "Je suis ici !",
          });

          google.maps.event.addListener(marker, "click", function () {
            infoWindow.open($scope.map, marker);
          });
        });
      },
      function (error) {
        console.log("Could not get location");
      }
    );

    $scope.getPosition = function () {
      var deferred = $q.defer();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var crd = position.coords;
          console.log("Latitude : " + crd.latitude);
          console.log("Longitude: " + crd.longitude);
          deferred.resolve(crd);
        });
      }
      return deferred.promise;
    };

    $ionicModal.fromTemplateUrl(
      "modal.html",
      function (modal) {
        $scope.gridModal = modal;
      },
      {
        scope: $scope,
        animation: "slide-in-up",
      }
    );
    $scope.openModal = function (data) {
      $scope.inspectionItem = data;
      $scope.gridModal.show();
    };
    $scope.closeModal = function () {
      $scope.gridModal.hide();
    };

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

      if ($scope.data.latitude == null || $scope.data.latitude == "null") {
        $scope.data.latitude = "0";
        $scope.data.longitude = "0";
      }

      $scope.value = {
        longitude: $scope.data.longitude,
        latitude: $scope.data.latitude,
        adresse: $scope.data.adresse,
        gerant: "" + $scope.data.gerant,
        idutilisateur: localStorage.getItem("loggedin_iduser"),
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
        regionchoisi: $scope.data.regionchoisit,
      };

      if (sens == "arrivee") {
        if (
          $scope.heureArrivee &&
          $scope.heureArrivee != "" &&
          $scope.heureArrivee != null
        ) {
          $ionicPopup
            .show({
              title: "Confirmation",
              content: "Valider l'arrivée?",
              buttons: [
                {
                  text: "OK",
                  type: "button-assertive",
                  onTap: function (e) {
                    return false;
                  },
                },
              ],
            })
            .then(function (result) {
              if (!result) {
                console.log("OUI");
              } else {
                console.log("NON");
              }
            });
          localStorage.setItem("fichearrivee", JSON.stringify($scope.value));
        } else {
          $ionicPopup
            .show({
              title: "Alert",
              content: "Veuillez renseigner l'heure d'arrivée",
              buttons: [
                {
                  text: "OK",
                  type: "button-assertive",
                  onTap: function (e) {
                    return false;
                  },
                },
              ],
            })
            .then(function (result) { });
        }
      } else {
        console.log("Remot");

        if ($scope.connect == true) {
          console.log("Objet a envoyer");

          var url = urlPhp.getUrl();
          var link = url + "/pointventeccbm.php";
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });
          console.log($scope.value);
          var date = new Date();

          $scope.value["heureDepart"] =
            date.getHours() + ":" + date.getMinutes();

          console.log($scope.value);

          $http
            .post(link, $scope.value)
            .then(function (res) {
              console.log("Retour insert prospect");
              console.log(res);
              if (res.data == "1") {
                localStorage.setItem("fichearrivee", null);
                $scope.initvar();
                $ionicPopup.show({
                  title: "Infos",
                  template: "Insertion réussit",
                  scope: $scope,
                  buttons: [
                    {
                      text: "Ok",
                      type: "button-positive",
                    },
                  ],
                });
              }

              $ionicLoading.hide();
            })
            .catch(function (error) {
              console.log(error);
              $ionicLoading.hide();
              alert(error);
            });
        }
      }

      //  }
    };
  })

  .controller("StockCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListStock
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.listStock = [];
    };

    //Init variables of controller
    $scope.initvar();
    console.log("This is stock module");
    $ionicLoading.show({
      content: "Loading",
      animation: "fade-in",
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 10000,
    });
    ApiListStock.getListStock().success(
      function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.listStock = response;

          for (var i = 0; i < $scope.data.listStock.length; i++) {
            if ($scope.data.listStock.quantite != " ") {
              $scope.data.listStock.quantite = parseInt($scope.data.listStock[i].quantite);
            } else {
              console.log($scope.data.listStock.quantite);
            }
          }
          localStorage.setItem("stocks", JSON.stringify($scope.data.listStock));
          console.log(JSON.parse(localStorage.getItem("stocks")))
         
        }
        console.log(response);
      },
      (error) => {
        console.log(error);
        $ionicLoading.hide();
      }
    );
  })
  .controller("ClientCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListClient,
    ApiDertailsClient,
    ApiCaClient
  ) {
    $scope.data = {};
    $scope.data.datefin = null;
    $scope.data.datedebut = null;

    //  localStorage.setItem('clientca', null);
    var clientca = localStorage.getItem('clientca')
    $scope.clientCa = clientca ? JSON.parse(clientca) : null;

    $scope.initvar = function () {
      $scope.data.clients = [];
      $scope.listClients();
    };
    //Init variables of controller

    $scope.listClients = function () {

      console.log("This is stock module");
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      ApiListClient.getListClient().success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.clients = response;
          }
          console.log(response);
        },
        (error) => {
          $ionicLoading.hide();
        }
      );

    }
    $scope.initvar();

    $scope.goToNewClient = function (item = null, sens) {
      localStorage.setItem('sens', sens)

      if (sens == 'edit') {


        var codeClient = { codeClient: item.codeClient };
        console.log(codeClient);

        if (item.codeClient) {
          $ionicLoading.show({
            template: 'En cours...'
          });

          ApiDertailsClient.getDertailsClient(codeClient)
            .success(resp => {
              $ionicLoading.hide()
              console.log(resp);
              localStorage.setItem('clientEdit', JSON.stringify(resp))
              $state.transitionTo(
                "app.nouvel-client",
                {},
                {
                  reload: true,
                  inherit: true,
                  notify: true,
                }
              );
            },
              function (data) {
                console.log(data)
                $ionicLoading.hide()
              }

            ).error(errorCallback => {
              $ionicLoading.hide()
            });
        }

      } else {
        localStorage.setItem('clientEdit', null)
        $state.transitionTo(
          "app.nouvel-client",
          {},
          {
            reload: true,
            inherit: true,
            notify: true,
          }
        );
      }
      /**/
    };


    $scope.position = function (item) {
      console.log(item);
      var values = {
        codeUtilisateur: item.code,
        latitude,
        longitude,
      }
    }

    $scope.goTocaClient = function (item) {
      //   $scope.clientCa = item;
      localStorage.setItem('clientca', JSON.stringify(item))
      $state.transitionTo(
        "app.caclient",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.filterDateCa = function () {
      console.log($scope.data.datefin);
      console.log($scope.data.datedebut);
      console.log($scope.clientCa.codeClient);
      $scope.data.ca = 0.5
      if ($scope.data.datefin && $scope.data.datedebut && $scope.clientCa) {
        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        var objet = {}
        ApiCaClient.getApiCaClient($scope.clientCa.codeClient, $scope.data.datedebut, $scope.data.datefin)
          .then(reponse => {
            $ionicLoading.hide();
            console.log('---CLient---------------');
            console.log(reponse)
            $scope.data.ca = parseFloat(reponse.data.ca);
            $scope.data.ca = 0.5
          }, err => {
            $ionicLoading.hide();
          })

      }
    }

  })
  .controller("CaClientCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListClient,
    ApiDertailsClient,
    ApiCaClient
  ) {
    $scope.data = {};
    $scope.data.datefin = null;
    $scope.data.datedebut = null;
    $scope.data.ca = null;
    $scope.data.adresse = '0.5'
    //  localStorage.setItem('clientca', null);
    var clientca = localStorage.getItem('clientca')
    $scope.clientCa = clientca ? JSON.parse(clientca) : null;

    $scope.initvar = function () {
      $scope.data.clients = [];
      $scope.listClients();
    };
    //Init variables of controller

    $scope.listClients = function () {
      if (!$scope.clientCa) {
        console.log("This is stock module");
        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        ApiListClient.getListClient().success(
          function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.clients = response;
            }
            console.log(response);
          },
          (error) => {
            $ionicLoading.hide();
          }
        );
      }
    }
    $scope.initvar();

    $scope.goToNewClient = function () {

      $state.transitionTo(
        "app.nouvel-client",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };
    $scope.goToNewClient = function (item = null, sens) {
      localStorage.setItem('sens', sens)

      if (sens == 'edit') {
        $ionicLoading.show({
          template: 'En cours...'
        });
        var codeClient = { codeClient: item.codeClient }
        ApiDertailsClient.getDertailsClient(codeClient)
          .success(resp => {
            $ionicLoading.hide()
            console.log(resp);
            localStorage.setItem('clientEdit', JSON.stringify(resp))
            $state.transitionTo(
              "app.nouvel-client",
              {},
              {
                reload: true,
                inherit: true,
                notify: true,
              }
            );
          }, err => {
            $ionicLoading.hide()
          })
      } else {
        localStorage.setItem('clientEdit', null)
        $state.transitionTo(
          "app.nouvel-client",
          {},
          {
            reload: true,
            inherit: true,
            notify: true,
          }
        );
      }
      /**/
    };


    $scope.position = function (item) {
      console.log(item);
      var values = {
        codeUtilisateur: item.code,
        latitude,
        longitude,
      }
    }

    $scope.goTocaClient = function (item) {
      //   $scope.clientCa = item;
      localStorage.setItem('clientca', JSON.stringify(item))
      $state.transitionTo(
        "app.caclient",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.filterDateCa = function () {
      console.log($scope.data.datefin);
      console.log($scope.data.datedebut);
      console.log($scope.clientCa.codeClient);
      if ($scope.data.datefin && $scope.data.datedebut && $scope.clientCa) {
        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        var objet = {}
        ApiCaClient.getApiCaClient($scope.clientCa.codeClient, $scope.data.datedebut, $scope.data.datefin)
          .then(reponse => {
            $ionicLoading.hide();
            console.log('---CLient---------------');
            console.log(reponse)
            $scope.data.ca = reponse.data.ca;
          }, err => {
            $ionicLoading.hide();
          })

      }
    }

  })

  .controller("AddClientCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListClient,
    ApiListRegions,
    ApiListVilles,
    ApiListMarches,
    ApiListZones,
    ApiListModePaiement,
    ApiListGrossiste,
    $cordovaGeolocation,
    $cordovaCamera,
    CodeGenere,
    ApiAjoutClient,
    $ionicPopup,
    $filter
  ) {



    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.client = JSON.parse(localStorage.getItem('clientEdit'));
      $scope.data.sens = localStorage.getItem('sens');
      $scope.data.clients = [];
      $scope.data.listregions = [];
      $scope.data.listvilles = [];
      $scope.data.listzone = [];
      $scope.data.listmarches = [];
      $scope.data.listmodepaiements = [];
      $scope.data.listgrossistes = [];
      $scope.data.regionchoisit = null;
      $scope.data.villechoisit = null;
      $scope.data.marchechoisit = null;
      $scope.data.zonechoisit = null;
      $scope.data.grossistechoisit = null;
      $scope.data.modepaiementchoisit = null;


      $scope.data.codeClient = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.codeClient : null;
      $scope.data.nom = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.nom : null;
      $scope.data.adresse = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.adresse : null;
      $scope.data.telephone = $scope.data.client && $scope.data.client.codeClient ? parseInt($scope.data.client.telephone) : null;
      $scope.data.telephone2 = $scope.data.client && $scope.data.client.codeClient ? parseInt($scope.data.client.telephone2) : null;
      $scope.data.email = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.email : null;
      $scope.data.photo = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.photo : null;
      $scope.data.delaiPaiement = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.delaiPaiement : null;
      $scope.data.latitude = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.position.split(',')[0] : 0.0;
      $scope.data.longitude = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.position.split(',')[1] : 0.0;
      $scope.data.position = $scope.data.client && $scope.data.client.codeClient ? $scope.data.client.position : null;

    };
    //Init variables of controller

    $scope.initvar();
    ApiListRegions.getListRegions().success(function (response) {
      console.log('-----List regions');
      $scope.data.listregions = response;
      var filerRegion = $scope.data.sens == 'edit' && $scope.data.client.region ? $filter('filter')($scope.data.listregions, { libelle: $scope.data.client.region }) : [];
      $scope.data.regionchoisit = filerRegion && filerRegion.length > 0 ? filerRegion[0] : null;
      console.log(response);
    });
    ApiListVilles.getListVilles().success(function (response) {
      console.log('-----List villes');
      $scope.data.listvilles = response;
      var filerVille = $scope.data.sens == 'edit' && $scope.data.client.ville ? $filter('filter')($scope.data.listvilles, { libelle: $scope.data.client.ville }) : [];
      $scope.data.villechoisit = filerVille && filerVille.length > 0 ? filerVille[0] : null;
      console.log(response);

    });
    ApiListMarches.getListMarches().success(function (response) {
      console.log('-----List marches');
      $scope.data.listmarches = response;
      var filerMarche = $scope.data.sens == 'edit' && $scope.data.client.marche ? $filter('filter')($scope.data.listmarches, { libelle: $scope.data.client.marche }) : [];
      $scope.data.marchechoisit = filerMarche && filerMarche.length > 0 ? filerMarche[0] : null;
      console.log(response);

    });
    ApiListZones.getListZones().success(function (response) {
      console.log('-----List zone');
      $scope.data.listzones = response;
      var filerZone = $scope.data.sens == 'edit' && $scope.data.client.zone ? $filter('filter')($scope.data.listzones, { libelle: $scope.data.client.zone }) : [];
      $scope.data.zonechoisit = filerZone && filerZone.length > 0 ? filerZone[0] : null;
      console.log(response);
    });
    ApiListModePaiement.getListModePaiement().success(function (response) {
      if (response) {
        $scope.data.listmodepaiements = response;
        var filerModePaiement = $scope.data.sens == 'edit' && $scope.data.client.idModepaiement ? $filter('filter')($scope.data.listmodepaiements, { idModepaiement: $scope.data.client.idModepaiement }) : [];
        $scope.data.modepaiementchoisit = filerModePaiement && filerModePaiement.length > 0 ? filerModePaiement[0] : null;
      }
      console.log(
        "-----------------------list mode paiement----------------------"
      );
      console.log(response);
    });
    ApiListGrossiste.getListGrossiste(true, codeCommerciale = null).success(function (response) {
      if (response) {
        $scope.data.listgrossistes = response;
        var filerGrossiste = $scope.data.sens == 'edit' && $scope.data.client.codeGrossiste ? $filter('filter')($scope.data.listgrossistes, { codeGrossiste: $scope.data.client.codeGrossiste }) : [];
        $scope.data.grossistechoisit = filerGrossiste && filerGrossiste.length > 0 ? filerGrossiste[0] : null;
      }
      console.log('-----------------------list grosssite----------------------');
      console.log(response);
    });
    $scope.getOptRegion = function (option) {
      return option;
    };
    $scope.getOptVille = function (option) {
      return option;
    };
    $scope.getOptZone = function (option) {
      return option;
    };
    $scope.getOptMarche = function (option) {
      return option;
    };
    $scope.getOptModePaiement = function (option) {
      return option;
    };
    $scope.getOptGrossiste = function (option) {
      return option;
    };
    $scope.startTracking = function () {

      $scope.getCurrentPosition();


    }

    $scope.getCurrentPosition = function () {
      $ionicLoading.show({
        template: 'Localisation en cours...'
      });

      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };

      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position);
        $ionicLoading.hide();
        $scope.data.latitude = position.coords.latitude;
        $scope.data.longitude = position.coords.longitude;
        $scope.data.position = position.coords.latitude + "," + position.coords.longitude


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
    console.log("This is stock module");
    $ionicLoading.show({
      content: "Loading",
      animation: "fade-in",
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 10000,
    });
    ApiListClient.getListClient().success(
      function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.clients = response;
        }
        console.log(response);
      },
      (error) => {
        $ionicLoading.hide();
      }
    );




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
        $ionicLoading.hide();
        // 4
        //onImageSuccess(imageData);
        $scope.data.photo = "data:image/jpeg;base64," + imageData;
        //  $scope.getRxcui($scope.photo, 'photo');
        $scope.img = imageData;

      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    }

    $scope.submit = function () {
      if ($scope.data.nom && $scope.data.telephone &&
        $scope.data.regionchoisit && $scope.data.zonechoisit
        && $scope.data.marchechoisit && $scope.data.telephone
        && $scope.data.marchechoisit
        && $scope.data.adresse && $scope.data.position
        && $scope.data.grossistechoisit
        && $scope.data.modepaiementchoisit
      ) {
        var codeClient = $scope.data.client ? $scope.data.client.codeClient : "CLI-" + $scope.data.user.code + "-" + CodeGenere.getCodeGenere();

        var values = {
          codeClient: codeClient,
          nom: $scope.data.nom,
          idRegion: $scope.data.regionchoisit ? $scope.data.regionchoisit.idRegion : null,
          idZone: $scope.data.zonechoisit ? $scope.data.zonechoisit.idZone : null,
          idVille: $scope.data.villechoisit ? $scope.data.villechoisit.idVille : null,
          idMarche: $scope.data.marchechoisit ? $scope.data.marchechoisit.idMarche : null,
          telephone: $scope.data.telephone,
          telephone2: $scope.data.telephone2,
          email: $scope.data.email ? $scope.data.email : $scope.data.nom + "@gmail.com",
          adresse: $scope.data.adresse,
          position: $scope.data.position,
          photo: $scope.data.photo,
          codeGrossiste: $scope.data.grossistechoisit ? $scope.data.grossistechoisit.codeGrossiste : null,
          delaiPaiement: $scope.data.delaiPaiement,
          idModepaiement: $scope.data.modepaiementchoisit ? $scope.data.modepaiementchoisit.idModepaiement : null,
          codeCommerciale: $scope.data.user.code
        }

        $ionicLoading.show({
          template: 'Traitement en cours...'
        });
        var etat = $scope.data.client && $scope.data.client.codeClient ? false : true;
        $ionicLoading.hide();
        console.log('----------CLient object----------');
        console.log(values);
        console.log("cient");
        console.log("mode", values.idModepaiement);

        if (values.idModepaiement == "1" || values.idModepaiement == "2") {
          values.idModepaiement = parseInt(values.idModepaiement);
        } else {
          console.log("else", values.idModepaiement)
        }

        values.telephone = "" +values.telephone;
        values.telephone2 = ""+ values.telephone2;

        for (var i = 0; i < $scope.data.listregions.length; i++) {

          if (values.idRegion != " ") {
            values.idRegion = parseInt($scope.data.listregions[i].idRegion);

          } else {
            console.log(values.idRegion)
          }
        }


        for (var i = 0; i < $scope.data.listzones.length; i++) {
          if (values.idZone != " ") {
            values.idZone = parseInt($scope.data.listzones[i].idZone);
          } else {
            console.log(values.idZone)
          }
        }

        for (var i = 0; i < $scope.data.listvilles.length; i++) {
          if (values.idVille != " ") {
            values.idVille = parseInt($scope.data.listvilles[i].idVille);
          } else {
            console.log(values.idVille)
          }
        }

        for (var i = 0; i < $scope.data.listmarches.length; i++) {
          if (values.idMarche != " ") {
            values.idMarche = parseInt($scope.data.listmarches[i].idMarche);
          } else {
            console.log(values.idMarche)
          }
        }

        ApiAjoutClient.ajoutClient(values, etat).success(function (response) {
          $ionicLoading.hide();
          console.log(response)
          if (response.reponse === 1) {
            $ionicPopup.show({
              title: "Infos",
              template: "Reussi",
              scope: $scope,
              buttons: [
                {
                  text: 'OK',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }
              ]
            }).then(function (result) {

              $state.transitionTo(
                "app.clients",
                {},
                {
                  reload: true,
                  inherit: true,
                  notify: true,
                }
              );

            });
          } else {

            $ionicPopup.show({
              title: "Alert",
              template: "" + response.reponse,
              scope: $scope,
              buttons: [
                {
                  text: 'OK',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }
              ]
            }).then(function (result) {

              $state.transitionTo(
                "app.clients",
                {},
                {
                  reload: true,
                  inherit: true,
                  notify: true,
                }
              );

            });

          }
        }, err => {
          $ionicPopup.show({
            title: "Infos",
            template: "Erreur d'insertion",
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-energized',
                onTap: function (e) {
                  return true;
                }
              }
            ]
          })
          console.log(err);
          $ionicLoading.hide();
        })
      } else {
        $ionicPopup.show({
          title: "Alert",
          template: "Veuillez renseigner tous les champs du formulaire.",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        })
      }


      console.log('-----Value Client-----');
      console.log(values);
    }
  })

  .controller("ArticleCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListArticle
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.articles = [];
      $scope.data.detailArticle = {};
      $scope.data.codeArticle = sessionStorage.getItem("codeArticle");
    };
    //Init variables of controller
    $scope.initvar();
    console.log("This is stock module");
    $ionicLoading.show({
      content: "Loading",
      animation: "fade-in",
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 10000,
    });
    ApiListArticle.getListArticle().success(
      function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.articles = response;

        }
        console.log(response);
      },
      (error) => {
        $ionicLoading.hide();
      }
    );

    $scope.getDetailAticle = function () {
      if ($scope.data.codeArticle !== null && $scope.data.codeArticle !== "") {
        ApiDetailArticle.getDetailArticle($scope.data.codeArticle).success(
          function (response) {
            if (response) {
              $scope.data.detailArticle = response;
              console.log($scope.data.detailArticle);
              sessionStorage.setItem("codeArticle", "");
            }
          }
        );
      }
    };

    $scope.goToNewArticle = function (code) {
      sessionStorage.setItem("codeArticle", code);
      $state.transitionTo(
        "app.details-article",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };


  })

  .controller("PrcCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    SendSms,
    ApiDeletPRC,
    $filter
  ) {
    $scope.data = {};

    $scope.initvar = function () {

      $scope.edit = false;
      $scope.data.listarticles = [];
      $scope.data.prcs = [];
      $scope.data.detailPrc = {};
      $scope.data.codePrc = sessionStorage.getItem("codePrc");
      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      $scope.data.clientchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      $scope.data.idMotif = 0;

      var user = localStorage.getItem("user");
      $scope.data.user = JSON.parse(user);

      $scope.sms_function = function () {
        SendSms.sendSMS("Bissmillah", "776726045");
      };
      var prclocal = JSON.parse(localStorage.getItem('prclocal'));

      if (prclocal && prclocal.length > 0) {
        $scope.data.prcs = prclocal;
      }

      //  console.log('--------------get number --------------');
      //  console.log($scope.getCodePrc());
      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      $scope.data.codePrc = localStorage.getItem("codeArticle");
      // vA isAdd = sessionStorage.setItem('newPrc', true);

      var codeClient = { codeCommerciale: $scope.data.user.code };
      // console.log('-----------------------list prc----------------------');
      // console.log($scope.data.user);

      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      ApiListPrc.getListPrc(codeClient).success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            console.log('------PRC LOCAL');
            console.log($scope.data.prcs)
            $scope.data.prcs = $scope.data.prcs.concat(response);
            console.log('------PRC EN LIGN');
            console.log(response)
          }
          console.log(response);
        },
        (error) => {
          $ionicLoading.hide();
        }
      );
    };

    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
    }


    $scope.editDetail = function (item, action) {
      $scope.edit = true;
      $scope.action = action;

      /*for (var i = 0; i <  $scope.data.detailsPRC.details.length; i++) {
        if (
          $scope.data.detailsPRC.details[i].idMotif === "edit" &&
          $scope.data.detailsPRC.details[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsPRC.details[i].idMotif = 0;
        }
      }*/
      $scope.itemEdit = item;
    };

    $scope.annulerEdit = function () {

      $scope.edit = false;

      $scope.itemEdit = null;

      $scope.data.motifchoisit = null;

    }

    $scope.validerDelet = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        $ionicPopup.show({
          title: "Infos",
          template: "Voulez-vous vraimenet suprimer ce details?",
          scope: $scope,
          buttons: [
            {
              text: 'OUI',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            },
            {
              text: 'NON',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
          ]
        }).then(function (result) {
          if (result) {
            console.log('OUI');

            var ligneDetailTosend = {
              codePRC: $scope.itemEdit.codePRC,
              isCanceled: 1,
              idMotif: $scope.data.motifchoisit.idMotif
            }
            console.log('-----------Object to delet----------');
            console.log(ligneDetailTosend);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });

            ApiDeletPRC.deletPRC(ligneDetailTosend)
              .success(
                function (response) {

                  $ionicLoading.hide();
                  console.log('-------Modification edit------')
                  console.log(response)
                  if (response.reponse == 1) {

                    for (var i = 0; i < $scope.data.prcs.length; i++) {
                      if (
                        $scope.data.prcs[i].codePRC ===
                        $scope.itemEdit.codePRC
                      ) {

                        $scope.data.prcs.splice(i, 1);
                        var prclocal = JSON.parse(localStorage.getItem('prclocal'));

                        if (prclocal && prclocal.length > 0) {
                          var prcToDelet = $filter('filter')(prclocal, { codePRC: $scope.itemEdit.codePRC });

                          if (prcToDelet && prcToDelet.length == 1) {
                            prclocal.splice(prcToDelet[0], 1)

                            localStorage.setItem('prclocal', JSON.stringify(prclocal));
                          }

                        }
                        $scope.edit = false;
                        $scope.data.motifchoisit = null;

                        break;
                      }
                    }

                    $ionicPopup.show({
                      title: "Information",
                      template: 'réussi',
                      scope: $scope,
                      buttons: [
                        {
                          text: "Ok",
                          type: "button-assertive",
                        },
                      ],
                    }).then(function (result) {

                    })
                  }

                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )


          } else {
            console.log('NON');
          }
        });
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillz choisir le motif de suppression?",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        }).then(function (result) {
          if (result) {

          }
        })
      }


    }



    $scope.getCodePrc = function () {
      var rd_code = Math.floor(Math.random() * 1000 + 1);
      console.log((rd_code + "").length);
      var code_chaine = "";
      if (rd_code) {
        if ((rd_code + "").length === 1) {
          code_chaine = "000" + (rd_code + "").length;
        } else if ((rd_code + "").length === 2) {
          code_chaine = "00" + rd_code;
        } else if ((rd_code + "").length === 3) {
          code_chaine = "0" + rd_code;
        } else if ((rd_code + "").length === 4) {
          code_chaine = "" + rd_code;
        }
      }
      return code_chaine;
    };

    //Init variables of controller
    $scope.initvar();

    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });

    ApiListClient.getListClient().success(function (response) {
      if (response) {
        $scope.data.listclients = response;
      }
      //     console.log('-----------------------list client----------------------');
      //     console.log(response);
    });

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
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

      if ($scope.data.codePrc !== null && $scope.data.codePrc !== "") {
        ApiDetailPrc.getDetailPrc($scope.data.codePrc).success(function (
          response
        ) {
          if (response) {
            console.log("---------------------Detail prc--------------");

            $scope.data.detailsPRC = response;

            console.log(response);
            // console.log($scope.data.detailsPRC[0]);

            //sessionStorage.setItem('codePrc', '');
          }
        });
      }
    };

    //  $scope.getDetailPrc();

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
        motifchoisit: $scope.data.motifchoisit,
      });
      // $ionicLoading.hide();
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      console.log("----------------------Detail-------------------");
      console.log($scope.data.detailsPRC);
    };

    $scope.goToDetailPrc = function (prc) {
      localStorage.setItem("prc-detail", JSON.stringify(prc));
      $state.transitionTo(
        "app.details-prc",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.goToNewPrc = function () {
      sessionStorage.setItem("newPrc", true);
      $state.transitionTo(
        "app.nouvel-prc",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.goToRecapPrc = function (code) {
      localStorage.setItem("codeCommerciale", code);
      $state.transitionTo(
        "app.recapitulatif-pds-prc",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.goToFact = function (prc) {
      localStorage.setItem("prc", JSON.stringify(prc));
      $state.transitionTo(
        "app.facturation",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };
  })
  .controller("NewPrcCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    CodeGenere,
    formatNewDate,
    ApiListModePaiement,
    ApiListGrossiste,
    $filter
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.listarticles = [];
      $scope.data.prcs = [];
      $scope.data.detailPrc = {};
      $scope.data.codePrc = sessionStorage.getItem("codePrc");
      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      $scope.data.grossistes = [];
      $scope.data.clientchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.grossistechoisit = null;
      $scope.data.dateAjout = formatNewDate.formatNewDate(),

        $scope.data.listmodereglements = null;
      $scope.data.modereglementchoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = null;
      $scope.data.prix = null;
      $scope.data.delaipaiement = null;
      $scope.data.montant = 0.0;
      $scope.data.idMotif = 0;
      $scope.data.idModepaiement = 0;
      var user = localStorage.getItem("user");
      $scope.data.user = JSON.parse(user);


      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      var codeClient = { codeCommerciale: $scope.data.user.code };
    };

    $scope.initvar();

    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });

    ApiListClient.getListClient().success(function (response) {
      if (response) {
        $scope.data.listclients = response;
      }
      //     console.log('-----------------------list client----------------------');
      //     console.log(response);
    });

    ApiListModePaiement.getListModePaiement().success(function (response) {
      if (response) {
        $scope.data.listmodereglements = response;
      }
      console.log(
        "-----------------------list mode paiement----------------------"
      );
      console.log(response);
    });

    $scope.changeCLient = function () {
      console.log("client choisi");
      console.log($scope.data.clientchoisit);
      $scope.data.idModepaiement = $scope.data.clientchoisit.idModepaiement;
      $scope.data.grossistechoisit = {}
      $scope.data.grossistechoisit.codeGrossiste = $scope.data.clientchoisit.codeGrossiste;
      $scope.data.grossistechoisit.nom = $scope.data.clientchoisit.grossiste;

      $scope.data.modereglementchoisit = {};
      $scope.data.modereglementchoisit.idModepaiement = $scope.data.clientchoisit.idModepaiement;
      $scope.data.modereglementchoisit.libelle = $scope.data.clientchoisit.idModepaiement == "1" ? "COMPTANT" : "CREDIT";

      /*if ($scope.data.modereglementchoisit) {
        $scope.data.modereglementchoisit.idModepaiement = $scope.data.clientchoisit.idModepaiement;

      }*/
    };

    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };

    $scope.deletObject = function (item) {
      let index = $scope.data.detailsPRC.indexOf(item);

      if (index > -1) {
        $scope.data.detailsPRC.splice(index, 1);
      }
    };

    ApiListGrossiste.getListGrossiste(true, codeCommerciale = null).success(function (response) {
      if (response) {
        $scope.data.grossistes = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });

    $scope.getOptGrossiste = function (option) {
      return option;
    };

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
      var searchArticle = $filter('filter')($scope.data.detailsPRC, { codeArticle: $scope.data.artcilechoisit.code })
      if (!searchArticle || searchArticle.length <= 0) {
        if ($scope.data.artcilechoisit && $scope.data.quantite && $scope.data.prix && $scope.data.quantite > 0 && $scope.data.prix > 0) {
          //   $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          var mt = $scope.data.prix * $scope.data.quantite;
          $scope.data.detailsPRC.push({
            index: $scope.data.detailsPRC.length + 1,
            codeDetail: "DPRC-" + $scope.data.user.code + "-" + CodeGenere.getCodeGenere(),
            codeArticle: $scope.data.artcilechoisit.code,
            quantite: $scope.data.quantite,
            prix: $scope.data.prix,

            isCanceled: false,
            artcilechoisit: $scope.data.artcilechoisit,
            idMotif: 0,
            montant: mt
          });
          $scope.data.montant = $scope.data.montant + mt;

          // $ionicLoading.hide();
          $scope.data.artcilechoisit = null;
          $scope.data.motifchoisit = null;
          $scope.data.quantite = null;
          $scope.data.prix = null;
          console.log("----------------------Detail-------------------");
          $scope.numStr = function (a, b) {
            a = '' + a;
            b = b || ' ';
            var c = '',
              d = 0;
            while (a.match(/^0[0-9]/)) {
              a = a.substr(1);
            }
            for (var i = a.length - 1; i >= 0; i--) {
              c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
              d++;
            }
            return c;
          }
          console.log($scope.data.detailsPRC);
          if ($scope.data.artcilechoisit && $scope.data.quantite && $scope.data.prix && $scope.data.quantite > 0 && $scope.data.prix > 0) {

            for (var j = 0; j < $scope.data.detailsPRC.details.length; j++) {

              console.log($scope.data.detailsPRC.details[j].prix);
              console.log($scope.data.detailsPRC.details[j].montant);
              console.log($scope.numStr($scope.data.detailsPRC.details[j].prix, '.'));
              console.log($scope.numStr($scope.data.detailsPRC.details[j].montant, '.'));
            }
          }
        } else {
          $ionicPopup.show({
            title: "Infos",
            template: "Veuillez ajouter un article avec sa quantité et son prix",
            scope: $scope,
            buttons: [
              {
                text: "Ok",
                type: "button-positive",
              },
            ],
          });
        }
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Desolé cet article est déjà ajouté",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-positive",
            },
          ],
        });
      }



    };

    $scope.submit = function (action) {

      console.log("client choisi");
      console.log($scope.data.clientchoisit);
      if ($scope.data.clientchoisit) {
        if (
          $scope.data.clientchoisit.idModepaiement == 1 ||
          $scope.data.modereglementchoisit !== null || $scope.data.idModepaiement !== 0
        ) {

          if ($scope.data.grossistechoisit && $scope.data.grossistechoisit.codeGrossiste) {


            if($scope.data.modereglementchoisit.libelle == "COMPTANT")
            {
              $scope.data.delaipaiement = $scope.data.delaipaiement ? $scope.data.delaipaiement : 0;
            }

            console.log('delai paiement', $scope.data.delaipaiement)
            console.log('mode paiement', $scope.data.idModepaiement)
            console.log($scope.data.modereglementchoisit)
            console.log($scope.data.grossistechoisit)

            var error =null;
           error = (!$scope.data.delaipaiement || $scope.data.delaipaiement == 0) && $scope.data.modereglementchoisit.libelle == "CREDIT" ? "Veuillez rensseigner le delai de paiement"
                   :error;
          

            if (!error) {

              var values = {
                codePRC:
                  "PRC-" + $scope.data.user.code + "-" + CodeGenere.getCodeGenere(),
                codeClient: $scope.data.clientchoisit.codeClient,
                codeGrossiste: $scope.data.grossistechoisit.codeGrossiste,
                dateAjout: formatNewDate.formatNewDate(),
                idModepaiement:
                  $scope.data.idModepaiement == 2
                    ? $scope.data.modereglementchoisit.idModepaiement
                    : $scope.data.idModepaiement,
                codeCommerciale: $scope.data.user.code,
                isLoaded: 0,
                isCanceled: 0,
                idMotif: $scope.data.idMotif,
                detailsPRC: $scope.data.detailsPRC,
                delaiPaiement: $scope.data.delaipaiement
              };

              console.log("---------------------Value to submit--------------------");
              console.log(values);

              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });
              if (action == 'sauv') {

                var prclocal = JSON.parse(localStorage.getItem('prclocal'));
                if (!prclocal || prclocal.length == 0) {
                  prclocal = [];
                }
                values.clientchoisit = $scope.data.clientchoisit;
                values.grossistechoisit = $scope.data.grossistechoisit;
                values.montant = $scope.data.montant
                values.local = true
                prclocal.push(values);
                localStorage.setItem('prclocal', JSON.stringify(prclocal));
                $scope.initvar();
                $ionicPopup.show({
                  title: "Infos",
                  template: "réussi",
                  scope: $scope,
                  buttons: [
                    {
                      text: "Ok",
                      type: "button-positive",
                      onTap: function (e) {
                        return true;
                      }
                    },
                  ],
                }).then(function (result) {
                  $state.transitionTo(
                    "app.prcs",
                    {},
                    {
                      reload: true,
                      inherit: true,
                      notify: true,
                    }
                  );
                });
                $ionicLoading.hide();

              } else {

                if (values.detailsPRC && values.detailsPRC.length > 0) {

                  values.dateAjout = formatNewDate.formatNewDate();


                  if (values.idModepaiement == "1" || values.idModepaiement == "2") {
                    values.idModepaiement = parseInt(values.idModepaiement);
                  } else {
                    console.log("idModepaiement", values.idModepaiement)
                  }

                  for (var i = 0; i < values.detailsPRC.length; i++) {
                    values.detailsPRC[i].isCanceled = values.detailsPRC[i].isCanceled ? 1 : 0;

                        if (values.detailsPRC[i].artcilechoisit.idArticle != " ") {
                          values.detailsPRC[i].artcilechoisit.idArticle = parseInt(values.detailsPRC[i].artcilechoisit.idArticle);
                          console.log("idArticle", values.detailsPRC[i].artcilechoisit.idArticle)
                        } else {
                          console.log("idArticle", values.detailsPRC[i].artcilechoisit.idArticle)
                        }

                        if (values.detailsPRC[i].artcilechoisit.prix != " ") {
                          values.detailsPRC[i].artcilechoisit.prix = parseInt(values.detailsPRC[i].artcilechoisit.prix);
                          console.log("prix", values.detailsPRC[i].artcilechoisit.prix)
                        } else {
                          console.log("prix", values.detailsPRC[i].artcilechoisit.prix)
                        }
                     

                  }
                 
                  ApiAjoutPrc.ajoutPrc(values).success(
                    function (response) {
                      $ionicLoading.hide();

                      if (response.reponse == 1) {
                        $scope.initvar();
                        $ionicPopup.show({
                          title: "Infos",
                          template: "réussi",
                          scope: $scope,
                          buttons: [
                            {
                              text: "Ok",
                              type: "button-positive",
                            },
                          ],
                        }).then(function (result) {
                          $state.transitionTo(
                            "app.prcs",
                            {},
                            {
                              reload: true,
                              inherit: true,
                              notify: true,
                            }
                          );
                        });
                      } else if (response.reponse == -41) {
                        $ionicPopup.show({
                          title: "Infos",
                          template: "Impossible d'ajouter un prc sans details",
                          scope: $scope,
                          buttons: [
                            {
                              text: "Ok",
                              type: "button-positive",
                            },
                          ],
                        });
                      }
                    },
                    (error) => {
                      $ionicLoading.hide();
                    }
                  );
                } else {
                  $ionicLoading.hide();
                  $ionicPopup.show({
                    title: "Infos",
                    template: "Impossible d'ajouter un prc sans details",
                    scope: $scope,
                    buttons: [
                      {
                        text: "Ok",
                        type: "button-positive",
                      },
                    ],
                  });
                }

              }
            } else {
              $ionicLoading.hide();
              $ionicPopup.show({
                title: "Infos",
                template: "Veuillez rensseigner le delai de paiement",
                scope: $scope,
                buttons: [
                  {
                    text: "Ok",
                    type: "button-positive",
                  },
                ],
              });

            }

          } else {
            $ionicLoading.hide();
            $ionicPopup.show({
              title: "Infos",
              template: "Veuillez choisir un grosssite",
              scope: $scope,
              buttons: [
                {
                  text: "Ok",
                  type: "button-positive",
                },
              ],
            });
          }

        } else {
          $ionicPopup.show({
            title: "Infos",
            template: "Vous devez choisir un mode de paiement",
            scope: $scope,
            buttons: [
              {
                text: "Ok",
                type: "button-positive",
              },
            ],
          });
        }
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillez choisir un client",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-positive",
            },
          ],
        });

      }

    };


  })

  .controller("DetailPrcCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    SendSms,
    checkQuantite,
    ApiModificationDetailPRC,
    ApiDeletDetailPRC
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.edit = false;
      $scope.data.listarticles = [];
      $scope.data.prcs = [];
      $scope.data.detailPrc = {};


      $scope.data.prc = JSON.parse(localStorage.getItem("prc-detail"));

      // $scope.data.codePrc = $scope.data.prc ? $scope.data.prc.codePRC : '';

      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      $scope.data.clientchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      $scope.data.prix = 0;
      $scope.data.montantDtails = 0;
      $scope.data.idMotif = 0;
      var user = localStorage.getItem("user");
      $scope.data.user = JSON.parse(user);

      $scope.sms_function = function () {
        SendSms.sendSMS("Bissmillah", "776726045");
      };

      //  console.log('--------------get number --------------');
      //  console.log($scope.getCodePrc());
      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      // $scope.data.codePrc = localStorage.getItem("codeArticle");


    };

    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };
    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
    }


    $scope.editDetail = function (item, action) {
      $scope.edit = true;
      $scope.action = action;
      item.idMotif = "edit";

      $scope.data.artcilechoisit = {};
      console.log("--------------Artcile---------------");
      console.log(item.article);
      $scope.data.artcilechoisit.libelle = item.article
      $scope.data.artcilechoisit.code = item.codeArticle
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;
      $scope.data.prix = +item.prix;

      for (var i = 0; i < $scope.data.detailsPRC.details.length; i++) {
        if (
          $scope.data.detailsPRC.details[i].idMotif === "edit" &&
          $scope.data.detailsPRC.details[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsPRC.details[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };

    $scope.valideEdit = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsPRC.details.length; i++) {
          if (
            $scope.data.detailsPRC.details[i].idMotif === "edit" &&
            $scope.data.detailsPRC.details[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {

            var errorMessage = checkQuantite.checkQuantite($scope.data.artcilechoisit.code, $scope.data.quantite);

            if (errorMessage == 1) {

           //   codePRC(string), codeDetail(string), codeArticle(string), prix(int), quantite(int), isCanceled(int), idMotif(int)

              var ligneDetailTosend = {
                codePRC      :$scope.data.detailsPRC.codePRC,
                codeDetail   :$scope.itemEdit.codeDetail,
                codeArticle  :$scope.data.artcilechoisit.code,
                quantite     :+$scope.data.quantite,
                isCanceled   :1,
                idMotif      :+$scope.data.motifchoisit.idMotif,
                prix         :+$scope.data.prix
              }
              console.log('-----Objet to modif');
              console.log(ligneDetailTosend);
              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });

              ApiModificationDetailPRC.modificationDetailPRC(ligneDetailTosend)
                .success(
                  function (response) {

                    $ionicLoading.hide();
                    console.log('-------Modification edit------')
                    console.log(response)
                    if (response.reponse == 1) {

                      var prclocal = JSON.parse(localStorage.getItem('prclocal'));

                      if (prclocal && prclocal.length > 0) {
                        var prcToModif = $filter('filter')(prclocal, { codePRC: $scope.data.detailsPRC.codePRC });

                        if (prcToModif && prcToModif.length == 1) {
                          prclocal.splice(prcToDelet[0], 1)

                          $scope.data.detailsPRC.detailsPRC = $scope.data.detailsPRC.details;
                          $scope.data.detailsPRC.details = $scope.data.detailsPRC.details;

                          prclocal.push($scope.data.detailsPRC)

                          localStorage.setItem('prclocal', JSON.stringify(prclocal));
                        }

                      }

                      $scope.data.detailsPRC.details[i].idMotif =
                        $scope.data.motifchoisit.idMotif;
                      $scope.data.detailsPRC.details[i].quantite = $scope.data.quantite;
                      $scope.data.detailsPRC.details[i].prix = $scope.data.prix;
                      $scope.data.detailsPRC.details[i].codeArticle = $scope.data.artcilechoisit.code;
                      $scope.data.detailsPRC.details[i].article = $scope.data.artcilechoisit.libelle;

                      $scope.edit = false;
                      $scope.data.motifchoisit = null;

                      $ionicPopup.show({
                        title: "Information",
                        template: 'réussi',
                        scope: $scope,
                        buttons: [
                          {
                            text: "Ok",
                            type: "button-assertive",
                          },
                        ],
                      });
                    }

                  }, (error) => {
                    $ionicLoading.hide();
                    $scope.Erreur(errorMessage);
                  }
                )


            } else {
              $scope.Erreur(errorMessage);
            }

            break;
          }
        }
      } else {
        var message = "Veuillez choisir un motif"
        $scope.Erreur(message);

      }
    };

    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsPRC.details.length; i++) {
        if (
          $scope.data.detailsPRC.details[i].idMotif === "edit" &&
          $scope.data.detailsPRC.details[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsPRC.details[i].idMotif = 0;
          break;
        }
      }
    }

    $scope.validerDelet = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        $ionicPopup.show({
          title: "Infos",
          template: "Voulez-vous vraimenet suprimer ce details?",
          scope: $scope,
          buttons: [
            {
              text: 'OUI',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            },
            {
              text: 'NON',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
          ]
        }).then(function (result) {
          if (result) {
            console.log('OUI');

           // codePRC(string), codeDetail(string), isCanceled(int), idMotif(int)

            var ligneDetailTosend = {
              codePRC     :$scope.data.detailsPRC.codePRC,
              codeDetail  :$scope.itemEdit.codeDetail,
             // codeArticle :$scope.data.artcilechoisit.code,
             // quantite    :+$scope.data.quantite,
              isCanceled  :1,
              idMotif     :+$scope.data.motifchoisit.idMotif
            }
            console.log('-----------Object to delet----------');
            console.log(ligneDetailTosend);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });


            ApiDeletDetailPRC.deletDetailPRC(ligneDetailTosend)
              .success(
                function (response) {

                  $ionicLoading.hide();
                  console.log('-------Modification edit------')
                  console.log(response)
                  if (response.reponse == 1) {

                    for (var i = 0; i < $scope.data.detailsPRC.details.length; i++) {
                      if (
                        $scope.data.detailsPRC.details[i].idMotif === "edit" &&
                        $scope.data.detailsPRC.details[i].codeArticle ===
                        $scope.itemEdit.codeArticle
                      ) {
                        $scope.data.detailsPRC.details.splice(i, 1);

                        var prclocal = JSON.parse(localStorage.getItem('prclocal'));

                        if (prclocal && prclocal.length > 0) {
                          var prcToModif = $filter('filter')(prclocal, { codePRC: $scope.data.detailsPRC.codePRC });

                          if (prcToModif && prcToModif.length == 1) {
                            prclocal.splice(prcToDelet[0], 1)

                            $scope.data.detailsPRC.detailsPRC = $scope.data.detailsPRC.details;
                            $scope.data.detailsPRC.details = $scope.data.detailsPRC.details;

                            prclocal.push($scope.data.detailsPRC)

                            localStorage.setItem('prclocal', JSON.stringify(prclocal));
                          }

                        }


                        $scope.edit = false;
                        $scope.data.motifchoisit = null;

                        break;
                      }
                    }

                    $ionicPopup.show({
                      title: "Information",
                      template: 'réussi',
                      scope: $scope,
                      buttons: [
                        {
                          text: "Ok",
                          type: "button-assertive",
                        },
                      ],
                    });
                  }

                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )


          } else {
            console.log('NON');
          }
        });
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillz choisir le motif de suppression?",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        }).then(function (result) {
          if (result) {

          }
        })
      }


    }




    //Init variables of controller
    $scope.initvar();

    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });

    ApiListClient.getListClient().success(function (response) {
      if (response) {
        $scope.data.listclients = response;
      }
      //     console.log('-----------------------list client----------------------');
      //     console.log(response);
    });

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
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
      $scope.data.montantDtails = 0;



      if ($scope.data.prc && !$scope.data.prc.local) {

        ApiDetailPrc.getDetailPrc($scope.data.prc.codePRC).success(function (
          response
        ) {
          if (response) {
            console.log("---------------------Detail prc--------------");

            $scope.data.detailsPRC = response;
            console.log($scope.data.detailsPRC)


          }
        });

      } else {
        //  var prclocal = JSON.parse(localStorage.getItem('prclocal'));

        $scope.data.detailsPRC = $scope.data.prc;
        $scope.data.detailsPRC.details = $scope.data.prc.detailsPRC;
     
      }
    };

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
        motifchoisit: $scope.data.motifchoisit,
      });
      // $ionicLoading.hide();
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      console.log("----------------------Detail-------------------");
      console.log($scope.data.detailsPRC);
    };

  })


  .controller("RecapPdsPrcCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    ApiRecapPdsPrc
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.codeCommerciale = localStorage.getItem("codeCommerciale");
      $scope.data.user = localStorage.getItem("user");
      $scope.data.recapPrc = [];
      // var code = {codeCommerciale: $scope.data.codeCommerciale};
    };
    $scope.initRecap = function () {
      if ($scope.data.codeCommerciale) {
        var code = { codeCommerciale: $scope.data.codeCommerciale };

        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        ApiRecapPdsPrc.getRecapPdsPrc(code).success(
          function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.recapPrc = response;
            }
            console.log(
              "-----------------------Recap PRC----------------------"
            );
            console.log(response);
          },
          (error) => {
            $ionicLoading.hide();
          }
        );
      }
    };
    $scope.initvar();
    $scope.initRecap();

    $scope.demandePDS = function (recap) {
      //  localStorage.setItem('recapPRC',  angular.toJson(recap));
      localStorage.setItem("recapPRC", JSON.stringify(recap));
      $state.transitionTo(
        "app.nouvel-pds",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };

    $scope.editObject = function (item) { };
  })

  .controller("PdsCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    ApiListPds,
    ApiRecapPdsPrc,
    ApiDeletPDS,
    $filter
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.edit = false;

      var pds = JSON.parse(localStorage.getItem('pdslocal'));
      console.log('--------PDS sauvegarder----------')
      console.log(pds);
      $scope.data.pds = pds ? pds : [];
      $scope.data.listarticles = [];

      $scope.data.detailPrc = {};
      $scope.data.codePrc = sessionStorage.getItem("codePrc");
      $scope.data.listclients = [];
      $scope.data.listmotifs = [];
      $scope.data.motifchoisit = null;
      var user = localStorage.getItem("user");
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsPRC = [];
      $scope.isLoaded = false;
      $scope.isCanceled = false;

      // $scope.data.codePrc = localStorage.getItem("codeArticle");

      var codeClient = { codeCommerciale: $scope.data.user.code };

      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      ApiListPds.getListPds(codeClient).success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.pds = $scope.data.pds.concat(response);
          }
          console.log("-----------------------LIst pds ---------------------");
          console.log(response);
        },
        (error) => {
          $ionicLoading.hide();
        }
      );
    };

    $scope.initvar();

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
      console.log(response);
    });



    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
    }
    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.editDetail = function (item, action) {
      $scope.edit = true;
      $scope.action = action;

      $scope.itemEdit = item;
    };

    $scope.annulerEdit = function () {

      $scope.edit = false;

      $scope.itemEdit = null;

      $scope.data.motifchoisit = null;

    }

    $scope.deletPds = function (item) {
      $ionicPopup.show({
        title: "Supression stock",
        template: "",
        scope: $scope,
        buttons: [
          {
            text: 'OUI',
            type: 'button-energized',
            onTap: function (e) {
              return true;
            }
          },
          {
            text: 'NON',
            type: 'button-assertive',
            onTap: function (e) {
              return false;
            }
          },
        ]
      }).then(function (result) {
        if (result) {

        }
      })

    }

    $scope.validerDelet = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        $ionicPopup.show({
          title: "Infos",
          template: "Voulez-vous vraimenet suprimer ce details?",
          scope: $scope,
          buttons: [
            {
              text: 'OUI',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            },
            {
              text: 'NON',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
          ]
        }).then(function (result) {
          if (result) {
            console.log('OUI');

            var ligneDetailTosend = {
              codePDS: $scope.itemEdit.codePDS,
              isCanceled: 1,
              idMotif: $scope.data.motifchoisit.idMotif
            }
            console.log('-----------Object to delet----------');
            console.log(ligneDetailTosend);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });

            $ionicLoading.hide()

            for (var i = 0; i < $scope.data.pds.length; i++) {
              if (
                $scope.data.pds[i].codePDS ===
                $scope.itemEdit.codePDS
              ) {

                $scope.data.pds.splice(i, 1);
                $scope.edit = false;
                $scope.data.motifchoisit = null;

                break;
              }
            }

            ApiDeletPDS.deletPDS(ligneDetailTosend)
              .success(
                function (response) {

                  $ionicLoading.hide();
                  console.log('-------Modification edit------')
                  console.log(response)
                  if (response.reponse == 1) {

                    var pds = JSON.parse(localStorage.getItem('pdslocal'));

                    var searchPds = $filter('filter')(pds, { codePDS: $scope.itemEdit.codePDS });
                    if (searchPds && searchPds.length === 1) {
                      var pdsLocal = searchPds[0];
                      pds.splice(pdsLocal, 1);

                      localStorage.setItem('pdslocal', JSON.stringify(pds))
                    }


                    $ionicPopup.show({
                      title: "Information",
                      template: 'réussi',
                      scope: $scope,
                      buttons: [
                        {
                          text: "Ok",
                          type: "button-assertive",
                        },
                      ],
                    });
                  }

                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )


          } else {
            console.log('NON');
          }
        });
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillz choisir le motif de suppression",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        }).then(function (result) {
          if (result) {

          }
        })
      }


    }


    $scope.goToDetailPds = function (codePDS, sens) {

      localStorage.setItem("senspds", sens);
      localStorage.setItem("codePDS", JSON.stringify(codePDS));
      $state.transitionTo(
        "app.details-pds",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.valider = function (pds) {
      localStorage.setItem("pdsLocalToValide", JSON.stringify(pds));
      localStorage.setItem("recapPRC", []);
      localStorage.setItem("sens", "local");
      $state.transitionTo(
        "app.nouvel-pds",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );

    }



    $scope.goToNewPds = function (sens, pds) {
      if (sens == "nouvelle") {
        localStorage.setItem("sens", "nouvelle");
        localStorage.setItem("recapPRC", []);

        $state.transitionTo(
          "app.nouvel-pds",
          {},
          {
            reload: true,
            inherit: true,
            notify: true,
          }
        );
      } else if (sens == "recap") {
        localStorage.setItem("sens", "recap");
        localStorage.setItem("recapPRC", []);
        $state.transitionTo(
          "app.nouvel-pds",
          {},
          {
            reload: true,
            inherit: true,
            notify: true,
          }
        );

      }
    };
  })
  .controller("DetailPdsCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    ApiDetailPds,
    checkQuantite,
    ApiModificationDetailPDS,
    ApiDeletDetailPDS,
    $filter,
    ApiDeletPDS
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.edit = false;
      var pds = JSON.parse(localStorage.getItem("codePDS"));
      $scope.sens = localStorage.getItem("senspds");

      $scope.data.listarticles = [];
      $scope.data.listmotifs = [];
      $scope.data.artcilechoisit = null;
      $scope.data.motifchoisit = null;
      $scope.data.quantite = 0;
      $scope.data.idMotif = 0;
      $scope.data.codePDS = pds ? pds.codePDS : null;
      var user = localStorage.getItem("user");
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsPDS = [];

      var codePDS = { codePDS: $scope.data.codePDS };

      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      console.log("-----------------------Detail pds ---------------------");
      console.log(codePDS);
      if ($scope.data.codePDS && pds.local == null) {
        ApiDetailPds.getDetailsPds(codePDS).success(
          function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.detailsPDS = response;
            }
            console.log(
              "-----------------------Detail pds ---------------------"
            );
            console.log(response);
          },
          (error) => {
            $ionicLoading.hide();
          }
        );
      } else if ($scope.data.codePDS && pds.local == true) {
        $ionicLoading.hide();
        $scope.data.detailsPDS = pds
        $scope.data.detailsPDS.details = pds.detailsPDS
      }
    };

    $scope.validerDeletPds = function () {
      $ionicPopup.show({
        title: "Supression stock",
        template: "Voulez-vous vraiment suprimer ce pds?",
        scope: $scope,
        buttons: [
          {
            text: 'OUI',
            type: 'button-energized',
            onTap: function (e) {
              return true;
            }
          },
          {
            text: 'NON',
            type: 'button-assertive',
            onTap: function (e) {
              return false;
            }
          },
        ]
      }).then(function (result) {

        if (result) {
          var value = { codePDS: $scope.data.codePDS, isCanceled: 1, idMotif: +$scope.data.motifchoisit.idMotif }
          console.log(value)
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });
          ApiDeletPDS.deletPDS(value)
            .success(function (reponse) {
              console.log(reponse);
              if (reponse.reponse == 1) {
                $state.transitionTo(
                  "app.pds",
                  {},
                  {
                    reload: true,
                    inherit: true,
                    notify: true,
                  }
                );
              }
            }, (error) => {
              $ionicLoading.hide();
              console.log(error);
            })

        }
      })

    }


    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };

    $scope.initvar();

    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
    }


    $scope.editDetail = function (item, action) {
      $scope.edit = true;
      $scope.action = action;
      item.idMotif = "edit";

      $scope.data.artcilechoisit = {};
      console.log("--------------Artcile---------------");
      console.log(item.article);
      $scope.data.artcilechoisit.libelle = item.article
      $scope.data.artcilechoisit.code = item.codeArticle
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;

      for (var i = 0; i < $scope.data.detailsPDS.details.length; i++) {
        if (
          $scope.data.detailsPDS.details[i].idMotif === "edit" &&
          $scope.data.detailsPDS.details[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsPDS.details[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };

    $scope.valideEdit = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsPDS.details.length; i++) {
          if (
            $scope.data.detailsPDS.details[i].idMotif === "edit" &&
            $scope.data.detailsPDS.details[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {

            var errorMessage = checkQuantite.checkQuantite($scope.data.artcilechoisit.code, $scope.data.quantite);

            if (errorMessage == 1) {


              var ligneDetailTosend = {
                codePDS: $scope.data.detailsPDS.codePDS,
                codePRC: $scope.data.detailsPDS.codePRC ? $scope.data.detailsPDS.codePRC : '',
                codeDetail: $scope.itemEdit.codeDetail,
                codeArticle: $scope.data.artcilechoisit.code,
                quantite: $scope.data.quantite,
                isCanceled: 1,
                idMotif: $scope.data.motifchoisit.idMotif,
                isUnloaded: 0
              }
              console.log('-----Objet to modif');
              console.log(ligneDetailTosend);
              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });

              ApiModificationDetailPDS.modificationDetailPDS(ligneDetailTosend)
                .success(
                  function (response) {

                    $ionicLoading.hide();
                    console.log('-------Modification edit------')
                    console.log(response)
                    if (response.reponse == 1) {

                      $scope.data.detailsPDS.details[i].idMotif =
                        $scope.data.motifchoisit.idMotif;
                      $scope.data.detailsPDS.details[i].quantite = $scope.data.quantite;
                      $scope.data.detailsPDS.details[i].codeArticle = $scope.data.artcilechoisit.code;
                      $scope.data.detailsPDS.details[i].article = $scope.data.artcilechoisit.libelle;

                      var pds = JSON.parse(localStorage.getItem('pdslocal'));

                      var searchPds = $filter('filter')(pds, { codePDS: $scope.data.detailsPDS.codePDS });
                      if (searchPds && searchPds.length === 1) {
                        var pdsLocal = searchPds[0];
                        pds.splice(pdsLocal, 1);
                        pds.push($scope.data.detailsPDS);

                        localStorage.setItem('pdslocal', JSON.stringify(pds))
                      }



                      $scope.edit = false;
                      $scope.data.motifchoisit = null;

                      $ionicPopup.show({
                        title: "Information",
                        template: 'réussi',
                        scope: $scope,
                        buttons: [
                          {
                            text: "Ok",
                            type: "button-assertive",
                          },
                        ],
                      });
                    }

                  }, (error) => {
                    $ionicLoading.hide();
                    $scope.Erreur(errorMessage);
                  }
                )


            } else {
              $scope.Erreur(errorMessage);
            }

            break;
          }
        }
      } else {
        var message = "Veuillez choisir un motif"
        $scope.Erreur(message);

      }
    };

    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsPDS.details.length; i++) {
        if (
          $scope.data.detailsPDS.details[i].idMotif === "edit" &&
          $scope.data.detailsPDS.details[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsPDS.details[i].idMotif = 0;
          break;
        }
      }
    }

    $scope.validerDelet = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        $ionicPopup.show({
          title: "Infos",
          template: "Voulez-vous vraimenet suprimer ce details?",
          scope: $scope,
          buttons: [
            {
              text: 'OUI',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            },
            {
              text: 'NON',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
          ]
        }).then(function (result) {
          if (result) {
            console.log('OUI');

            var ligneDetailTosend = {
              codePDS: $scope.data.detailsPDS.codePDS,
              codeDetail: $scope.itemEdit.codeDetail,
              isCanceled: 1,
              idMotif: $scope.data.motifchoisit.idMotif,
              isUnloaded: 0
            }
            console.log('-----------Object to delet----------');
            console.log(ligneDetailTosend);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });



            ApiDeletDetailPDS.deletDetailPDS(ligneDetailTosend)
              .success(
                function (response) {

                  $ionicLoading.hide();
                  console.log('-------Modification edit------')
                  console.log(response)
                  if (response.reponse == 1) {

                    for (var i = 0; i < $scope.data.detailsPDS.details.length; i++) {
                      if (
                        $scope.data.detailsPDS.details[i].idMotif === "edit" &&
                        $scope.data.detailsPDS.details[i].codeArticle ===
                        $scope.itemEdit.codeArticle
                      ) {



                        $scope.data.detailsPDS.details.splice(i, 1);

                        var pds = JSON.parse(localStorage.getItem('pdslocal'));

                        var searchPds = $filter('filter')(pds, { codePDS: $scope.data.detailsPDS.codePDS });
                        if (searchPds && searchPds.length === 1) {
                          var pdsLocal = searchPds[0];
                          pds.splice(pdsLocal, 1);
                          pds.push($scope.data.detailsPDS);

                          localStorage.setItem('pdslocal', JSON.stringify(pds))
                        }

                        $scope.edit = false;
                        $scope.data.motifchoisit = null;

                        break;
                      }
                    }


                    $ionicPopup.show({
                      title: "Information",
                      template: 'réussi',
                      scope: $scope,
                      buttons: [
                        {
                          text: "Ok",
                          type: "button-assertive",
                        },
                      ],
                    });
                  }

                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )


          } else {
            console.log('NON');
          }
        });
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillz choisir le motif de suppression?",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        }).then(function (result) {
          if (result) {

          }
        })
      }


    }



    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });


    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
      console.log(response);
    });


    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.getOptArticle = function (option) {
      return option;
    };





  })

  .controller("EnvoiCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    CodeGenere,
    ApiListGrossiste,
    ApiAjoutPdsFromRecap,
    SendSms,
    $filter,
    ApiAjoutPrc

  ) {
    console.log('--------Envoi-------');

    $scope.initVar = function () {
      $scope.data.prcs = [];
      $scope.data.prcstmp = [];
      var prclocal = JSON.parse(localStorage.getItem('prclocal'));

      if (prclocal && prclocal.length > 0) {
        $scope.data.prcs = prclocal;
        $scope.data.prcstmp = prclocal;
      }

    }
    $scope.initVar();


    $scope.synchroPRC = function () {


      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      var compte = 0;
      var totalItem = $scope.data.prcs.length;
      for (var i = 0; i < $scope.data.prcs.length; i++) {
        var values = {
          codePRC: $scope.data.prcs[i].codePRC,
          codeClient: $scope.data.prcs[i].codeClient,
          dateAjout: $scope.data.prcs[i].dateAjout,
          idModepaiement: $scope.data.prcs[i].idModepaiement,
          codeCommerciale: $scope.data.prcs[i].codeCommerciale,
          isLoaded: $scope.data.prcs[i].isLoaded,
          isCanceled: $scope.data.prcs[i].isCanceled,
          idMotif: $scope.data.prcs[i].idMotif,
          detailsPRC: $scope.data.prcs[i].detailsPRC
        };
        console.log("---------------------Value to submit--------------------");
        console.log(values);
        ApiAjoutPrc.ajoutPrc(values).success(
          function (response) {
            console.log(response);

            if (response.reponse == 1) {
              compte = compte + 1;
              var searchPrc = $filter('filter')($scope.data.prcs, { codePRC: values.codePRC });
              console.log('------PRC to delet');
              console.log(searchPrc);
              if (searchPrc && searchPrc.length === 1) {
                var prcLocal = searchPrc[0];
                console.log('------PRC to delet');
                console.log(prcLocal);
                $scope.data.prcstmp.splice(prcLocal, 1);

                localStorage.setItem('prclocal', JSON.stringify($scope.data.prcstmp))

                console.log(compte)
                console.log($scope.data.prcs.length)

                if (compte === totalItem) {
                  $scope.data.prcs = [];
                  $ionicLoading.hide();
                  $state.transitionTo(
                    "app.prcs",
                    {},
                    {
                      reload: true,
                      inherit: true,
                      notify: true,
                    }
                  );

                }
              }

            }


          },
          (error) => {
            erreur = 0;
            $ionicLoading.hide();
          }
        );

      }



      /*else {
       $ionicPopup.show({
         title: "Infos",
         template: "Vous devez choisir un mode de paiement",
         scope: $scope,
         buttons: [
           {
             text: "Ok",
             type: "button-positive",
           },
         ],
       });
     }*/
    };
  })

  .controller("RecuperationCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    CodeGenere,
    ApiListGrossiste,
    ApiAjoutPdsFromRecap,
    SendSms,
    $filter,
    ApiListStock
  ) {

    $scope.data = {}

    $scope.initVar = function () {
      $scope.data.listStock = localStorage.getItem("stocks") ? JSON.parse(localStorage.getItem("stocks")) : [];
      $scope.data.listarticles = localStorage.getItem("articles") ? JSON.parse(localStorage.getItem("articles")) : [];
      $scope.data.listclients = localStorage.getItem("clients") ? JSON.parse(localStorage.getItem("clients")) : [];
    }

    $scope.initVar();

    console.log('--------Recuperation-------');

    $scope.synchroStock = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      
   
   
      ApiListStock.getListStock().success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            for (var i = 0; i < response.length; i++) {

              if (response.quantite != " ") {
                response.quantite = parseInt(response[i].quantite);
    
              } else {
                console.log(response.quantite);
              }
            }
            localStorage.setItem("stocks", JSON.stringify($scope.data.listStock));
            
            console.log(JSON.parse(localStorage.getItem("stocks")))
           
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
          $ionicLoading.hide();
        }
      );
    }

    $scope.synchroArticle = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });

      ApiListArticle.getListArticle().success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.listarticles = response;
          localStorage.setItem("articles", JSON.stringify($scope.data.listarticles));
          console.log(JSON.parse(localStorage.getItem("articles")))
        }
      },
        (error) => {
          console.log(error);
          $ionicLoading.hide();
        }
      );

    }


    $scope.synchroClient = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });

      ApiListClient.getListClient().success(function (response) {
        $ionicLoading.hide();
        if (response) {
          $scope.data.listclients = response;
          localStorage.setItem("clients", JSON.stringify($scope.data.listclients));
          console.log(JSON.parse(localStorage.getItem("clients")))
        }
      },
        (error) => {
          console.log(error);
          $ionicLoading.hide();
        }
      );

    }

  })

  .controller("AddPdsCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    CodeGenere,
    ApiListGrossiste,
    ApiAjoutPdsFromRecap,
    SendSms,
    $filter,
    ApiRecapPdsPrc,
    formatNewDate,
    ApiListStock,
    ApiDeletDetailPDS,
    ApiDeletPDS
  ) {
    $scope.data = {};

    $scope.initvar = function () {
      //localStorage.setItem('pdslocal',null)
      $scope.data.pdsLocalToValide = JSON.parse(localStorage.getItem('pdsLocalToValide'));
      $scope.sens = localStorage.getItem('sens');
      console.log('--------PDS Local to validade----------')
      console.log($scope.data.pdsLocalToValide);
      $scope.data.pds = {};

      $scope.code = "initiale";
      var pds = JSON.parse(localStorage.getItem("pds"));
      if (pds && pds.codeGenere !== null) {
        console.log("pds loc");
        console.log(pds);
        $scope.data.pds = pds;
        $scope.code = "attente";
        console.log("code");
        console.log($scope.data.pds.codeGenere);
      }

      $scope.edit = false;
      $scope.data.user = JSON.parse(localStorage.getItem("user"));
      console.log("-------user in pds add ------");
      console.log($scope.data.user);
      $scope.data.recapPRC = localStorage.getItem("recapPRC")
        ? JSON.parse(localStorage.getItem("recapPRC"))
        : [];
      $scope.initial = $scope.sens == "recap" ? false : true;
      console.log('-------Initial----------');
      console.log($scope.initial);

      console.log($scope.data.recapPRC);
      $scope.data.codeCommerciale = $scope.data.user.code;
      $scope.data.codePRC;
      /*$scope.data.recapPRC && $scope.data.recapPRC.length > 0
        ? $scope.data.recapPRC[0].details[0].codePRC
        : null;*/

      $scope.data.idMotif = 0;
      $scope.data.detailsPDS = [];
      $scope.data.detailsPDSRECAP = [];
      $scope.data.listmotifs = [];
      $scope.data.grossistes = [];
      $scope.data.motifchoisit = null;
      $scope.data.grossistechoisit = null;
      $scope.data.listarticles = [];
      $scope.data.artcilechoisit = null;
      $scope.data.codePDS =
        "PDS" +
        "-" +
        $scope.data.codeCommerciale +
        "-" +
        CodeGenere.getCodeGenere();
      $scope.data.detail = {};
      $scope.data.detailrecap = {};

      $scope.data.quantite = null;
      $scope.data.prix = null;
      $scope.data.annulation = false;

      $scope.initDetailPDS();

      if ($scope.data.pdsLocalToValide) {

        $scope.data.codePDS = $scope.data.pdsLocalToValide.codePDS,
          $scope.data.codeCommerciale = $scope.data.pdsLocalToValide.codeCommerciale,
          $scope.data.grossistechoisit = $scope.data.pdsLocalToValide.grossistechoisit,
          dateAjout = $scope.data.pdsLocalToValide.dateAjout,
          isCanceled = $scope.data.pdsLocalToValide.isCanceled,
          $scope.data.idMotif = $scope.data.pdsLocalToValide.idMotif,
          isCurrent = $scope.data.pdsLocalToValide.isCurrent,
          isLoaded = $scope.data.pdsLocalToValide.isLoaded,
          isUnloaded = $scope.data.pdsLocalToValide.isUnloaded,
          isChecked = $scope.data.pdsLocalToValide.isChecked,
          $scope.data.detailsPDS = $scope.data.pdsLocalToValide.detailsPDS

        console.log('----_Detail----');

        console.log($scope.data.detailsPDS);


        localStorage.setItem('pdsLocalToValide', null)

      }
    };
    $scope.synchroStock = function () {

      ApiListStock.getListStock().success(
        function (response) {
          console.log('---------------Synchro stock------------------')
          response.quantite = parseInt(response.quantite);
          console.log(response.quantite)
          console.log(response)

          if (response) {
            localStorage.setItem("stocks", JSON.stringify(response));
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    $scope.initRecapPRC = function () {
      console.log('-------jhghn---------');


      if ($scope.initial == false) {
        if ($scope.data.grossistechoisit) {
          $scope.data.user = JSON.parse(localStorage.getItem("user"));
          if ($scope.data.user) {

            console.log($scope.data.user);

            var code = { codeCommerciale: $scope.data.user.code, codeGrossiste: $scope.data.grossistechoisit.codeGrossiste };
            console.log(code);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });
            ApiRecapPdsPrc.getRecapPdsPrc(code).success(
              function (response) {
                $ionicLoading.hide();
                if (response) {
                  $scope.data.recapPrc = response;
                  console.log('-_Details----');
                  console.log($scope.data.recapPrc[0].details);
                  $scope.initDetailPDS();


                }
                console.log(
                  "-----------------------Recap PRC----------------------"
                );
                console.log(response);


                // localStorage.setItem("recapPRC", JSON.stringify(response));

              },
              (error) => {
                $ionicLoading.hide();
              }
            );
          }
        }

      }

    }

    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };
    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsPDS.length; i++) {
        if (
          $scope.data.detailsPDS[i].idMotif === "edit" &&
          $scope.data.detailsPDS[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsPDS[i].idMotif = 0;
          $scope.data.quantite = null;
          $scope.data.prix = null;
          $scope.data.artcilechoisit = null;
          $scope.data.motifchoisit = null;
          break;
        }
      }
    }

    $scope.editDetail = function (item) {
      $scope.data.artcilechoisit = {};

      $scope.data.artcilechoisit.libelle = item.article;
      $scope.data.artcilechoisit.code = item.codeArticle;
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;
      $scope.data.prix = +item.prix;
      //document.getElementById("quantite").value = item.quantite;

      $scope.edit = true;
      item.idMotif = "edit";

      for (var i = 0; i < $scope.data.detailsPDS.length; i++) {
        if (
          $scope.data.detailsPDS[i].idMotif === "edit" &&
          $scope.data.detailsPDS[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsPDS[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };
    $scope.valideEdit = function (type = null) {

      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsPDS.length; i++) {
          if (
            $scope.data.detailsPDS[i].idMotif === "edit" &&
            $scope.data.detailsPDS[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {
            if (type == null) {
              $scope.data.detailsPDS[i].idMotif =
                $scope.data.motifchoisit.idMotif;
              $scope.data.detailsPDS[i].codeArticle =
                $scope.data.artcilechoisit.code;
              $scope.data.detailsPDS[i].quantite = $scope.data.quantite;
              $scope.data.detailsPDS[i].prix = $scope.data.prix;

              $scope.data.quantite = null;
              $scope.data.prix = null;
              $scope.data.artcilechoisit = null;
              $scope.data.motifchoisit = null;
              $scope.edit = false;

              break;
            } else if (type == 'sup') {

              var object = {
                codePDS: $scope.data.codePDS,
                codeDetail: $scope.itemEdit.codeDetail,
                isCanceled: 1,
                idMotif: +$scope.data.motifchoisit.idMotif,
                isUnloaded: 0
              }

              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });

              ApiDeletDetailPDS.deletDetailPDS(object)
                .success(
                  function (response) {

                    $ionicLoading.hide();
                    console.log('-------Modification edit------')
                    console.log(response)
                    if (response.reponse == 1) {

                      for (var i = 0; i < $scope.data.detailsPDS.length; i++) {
                        if (
                          $scope.data.detailsPDS[i].idMotif === "edit" &&
                          $scope.data.detailsPDS[i].codeArticle ===
                          $scope.itemEdit.codeArticle
                        ) {

                          $scope.data.detailsPDS.splice(i, 1);
                          $scope.data.quantite = null;
                          $scope.data.prix = null;
                          $scope.data.artcilechoisit = null;
                          $scope.data.motifchoisit = null;
                          $scope.edit = false;
                          break;
                        }
                      }
                    }
                  }
                ).error(errorCallback => {
                  $ionicPopup.show({
                    title: "Erreur",
                    template: "Erreur de suppression",
                    scope: $scope,
                    buttons: [
                      {
                        text: "Ok",
                        type: "button-danger",
                      },
                    ],
                  });
                  $ionicLoading.hide();
                })

            }

          }
        }
      } else {
        $ionicPopup.show({
          title: "Erreur",
          template: "Veuillez choisir un motif",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-danger",
            },
          ],
        });
      }
    };
    $scope.initDetailPDS = function () {
      
      console.log('Je rentre ici fct');
      if ($scope.data.recapPrc && $scope.data.recapPrc.length > 0) {
        console.log('Je rentre ici recapPrc');

        $scope.data.detailsPDSRECAP = [];
        $scope.data.detailsPDS = [];
        for (var j = 0; j < $scope.data.recapPrc.length; j++) {
          console.log('Je rentre ici j');
     
          if (
            $scope.data.recapPrc[j].details &&
            $scope.data.recapPrc[j].details.length > 0
          ) {

            for (var k = 0; k < $scope.data.recapPrc[j].recap.length; k++) {
              console.log('Je rentre ici i');
              console.log($scope.data.recapPrc[j]);
              $scope.data.detailrecap = {
                codeDetail: null,
                codePRC: null,
                codePDS: $scope.data.codePDS,
                codeArticle: null,
                quantite: 0,
                prix: 0.0,
                isCanceled: false,
                idMotif: null,
                isUnloaded: false,
                motifchoisit: null,
                artcilechoisit: null,
                index: 0,
                montant: 0,
                article: null,
              };
              $scope.data.detailrecap.codePRC      = $scope.data.recapPrc[j].recap[k].codePRC
              $scope.data.detailrecap.codeDetail   = "RPDS" + "-" + CodeGenere.getCodeGenere();
              $scope.data.detailrecap.codeArticle  = $scope.data.recapPrc[j].recap[k].codeArticle;
              $scope.data.detailrecap.quantite     = $scope.data.recapPrc[j].recap[k].quantite;
              $scope.data.detailrecap.prix         = null;
              $scope.data.detailrecap.idMotif      = 0;
              $scope.data.detailrecap.motifchoisit = null;
              $scope.data.detailrecap.article      = $scope.data.recapPrc[j].recap[k].article;
              $scope.data.detailrecap.index        = j;

      

              $scope.data.detailsPDSRECAP.push($scope.data.detailrecap);
            }

            for (var i = 0; i < $scope.data.recapPrc[j].details.length; i++) {
              console.log('Je rentre ici i');
              $scope.data.detail = {
                codeDetail: null,
                codePRC: null,
                codePDS: $scope.data.codePDS,
                codeArticle: null,
                quantite: 0,
                prix: 0.0,
                isCanceled: false,
                idMotif: null,
                isUnloaded: false,
                motifchoisit: null,
                artcilechoisit: null,
                index: 0,
                montant: 0,
                article: null,
              };
              $scope.data.detail.codePRC = $scope.data.recapPrc[j].details[i].codePRC
              $scope.data.detail.codeDetail =
                "DPDS" + "-" + CodeGenere.getCodeGenere();
              $scope.data.detail.codeArticle =
                $scope.data.recapPrc[j].details[i].codeArticle;
              $scope.data.detail.quantite =
                $scope.data.recapPrc[j].details[i].quantite;
              $scope.data.detail.prix =
                $scope.data.recapPrc[j].details[i].prix;
              $scope.data.detail.idMotif = 0;
              $scope.data.detail.motifchoisit = null;
              $scope.data.detail.article =
                $scope.data.recapPrc[j].details[i].article;
              $scope.data.detail.index = j;

              console.log('------')

              console.log($scope.data.detail);

              $scope.data.detailsPDS.push($scope.data.detail);
            }
          }

        }


      } else {
        $scope.data.detail = {
          codeDetail: null,
          codePRC: $scope.data.codePRC,
          codePDS: $scope.data.codePDS,
          codeArticle: null,
          quantite: 0,
          isCanceled: false,
          idMotif: null,
          isUnloaded: false,
          motifchoisit: null,
          artcilechoisit: null,
          index: 0,
          montant: 0,
          article: null,
        };
      }
    };

    $scope.initPDS = function () {
      $scope.data.pds = {
        codePDS: $scope.data.codePDS,
        codeCommerciale: $scope.data.codeCommerciale,
        codeGrossiste: $scope.data.grossistechoisit
          ? $scope.data.grossistechoisit.codeGrossiste
          : null,
        grossistechoisit: $scope.data.grossistechoisit
          ? $scope.data.grossistechoisit
          : null,
        dateAjout: formatNewDate.formatNewDate(),
        isCanceled: false,
        idMotif: $scope.data.idMotif,
        isCurrent: false,
        isLoaded: false,
        isUnloaded: false,
        isChecked: false,
        codeGenere: CodeGenere.getCodeGenere(),
        detailsPDS: $scope.data.detailsPDS,
        local: false,
        initial: $scope.initial
      };
    };

    $scope.annulerPDSCODESMS = function () {
      console.log($scope.data.annulation)
      if ($scope.data.annulation == false) {
        $scope.data.annulation = true;
      } else {
        if ($scope.data.motifchoisit) {
          localStorage.setItem("pds", null);
          var pds = JSON.parse(localStorage.getItem('pdslocal'));

          if (pds && pds.length > 0) {

            var searchPds = $filter('filter')(pds, { codePDS: $scope.data.pds.codePDS });
            if (searchPds && searchPds.length === 1) {
              var pdsLocal = searchPds[0];
              pds.splice(pdsLocal, 1);

              localStorage.setItem('pdslocal', JSON.stringify(pds))
            }
          }
          //codePDS(string), isCanceled(int), idMotif(int)
          var value = {
            codePDS     : $scope.data.pds.codePDS,
            isCanceled  : 1,
            idMotif     : +$scope.data.motifchoisit.idMotif

          }
          $scope.validerDelet(value);

        } else {
          $ionicPopup.show({
            title: 'Alert ',
            template: 'Veuillez choisir le motif d\'annulation svp.',
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-positive'
              }
            ]
          });
        }


      }

    }

    $scope.validerDelet = function(value)
    {
      ApiDeletPDS.deletPDS(value)
              .success(
                function (response) {
                  console.log('----------Annulatioon pds-------------');
                  console.log(response);
                  $ionicLoading.hide();
                  $state.transitionTo(
                    "app.pds",
                    {},
                    {
                      reload: true,
                      inherit: true,
                      notify: true,
                    }
                  );
            
                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )

    }

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
      console.log(response);
    });

    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });


    $scope.initvar();

    ApiListGrossiste.getListGrossiste($scope.initial, $scope.data.codeCommerciale).success(function (response) {
      if (response) {
        $scope.data.grossistes = response;
      }

    });

    $scope.ajouter = function () {
      if ($scope.data.quantite && $scope.data.prix && $scope.data.artcilechoisit) {
        var searchArt = $scope.data.detailsPDS && $scope.data.detailsPDS.length > 0
          ? $filter('filter')($scope.data.detailsPDS, { codeArticle: $scope.data.artcilechoisit.code })
          : [];
        if (searchArt && searchArt.length > 0) {
          $ionicPopup.show({
            title: 'Alert ',
            template: 'Desolé! Cet article est dèjà ajouté.',
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-positive'
              }
            ]
          });
        } else {
          $scope.initDetailPDS();

          $scope.data.detail.codeDetail = "DPDS" + "-" + CodeGenere.getCodeGenere();
          $scope.data.detail.codeArticle = $scope.data.artcilechoisit.code;
          $scope.data.detail.quantite = $scope.data.quantite;
          $scope.data.detail.prix = $scope.data.prix;
          $scope.data.detail.idMotif = $scope.data.idMotif;
          $scope.data.detail.article = $scope.data.artcilechoisit.libelle;
          //  $scope.data.detail.motifchoisit   = $scope.data.motifchoisit;
          $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
          $scope.data.detail.index = $scope.data.detailsPDS.length + 1;
          console.log($scope.data.detail);
          $scope.data.detailsPDS.push($scope.data.detail);

          $scope.initDetailPDS();
          $scope.data.quantite = null;
          $scope.data.prix = null;
          $scope.data.artcilechoisit = null;
          $scope.data.motifchoisit = null;
        }

      } else {
        $ionicPopup.show({
          title: 'Alert ',
          template: 'Desolé! Veuillez ajouter un article avec quantité et prix unitaire.',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-positive'
            }
          ]
        });
      }

    };
    $scope.getOptGrossiste = function (option) {
      return option;
    };
    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.getOptArticle = function (option) {
      return option;
    };
    $scope.validerPdsAndSendCode = function () {


      if ($scope.data.grossistechoisit) {
        $scope.initPDS();
        var err = null;
        if($scope.data.pds.initial == false){

          if($scope.data.detailsPDSRECAP && $scope.data.detailsPDSRECAP.length > 0){
            for(var i = 0; i< $scope.data.detailsPDSRECAP.length; i++){
              console.log($scope.data.detailsPDSRECAP[i].prix);
                  if(!$scope.data.detailsPDSRECAP[i].prix || $scope.data.detailsPDSRECAP[i].prix <= 0)
                  {
                    err =  i;
                    break;
                  }
            }
          }
        }
        console.log('------_Error---------')
        console.log(err)
        if(err == null)
        {
          if ($scope.data.pds.detailsPDS && $scope.data.pds.detailsPDS.length > 0) {
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });
  
            //$scope.data.pds.codeGenere;
  
            //Article, quatite, valeur et en bas valeur total et code de securite
  
            var message = "";
            var mnt = 0.0;
            for (var i = 0; i < $scope.data.pds.detailsPDS.length; i++) {
              var index = i + 1;
              console.log($scope.data.pds.detailsPDS[i]);
              message =
                message +
                "" +
                index +
                ")  " +
                $scope.data.pds.detailsPDS[i].article +
                " " +
                "\n Quantité: " +
                $scope.data.pds.detailsPDS[i].quantite +
                "" +
                "\n Prix: " +
                $scope.data.pds.detailsPDS[i].prix +
                "" +
                "\n \n";
              mnt = mnt + ($scope.data.pds.detailsPDS[i].prix * $scope.data.pds.detailsPDS[i].quantite);
            }
            var messageMontant = "";
            if ($scope.data.recapPRC && $scope.data.recapPRC.length > 0) {
              messageMontant =
                "\n Montant total:   " + $scope.data.recapPRC[0].montant + "FCFA";
            } else {
              messageMontant =
                "\n Montant total:   " + mnt + "FCFA";
            }
  
            var messageCode = "\n Code::    " + $scope.data.pds.codeGenere;
            var MessageGlobal = message + messageMontant + messageCode;
            console.log(messageCode);
            
            console.log($scope.data.pds);
            console.log($scope.data.detailsPDSRECAP);
            
            try {
              console.log(messageCode);
  
              SendSms.sendSMS(MessageGlobal, $scope.data.grossistechoisit.telephone);
  
              localStorage.setItem("pds", JSON.stringify($scope.data.pds));
  
  
  
              $scope.code = "attente";
  
              $ionicLoading.hide();
            } catch (err) {
              $ionicLoading.hide();
              $ionicPopup.show({
                title: 'Alert ',
                template: 'Erreur lors du traitement. code erreur: MX2020. Veuillez Contacter votre administrateur svp',
                scope: $scope,
                buttons: [
                  {
                    text: 'OK',
                    type: 'button-positive'
                  }
                ]
              });
            }
  
          } else {
            $ionicPopup.show({
              title: "Erreur",
              template: "Impossible d'ajouter une recup marchandise sans details.",
              scope: $scope,
              buttons: [
                {
                  text: "Ok",
                  type: "button-positive",
                },
              ],
            });
          }
        }else
        {
          $ionicPopup.show({
            title: 'Alert ',
            template: 'L\'article au niveau du tableau récapitulatif prc a la ligne '+(err+1)+' n\'a pas de prix',
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-positive'
              }
            ]
          });
        }



      } else {
        $ionicPopup.show({
          title: "Erreur",
          template: "Veuillez choisir un grossiste.",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-positive",
            },
          ],
        });
      }

    };

    $scope.sauvegarder = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });

      $scope.initPDS();
      $scope.data.pds.local = true;
      var pdslocal = JSON.parse(localStorage.getItem('pdslocal'));
      if (!pdslocal || pdslocal.length == 0) {
        pdslocal = [];
      }
      pdslocal.push($scope.data.pds);
     
      localStorage.setItem('pdslocal', JSON.stringify(pdslocal));

      $ionicLoading.hide();

      $scope.data.detailsPDS = [];
      $scope.data.pds = {};
      $scope.code = "initiale";
      localStorage.setItem("pds", null);

      $ionicPopup.show({
        title: "Info",
        template: "Sauvegardé.",
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      }).then(function (result) {

        $state.transitionTo(
          "app.pds",
          {},
          {
            reload: true,
            inherit: true,
            notify: true,
          }
        );

      });

    }

    $scope.submit = function () {

      console.log("-----------------Value PDS-------------");

      console.log($scope.data.pds);
      if ($scope.data.pds.codeGenere === $scope.data.code) {
        console.log("code :", $scope.data.pds.codeGenere);
        console.log("compare :", $scope.data.code);
        $scope.data.pds.isLoaded = 1;
        $scope.data.pds.isCurrent = 1;
        for (var i = 0; i < $scope.data.pds.detailsPDS.length; i++) {
          $scope.data.pds.detailsPDS[i].isLoaded = 1;
        }

        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        $scope.initial = $scope.data.pds.initial;
        if ($scope.data.pds.initial) {

          var values = {

            codePDS: $scope.data.pds.codePDS,
            codeCommerciale: $scope.data.codeCommerciale,
            codeGrossiste: $scope.data.pds.codeGrossiste,
            dateAjout: formatNewDate.formatNewDate(),
            //dateAjout:"2020-10-20 08:13:50",
            isCanceled: $scope.data.pds.isCanceled,
            idMotif: $scope.data.pds.idMotif,
            isCurrent: $scope.data.pds.isCurrent,
            isLoaded: $scope.data.pds.isLoaded,
            isUnloaded: $scope.data.pds.isUnloaded,
            isChecked: $scope.data.pds.isChecked,
            codeGenere: $scope.data.pds.codeGenere,
            detailsPDS: []
          }

          for (var i = 0; i < $scope.data.pds.detailsPDS.length; i++) {
            var detail = {
              codeDetail: $scope.data.pds.detailsPDS[i].codeDetail,
              codeArticle: $scope.data.pds.detailsPDS[i].codeArticle,
              quantite: $scope.data.pds.detailsPDS[i].quantite,
              prix: $scope.data.pds.detailsPDS[i].prix,
              isCanceled: $scope.data.pds.detailsPDS[i].isCanceled,
              idMotif: $scope.data.pds.detailsPDS[i].idMotif,
              isUnloaded: $scope.data.pds.detailsPDS[i].isUnloaded
            }
            values.detailsPDS.push(detail);
          }

          $scope.data.pds = values;

        } else {
          var values = {


            codePDS: $scope.data.pds.codePDS,
            codeCommerciale: $scope.data.codeCommerciale,
            codeGrossiste: $scope.data.pds.codeGrossiste,
            //dateAjout: $scope.data.pds.dateAjout,
            dateAjout: formatNewDate.formatNewDate(),
            isCanceled: $scope.data.pds.isCanceled,
            idMotif: $scope.data.pds.idMotif,
            isCurrent: $scope.data.pds.isCurrent,
            isLoaded: $scope.data.pds.isLoaded,
            isUnloaded: $scope.data.pds.isUnloaded,
            isChecked: $scope.data.pds.isChecked,
            codeGenere: $scope.data.pds.codeGenere,
            detailsPDS: []
          }
          console.log(values);

          for (var i = 0; i < $scope.data.pds.detailsPDS.length; i++) {
            var article = $filter('filter')($scope.data.detailsPDSRECAP, {codeArticle: $scope.data.pds.detailsPDS[i].codeArticle});
            var prix = $scope.data.pds.detailsPDS[i].prix;
            if(article && article.length > 0){
              prix = article[0].prix;
            }
            var detail = {
              codeDetail: $scope.data.pds.detailsPDS[i].codeDetail,
              codePRC: $scope.data.pds.detailsPDS[i].codePRC,
              codePDS: $scope.data.pds.detailsPDS[i].codePDS,
              codeArticle: $scope.data.pds.detailsPDS[i].codeArticle,
              quantite: $scope.data.pds.detailsPDS[i].quantite,
              prix: prix && prix > 0  ? prix : $scope.data.pds.detailsPDS[i].prix,
              isCanceled: $scope.data.pds.detailsPDS[i].isCanceled,
              idMotif: $scope.data.pds.detailsPDS[i].idMotif,
              isUnloaded: $scope.data.pds.detailsPDS[i].isUnloaded
            }
            values.detailsPDS.push(detail);
          }

          console.log("values not initiale", values);
          $scope.data.pds = values;


        }


        console.log("data pds", $scope.data.pds);

        //  $scope.data.pds.dateAjout = '2020-10-20 08:13:50';
        if ($scope.data.pds.detailsPDS && $scope.data.pds.detailsPDS.length > 0) {

          $scope.data.pds.isCanceled = $scope.data.pds.isCanceled ? 1 : 0;
          $scope.data.pds.isChecked = $scope.data.pds.isChecked ? 1 : 0;
          $scope.data.pds.isUnloaded = $scope.data.pds.isUnloaded ? 1 : 0;
          if ($scope.data.pds.dateAjout != " ") {
            $scope.data.pds.dateAjout = formatNewDate.formatNewDate();
          }

          for (var i = 0; i < $scope.data.pds.detailsPDS.length; i++) {
            $scope.data.pds.detailsPDS[i].isCanceled = $scope.data.pds.detailsPDS[i].isCanceled ? 1 : 0;
            $scope.data.pds.detailsPDS[i].isUnloaded = $scope.data.pds.detailsPDS[i].isUnloaded ? 1 : 0;

            if ($scope.data.pds.detailsPDS[i].quantite != " ") {
              $scope.data.pds.detailsPDS[i].quantite = parseInt($scope.data.pds.detailsPDS[i].quantite);
            } else {
              console.log($scope.data.pds.detailsPDS[i].quantite)
            }

            if ($scope.data.pds.detailsPDS[i].prix != " ") {
              $scope.data.pds.detailsPDS[i].prix = parseInt($scope.data.pds.detailsPDS[i].prix);
            } else {
              console.log($scope.data.pds.detailsPDS[i].prix)
            }


          }



          ApiAjoutPdsFromRecap.ajoutPdsFromRecap($scope.data.pds, $scope.initial).success(
            function (response) {
              $ionicLoading.hide();
              console.log('----Reponse---');
              console.log(response)

              if (response.reponse == 1) {

                var pds = JSON.parse(localStorage.getItem('pdslocal'));

                if (pds && pds.length > 0) {

                  var searchPds = $filter('filter')(pds, { codePDS: $scope.data.pds.codePDS });
                  if (searchPds && searchPds.length === 1) {
                    var pdsLocal = searchPds[0];
                    pds.splice(pdsLocal, 1);

                    localStorage.setItem('pdslocal', JSON.stringify(pds))
                  }
                }


                $scope.data.detailsPDS = [];
                $scope.data.pds = {};
                $scope.code = "initiale";
                localStorage.setItem("pds", null);
                localStorage.setItem('pdsLocalToValide', null)
                $scope.synchroStock();

                $state.transitionTo(
                  "app.pds",
                  {},
                  {
                    reload: true,
                    inherit: true,
                    notify: true,
                  }
                );
              } else {
                $ionicPopup.show({
                  title: "Info",
                  template: "" + response.reponse,
                  scope: $scope,
                  buttons: [
                    {
                      text: "Ok",
                      type: "button-positive",
                    },
                  ],
                });
              }
            },
            (error) => {

            }
          ).error(errorCallback => {
            $ionicLoading.hide();
          });



        } else if (response.reponse == -200) {
          $ionicPopup.show({
            title: "Infos",
            template: "Impossible d'ajouter un pds sans details",
            scope: $scope,
            buttons: [
              {
                text: "Ok",
                type: "button-positive",
              },
            ],
          });


        }



      } else {
        $ionicPopup.show({
          title: "Erreur de code",
          template: "Le code saisi ne correspond pas. Reesayer svp.",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-positive",
            },
          ],
        });
      }
    };
  })


  .controller("FacturationsCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    ApiRecapPdsPrc,
    ApiListFacturation
  ) {
    console.log("Facture");

    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.codeCommerciale = localStorage.getItem("codeCommerciale");
      $scope.data.user = JSON.parse(localStorage.getItem("user"));
      $scope.data.facturations = [];
    };

    $scope.initFacturations = function () {
      console.log($scope.data.user);
      if ($scope.data.user.code) {
        var code = { codeCommerciale: $scope.data.user.code  };
        console.log(code);
        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });
        ApiListFacturation.getListFacturation(code).success(
          function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.facturations = response;
            }
            console.log(
              "-----------------------Facturation----------------------"
            );
            console.log(response);
          },
          (error) => {
            $ionicLoading.hide();
          }
        );
      }
    };
    $scope.initvar();
    $scope.initFacturations();

    $scope.goToNewFact = function () {
      localStorage.setItem('prc', null);
      $state.transitionTo(
        "app.facturation",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };

    $scope.goToDetailFact = function (code) {
      localStorage.setItem("codeFacture", code);
      $state.transitionTo(
        "app.details-facture",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };
  })
  .controller("DetailsFactureCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListPrc,
    ApiDetailPrc,
    ApiAjoutPrc,
    ApiListClient,
    ApiListMotif,
    ApiListArticle,
    $ionicPopup,
    ApiRecapPdsPrc,
    ApiListFacturation,
    formatNewDate,
    ApiDeatilsFacture,
    checkQuantite, ApiModificationDetailFact, ApiDeletDetailFact, CodeGenere, ApiEncaissement

  ) {
    console.log("Facture");

    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.codeFacture = localStorage.getItem("codeFacture");
      $scope.data.detailsfactues = {};
      $scope.data.montant = 0;

      $scope.edit = false;

      $scope.data.user = JSON.parse(localStorage.getItem("user"));
      console.log("----------------Value PRC----------------");
      $scope.data.idMotif = 0;
      $scope.data.listmotifs = [];
      $scope.data.listarticles = [];
      $scope.data.motifchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.quantite = 0;
      $scope.data.encaisser = false;
      $scope.data.codeCommerciale = $scope.data.user.code;

    };

    $scope.annulerEncaissement = function () {
      $scope.data.encaisser = false;
    }

    $scope.encaisser = function () {
      $scope.data.encaisser = true;
    }

    $scope.submit = function () {
      var err = null;

      err = parseFloat($scope.data.detailsfactures.montant) < parseFloat($scope.data.montant) ? 'Le montant encaissé ne peut pas être supérieur a celui de la facture.' : err
      console.log(err)
      console.log(parseFloat($scope.data.detailsfactures.montant))
      console.log(parseFloat($scope.data.montant))
      if (err == null) {
        if ($scope.data.montant && $scope.data.montant > 0) {
          var values = {
            codeEncaissement:
              "ENC" +
              "-" +
              $scope.data.codeCommerciale +
              "-" +
              CodeGenere.getCodeGenere(),
            codeFacture: $scope.data.detailsfactures.codeFacture,
            codeCommerciale: $scope.data.codeCommerciale,
            montant: +$scope.data.montant,
            dateAjout: formatNewDate.formatNewDate(),
            isCanceled: 0,
            idMotif: 0

          }
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });
          console.log(values);

          ApiEncaissement.ajoutEncaissement(values).
            then(function (response) {
              $ionicLoading.hide();
              if (response.data.reponse == 1) {
                $ionicPopup.show({
                  title: "Info",
                  template: "Reussi",
                  scope: $scope,
                  buttons: [
                    {
                      text: "Ok",
                      type: "button-positive",
                    },
                  ],
                }).then(function (result) {

                  $state.transitionTo(
                    "app.facturations",
                    {},
                    {
                      reload: true,
                      inherit: true,
                      notify: true,
                    }
                  );

                })
              } else {
                $ionicPopup.show({
                  title: "Erreur",
                  template: "Erreur d'insertion",
                  scope: $scope,
                  buttons: [
                    {
                      text: "Ok",
                      type: "button-positive",
                    },
                  ],
                }).then(function (result) {

                  $state.transitionTo(
                    "app.facturations",
                    {},
                    {
                      reload: true,
                      inherit: true,
                      notify: true,
                    }
                  );

                })
              }


              console.log(response)
            }, err => {
              $ionicLoading.hide()
            })
        } else {
          $ionicPopup.show({
            title: "Info",
            template: "Le montant doit être renseigné",
            scope: $scope,
            buttons: [
              {
                text: "Ok",
                type: "button-positive",
              },
            ],
          });
        }
      } else {
        $ionicPopup.show({
          title: "Info",
          template: err,
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-positive",
            },
          ],
        });
      }




    }


    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }

    });



    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
    });


    $scope.editDetail = function (item, action) {
      $scope.edit = true;
      $scope.action = action;
      item.idMotif = "edit";

      $scope.data.artcilechoisit = {};
      console.log("--------------Artcile---------------");
      console.log(item.article);
      $scope.data.artcilechoisit.libelle = item.article
      $scope.data.artcilechoisit.code = item.codeArticle
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;

      for (var i = 0; i < $scope.data.detailsfactures.details.length; i++) {
        if (
          $scope.data.detailsfactures.details[i].idMotif === "edit" &&
          $scope.data.detailsfactures.details[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsfactures.details[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };

    $scope.valideEdit = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsfactures.details.length; i++) {
          if (
            $scope.data.detailsfactures.details[i].idMotif === "edit" &&
            $scope.data.detailsfactures.details[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {

            var errorMessage = checkQuantite.checkQuantite($scope.data.artcilechoisit.code, $scope.data.quantite);

            if (errorMessage == 1) {


              var ligneDetailTosend = {
                codeFacture: $scope.data.detailsfactures.codeFacture,
                codeDetail: $scope.itemEdit.codeDetail,
                codeArticle: $scope.data.artcilechoisit.code,
                quantite: $scope.data.quantite,
                isCanceled: 1,
                idMotif: $scope.data.motifchoisit.idMotif
              }
              console.log('-----Objet to modif');
              console.log(ligneDetailTosend);
              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });

              ApiModificationDetailFact.modificationDetailFact(ligneDetailTosend)
                .success(
                  function (response) {

                    $ionicLoading.hide();
                    console.log('-------Modification edit------')
                    console.log(response)
                    if (response.reponse == 1) {

                      $scope.data.detailsfactures.details[i].idMotif =
                        $scope.data.motifchoisit.idMotif;
                      $scope.data.detailsfactures.details[i].quantite = $scope.data.quantite;
                      $scope.data.detailsfactures.details[i].codeArticle = $scope.data.artcilechoisit.code;
                      $scope.data.detailsfactures.details[i].article = $scope.data.artcilechoisit.libelle;

                      $scope.edit = false;
                      $scope.data.motifchoisit = null;

                      $ionicPopup.show({
                        title: "Information",
                        template: 'réussi',
                        scope: $scope,
                        buttons: [
                          {
                            text: "Ok",
                            type: "button-assertive",
                          },
                        ],
                      });
                    }

                  }, (error) => {
                    $ionicLoading.hide();
                    $scope.Erreur(errorMessage);
                  }
                )


            } else {
              $scope.Erreur(errorMessage);
            }

            break;
          }
        }
      } else {
        var message = "Veuillez choisir un motif"
        $scope.Erreur(message);

      }
    };

    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsfactures.details.length; i++) {
        if (
          $scope.data.detailsfactures.details[i].idMotif === "edit" &&
          $scope.data.detailsfactures.details[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsfactures.details[i].idMotif = 0;
          break;
        }
      }
    }

    $scope.validerDelet = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        $ionicPopup.show({
          title: "Infos",
          template: "Voulez-vous vraimenet suprimer ce details?",
          scope: $scope,
          buttons: [
            {
              text: 'OUI',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            },
            {
              text: 'NON',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
          ]
        }).then(function (result) {
          if (result) {
            console.log('OUI');

            var ligneDetailTosend = {
              codeFacture: $scope.data.detailsfactures.codeFacture,
              codeDetail: $scope.itemEdit.codeDetail,
              isCanceled: 1,
              idMotif: $scope.data.motifchoisit.idMotif
            }
            console.log('-----------Object to delet----------');
            console.log(ligneDetailTosend);
            $ionicLoading.show({
              content: "Loading",
              animation: "fade-in",
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0,
              duration: 10000,
            });

            $scope.edit = false;
            $scope.data.motifchoisit = null;
            for (var i = 0; i < $scope.data.detailsfactures.details.length; i++) {
              if (
                $scope.data.detailsfactures.details[i].idMotif === "edit" &&
                $scope.data.detailsfactures.details[i].codeArticle ===
                $scope.itemEdit.codeArticle
              ) {

                $scope.data.detailsfactures.details.splice(i, 1);
                $scope.edit = false;
                $scope.data.motifchoisit = null;

                break;
              }
            }

            ApiDeletDetailFact.deletDetailFact(ligneDetailTosend)
              .success(
                function (response) {

                  $ionicLoading.hide();
                  console.log('-------Modification edit------')
                  console.log(response)
                  if (response.reponse == 1) {


                    $ionicPopup.show({
                      title: "Information",
                      template: 'réussi',
                      scope: $scope,
                      buttons: [
                        {
                          text: "Ok",
                          type: "button-assertive",
                        },
                      ],
                    });
                  }

                }, (error) => {
                  $ionicLoading.hide();
                  $scope.Erreur(error);
                }
              )


          } else {
            console.log('NON');
          }
        });
      } else {
        $ionicPopup.show({
          title: "Infos",
          template: "Veuillz choisir le motif de suppression?",
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }
          ]
        }).then(function (result) {
          if (result) {

          }
        })
      }


    }


    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.getOptArticle = function (option) {
      return option;
    };


    $scope.initDetailsFacturations = function () {
      var code = { codeFacture: $scope.data.codeFacture };
      console.log(code);
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      ApiDeatilsFacture.getDeatilsFacture(code).success(
        function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.detailsfactures = response;
          }
          console.log(
            "-----------------------Details Facturation----------------------"
          );
          console.log(response);
        },
        (error) => {
          $ionicLoading.hide();
        }
      );
    };
    $scope.initvar();
    $scope.initDetailsFacturations();

    $scope.goToNewFact = function () {
      //  localStorage.setItem('recapPRC', JSON.stringify(recap));
      $state.transitionTo(
        "app.facturation",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    };
    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
    }

  })

  .controller("FacturationCtrl", function (
    $scope,
    $state,
    $ionicLoading,
    ApiListClient,
    ApiListMotif,
    $ionicPopup,
    CodeGenere,
    ApiAjoutFacturation,
    ApiRecapFactPrc,
    $state,
    $cordovaGeolocation,
    ApiListArticle,
    checkQuantite,
    ApiCodePDS,
    formatNewDate,
    ApiListStock,
    $filter, ApiDeletDetailFact

  ) {
    $scope.data = {};

    $scope.initvar = function () {
      // JSON.parse(localStorage.getItem('recapPRC'))
      $scope.edit = false;

      $scope.data.prc = localStorage.getItem("prc") ? JSON.parse(localStorage.getItem("prc")) : null;
      $scope.initial = $scope.data.prc ? false : true;
      console.log('----initial---------');
      console.log($scope.initial)
      console.log($scope.data.prc)
      $scope.data.user = JSON.parse(localStorage.getItem("user"));
      console.log("----------------Value PRC----------------");
      console.log($scope.data.prc);
      console.log($scope.data.prc);
      $scope.data.codeCommerciale = $scope.data.user ? $scope.data.user.code : null;
      $scope.data.codePRC = $scope.data.prc ? $scope.data.prc.codePRC : null;
      $scope.data.idModepaiement = $scope.data.prc ? $scope.data.prc.idModepaiement : null;
      $scope.data.idMotif = 0;
      $scope.data.listmotifs = [];
      $scope.data.clients = [];
      $scope.data.listarticles = [];
      $scope.data.motifchoisit = null;
      $scope.data.clientchoisit = null;
      $scope.data.artcilechoisit = null;
      $scope.data.codeFacture =
        "FCT" +
        "-" +
        $scope.data.codeCommerciale +
        "-" +
        CodeGenere.getCodeGenere();
      $scope.data.detailsFACT = []

      $scope.data.detail = {};
      $scope.data.fact = {};
      $scope.data.quantite = null;
      $scope.data.prix = null;
      $scope.data.libelle = null;
      $scope.data.delaipaiement = null;
      $scope.data.codePDS = null;
      $scope.data.montantTotal = 0;
      // $scope.initDetailFCT();
    };

    $scope.getcodepds = function () {
      ApiCodePDS.getCodePDS()
        .then(value => {
          console.log('-----COde PDS-----------');
          console.log(value);
          $scope.data.codePDS = value.data.codePDS;
          console.log($scope.data.codePDS);
        })
    }
    $scope.getcodepds();

    $scope.showPopUp = function (libelle, etat, code = "") {

      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };
    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsFACT.length; i++) {
        if (
          $scope.data.detailsFACT[i].idMotif === "edit" &&
          $scope.data.detailsFACT[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsFACT[i].idMotif = 0;
          $scope.data.quantite = null;
          $scope.data.prix = null;
          $scope.data.artcilechoisit = null;
          $scope.data.motifchoisit = null;
          break;
        }
      }
    }

    $scope.editDetail = function (item) {
      $scope.edit = true;
      item.idMotif = "edit";

      $scope.data.artcilechoisit = {};
      console.log("--------------Artcile---------------");
      console.log(item.article);
      $scope.data.artcilechoisit.libelle = item.article
      $scope.data.artcilechoisit.code = item.codeArticle
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;
      $scope.data.prix = +item.prix;

      for (var i = 0; i < $scope.data.detailsFACT.length; i++) {
        if (
          $scope.data.detailsFACT[i].idMotif === "edit" &&
          $scope.data.detailsFACT[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsFACT[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };

    $scope.valideEdit = function (type = null) {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsFACT.length; i++) {
          if (
            $scope.data.detailsFACT[i].idMotif === "edit" &&
            $scope.data.detailsFACT[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {



            if (type == null) {
              var errorMessage = checkQuantite.checkQuantite($scope.data.artcilechoisit.code, $scope.data.quantite);

              if (errorMessage == 1) {
                $scope.data.detailsFACT[i].idMotif =
                  $scope.data.motifchoisit.idMotif;
                $scope.data.detailsFACT[i].quantite = $scope.data.quantite;
                $scope.data.detailsFACT[i].prix = $scope.data.prix;
                $scope.data.detailsFACT[i].codeArticle = $scope.data.artcilechoisit.code;
                $scope.data.detailsFACT[i].article = $scope.data.artcilechoisit.libelle;

                $scope.edit = false;
                $scope.data.motifchoisit = null;
              } else {
                $scope.Erreur(errorMessage);
              }

            } else if (type == 'sup') {


              var object = {
                codeFacture: $scope.data.codeFacture,
                codeDetail: $scope.itemEdit.codeDetail,
                isCanceled: 1,
                idMotif: parseInt($scope.data.motifchoisit.idMotif),
              }

              $ionicLoading.show({
                content: "Loading",
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000,
              });
              console.log('-------------objet to delet-------------')
              console.log(object)

              ApiDeletDetailFact.deletDetailFact(object, false)
                .success(
                  function (response) {

                    $ionicLoading.hide();
                    console.log('-------Modification edit------')
                    console.log(response)
                    if (response.reponse == 1) {

                      for (var i = 0; i < $scope.data.detailsFACT.length; i++) {
                        if (
                          $scope.data.detailsFACT[i].idMotif === "edit" &&
                          $scope.data.detailsFACT[i].codeArticle ===
                          $scope.itemEdit.codeArticle
                        ) {

                          $scope.data.detailsFACT.splice(i, 1);
                          $scope.data.quantite = null;
                          $scope.data.libelle = null;
                          $scope.data.prix = null;
                          $scope.data.artcilechoisit = null;
                          $scope.data.motifchoisit = null;
                          $scope.edit = false;
                          break;
                        }
                      }
                    }
                  }
                ).error(errorCallback => {
                  $ionicPopup.show({
                    title: "Erreur",
                    template: "Erreur de suppression",
                    scope: $scope,
                    buttons: [
                      {
                        text: "Ok",
                        type: "button-danger",
                      },
                    ],
                  });
                  $ionicLoading.hide();
                })

            }

            break;
          }
        }
      } else {
        var message = "Veuillez choisir un motif"
        $scope.Erreur(message);

      }
    };
    //Comptant c'est 1. Crédit c'est 2. Et tu as un service pour cette liste de modes de paiement

    $scope.initFact = function () {
      $scope.data.fact = {
        codeFacture: $scope.data.codeFacture,
        codeCommerciale: $scope.data.codeCommerciale,
        codePRC: $scope.data.codePRC,
        dateAjout: formatNewDate.formatNewDate(),
        codeClient: $scope.data.codeClient,
        isCanceled:  $scope.data.isCanceled ? 1 : 0,
        position: null,
        idModepaiement: $scope.data.idModepaiement,
        idMotif: $scope.data.idMotif,
        codePDS: $scope.data.codePDS,
        details: $scope.data.detailsFACT,
       // detailsIsCanceled: $scope.data.detailsFACT[0].isCanceled,
       // detailsIsUnloaded: $scope.data.detailsFACT[0].isUnloaded,
        
        
      };
    };

    $scope.initRecap = function () {
      console.log('-----Code PRC for Recap -----');
      console.log($scope.data.codePRC);
      if ($scope.data.codePRC) {
        var code = { codePRC: $scope.data.codePRC };

        $ionicLoading.show({
          content: "Loading",
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: 10000,
        });

   /*
            $scope.data.recapPrc.isCanceled = $scope.data.recapPrc.isCanceled ? 1 : 0;
            $scope.data.recapPrc.idMotif = $scope.data.recapPrc.idMotif ? 1 : 0;

            if ($scope.data.recapPrc.idModepaiement == "1" || $scope.data.recapPrc.idModepaiement == "2") {
              $scope.data.recapPrc.idModepaiement = parseInt($scope.data.recapPrc.idModepaiement);
            } else {
              console.log("affiche", $scope.data.recapPrc.idModepaiement)
            }

            if ($scope.data.recapPrc.delaiPaiement != " ") {
              $scope.data.recapPrc.delaiPaiement = parseInt($scope.data.recapPrc.delaiPaiement);
            } else {
              console.log("affiche", $scope.data.recapPrc.delaiPaiement)
            }

            if ($scope.data.recapPrc.montant != " ") {
              $scope.data.recapPrc.montant = parseInt($scope.data.recapPrc.montant);
            } else {
              console.log("affiche", $scope.data.recapPrc.montant)
            }


            for (var i = 0; i < $scope.data.details.length; i++) {
              $scope.data.details[i].isCanceled = $scope.data.details[i].isCanceled ? 1 : 0;
              $scope.data.details[i].idMotif = $scope.data.details[i].idMotif ? 1 : 0;

              if ($scope.data.details[i].prix != " ") {
                $scope.data.details[i].prix = parseInt($scope.data.details[i].prix);
              }

              if ($scope.data.details[i].quantite != " ") {
                $scope.data.details[i].quantite = parseInt($scope.data.details[i].quantite);
              }

              if ($scope.data.details[i].idDetailsPRC != " ") {
                $scope.data.details[i].idDetailsPRC = parseInt($scope.data.details[i].idDetailsPRC);
              }
            }*/


        ApiRecapFactPrc.getRecapFactPrc(code).success(
          function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.recapPrc = response;
              console.log(
                "-----------------------Recap PRC Fact----------------------");
              console.log($scope.data.recapPrc);
              if ($scope.data.recapPrc) {
                $scope.data.codePDS = $scope.data.recapPrc.codePDS;
                $scope.data.codeClient = $scope.data.recapPrc.codeClient;
                console.log('------push detail to detailsFACT-------1');

                if ($scope.data.recapPrc.details) {
                  console.log('------push detail to detailsFACT-------2');
                  $scope.data.recapPrc.isCanceled = $scope.data.recapPrc.isCanceled ? 1 : 0;
                  $scope.data.recapPrc.idMotif = $scope.data.recapPrc.idMotif ? 1 : 0;
      
                  if ($scope.data.recapPrc.idModepaiement == "1" || $scope.data.recapPrc.idModepaiement == "2") {
                    $scope.data.recapPrc.idModepaiement = parseInt($scope.data.recapPrc.idModepaiement);
                  } else {
                    console.log("affiche", $scope.data.recapPrc.idModepaiement)
                  }
      
                  if ($scope.data.recapPrc.delaiPaiement != " ") {
                    $scope.data.recapPrc.delaiPaiement = parseInt($scope.data.recapPrc.delaiPaiement);
                  } else {
                    console.log("affiche", $scope.data.recapPrc.delaiPaiement)
                  }
      
                  if ($scope.data.recapPrc.montant != " ") {
                    $scope.data.recapPrc.montant = parseInt($scope.data.recapPrc.montant);
                  } else {
                    console.log("affiche", $scope.data.recapPrc.montant)
                  }
                  
            for (var i = 0; i < $scope.data.recapPrc.details.length; i++) {
              $scope.data.recapPrc.details[i].isCanceled = $scope.data.recapPrc.details[i].isCanceled ? 1 : 0;
              $scope.data.recapPrc.details[i].idMotif = $scope.data.recapPrc.details[i].idMotif ? 1 : 0;

              if ($scope.data.recapPrc.details[i].prix != " ") {
                $scope.data.recapPrc.details[i].prix = parseInt($scope.data.recapPrc.details[i].prix);
              }

              if ($scope.data.recapPrc.details[i].quantite != " ") {
                $scope.data.recapPrc.details[i].quantite = parseInt($scope.data.recapPrc.details[i].quantite);
              }

              if ($scope.data.recapPrc.details[i].idDetailsPRC != " ") {
                $scope.data.recapPrc.details[i].idDetailsPRC = parseInt($scope.data.recapPrc.details[i].idDetailsPRC);
              }
            }
                  $scope.data.detailsFACT = [];
                  console.log($scope.data.recapPrc);
                  console.log($scope.data.recapPrc.details);
                  for (var i = 0; i < $scope.data.recapPrc.details.length; i++) {
                    $scope.data.detail = {
                      codeDetail: null,
                      codePRC: $scope.data.codePRC,
                      codePDS: $scope.data.codePDS,
                      codeArticle: null,
                      quantite: 0,
                      isCanceled: false,
                      idMotif: null,
                      isUnloaded: false,
                      motifchoisit: null,
                      artcilechoisit: null,
                      index: 0,
                      montant: 0,
                      article: null,
                    };
                    console.log($scope.data.recapPrc.details);
                    $scope.data.detail.codeDetail =
                      "DPDS" + "-" + CodeGenere.getCodeGenere();
                    $scope.data.detail.codeArticle =
                      $scope.data.recapPrc.details[i].codeArticle;
                    $scope.data.detail.quantite =
                      $scope.data.recapPrc.details[i].quantite;
                    $scope.data.detail.prix =
                      $scope.data.recapPrc.details[i].prix;
                    $scope.data.detail.idMotif = 0;
                    $scope.data.detail.motifchoisit = null;
                    $scope.data.detail.article =
                      $scope.data.recapPrc.details[i].article;
                    $scope.data.detail.index = $scope.data.recapPrc.details.length + 1;
                    $scope.data.detail.isCanceled = $scope.data.detail.isCanceled ? 1 : 0;
                    $scope.data.detail.isUnloaded = $scope.data.detail.isUnloaded ? 1 : 0;

                    $scope.data.detailsFACT.push($scope.data.detail);
                  }
                }
              }
            }
          },
          (error) => {
            $ionicLoading.hide();
          }
        );
      }
    };

    $scope.initDetailFCT = function () {
      console.log('------push detail to detailsFACT-------');
      console.log($scope.data.recapPRC);
      if ($scope.data.recapPRC) {

      } else {
        $scope.data.detail = {
          codeDetail: null,
          codePRC: $scope.data.codePRC,
          codePDS: $scope.data.codePDS,
          codeArticle: null,
          quantite: 0,
          isCanceled: "0",
          idMotif: null,
          isUnloaded: false,
          motifchoisit: null,
          artcilechoisit: null,
          index: 0,
          montant: 0,
          article: null,
        };
      }
    };

    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      /*console.log('-----------------------list motif----------------------');
        console.log(response);*/
    });

    ApiListClient.getListClient().success(function (response) {
      if (response) {
        $scope.data.listclients = response;
      }
    });
    $scope.listArticle = function () {
      if ($scope.initial) {


        ApiListStock.getListStock().success(
          function (response) {
            console.log('---------------Synchro stock------------------')
            console.log(response)

            $scope.data.listarticles = response;

            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

      } else {
        ApiListArticle.getListArticle().success(function (response) {

          if (response) {
            $scope.data.listarticles = response;
          }
        });
      }
    }



    $scope.initvar();
    $scope.initRecap();

    $scope.listArticle();

    $scope.ajouter = function () {

      if ($scope.data.artcilechoisit) {
        if ($scope.data.quantite > 0 && $scope.data.prix > 0) {
          var searchArticle = $filter('filter')($scope.data.detailsFACT, { codeArticle: $scope.data.artcilechoisit.codeArticle })
          if (!searchArticle || searchArticle.length == 0) {
            $scope.initDetailFCT();
            console.log($scope.data.artcilechoisit.codeArticle);
            var errorMessage = checkQuantite.checkQuantite($scope.data.artcilechoisit.codeArticle, $scope.data.quantite);
            if (errorMessage == 1) {

              $scope.data.detail.codeDetail = "DPDS" + "-" + CodeGenere.getCodeGenere();
              $scope.data.detail.codeArticle = $scope.data.artcilechoisit.codeArticle;
              $scope.data.detail.article = $scope.data.artcilechoisit.libelle;
              $scope.data.detail.quantite = "" + $scope.data.quantite;
              $scope.data.detail.libelle = "" + $scope.data.libelle;
              $scope.data.detail.prix = "" + $scope.data.prix;
              $scope.data.detail.idMotif = "0";
              $scope.data.detail.motifchoisit = null;
              $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
              $scope.data.detail.index = $scope.data.detailsFACT.length + 1;
              $scope.data.montantTotal = $scope.data.montantTotal + ($scope.data.detail.prix * $scope.data.quantite);
              $scope.data.detailsFACT.push($scope.data.detail);

              $scope.initDetailFCT();
              $scope.data.quantite = null;
              $scope.data.prix = null;
              $scope.data.libelle = null;
              $scope.data.artcilechoisit = null;
              $scope.data.motifchoisit = null;

            } else {
              $scope.Erreur(errorMessage);
            }
          } else {
            var message = "Désolé cet article est déjà ajouté."
            $scope.Erreur(message);
          }



        }
        else {
          var message = "Veuillez renseigner un artcile avec une quantité et un montant"
          $scope.Erreur(message);
        }


      } else {
        var message = "Veuillez choisir un article"
        $scope.Erreur(message);
      }


    };

    $scope.Erreur = function (message) {
      $ionicPopup.show({
        title: 'Erreur',
        template: message,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-danger",
          },
        ],
      });
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
    var d = new Date();

    $scope.testPrint = function () {

      var image = '<div style="text-align: center">' +
        '<img src="./img/agroline.png">' +
        '</div>';

      var enteteComm = '' +
        '<div class="row">' +
        '<div class="col">' +
        ' Commercial: ' +
        $scope.data.user.prenom + ' ' + $scope.data.user.nom +
        ' </div>'
      '</div>';
      
      var nomclient = $scope.data.clientchoisit ? $scope.data.clientchoisit.nom : $scope.data.recapPrc.client;

      var enteteCli = '<div class="row">' +
      '<div class="col">' +
      ' Client: ' +
      nomclient+
      ' </div>'
    '</div>';

      var telUser = '<div class="row">' +
        '<div class="col">' +
        ' Tel commercial: ' +
        $scope.data.user.telephone +
        ' </div>'
      '</div>';
      // '<th>Designation</th>'+
      //'<td>'+ $scope.data.detailsFACT[i].article+'</td>'+

      var details = '<table style="width: 100px">' +
        '<tr>' +
        '<th>Code</th>' +
        '<th>Designation</th>' +
        '<th>Quantité</th>' +
        '<th>Prix</th>' +
        '</tr>';
      var corps = '';
      for (var i = 0; i < $scope.data.detailsFACT.length; i++) {
        corps = corps +
          '<td>' + $scope.data.detailsFACT[i].codeArticle + '</td>' +
          '<td>' + $scope.data.detailsFACT[i].article + '</td>' +
          '<td>' + $scope.data.detailsFACT[i].quantite + '</td>' +
          '<td>' + $scope.data.detailsFACT[i].prix + '</td>';
          $scope.data.montantTotal = $scope.data.montantTotal + ($scope.data.detailsFACT[i].prix *$scope.data.detailsFACT[i].quantite);

      }
            var MontantTotal = $scope.data.montantTotal;
     
      details = details + '<tr style="text-align: center">' + corps + '</tr></table>';
      var sTable = document.getElementById('tab').innerHTML;
      var footer = '<h3 style="margin-top:50px;">Montant total:<label style="margin-left:20px">' +MontantTotal + ' CFA  </label></h3>';
      var titleDetail = '<h2>Details Facture</h2>';
      var t = image +
        enteteComm + telUser + enteteCli + titleDetail + sTable + footer;
      cordova.plugins.printer.print(
        t
      );

    }
    $scope.createPDF = function () {
      var sTable = document.getElementById('tab').innerHTML;

      var style = "<style>";
      style = style + "table {width: 100%;font: 17px Calibri;}";
      style = style + "table {width: 100%;font: 17px Calibri;}";
      style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
      style = style + "padding: 2px 3px;text-align: center;}";
      style = style + "</style>";

      var image = '<div style="text-align: center">' +
        '<img src="./img/agroline.png">' +
        '</div>';
      //<h2 style="text-align: center;">Facture agroline</h2>
      var enteteComm = '' +
        '<div class="row">' +
        '<div class="col">' +
        ' Commercial: ' +
        $scope.data.user.prenom + ' ' + $scope.data.user.nom +
        ' </div>'
      '</div>';

      var enteteCli = '<div class="row">' +
        '<div class="col">' +
        ' Client: ' +
        $scope.data.clientchoisit.nom +
        ' </div>'
      '</div>';


      var telUser = '<div class="row">' +
        '<div class="col">' +
        ' Tel commercial: ' +
        $scope.data.user.telephone +
        ' </div>'
      '</div>';

      // CREATE A WINDOW OBJECT.
      var win = window.open('', '', 'height=700,width=1000');

      win.document.write('<html><head>');
      // win.document.write('<title>Facture AGROLINE</title>');   // <title> FOR PDF HEADER.
      win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
      win.document.write('</head>');
      win.document.write('<body>');
      win.document.write(image);
      win.document.write(enteteComm);
      win.document.write(telUser);
      win.document.write(enteteCli);
      win.document.write('<h2>Details Facture</h2>');
      win.document.write(sTable);
      win.document.write('<h3 style="margin-top:50px;">Montant total:<label style="margin-left:20px">' + $scope.data.montantTotal + ' CFA  </label></h3>');         // THE TABLE CONTENTS INSIDE THE BODY TAG.
      win.document.write('</body></html>');

      win.document.close(); 	// CLOSE THE CURRENT WINDOW.

      win.print();    // PRINT THE CONTENTS.
    }

    $scope.submit = function () {
      var errorInput = '';
      $scope.initFact();
      
     
     

      $scope.data.fact.idMotif = $scope.data.motifchoisit
        ? $scope.data.motifchoisit.idMotif
        : 0;

      $scope.data.fact.position = $scope.position ? $scope.position : '0.0, 0.0';

      errorInput = !$scope.data.fact.position ? 'Veillez activez votre position svp.' : errorInput

      $scope.data.fact.codeClient = $scope.data.clientchoisit ? $scope.data.clientchoisit.codeClient : $scope.data.recapPrc.codeClient;

      $scope.data.fact.idModepaiement = $scope.data.clientchoisit ? $scope.data.clientchoisit.idModepaiement : $scope.data.recapPrc.idModepaiement;

      errorInput = $scope.data.fact.codeClient == null && $scope.initial == true ? 'Veuillez choisir un client' : errorInput;

      var valueFactPRC = {};

      if ($scope.initial == false) {
        valueFactPRC = {
          codeFacture:       $scope.data.fact.codeFacture,
          codeClient:        $scope.data.fact.codeClient,
          codeCommerciale:   $scope.data.fact.codeCommerciale,
          position:          $scope.data.fact.position,      
          delaiPaiement:     +$scope.data.fact.delaiPaiement,
          idModepaiement:    +$scope.data.fact.idModepaiement,
          isCanceled:        0,
          idMotif:           +$scope.data.fact.idMotif,
          codePRC:           $scope.data.fact.codePRC,
          codePDS:           $scope.data.fact.codePDS
        }
       
        console.log('Objet facture par PRC');

        $scope.data.fact = valueFactPRC;
         console.log($scope.data.fact);
         console.log($scope.data.fact.delaiPaiement);
      } else if ($scope.initial == true) {
     

        var details = [];
        if ($scope.data.fact.details && $scope.data.fact.details.length > 0) {
          for (var i = 0; i < $scope.data.fact.details.length; i++) {
            var detail = {
              codeDetail: null,
              codeArticle: null,
              libelle: null,
              quantite: null,
              isCanceled: null,
              idMotif: null
            }

            detail.codeDetail     = $scope.data.fact.details[i].codeDetail;
            detail.codeArticle    = $scope.data.fact.details[i].codeArticle;
            detail.libelle        = $scope.data.fact.details[i].article;
            detail.quantite       = +$scope.data.fact.details[i].quantite;
            detail.prix           = +$scope.data.fact.details[i].prix;
            detail.isCanceled     = 0;
            detail.idMotif        = +$scope.data.fact.details[i].idMotif;

            details.push(detail);

          }

        }

        if (details && details.length > 0) {

          valueFactPRC = {
            codeFacture        : $scope.data.fact.codeFacture,
            codeClient         : $scope.data.fact.codeClient,
            codeCommerciale    : $scope.data.fact.codeCommerciale,
            position           : $scope.data.fact.position,
            idModepaiement     : + $scope.data.fact.idModepaiement,
            isCanceled         : 0,
            idMotif            : + $scope.data.fact.idMotif,
            //codePDS : $scope.data.fact.codePDS,
            details            : details
          }
          console.log('Initiale');

          $scope.data.fact = valueFactPRC;
          $scope.data.fact.codePDS = $scope.data.codePDS


        } else {
          $scope.Erreur('Erreur. Il faut ajouter au moins un details');
        }

      }

      console.log('Erreur :' + errorInput);
      console.log('initial :' + $scope.initial);



      if (errorInput == '') {

        errorInput = ($scope.data.fact.details == null || $scope.data.fact.details.length == 0) && $scope.initial == true ? 'Impossible d\'inserer une facture sans artcile.' : '';
        errorInput = $scope.data.delaipaiement == null ? 'Veuillez mettre un delai de paiement' : ''
        if (errorInput == '') {
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });  
         
   
       // if($scope.data.fact.details ){
       
          if ($scope.data.fact.codePDS && $scope.data.fact.codePDS !== 0) {
           
         
            $scope.data.fact.dateAjout = formatNewDate.formatNewDate();
            $scope.data.fact.delaiPaiement = + $scope.data.delaipaiement; 
            console.log("Objet facture finale");  
            console.log($scope.data.fact);
            ApiAjoutFacturation.ajoutFacturation($scope.data.fact, $scope.initial).success(
              function (response) {
                $ionicLoading.hide();
                console.log(response);

                if (response.reponse == 1) {


                  $ionicPopup.show({
                    title: "Infos",
                    template: "Insertion réussit",
                    scope: $scope,
                    buttons: [
                      {
                        text: 'OUI',
                        type: 'button-energized',
                        onTap: function (e) {
                          return true;
                        }
                      }]
                  }).then(function (result) {
                    if (result) {
                      $scope.testPrint();
                    
                      $scope.data.motifchoisit = null;
                      $scope.data.clientchoisit = null;
                      localStorage.setItem('prc', null);
                      $state.transitionTo(
                        "app.facturations",
                        {},
                        {
                          reload: true,
                          inherit: true,
                          notify: true,
                        }
                      );
                    }
                  });

                } else if (response.reponse == -200) {
                  $ionicPopup.show({
                    title: "ERREUR",
                    template: "Impossible d'ajouter une facture sans details",
                    scope: $scope,
                    buttons: [
                      {
                        text: "Ok",
                        type: "button-positive",
                      },
                    ],
                  });
                } else if (response.reponse == -50) {
                  $ionicPopup.show({
                    title: "ERREUR",
                    template: "Verifier les details facture svp",
                    scope: $scope,
                    buttons: [
                      {
                        text: "Ok",
                        type: "button-positive",
                      },
                    ],
                  });
                }
              }
            ).error(errorCallback => {
              $ionicLoading.hide();
              $scope.Erreur('Erreur. Reésayer encore');
            });
          } else {
            $ionicLoading.hide();
            $ionicPopup.show({
              title: "ERREUR",
              template: "Impossible d'ajouter une facture, car aucune recupérqtion de marchandise n' a été detectée",
              scope: $scope,
              buttons: [
                {
                  text: "Ok",
                  type: "button-positive",
                },
              ],
            });
          }
      //  }




        } else {
          $scope.Erreur(errorInput);
        }
      } else {
        $scope.Erreur(errorInput);
      }
    };

    $scope.getPosition = function () {
      var options = { timeout: 10000, enableHighAccuracy: true };

      $cordovaGeolocation.getCurrentPosition(options).then(
        function (position) {
          var latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          $scope.position = position.coords.latitude + "," + position.coords.longitude

          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };

          $scope.map = new google.maps.Map(
            document.getElementById("map"),
            mapOptions
          );

          google.maps.event.addListenerOnce($scope.map, "idle", function () {
            var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng,
              icon: "http://i.imgur.com/fDUI8bZ.png",

            });

            var infoWindow = new google.maps.InfoWindow({
              content: "Ma position actuelle!",
            });

            google.maps.event.addListener(marker, "click", function () {
              infoWindow.open($scope.map, marker);
            });
          });
        },
        function (error) {
          console.log("Could not get location");
        }
      );
    };

    $scope.getPosition();
  })

  .controller('DechargementCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,
    CodeGenere, ApiListGrossiste,
    ApiRecapDchmnt, ApiValiderDchmnt,
    SendSms, ApiAjoutFacturation, ApiRecapPdsPrc, formatNewDate, ApiRecapFactPrc) {
    $scope.data = {};
    $scope.initvar = function () {
      $scope.data.codePDS = localStorage.getItem('codePDS');
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.dechargement = [];
      $scope.data.montantCreditTotal = 0;
      $scope.data.montantComptantTotal = 0;
      $scope.data.montantVerse = 0;
      $scope.data.quantiteRendue = 0;
      
      $scope.idMotif = 0;
      $scope.edit = false;
      $scope.itemEdit = null;
      $scope.myDate = Date;
      $scope.listeJson = [];


      $scope.data.code = null;
      localStorage.setItem("pdstodecharge", null)
      console.log(JSON.parse(localStorage.getItem("pdstodecharge")));

      $scope.data.dechargement_valider = JSON.parse(localStorage.getItem("pdstodecharge"));
      $scope.data.verser = $scope.data.dechargement_valider && $scope.data.dechargement_valider !== 'null' ? true : false;
      var valider = localStorage.getItem('codePDS');

      var codePDS = { "codePDS": $scope.data.codePDS };


      $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
      console.log('-----------------------Bouton decharger ---------------------');
      console.log(codePDS);

      ApiRecapDchmnt.getRecapDchmnt(codePDS).
        success(function (response) {
          $ionicLoading.hide();
          if (response) {
            $scope.data.dechargement = response;
            $scope.myDate = $scope.data.dechargement.dateAjout;
            console.log($scope.data.dechargement)


            if ($scope.data.dechargement && $scope.data.dechargement.details && $scope.data.dechargement.details.length > 0) {
              for (var i = 0; i < $scope.data.dechargement.details.length; i++) {
                $scope.data.montantCreditTotal = $scope.data.montantCreditTotal + (+$scope.data.dechargement.details[i].montantCredit);
                $scope.data.montantComptantTotal = $scope.data.montantComptantTotal + (+$scope.data.dechargement.details[i].montantComptant);
                $scope.data.dechargement.quantiteRendue = 0;
              }
            }
          }

          console.log('-----------------------Bouton decharger ---------------------');
          console.log(response);


        }, error => {
          $ionicLoading.hide();
        }).error(errorCallback => {
          $ionicLoading.hide();
        });
    }

    $scope.initvar();

    $scope.editDetail = function (item, action) {
      if ($scope.edit) {
        $scope.edit = false;
        //$scope.action = action;
        $scope.itemEdit = null

        $scope.itemEdit = item;
      } else {
        $scope.edit = true;
        $scope.action = action;
        item.idMotif = "edit";

        $scope.itemEdit = item;

        $ionicPopup.show({
          title: 'Quantité à rendre  ',
          template: '<label class="item item-input">' +
            '<span class="input-label">Quantié rendue</span>' +
            '<input type="number" ng-model="data.quantiteRendue">' +
            '</label>',
          scope: $scope,
          buttons: [
            {
              text: 'Annuler',
              type: 'button-assertive',
              onTap: function (e) {
                return false;
              }
            },
            {
              text: 'Valider',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }]
        })
          .then(function (result) {
            if (result) {
              item.quantiteRendue = $scope.data.quantiteRendue;
              $scope.edit = false;
              item.idMotif = 0;
              $scope.itemEdit = null
            } else {
              $scope.data.quantiteRendue = 0;
            }
          });
      }

    };

    $scope.goToDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.dechargement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.showPopUp = function (libelle, etat, code = '') {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : '',
        template: etat == 1 ? libelle : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }]
      });
    }

    $scope.annulerVersement = function () {
      $scope.data.verser = false;
      localStorage.setItem("pdstodecharge", null);
      localStorage.setItem("pdstodechargecode", null);

    }

    $scope.validerVersment = function () {
      console.log("Code generer");
      console.log($scope.data.dechargement_valider.codeGenere);
      if ($scope.data.code && $scope.data.code === $scope.data.dechargement_valider.codeGenere) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });

        $scope.data.dechargement_valider.isUnload = 1
        $scope.data.dechargement_valider.isPayed = 1;
        $scope.data.dechargement_valider.details[0].codeDetail = "DDCH-" + CodeGenere.getCodeGenere()

        console.log($scope.data.dechargement_valider);

        $scope.listeJson = $scope.data.dechargement_valider;
        console.log($scope.listeJson);
        $scope.listeJson.dateAjout = formatNewDate.formatNewDate();
        for(var i = 0; i < $scope.listeJson.details.length; i++){

      
        if ( $scope.listeJson.details[i].quantiteCredit != " ") {
          $scope.listeJson.details[i].quantiteCredit=parseInt($scope.listeJson.details[i].quantiteCredit);
        }

        if ( $scope.listeJson.details[i].quantitePrise != " ") {
          $scope.listeJson.details[i].quantitePrise =parseInt($scope.listeJson.details[i].quantitePrise);
        }

        if ( $scope.listeJson.details[i].quantiteRendue != " ") {
          $scope.listeJson.details[i].quantiteRendue = $scope.data.dechargement.quantiteRendue = 0;
        }

        if ( $scope.listeJson.details[i].quantiteComptant != " ") {
          $scope.listeJson.details[i].quantiteComptant =parseInt($scope.listeJson.details[i].quantiteComptant);
        }
      }
        ApiValiderDchmnt.getValiderDchmnt($scope.listeJson).then(function (resp) {
          console.log("test console 2");
          console.log(resp);
          $ionicLoading.hide();

          if (resp.data.reponse == 1) {
            localStorage.setItem("pdstodecharge", null);
            localStorage.setItem("pdstodechargecode", null);
            $ionicPopup.show({
              title: 'Info',
              template: 'Reussi',
              scope: $scope,
              buttons: [

                {
                  text: 'Ok',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }]
            })
              .then(function (result) {

                $state.transitionTo('app.dechargements', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              }
              )

          } else {
            $ionicLoading.hide();

            $ionicPopup.show({
              title: 'Erreur',
              template: resp.data.reponse,
              scope: $scope,
              buttons: [

                {
                  text: 'Ok',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }]
            })
              .then(function (result) {
                $scope.annulerVersement();
                $state.transitionTo('app.dechargements', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              }
              )
              .then(function (result) {

                $state.transitionTo('app.dechargements', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              }
              )
            console.log("echec");
          }
        }, err => {
          $ionicLoading.hide();
        });


      } else {
        $ionicPopup.show({
          title: 'Erreur  ',
          template: 'Le code ne correspond pas.',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-positive'
            }
          ]
        });
      }
    }


    /*
    $ionicPopup.show({
                title: 'Etes-vous sure de vouloir faire un dechargement sans rendre aucun article ni montant?',
                scope: $scope,
                buttons: [
                  {
                    text: 'Annuler',
                    type: 'button-assertive',
                    onTap: function (e) {
                      return false;
                    }
                  },
                  {
                    text: 'Valider',
                    type: 'button-energized',
                    onTap: function (e) {
                      return true;
                    }
                  }]
              })
                .then(function (result) {
                  if (result) {
                    
                  } else {
                    
                  }
                });
    */

    $scope.submit = function () {

      if ($scope.data.montantVerse >= 0) {
        var dechargementVide = null;
        if ($scope.data.montantVerse == 0 && ($scope.data.quantiteRendue == 0 || $scope.data.quantiteRendue == null)) {
          dechargementVide = 'Impossible de faire un dechargement sans rendre une quantité d\'article ni un montant'
        }
        if ($scope.data.dechargement.montantVentes < $scope.data.montantVerse) {
          dechargementVide = 'Impossible de faire un montant versement supérieur à celle de la vente'
        }
        if (dechargementVide == null) {
          $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
          var values = {
            codeDechargement: "DCH-" + $scope.data.user.code + "-" + CodeGenere.getCodeGenere(),
            codePDS: $scope.data.codePDS,
            codeCommerciale: $scope.data.user.code,
            dateAjout: $scope.data.dateAjout,
            isCanceled: 0,
            idMotif: $scope.idMotif,
            isChecked: 0,
            codeGenere: CodeGenere.getCodeGenere(),
            isPayed: 0,
            montantVerse: $scope.data.montantVerse,
            details: []
          }
          for (var i = 0; i < $scope.data.dechargement.details.length; i++) {
            var detail = {
              codeDetail: $scope.data.dechargement.details[i].codeDetail ? $scope.data.dechargement.details[i].codeDetail : "DDCH-" + CodeGenere.getCodeGenere(),
              codeArticle: $scope.data.dechargement.details[i].codeArticle,
              quantitePrise: $scope.data.dechargement.details[i].quantitePrise,
              quantiteComptant: $scope.data.dechargement.details[i].quantiteComptant,
              quantiteCredit: $scope.data.dechargement.details[i].quantiteCredit,
              quantiteRendue: $scope.data.dechargement.details[i].quantiteRendue
            }
            values.details.push(detail);

          }


          try {

            var Message = 'Code secret: ' + values.codeGenere

            SendSms.sendSMS(Message, $scope.data.dechargement.telephone);
            console.log(Message);
            localStorage.setItem("pdstodecharge", JSON.stringify(values));

            localStorage.setItem("pdstodechargecode", values.codeGenere);
            console.log('-----code generer-------');
            console.log(values.codeGenere);
            $scope.data.verser = true;
            $scope.data.dechargement_valider = values;
            $ionicLoading.hide();
          } catch (err) {
            $ionicLoading.hide();
            $ionicPopup.show({
              title: 'Alert ',
              template: 'Erreur lors du traitement. code erreur: MX2020',
              scope: $scope,
              buttons: [
                {
                  text: 'OK',
                  type: 'button-positive'
                }
              ]
            });
          }
        } else {
          $ionicPopup.show({
            title: dechargementVide,
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-assertive',
                onTap: function (e) {
                  return false;
                }
              }]
          })
            .then(function (result) {
              if (result) {

              } else {

              }
            });
        }


      } else {
        $ionicLoading.hide();
        $ionicPopup.show({
          title: 'Erreur  ',
          template: 'Veuillez renseigner le montant verse',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-positive'
            }
          ]
        });
      }

    }

  })

  .controller('DetailDechargementCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiDetailPds, ApiValiderDchmnt) {
    $scope.data = {};

    $scope.initvar = function () {
      $scope.data.codePDS = localStorage.getItem('codePDS');
      var user = localStorage.getItem('user');
      $scope.data.user = JSON.parse(user);

      $scope.data.detailsDechargement = [];

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
        }, error => {
          $ionicLoading.hide();
        });
    }

    $scope.initvar();

    $scope.showPopUp = function (libelle, etat, code = '') {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : '',
        template: etat == 1 ? libelle : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
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

    $scope.goToDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.dechargement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

  })
  .controller('dechargementsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc, ApiListDechargement) {

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
        var code = { codeCommerciale: $scope.data.user.code };

        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiListDechargement.getListDechargement(code).
          success(function (response) {
            $ionicLoading.hide();
            if (response) {
              $scope.data.dechargements = response;
            }
            console.log('-----------------------Dechargement----------------------');
            console.log(response);
          }, error => {
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

    $scope.goToDechargement = function (codePDS) {

      localStorage.setItem('codePDS', codePDS);
      $state.transitionTo('app.dechargement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }




  })
  .controller('versementsCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc, ApiListDechargement, ApiPdsNoPayed) {

    console.log('versement');
    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeCommerciale = localStorage.getItem('codeCommerciale');
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.pds_no_payed = [];

    }
    $scope.initPdsNoPayed = function () {
      if ($scope.data.user) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiPdsNoPayed.getPdsNoPayed($scope.data.user).
          success(function (response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.data.pds_no_payed = response;
          }, err => {
            $ionicLoading.hide();
          })
      }

    }
    $scope.initvar();
    $scope.initPdsNoPayed();

    $scope.goToDetailVersement = function (vers) {

      localStorage.setItem('codePdsVersement', vers.codePDS);
      $state.transitionTo('app.details-versement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })
  .controller('DetailsVersementCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc, ApiListDechargement, ApiPdsNoPayed, ApiDetailPdsNoPayed, ApiAjoutVersement, CodeGenere, ApiAjoutVersement, SendSms) {

    console.log('versement');
    $scope.data = {};

    $scope.initvar = function () {

      $scope.data.codeCommerciale = localStorage.getItem('codeCommerciale');
      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.codePds = localStorage.getItem('codePdsVersement');
      $scope.data.versement = JSON.parse(localStorage.getItem('versetopds'));
      $scope.data.details_pds_no_payed = [];
      $scope.data.code = null;
      console.log('---------------------If code is versement-------')
      console.log($scope.data.versement)
      $scope.data.verser = $scope.data.versement ? true : false;
      console.log('Versement local code');
      console.log($scope.data.versement)
      $scope.data.montant = null;

    }

    $scope.initDetailPdsNoPayed = function () {
      if ($scope.data.codePds) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        ApiDetailPdsNoPayed.getDetailPdsNoPayed($scope.data.codePds).
          success(function (response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.data.details_pds_no_payed = response;
          }, err => {
            $ionicLoading.hide();
          })
      }

    }

    $scope.initvar();
    $scope.initDetailPdsNoPayed();

    $scope.goToDetailVersement = function (vers) {

      localStorage.setItem('versement', vers);
      $state.transitionTo('app.details-versement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }


    $scope.annulerVersement = function () {
      $scope.data.verser = false;
      localStorage.setItem("versetopds", null);
      localStorage.setItem("versetopdscode", null);

    }
    $scope.validerVersment = function () {
      console.log("Code generer");
      console.log($scope.data.versement[0].codeGenere);
      if ($scope.data.code && $scope.data.code === $scope.data.versement[0].codeGenere) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });

        $scope.data.versement[0].isChecked = 1

        console.log($scope.data.versement);
        localStorage.setItem("versetopds", null);
        localStorage.setItem("versetopdscode", null);


        /*$ionicPopup.show({
          title: 'Info',
          template: 'Reussi',
          scope: $scope,
          buttons: [
            
            {
              text: 'Ok',
              type: 'button-energized',
              onTap: function (e) {
                return true;
              }
            }]
        })
          .then(function (result) {

              $state.transitionTo('app.versements', {}, {
                reload: true,
                inherit: true,
                notify: true
              });
            }
          );*/
        console.log('-Versemnt');
        console.log($scope.data.versement);

        ApiAjoutVersement.ajoutVersement($scope.data.versement[0]).then(function (resp) {
          console.log(resp);
          $ionicLoading.hide();
          localStorage.setItem("versetopds", null);
          localStorage.setItem("versetopdscode", null);
          if (resp.data.reponse == 1) {
            $ionicPopup.show({
              title: 'Info',
              template: 'Reussi',
              scope: $scope,
              buttons: [

                {
                  text: 'Ok',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }]
            })
              .then(function (result) {

                $state.transitionTo('app.versements', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              }
              )

          } else {
            $ionicLoading.hide();
            $ionicPopup.show({
              title: 'Erreur',
              template: 'Erreur d\'insertion',
              scope: $scope,
              buttons: [

                {
                  text: 'Ok',
                  type: 'button-energized',
                  onTap: function (e) {
                    return true;
                  }
                }]
            })
              .then(function (result) {

                $state.transitionTo('app.dechargements', {}, {
                  reload: true,
                  inherit: true,
                  notify: true
                });
              }
              )
            console.log("echec");
          }
        }, err => {
          $ionicLoading.hide();
        });


      } else {
        $ionicPopup.show({
          title: 'Erreur  ',
          template: 'Le code ne correspond pas.',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-positive'
            }
          ]
        });
      }
    }


    console.log(localStorage.getItem("versetopdscode"));

    $scope.submit = function () {

      if ($scope.data.montant > 0) {
        $ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0, duration: 10000 });
        var values = {
          codeVersement: "VRS-" + $scope.data.user.code + "-" + CodeGenere.getCodeGenere(),
          codeGrossiste: $scope.data.details_pds_no_payed.codeGrossiste,
          codePDS: $scope.data.details_pds_no_payed.codePDS,
          codeCommerciale: $scope.data.user.code,
          dateAjout: $scope.data.dateAjout,
          isCanceled: 0,
          idMotif: 0,
          isChecked: 0,
          codeGenere: CodeGenere.getCodeGenere(),
          montant: $scope.data.montant,

        }
        var tab_value = [];
        tab_value.push(values);

        var Message = 'Code secret: ' + values.codeGenere
        try {
          SendSms.sendSMS(Message, $scope.data.details_pds_no_payed.telephone);
          localStorage.setItem("versetopds", JSON.stringify(tab_value));

          localStorage.setItem("versetopdscode", values.codeGenere);
          $scope.data.verser = true;
          $scope.data.versement = tab_value;
          console.log(Message);
          $ionicLoading.hide();
        }
        catch (err) {
          $ionicLoading.hide();
          $ionicPopup.show({
            title: 'Alert ',
            template: 'Erreur lors du traitement. code erreur: MX2020',
            scope: $scope,
            buttons: [
              {
                text: 'OK',
                type: 'button-positive'
              }
            ]
          });

        }

        // $scope.data.dechargement_valider = values;


      } else {
        $ionicLoading.hide();
        $ionicPopup.show({
          title: 'Erreur  ',
          template: 'Veuillez renseigner le montant',
          scope: $scope,
          buttons: [
            {
              text: 'OK',
              type: 'button-positive'
            }
          ]
        });
      }

    }
  })
  .controller('InventaireCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup, ApiRecapPdsPrc, ApiListDechargement, ApiPdsNoPayed, ApiListInventaire) {

    console.log('InventAIRE');
    $scope.data = {};

    $scope.initvar = function () {

      $scope.edit = false;
      $scope.data.inventaires = [];

      $scope.data.user = JSON.parse(localStorage.getItem('user'));

    }

    $scope.initvar();

    $scope.listInventaires = function () {
      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      var codeCommerciale = { codeCommerciale: $scope.data.user.code }
      ApiListInventaire.getListInventaire(codeCommerciale)
        .success(reponse => {
          $ionicLoading.hide();
          console.log(reponse);
          $scope.data.inventaires = reponse;
        }, err => {
          $ionicLoading.hide();
          console.log(error)
        })
    }
    $scope.goToNewInventaire = function () {
      $state.transitionTo('app.nouvel-inventaire', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }

    $scope.listInventaires();


    $scope.goToDetailInventaire = function (inv, sens) {
      console.log('------->', sens);
      localStorage.setItem('sensInventaire', sens);
      localStorage.setItem('codeInventaire', inv.codeInventaire);
      $state.transitionTo('app.details-inventaire', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })
  .controller('DetailsInventaireCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,
    ApiRecapPdsPrc,
    ApiListDechargement, ApiPdsNoPayed, ApiDetailInventaire, ApiAnnulerInventaire) {

    console.log('detail inventaire');
    $scope.data = {};

    $scope.initvar = function () {
      $scope.edit = false;
      $scope.data.listmotifs = [];
      $scope.data.motifchoisit = null;
      $scope.data.sens = localStorage.getItem('sensInventaire');
      console.log('sens details =====> ', $scope.sens)

      $scope.data.codeInventaire = localStorage.getItem('codeInventaire');
      $scope.data.detailsInventaire = {};

      $scope.data.user = JSON.parse(localStorage.getItem('user'));
    }

    $scope.initvar();

    $scope.DetailsInventaires = function () {
      var codeInventaire = { codeInventaire: $scope.data.codeInventaire }
      ApiDetailInventaire.getDetailInventaire(codeInventaire)
        .success(reponse => {
          $scope.data.detailsInventaire = reponse;
          console.log(reponse);
        })
    }

    $scope.DetailsInventaires();


    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
      console.log(response);
    });
    $scope.getOptMotif = function (option) {
      return option;
    };
    $scope.anullerDeletInventaire = function () {
      $state.transitionTo(
        "app.inventaires",
        {},
        {
          reload: true,
          inherit: true,
          notify: true,
        }
      );
    }

    $scope.validerDeletInventaire = function () {
      $ionicPopup.show({
        title: "Annulation d' inventaire",
        template: "Voulez-vous vraiment annuler cet inventaire?",
        scope: $scope,
        buttons: [
          {
            text: 'OUI',
            type: 'button-energized',
            onTap: function (e) {
              return true;
            }
          },
          {
            text: 'NON',
            type: 'button-assertive',
            onTap: function (e) {
              return false;
            }
          },
        ]
      }).then(function (result) {

        if (result) {
          var value = {
            codeInventaire: $scope.data.detailsInventaire.codeInventaire,
            isCanceled: true,
            idMotif: $scope.data.motifchoisit.idMotif
          }
          console.log(value)
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });

          ApiAnnulerInventaire.annulerInventaire(value)
            .success(function (reponse) {
              console.log(reponse);
              if (reponse.reponse == 1) {
                $state.transitionTo(
                  "app.inventaires",
                  {},
                  {
                    reload: true,
                    inherit: true,
                    notify: true,
                  }
                );
              }
            }, (error) => {
              $ionicLoading.hide();
              console.log(error);
            }).error(errorCallback => {
              $ionicLoading.hide();
            })

        }
      })

    }


    $scope.goToDetailInventaire = function (inv) {

      localStorage.setItem('codePdsVersement', inv.codePDS);
      $state.transitionTo('app.details-versement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })
  .controller('AddInventaireCtrl', function (
    $scope, $state, $ionicLoading,
    ApiListPrc, ApiDetailPrc, ApiAjoutPrc,
    ApiListClient, ApiListMotif,
    ApiListArticle, $ionicPopup,
    ApiListGrossiste,
    ApiAjoutPdsFromRecap,
    CodeGenere,
    formatNewDate,
    SendSms,
    $filter,
    ApiAddInventaire) {

    console.log('nouvel inventaire');
    $scope.data = {};
    $scope.edit = false;

    $scope.initvar = function () {

      $scope.data.inventaires = [];

      $scope.data.user = JSON.parse(localStorage.getItem('user'));
      $scope.data.codeCommerciale = $scope.data.user.code
      $scope.data.idMotif = 0;
      $scope.data.detailsInventaire = [];
      $scope.data.listmotifs = [];
      $scope.data.grossistes = [];
      $scope.data.motifchoisit = null;
      $scope.data.grossistechoisit = null;
      $scope.data.listarticles = [];
      $scope.data.artcilechoisit = null;
      $scope.data.codeInventaire =
        "INV" +
        "-" +
        $scope.data.codeCommerciale +
        "-" +
        CodeGenere.getCodeGenere();
      $scope.data.detail = {};

      $scope.data.quantite = null;
      $scope.data.prix = null;

    }

    $scope.initvar();



    $scope.showPopUp = function (libelle, etat, code = "") {
      $ionicPopup.show({
        title: etat == 1 ? "Code: " + code : "",
        template:
          etat == 1
            ? libelle
            : '<img src="http://test-test.h-tsoft.com/{{libelle}}">',
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-assertive",
          },
        ],
      });
    };
    $scope.annulerEdit = function () {
      $scope.edit = false;
      for (var i = 0; i < $scope.data.detailsInventaire.length; i++) {
        if (
          $scope.data.detailsInventaire[i].idMotif === "edit" &&
          $scope.data.detailsInventaire[i].codeArticle ===
          $scope.itemEdit.codeArticle
        ) {
          $scope.data.detailsInventaire[i].idMotif = 0;

          $scope.data.quantite = null;
          $scope.data.artcilechoisit = null;
          $scope.data.motifchoisit = null;
          break;
        }
      }
    }

    $scope.editDetail = function (item) {
      $scope.data.artcilechoisit = {};

      $scope.data.artcilechoisit.libelle = item.article;
      $scope.data.artcilechoisit.code = item.codeArticle;
      console.log("--------------Quantite---------------");
      console.log(item.quantite);
      $scope.data.quantite = +item.quantite;
      //document.getElementById("quantite").value = item.quantite;

      $scope.edit = true;
      item.idMotif = "edit";

      for (var i = 0; i < $scope.data.detailsInventaire.length; i++) {
        if (
          $scope.data.detailsInventaire[i].idMotif === "edit" &&
          $scope.data.detailsInventaire[i].codeArticle !== item.codeArticle
        ) {
          $scope.data.detailsInventaire[i].idMotif = 0;
        }
      }
      $scope.itemEdit = item;
    };
    $scope.valideEdit = function () {
      if ($scope.data.motifchoisit && $scope.data.motifchoisit.idMotif !== "") {
        for (var i = 0; i < $scope.data.detailsInventaire.length; i++) {
          if (
            $scope.data.detailsInventaire[i].idMotif === "edit" &&
            $scope.data.detailsInventaire[i].codeArticle ===
            $scope.itemEdit.codeArticle
          ) {
            $scope.data.detailsInventaire[i].idMotif =
              $scope.data.motifchoisit.idMotif;
            $scope.data.detailsInventaire[i].codeArticle =
              $scope.data.artcilechoisit.code;
            $scope.data.detailsInventaire[i].quantite = $scope.data.quantite;

            $scope.edit = false;
            $scope.data.quantite = null;
            $scope.data.artcilechoisit = null;
            $scope.data.motifchoisit = null;

            break;
          }
        }
      } else {
        $ionicPopup.show({
          title: "Erreur",
          template: "Veuillez choisir un motif",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-danger",
            },
          ],
        });
      }
    };
    $scope.initDetailInventaire = function () {

      $scope.data.detail = {
        codeDetail: null,
        codeArticle: null,
        quantite: 0,
        isCanceled: false,
        idMotif: null,
        motifchoisit: null,
        artcilechoisit: null,
        article: null,
      };

    };

    $scope.initInventaire = function () {
      var detailsInv = [];
      if ($scope.data.detailsInventaire && $scope.data.detailsInventaire.length > 0) {
        for (var i = 0; i < $scope.data.detailsInventaire.length; i++) {
          var d = {
            codeDetail: $scope.data.detailsInventaire[i].codeDetail,
            codeArticle: $scope.data.detailsInventaire[i].codeArticle,
            quantite: $scope.data.detailsInventaire[i].quantite,
            isCanceled: $scope.data.detailsInventaire[i].isCanceled,
            idMotif: $scope.data.detailsInventaire[i].idMotif,
          };
          detailsInv.push(d);
        }
      }
      $scope.data.inventaire = {
        codeInventaire: $scope.data.codeInventaire,
        codeCommerciale: $scope.data.codeCommerciale,
        codeGrossiste: $scope.data.grossistechoisit
          ? $scope.data.grossistechoisit.codeGrossiste
          : null,
        dateAjout: new Date(),
        isCanceled: false,
        idMotif: $scope.data.idMotif,
        details: detailsInv,
      };
    };

    $scope.ajouter = function () {
      $scope.initDetailInventaire();

      if ($scope.data.artcilechoisit) {

        $scope.data.detail.codeDetail = "DINV" + "-" + CodeGenere.getCodeGenere();
        $scope.data.detail.codeArticle = $scope.data.artcilechoisit.code;
        $scope.data.detail.quantite = $scope.data.quantite;
        $scope.data.detail.idMotif = $scope.data.idMotif;
        $scope.data.detail.article = $scope.data.artcilechoisit.libelle;
        $scope.data.detail.artcilechoisit = $scope.data.artcilechoisit;
        $scope.data.detail.index = $scope.data.detailsInventaire.length + 1;
        $scope.data.detailsInventaire.push($scope.data.detail);
        $scope.initDetailInventaire();
        $scope.data.quantite = null;
        $scope.data.artcilechoisit = null;
        $scope.data.motifchoisit = null;

      } else {
        $ionicPopup.show({
          title: "Erreur",
          template: "Veuillez choisir un article",
          scope: $scope,
          buttons: [
            {
              text: "Ok",
              type: "button-danger",
            },
          ],
        });
      }


    };


    ApiListMotif.getListMotif().success(function (response) {
      if (response) {
        $scope.data.listmotifs = response;
      }
      console.log("-----------------------list motif----------------------");
      console.log(response);
    });

    ApiListArticle.getListArticle().success(function (response) {
      if (response) {
        $scope.data.listarticles = response;
      }
      //  console.log('-----------------------list article----------------------');
      //  console.log(response);
    });

    ApiListGrossiste.getListGrossiste(true, null).success(function (response) {
      if (response) {
        $scope.data.grossistes = response;
      }

    });

    $scope.getOptGrossiste = function (option) {
      return option;
    };
    $scope.getOptMotif = function (option) {
      return option;
    };

    $scope.getOptArticle = function (option) {
      return option;
    };


    $scope.submit = function () {

      console.log("-----------------Value Inventaire-------------");
      $scope.initInventaire();
      console.log($scope.data.inventaire);

      $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000,
      });
      $scope.data.inventaire.dateAjout = formatNewDate.formatNewDate();
      $scope.data.inventaire.isCanceled = $scope.data.inventaire.isCanceled ? 1 : 0;

      for (var i = 0; i < $scope.data.inventaire.details.length; i++) {
        $scope.data.inventaire.details[i].isCanceled = $scope.data.inventaire.details[i].isCanceled ? 1 : 0;
       

      }
      ApiAddInventaire.AddInventaire($scope.data.inventaire).success(
        function (response) {
          $ionicLoading.hide();
          console.log('----Reponse---');
          console.log(response)

          if (response.reponse == 1) {



            $scope.data.detailsInventaire = [];
            $scope.data.inventaire = {};

            $state.transitionTo(
              "app.inventaires",
              {},
              {
                reload: true,
                inherit: true,
                notify: true,
              }
            );
          } else {
            $ionicPopup.show({
              title: "Info",
              template: "" + response.reponse,
              scope: $scope,
              buttons: [
                {
                  text: "Ok",
                  type: "button-positive",
                },
              ],
            });
          }
        },
        (error) => {
          $ionicLoading.hide();
        }
      );

    };


    $scope.goToDetailInventaire = function (inv) {

      localStorage.setItem('codePdsVersement', inv.codePDS);
      $state.transitionTo('app.details-versement', {}, {
        reload: true,
        inherit: true,
        notify: true
      });
    }
  })
  .factory('ApiPdsNoPayed', function ($http, urlPhp) {
    return {
      getPdsNoPayed: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        var params = { codeCommerciale: user.code }
        console.log(params);
        return $http.post(url + '/versement/listePDS.php', params);
      }
    }
  })
  .factory('ApiDetailPdsNoPayed', function ($http, urlPhp) {
    return {
      getDetailPdsNoPayed: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        var params = { codePDS: code }
        console.log(params);
        return $http.post(url + '/versement/detailsPDS.php', params);
      }
    }
  })
  .factory('ApiAjoutVersement', function ($http, urlPhp) {
    return {
      ajoutVersement: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);

        return $http.post(url + '/versement/ajout.php', values);
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

  .factory("ApiListStock", function ($http, urlPhp) {
    return {
      getListStock: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        console.log(user);
        var params = { codeUtilisateur: user.code };
        return $http.post(url + "/utilisateur/stock.php", params);
      },
    };
  })
  .factory("ApiListClient", function ($http, urlPhp) {
    return {
      getListClient: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + "/client/liste.php");
      },
    };
  })
  .factory("ApiListArticle", function ($http, urlPhp) {
    return {
      getListArticle: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + "/article/liste.php");
      },
    };
  })
  .factory("ApiListPrc", function ($http, urlPhp) {
    return {
      getListPrc: function (codeCommerciale, hasPDS = null) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        if (hasPDS) {
          codeCommerciale.hasPDS = hasPDS
        }

        console.log(codeCommerciale);

        return $http.post(url + "/prc/liste.php", codeCommerciale);
      },
    };
  })
  .factory("ApiDetailPrc", function ($http, urlPhp) {
    return {
      getDetailPrc: function (codePRC) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        var code = { codePRC: codePRC };
        return $http.post(url + "/prc/details.php", code);
      },
    };
  })
  .factory("ApiAjoutPrc", function ($http, urlPhp) {
    return {
      ajoutPrc: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/prc/ajout.php", values);
      },
    };
  })
  .factory("ApiListMotif", function ($http, urlPhp) {
    return {
      getListMotif: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + "/motif/liste.php");
      },
    };
  })
  .factory("ApiRecapPdsPrc", function ($http, urlPhp) {
    return {
      getRecapPdsPrc: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/prc/recapPRC.php", code);
      },
    };
  })
  .factory("ApiListPds", function ($http, urlPhp) {
    return {
      getListPds: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/pds/liste.php", codeCommerciale);
      },
    };
  })

  .factory("ApiDetailPds", function ($http, urlPhp) {
    return {
      getDetailsPds: function (codePDS) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        //  var code = { codePDS: codePDS };
        return $http.post(url + "/pds/details.php", codePDS);
      },
    };
  })
  .factory("ApiAjoutPds", function ($http, urlPhp) {
    return {
      ajoutPds: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/prc/ajout.php", values);
      },
    };
  })
  .factory("ApiListGrossiste", function ($http, urlPhp) {
    return {
      getListGrossiste: function (initial, codeCommerciale = null) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        console.log("-------Initial-------");
        console.log(initial);
        // var urlAjout = initial ? '/pds/demande.php' : '/pds/demandeFromPRC.php';

        var code = initial ? { codeCommerciale: null } : { codeCommerciale: codeCommerciale }
        console.log(code);

        return initial ? $http.get(url + '/grossiste/liste.php') : $http.post(url + '/grossiste/liste.php', code);
      },
    };
  })
  .factory("ApiAjoutPdsFromRecap", function ($http, urlPhp) {
    return {
      ajoutPdsFromRecap: function (values, initiale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        console.log('initial');
        user = JSON.parse(user);
        console.log(initiale);
        var urlAjout = initiale ? '/pds/demande.php' : '/pds/demandeFromPRC.php';
        console.log(urlAjout);
        return $http.post(url + urlAjout, values);
      },
    };
  })
  .factory("ApiListFacturation", function ($http, urlPhp) {
    return {
      getListFacturation: function (codeCommerciale) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/facture/liste.php", codeCommerciale);
      },
    };
  })
  .factory("ApiAjoutFacturation", function ($http, urlPhp) {
    return {
      ajoutFacturation: function (values, initial) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        var urlAjout = initial ? '/facture/ajout.php' : '/facture/ajoutFromprc.php';
        console.log('UrlAjout');
        console.log(urlAjout);

        return $http.post(url + urlAjout, values);
      },
    };
  })
  .factory("ApiListModePaiement", function ($http, urlPhp) {
    return {
      getListModePaiement: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.get(url + "/modepaiement/liste.php");
      },
    };
  })
  .factory("ApiRecapFactPrc", function ($http, urlPhp) {
    return {
      getRecapFactPrc: function (code) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        // console.log(user);
        //  var params = {codeUtilisateur:user.code}
        return $http.post(url + "/prc/details.php", code);
      },
    };
  })
  .factory("ApiStockGrossiste", function ($http, urlPhp) {
    return {
      getStockGrossiste: function (codeArticle) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/article/stockGrossiste.php", codeArticle);
      },
    };
  })
  .factory("ApiDeatilsFacture", function ($http, urlPhp) {
    return {
      getDeatilsFacture: function (codeFact) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/facture/details.php", codeFact);
      },
    };
  })

  .factory("ApiModificationDetailFact", function ($http, urlPhp) {
    return {
      modificationDetailFact: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/facture/supprimerDetails.php", values);
      },
    };
  })
  .factory("ApiDeletDetailFact", function ($http, urlPhp) {
    return {
      deletDetailFact: function (values, modif = false) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        var query = null;
        if (modif == true) {
          query = $http.post(url + "/facture/modifierDetails.php", values);
        } else {
          query = $http.post(url + "/facture/supprimerDetails.php", values);
        }

        return query;


      },
    };
  })

  .factory("ApiModificationDetailPRC", function ($http, urlPhp) {
    return {
      modificationDetailPRC: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/prc/modifierDetails.php", values);
      },
    };
  })
  .factory("ApiDeletDetailPRC", function ($http, urlPhp) {
    return {
      deletDetailPRC: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/prc/supprimerDetails.php", values);
      },
    };
  })

  .factory("ApiDeletPRC", function ($http, urlPhp) {
    return {
      deletPRC: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/prc/supprimer.php", values);
      },
    };
  })

  .factory("ApiModificationDetailPDS", function ($http, urlPhp) {
    return {
      modificationDetailPDS: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/pds/modifierDetails.php", values);
      },
    };
  })
  .factory("ApiDeletDetailPDS", function ($http, urlPhp) {
    return {
      deletDetailPDS: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/pds/supprimerDetails.php", values);
      },
    };
  })

  .factory("ApiDeletPDS", function ($http, urlPhp) {
    return {
      deletPDS: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/pds/supprimer.php", values);
      },
    };
  })
  .factory("ApiEncaissement", function ($http, urlPhp) {
    return {
      ajoutEncaissement: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/facture/encaissement.php", values);
      },
    };
  })

  .factory("ApiListMarches", function ($http, urlPhp) {
    return {
      getListMarches: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/marche/liste.php");
      },
    };
  })

  .factory("ApiListRegions", function ($http, urlPhp) {
    return {
      getListRegions: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + " /region/liste.php");
      },
    };
  })

  .factory("ApiListVilles", function ($http, urlPhp) {
    return {
      getListVilles: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/ville/liste.php");
      },
    };
  })

  .factory("ApiListZones", function ($http, urlPhp) {
    return {
      getListZones: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/zone/liste.php");
      },
    };
  })


  .factory("ApiAjoutClient", function ($http, urlPhp) {
    return {
      ajoutClient: function (values, etat) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        var urlClient = etat ? "/client/ajout.php" : "/client/modifier.php";
        console.log(urlClient)
        return $http.post(url + urlClient, values);
      },
    };
  })

  .factory("ApiModifClient", function ($http, urlPhp) {
    return {
      modifClient: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        return $http.post(url + "/client/modifier.php", values);
      },
    };
  })

  .factory('ApiValiderDchmnt', function ($http, urlPhp) {
    return {
      getValiderDchmnt: function (codePDS) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);

        return $http.post(url + '/dechargement/ajout.php', codePDS);
      }
    }
  })
  .factory('ApiDertailsClient', function ($http, urlPhp) {
    return {
      getDertailsClient: function (codeClient) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        user = JSON.parse(user);

        return $http.post(url + '/client/details.php', codeClient);
      }
    }
  })
  .factory('ApiCodePDS', function ($http, urlPhp) {
    return {
      getCodePDS: function () {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);
        var codeUser = { codeUtilisateur: user.code }

        return $http.post(url + '/utilisateur/codePDS.php', codeUser);
      }
    }
  })
  .factory('ApiCaClient', function ($http, urlPhp) {
    return {
      getApiCaClient: function (codeClient, dateDebut, dateFin) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);
        var objet = { codeClient: codeClient, dateDebut: dateDebut, dateFin: dateFin }

        return $http.post(url + '/client/caPeriode.php', objet);
      }
    }
  })
  .factory('ApiAddInventaire', function ($http, urlPhp) {
    return {
      AddInventaire: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);


        return $http.post(url + '/inventaire/ajout.php', values);
      }
    }
  })
  .factory('ApiListInventaire', function ($http, urlPhp) {
    return {
      getListInventaire: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);

        return $http.post(url + '/inventaire/liste.php', values);
      }
    }
  })
  .factory('ApiDetailInventaire', function ($http, urlPhp) {
    return {
      getDetailInventaire: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);

        return $http.post(url + '/inventaire/details.php', values);
      }
    }
  })
  .factory('ApiAnnulerInventaire', function ($http, urlPhp) {
    return {
      annulerInventaire: function (values) {
        var url = urlPhp.getUrl();
        var user = localStorage.getItem('user');
        console.log('-------------User-------');
        console.log(user);
        user = JSON.parse(user);

        return $http.post(url + ' /inventaire/annuler.php', values);
      }
    }
  })

  .factory("ChekConnect", function () {
    var connect;

    return {
      getConnectivite: function () {
        if (window.Connection) {
          if (navigator.connection.type == Connection.NONE) {
            connect = false;
          } else {
            connect = true;
          }
        }
        return connect;
      },
    };
  })
  .factory("urlPhp", function () {
    var connect;

    return {
      getUrl: function () {
        return "http://test-test.h-tsoft.com/apiagroline";
        //return "http://htsoftdemo.com/apiccbm";
        //return "http://192.168.1.34/CCBM-serveur";
        //  return "http://mob-test.yosard.com/webservice";
        // return "http://mob.yosard.com:89/webservice";
      },
    };
  })
  .factory("urlJava", function () {
    var connect;

    return {
      getUrl: function () {
        return "http://v-beta.yosard.com:8080/yup/rest";
        // return "http://www.yosard.com:8080/yup/rest";
      },
    };
  })

  .factory("formatNewDate", function () {
    
    //$scope.data.profile = sessionStorage.getItem("")
    return {
      formatNewDate: function () {
        var d = new Date();
        var hours = parseInt(d.getHours());
        if(hours < 10){
          hours = "0"+ ""+hours;
        }
        var minute = parseInt(d.getMinutes());
        if(minute < 10){
          minute = "0"+ ""+minute;
        }
        var mounth = parseInt(d.getMonth()) + 1
        if(mounth < 10){
          mounth = "0"+ ""+mounth;
        }
        var day = parseInt(d.getDate())
        if(day < 10){
          day = "0"+ ""+day;
        }
        var second = parseInt(d.getSeconds())
        if(second < 10){
          second = "0"+ ""+second;
        }
        var dformat = [
          d.getFullYear(),
          mounth,
          day
        ].join('-') + ' ' +
          [hours,
          minute,
          second].join(':');

          console.log('---------Date depuis le service---------')
          console.log(dformat)
        
        return dformat;
      },
    };
  })
  .factory("ProfilUser", function () {
    var profil = "limite";
    //$scope.data.profile = sessionStorage.getItem("")
    return {
      profilUser: function () {
        if (
          sessionStorage.getItem("loggedin_profil") == "Codir YUP Mgt" ||
          sessionStorage.getItem("loggedin_profil") ==
          "Direction Commerciale YUP Mgt" ||
          sessionStorage.getItem("loggedin_profil") == "Marketing YUP Mgt" ||
          sessionStorage.getItem("loggedin_profil") == "Call Center YUP Mgt" ||
          sessionStorage.getItem("loggedin_profil") ==
          "Administrateur Maintenance"
        ) {
          // $scope.data.profile = 'super';
          profil = "super";
        }
        return profil;
      },
    };
  })
  .controller("AddcompteCtrl", function (
    $scope,
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
    SendSms
  ) {
    $scope.user = {};
    console.log("creation de compte");
    $scope.initvar = function () {
      $scope.user.nom = "";
      $scope.user.prenom = "";
      $scope.user.telephone = "";
      $scope.user.adresse = "";
      $scope.user.email = "";
      $scope.user.password = "";
      $scope.user.passwordconfirm = "";
    };
    $scope.initvar();
    $scope.login = function () {
      if (
        $scope.user.nom !== "" &&
        $scope.user.prenom !== "" &&
        $scope.user.telephone !== "" &&
        $scope.user.adresse !== "" &&
        $scope.user.email !== "" &&
        $scope.user.password !== "" &&
        $scope.user.passwordconfirm !== ""
      ) {
        if ($scope.user.password == $scope.user.passwordconfirm) {
          console.log($scope.user);
          $scope.user.profil = "Administrateur";
          $scope.user.dateajout = new Date();

          var url = urlPhp.getUrl();
          var link = url + "/utilisateur.php";
          $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000,
          });
          console.log($scope.user);
          $http
            .post(link, $scope.user)
            .then(function (res) {
              console.log(res);
              if (res.data !== "error") {
                //     $scope.showDialog('Infos', 'reussi')
                sessionStorage.setItem("loggedin_name", $scope.user.email);
                sessionStorage.setItem(
                  "loggedin_password",
                  $scope.user.password
                );
                sessionStorage.setItem("loggedin_iduser", res.data);
                sessionStorage.setItem("loggedin_profil", "Agent recenseur");

                localStorage.setItem("loggedin_name", $scope.user.email);
                localStorage.setItem("loggedin_password", $scope.user.password);
                localStorage.setItem("loggedin_iduser", res.data);
                localStorage.setItem("loggedin_profil", "Agent recenseur");
                localStorage.setItem("isconn", true);
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true,
                });
                $translate("alert_connexion_reussi_header").then(function (
                  header
                ) {
                  $translate("alert_connexion_reussi_content").then(function (
                    content
                  ) {
                    var alertPopup = $ionicPopup.alert({
                      title: header,
                      template: content + $scope.user.email + " !",
                    });
                  });
                });

                $state.transitionTo(
                  "app.bienvenue",
                  {},
                  {
                    reload: true,
                    inherit: true,
                    notify: true,
                  }
                );
              } else {
                $scope.showDialog("erreur", "echec");
              }

              $ionicLoading.hide();
            })
            .catch(function (error) {
              console.log(error);
              $ionicLoading.hide();
              alert(error);
            });
        } else {
          $scope.showDialog(
            "erreur",
            "Les mots de passe ne sont pas conformes"
          );
        }
      } else {
        $scope.showDialog("erreur", "Remplire tout le formulaire");
      }
    };
    $scope.showDialog = function (header, content) {
      $ionicPopup.show({
        title: header,
        template: content,
        scope: $scope,
        buttons: [
          {
            text: "Ok",
            type: "button-positive",
          },
        ],
      });
    };

    $scope.sms_function = function () {
      SendSms.sendSMS("Bissmillah", "776294380");
    };
  })
  .factory("CodeGenere", function ($http, urlPhp) {
    return {
      getCodeGenere: function () {
        var rd_code = Math.floor(Math.random() * 1000 + 1);
        var code_chaine = "";
        if (rd_code) {
          if ((rd_code + "").length === 1) {
            code_chaine = "000" + (rd_code + "").length;
          } else if ((rd_code + "").length === 2) {
            code_chaine = "00" + rd_code;
          } else if ((rd_code + "").length === 3) {
            code_chaine = "0" + rd_code;
          } else if ((rd_code + "").length === 4) {
            code_chaine = "" + rd_code;
          }
        }

        return code_chaine;
      },
    };
  })
  .factory("SendSms", function ($http, urlPhp) {
    return {
      sendSMS: function (text, number) {
        //var number = document.getElementById('numberTxt').value.toString(); /* iOS: ensure number is actually a string */
        //var message = document.getElementById('messageTxt').value;
        //console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
          replaceLineBreaks: true, // true to replace \n by a new line, false by default
          android: {
            // intent: 'INTENT'  // send SMS with the native android SMS messaging
            intent: "", // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
          },
        };

        var success = function () {
          console.log("reussi");
        };
        var error = function (e) {
          console.log(e);
        };
        sms.send(number, text, options, success, error);
      },
    };
  })
  .factory("checkQuantite", function ($http, urlPhp, $filter) {
    return {
      checkQuantite: function (code, qt) {
        console.log('----_in bloc check----------');
        console.log(code)
        var articles = JSON.parse(localStorage.getItem("stocks"));
        console.log(articles);
        if (articles) {

          var articleCheck = $filter('filter')(articles, { codeArticle: code });
          /*for(var i=0;i<articles.length;i++){
            console.log(articles[i].codeArticle);
            console.log(code)
            if(articles[i].codeArticle === code){
              articleCheck.push(articles[i])
            }
          }*/
          console.log(articleCheck);
          if (articleCheck && articleCheck.length == 1) {
            var quantiteStock = +articleCheck[0].quantite;
            var quantite = +qt;
            console.log("Quantite stock:" + quantiteStock);
            console.log("Quantite:" + quantite);

            if (quantite <= quantiteStock) {
              //Quantite disponnible
              return 1;
            } else {
              //Quantite insuffisante
              return 'Quantite insuffisante'
            }
          } else if (articleCheck && articleCheck.length > 1) {

            return 'Le code de l\'Artcile sur votre stock est dupliqué. Veuillez faire une nouvelle synchro';

          } else {

            return 'Artcile non disponnible sur votre stock. Veuillez faire une nouvelle synchro';

          }
        }

      },
    };
  })
  .factory("ListpaysByProfil", function ($http, urlPhp) {
    var connect;
    var listdespays;
    var payschoisit;
    var pays;
    return {
      listpaysByProfil: function (profil) {
        console.log(profil);
        if (window.Connection) {
          if (navigator.connection.type == Connection.NONE) {
            connect = false;
          } else {
            connect = true;
            if (profil == "super") {
              var url = urlPhp.getUrl();
              $http
                .get(url + "/pays.php")
                .success(function (response) {
                  // $ionicLoading.hide();
                  pays = response;
                  localStorage.setItem("paysOnline", angular.toJson(pays));
                  listdespays = [];
                  for (var i = 0; i < response.length; i++) {
                    var pv = { name: response[i].pays, id: response[i].idpays };
                    listdespays.push(pv);
                  }
                })
                .catch(function (error) {
                  // $ionicLoading.hide();
                  console.log(error);
                });
              //
            } else {
              //Recuperer la liste des pays
              var url = urlPhp.getUrl();
              $http
                .get(
                  url +
                  "/paysByUser.php?idutilisateurs=" +
                  sessionStorage.getItem("loggedin_iduser")
                )
                .success(function (response) {
                  //  $ionicLoading.hide();
                  pays = response;
                  localStorage.setItem("paysOnline", angular.toJson(pays));
                  listdespays = [];
                  for (var i = 0; i < response.length; i++) {
                    var pv = { name: response[i].pays, id: response[i].idpays };
                    listdespays.push(pv);
                  }
                  if (listdespays.length != 0) {
                    payschoisit = listdespays[0];
                  }
                  listdespays = [];
                  listdespays.push(payschoisit);
                  // $scope.listDesregionsByPaysID();
                })
                .catch(function (error) {
                  // $ionicLoading.hide();
                });
              //Recuperer la liste des villes
            }
          }
        }
        return listdespays;
      },
    };
  });
