// **************** GenericList ************************************************************************
myApp.controller("GenericListCtrl", ['$rootScope','$scope', '$window', 'datosServer', 'accesoBDfactory', '$location', 'growl','Tablas','$route','ngDialog',
    function ($rootScope,$scope, $window, datosServer, accesoBDfactory, $location, growl,Tablas,$route,ngDialog) {

        $scope.items = datosServer.data;

        var TablaDatos = $route.current.$$route.TablaDatos;
        
        $scope.Editar = function (item) {
           
            $scope.itemUpdate ={ 
                item : {},
                Titulo : $route.current.$$route.Titulo
                
            };
             $rootScope.beforeUpdate(item,$scope.itemUpdate.item);
            
            
              var dialog = ngDialog.open({
                template: 'myModalGenericList.html',
                scope: $scope

            });
            
            dialog.closePromise.then(function(data) {
                if (data.value) {
                    var itemUpdate={};
                    $rootScope.afterUpdate(data.value,itemUpdate),
                     accesoBDfactory.update(Tablas[TablaDatos], itemUpdate).then(function () {
                         $rootScope.afterUpdate(data.value,item),
                        growl.success('Guardado correctamente', { title: 'Guardado' });
                    });
                }
               
            });

        }
        
        $scope.Crear = function () {

        }

        $scope.Borrar = function (User) {

        }

    }
]);


// **************** FIN GenericList ************************************************************************
