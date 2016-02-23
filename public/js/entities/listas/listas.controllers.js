// **************** GenericList ************************************************************************
myApp.controller("GenericListCtrl", ['$scope', '$window', 'datosServer', 'accesoBDfactory', '$location', '$uibModal', 'growl','Tablas','$route',
    function ($scope, $window, datosServer, accesoBDfactory, $location, $uibModal, growl,Tablas,$route) {



        $scope.items = datosServer.data;

        var TablaDatos = $route.current.$$route.TablaDatos;
        
        $scope.Titulo=$route.current.$$route.Titulo;
        
        

        $scope.Editar = function (item) {
            $scope.item = item;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalGenericList.html',
                controller: 'ModalGenericItemCtrl',

                resolve: {
                    item: function () {
                        return $scope.item;
                    },
                    Titulo : function () {
                        return $scope.Titulo;
                    }
                }
            });

            modalInstance.result.then(function (item) {

                accesoBDfactory.update(Tablas[TablaDatos], item).then(function () {

                    accesoBDfactory.get(Tablas[TablaDatos]).then(function () {
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

myApp.controller('ModalGenericItemCtrl', function ($scope, $uibModalInstance, item,Titulo) {

    $scope.item = item;
    
    $scope.Titulo = Titulo;

    $scope.ok = function () {
        $uibModalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// **************** FIN GenericList ************************************************************************
