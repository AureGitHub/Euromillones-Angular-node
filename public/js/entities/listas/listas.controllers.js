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