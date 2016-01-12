myApp.controller("HeaderCtrl", ['$scope', '$location', '$interval', 'UserAuthFactory', 'AuthenticationFactory', 'growl',
    function ($scope, $location, $interval, UserAuthFactory, AuthenticationFactory, growl) {
        /*
        $scope.user = {
            username: AuthenticationFactory.user.username,
            expires: AuthenticationFactory.expires
        };*/



        $scope.user = {
            username: 'jdesande',
            password: '123456'
        };

        $scope.login = function () {

            var username = $scope.user.username,
                password = $scope.user.password;



            UserAuthFactory.login(username, password).then(function (data) {
                growl.success('Se ha conectado correctamente', { title: 'Conectado' });
                $location.path("/");
            });


        };

        this.loadNotifications = function () {

            if (AuthenticationFactory.isLogged()) {
                AuthenticationFactory.check();

                if (!AuthenticationFactory.User) {
                    growl.info('Su sesión ha expirado.', { title: '' });
                    $location.path("/");
                }


            }



        };


        $interval(function () {
            this.loadNotifications();
        }.bind(this), 10000);



        $scope.isActive = function (route) {
            return route === $location.path();
        }


        $scope.IsLogin = function () {
            return AuthenticationFactory.isLogged();
        }

        $scope.IsAdmin = function () {
            return AuthenticationFactory.isAdmin();
        }



        $scope.logout = function () {

            growl.success('Se ha desconectado correctamente', { title: 'Desconexión' });

            UserAuthFactory.logout();

            $location.path("/");

        }
    }
]);




myApp.controller("HomeCtrl", ['$scope',
    function ($scope) {



    }
]);





myApp.controller("UserListCtrl", ['$scope', '$window', 'datosServer', 'userFactory', "$location",
    function ($scope, $window, datosServer, userFactory, $location) {

        $scope.usuarios = datosServer.data;

        userFactory.lista = datosServer.data;

        $scope.Editar = function (User) {
            userFactory.IdEdiccion = User.id;
            $location.path("/UserEditAdmin");
        }


        $scope.Crear = function () {

            userFactory.IdEdiccion = -1;
            $location.path("/UserEditAdmin");
        }



        $scope.Borrar = function (User) {
            userFactory.IdEdiccion = User.id;

            userFactory.borrar(User).then(function () {
                userFactory.load().then(function (data) {
                    $scope.usuarios = data.data;
                });
            });






        }

    }
]);


myApp.controller("RolListCtrl", ['$scope', '$window', 'datosServer', 'listasFactory', '$location', '$uibModal', 'growl',
    function ($scope, $window, datosServer, listasFactory, $location, $uibModal, growl) {

        $scope.roles = datosServer.data;

        $scope.Editar = function (rol) {
            $scope.rol = rol;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',

                resolve: {
                    rol: function () {
                        return $scope.rol;
                    }
                }
            });

            modalInstance.result.then(function (rolUpdate) {

                listasFactory.updateRol(rolUpdate).then(function () {

                    listasFactory.loadRoles().then(function () {
                        growl.success('Guardado correctamente', { title: 'Guardado' });
                    });
                });

            });



        }


        $scope.Crear = function () {


        }



        $scope.Borrar = function (User) {


        }

    }
]);

myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, rol) {

    $scope.rol = rol;

    $scope.ok = function () {
        $uibModalInstance.close($scope.rol);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});




myApp.controller("UserEditCtrl", ['$scope', 'userFactory', "$location", 'AuthenticationFactory', '$route', 'growl',
    function ($scope, userFactory, $location, AuthenticationFactory, $route, growl) {


        var FromMenu = $route.current.$$route.FromMenu;




        if (FromMenu) {

            $scope.user = AuthenticationFactory.User;
        
            //El usuario quiere modificar sus dados
        }
        else {
        
        
       
        
            //Un admin está modificando / creando un usuario
            if (userFactory.IdEdiccion > -1) {
                var result = $.grep(userFactory.lista, function (e) { return e.id == userFactory.IdEdiccion; });
                $scope.user = result[0];
            }
        }


        if (AuthenticationFactory.isAdmin()) {
            $scope.ListaRoles = [
                { Id: '1', Name: 'Administrador' },
                { Id: '2', Name: 'Usuario' }
            ];

            $scope.RolSeleccionado = $.grep($scope.ListaRoles, function (e) { return e.Id == $scope.user.role; })[0];



        }




        $scope.dropboxitemselected = function (item) {
            $scope.RolSeleccionado = item;
            $scope.user.role = item.Id;
        }




        $scope.IsAdmin = function (route) {
            return AuthenticationFactory.isAdmin();
        }


        $scope.save = function () {

            if (userFactory.IdEdiccion < 0) {
                userFactory.create($scope.user);
            }
            else {
                if (AuthenticationFactory.isAdmin())
                    userFactory.updateAdmin($scope.user).then(function () {
                        growl.success('Guardado correctamente', { title: 'Guardado' });
                        if (!FromMenu)
                            $location.path("/UserList");

                    });
                else
                    userFactory.update($scope.user).then(function () {
                        growl.success('Guardado correctamente', { title: 'Guardado' });

                    });
            }
            
            //Mensaje de OK
            
           
        }


        $scope.Crear = function () {
            userFactory.update($scope.user);
            $location.path("/UserList");
        }



        $scope.cancelar = function () {

            $location.path("/UserList");
        }

    }
]);

