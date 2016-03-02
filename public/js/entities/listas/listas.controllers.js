// **************** GenericList ************************************************************************
myApp.controller("GenericListCtrl", ['$rootScope','$scope', '$window', 'datosServer', 'accesoBDfactory', '$location', 'growl','Tablas','$route','ngDialog',
    function ($rootScope,$scope, $window, datosServer, accesoBDfactory, $location, growl,Tablas,$route,ngDialog) {

        $scope.items = datosServer.data;
        
         $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            columnDefs: [{
                name: 'Descripcion',
                field: 'descripcion',
                width: '85%'
            }, {
                field: 'Acciones',
                enableFiltering: false,
                width: '15%',
                enableSorting: false,
                cellTemplate: '<div class="ui-grid-cell-contents">' +
                    ' <button ng-click="grid.appScope.Editar(row)" type="button" class="btn btn-primary btn-xs" aria-label="Left Align">' +
                    '         <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>' +
                    '       </button>' +
                    '       <button ng-click="grid.appScope.Borrar(row)" type="button" class="btn btn-danger btn-xs" aria-label="Left Align">' +
                    '         <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                    '       </button>' +
                    '</div>'
            }],
            data: $scope.items
        };

        var TablaDatos = $route.current.$$route.TablaDatos;
        
         $scope.Titulo = $route.current.$$route.Titulo;
        
        $scope.Editar = function (row) {
            
            if(!row){
                 $scope.itemUpdate ={ 
                item : {},
                Titulo : $route.current.$$route.Titulo
                };
            }
            else{
                var item=row.entity;
                $scope.itemUpdate ={ 
                item : item,
                Titulo : $route.current.$$route.Titulo
                };
                
                $scope.Back = angular.copy(row.entity);
            }
            
            
            
            
              var dialog = ngDialog.open({
                template: 'myModalGenericList.html',
                scope: $scope

            });
            
            dialog.closePromise.then(function(data) {
                 if(data.value=='$closeButton')  
                {
                   
                     row.entity = angular.copy($scope.Back);
                    return ;
                }
                if (data.value) {
                    var itemUpdate=data.value;
                    
                    if(!itemUpdate.id){
                         accesoBDfactory.create(Tablas[TablaDatos], itemUpdate).then(function (itemCreated) {
                            $scope.items.push(itemCreated.data);
                            growl.success('Creado correctamente', { title: 'Guardado' });
                        });
                    }
                    else{
                         accesoBDfactory.update(Tablas[TablaDatos], itemUpdate).then(function () {
                         
                            growl.success('Guardado correctamente', { title: 'Guardado' });
                        });
                    }
                    
                    
                }
                else
                   row.entity = angular.copy($scope.Back);
               
            });

        }
        
        $scope.Crear = function () {

        }

        $scope.Borrar = function (row) {
            $scope.confirmacion = {
                mensaje: 'Se va a borrar el item ' + row.entity.descripcion
            };

            ngDialog.openConfirm({
                template: 'PanelConfirm',
                scope: $scope
            }).then(function(value) {
                accesoBDfactory.delete(Tablas[TablaDatos], row.entity).then(function() {
                    growl.success('Borrado correctamente', {
                        title: 'Borrado'
                    });
                    var index = $scope.items.indexOf(row.entity);
                    $scope.items.splice(index, 1);
                });
            }, function(value) {
                //Do something 
            });

        }

    }
]);


// **************** FIN GenericList ************************************************************************
