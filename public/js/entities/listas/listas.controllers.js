// **************** ROLES ************************************************************************
myApp.controller("RolListCtrl", ['$scope', '$window', 'datosServer', 'listasFactory', '$location', '$uibModal', 'growl',
    function ($scope, $window, datosServer, listasFactory, $location, $uibModal, growl) {

        $scope.roles = datosServer.data;

        $scope.Editar = function (rol) {
            $scope.rol = rol;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalRol.html',
                controller: 'ModalRolCtrl',

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

myApp.controller('ModalRolCtrl', function ($scope, $uibModalInstance, rol) {

    $scope.rol = rol;

    $scope.ok = function () {
        $uibModalInstance.close($scope.rol);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// **************** FIN ROLES ************************************************************************


// **************** EstadoApuesta ************************************************************************
myApp.controller("EstadoApuestaListCtrl", ['$scope', '$window', 'datosServer', 'listasFactory', '$location', '$uibModal', 'growl',
    function ($scope, $window, datosServer, listasFactory, $location, $uibModal, growl) {

        $scope.EstadosApuesta = datosServer.data;

        $scope.Editar = function (estadoapuesta) {
            $scope.EstadoApuesta = estadoapuesta;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalEstadoApuesta.html',
                controller: 'ModalEstadoApuestaCtrl',

                resolve: {
                    EstadoApuesta: function () {
                        return $scope.EstadoApuesta;
                    }
                }
            });

            modalInstance.result.then(function (EstadoApuestaUpdate) {

                listasFactory.updateEstadoApuesta(EstadoApuestaUpdate).then(function () {

                    listasFactory.loadEstadoApuesta().then(function () {
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

myApp.controller('ModalEstadoApuestaCtrl', function ($scope, $uibModalInstance, EstadoApuesta) {

    $scope.EstadoApuesta = EstadoApuesta;

    $scope.ok = function () {
        $uibModalInstance.close($scope.EstadoApuesta);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// **************** FIN EstadoApuesta ************************************************************************


// **************** EstadoApuesta ************************************************************************
myApp.controller("EstadoJugadoresListCtrl", ['$scope', '$window', 'datosServer', 'listasFactory', '$location', '$uibModal', 'growl',
    function ($scope, $window, datosServer, listasFactory, $location, $uibModal, growl) {

        $scope.EstadosJugador = datosServer.data;

        $scope.Editar = function (EstadoJugador) {
            $scope.EstadoJugador = EstadoJugador;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalEstadosJugador.html',
                controller: 'ModalEstadosJugadorCtrl',

                resolve: {
                    EstadoJugador: function () {
                        return $scope.EstadoJugador;
                    }
                }
            });

            modalInstance.result.then(function (EstadoJugadorUpdate) {

                listasFactory.updateEstadoJugador(EstadoJugadorUpdate).then(function () {

                    listasFactory.loadEstadoJugador().then(function () {
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

myApp.controller('ModalEstadosJugadorCtrl', function ($scope, $uibModalInstance, EstadoJugador) {

    $scope.EstadoJugador = EstadoJugador;

    $scope.ok = function () {
        $uibModalInstance.close($scope.EstadoJugador);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// **************** FIN EstadoApuesta ************************************************************************
