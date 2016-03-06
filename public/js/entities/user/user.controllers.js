myApp.controller("UserListCtrl", ['$rootScope', '$scope', 'datosServer', 'accesoBDfactory', 'growl', 'Tablas', '$filter', 'ngDialog',
    function($rootScope, $scope, datosServer, accesoBDfactory, growl, Tablas, $filter, ngDialog) {

        $scope.usuarios = datosServer.data;


        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            columnDefs: [{
                name: 'id',
                field: 'id',
                visible: false
            }, {
                name: 'Usuario',
                field: 'username',
                width: '20%'
            }, {
                name: 'Nombre',
                field: 'Nombre',
                width: '50%'
            }, {
                name: 'Rol',
                field: 'TiposRole.descripcion',
                enableCellEdit: true,
                width: '10%'
            }, {
                name: 'Saldo',
                field: 'Saldo.saldo',
                enableCellEdit: false,
                width: '5%'
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
                    '       <button ng-click="grid.appScope.PreIncrementaSaldo(row)" type="button" class="btn btn-warning btn-xs"> ' +
                    '         <span class="glyphicon glyphicon-euro" aria-hidden="true"></span> ' +
                    '       </button> ' +
                    '</div>'
            }],
            data: $scope.usuarios
        };


        $scope.filtro = {
            dato: ""
        }

        $scope.myFilter = function(item) {
            if ($scope.filtro.dato == '') return true;

            if ($rootScope.normalizeTexto(item.username).indexOf($rootScope.normalizeTexto($scope.filtro.dato)) > -1) return true;
            if ($rootScope.normalizeTexto(item.Nombre).indexOf($rootScope.normalizeTexto($scope.filtro.dato)) > -1) return true;


            return false;


        };


 
        $scope.PreIncrementaSaldo = function(row) {
            $scope.UserIncrementar = row.entity;
            if (!$scope.UserIncrementar.Saldo) {
                $scope.UserIncrementar.Saldo = {};
                $scope.UserIncrementar.Saldo.saldo_$u = 0;
                $scope.UserIncrementar.Saldo.id = $scope.UserIncrementar.id;

            }
            else
                $scope.UserIncrementar.Saldo.saldo_$u = $scope.UserIncrementar.Saldo.saldo;


            var dialog = ngDialog.open({
                template: 'PanelIncrementarSaldo',
                scope: $scope

            });


            dialog.closePromise.then(function(data) {
                if (data.value && $scope.UserIncrementar.Saldo.IncrementoSaldo > 0) {
                    var SaldoUpdate = jQuery.extend(true, {}, $scope.UserIncrementar.Saldo);
                    if (isNaN(SaldoUpdate.saldo))
                        SaldoUpdate.saldo = 0;
                    SaldoUpdate.saldo += SaldoUpdate.IncrementoSaldo;
                    accesoBDfactory.update(Tablas.Saldos, SaldoUpdate).then(function() {
                        $scope.UserIncrementar.Saldo = jQuery.extend(true, {}, SaldoUpdate);
                        growl.success('Saldo incrementado correctamente en ' + $scope.UserIncrementar.Saldo.IncrementoSaldo + ' €', {
                            title: 'Guardado'
                        });

                    });
                }
                else
                    $scope.UserIncrementar.Saldo.IncrementoSaldo = null;
            });
        };


        $scope.dropboxitemselected = function(item) {
            
                $scope.RolSeleccionado = item;
                $scope.userEdit.IdRol = item.Id;
            }
            
            
       

        $scope.Editar = function(row) {

            $scope.ListaRoles = [{
                Id: '1',
                Name: 'Administrador'
            }, {
                Id: '2',
                Name: 'Usuario'
            }];


           


            
            if (!row) {
                $scope.userEdit = {};
                $scope.userEdit.IdRol = 2;
                 $scope.userEdit.Saldo={id :$scope.userEdit.id  };
                
            }
            else{
                $scope.userEdit = row.entity;
                 $scope.userEdit.IdRol = row.entity.IdRol;
                $scope.Back = angular.copy(row.entity);
            }
                
            if(!$scope.userEdit.Saldo)
            {
                $scope.userEdit.Saldo={id :$scope.userEdit.id  };
            }
                
            
            

            $scope.RolSeleccionado = $.grep($scope.ListaRoles, function(e) {
                return e.Id == $scope.userEdit.IdRol;
            })[0];


           


            var dialog = ngDialog.open({
                template: 'myModalUser.html',
                scope: $scope

            });

            dialog.closePromise.then(function(data) {
                if(data.value=='$closeButton')  
                {
                     row.entity = angular.copy($scope.Back);
                    return ;
                }
                var userUpdate=data.value;
                if (data.value ) {
                    if (!userUpdate.id) {
                         

                    accesoBDfactory.create(Tablas.Jugadores, userUpdate).then(function(UserCreated) {

                        $scope.usuarios.push(UserCreated.data);
                        growl.success('Creado correctamente', {
                            title: 'Guardado'
                        });
                    });

                    }
                    else {
                        var forUpdateBD = jQuery.extend(true, {}, userUpdate);
                         
                        accesoBDfactory.update(Tablas.Jugadores, forUpdateBD).then(function(userUpdated) {
                            var index = $scope.usuarios.indexOf(userUpdate);
                            $scope.usuarios[index] = userUpdated.data;
                            growl.success('Guardado correctamente', {
                                title: 'Guardado'
                            });
                        });
                    }
                    
                }   
                else
                {
                    row.entity = angular.copy($scope.Back);
                }
                    
                   
               

            });


        }



        $scope.Borrar = function(row) {
            var User = row.entity;
            $scope.confirmacion = {
                mensaje: 'Se va a borrar el jugador ' + row.entity.Nombre
            };

            ngDialog.openConfirm({
                template: 'PanelConfirm',
                scope: $scope
            }).then(function(value) {
                accesoBDfactory.delete(Tablas.Jugadores, User).then(function() {
                    growl.success('Borrado correctamente', {
                        title: 'Borrado'
                    });
                    var index = $scope.usuarios.indexOf(User);
                    $scope.usuarios.splice(index, 1);
                });
            }, function(value) {
                //Do something 
            });

        }
    }
]);





myApp.controller("UserEditCtrl", ['$scope', 'accesoBDfactory', "$location", 'AuthenticationFactory', '$route', 'growl', 'Tablas',
    function($scope, accesoBDfactory, $location, AuthenticationFactory, $route, growl, Tablas) {


        $scope.user = AuthenticationFactory.User;




        $scope.save = function() {

            accesoBDfactory.updateJugadoresNoAdmin(Tablas.Jugadores, $scope.user).then(function() {
                growl.success('Guardado correctamente', {
                    title: 'Guardado'
                });
            });


            //Mensaje de OK


        }





        $scope.cancelar = function() {

            $location.path("/");
        }

    }
]);


myApp.controller("MisDatosCtrl", ['$scope', 'accesoBDfactory', 'AuthenticationFactory', 'growl', 'ngDialog',
    function($scope, accesoBDfactory, AuthenticationFactory, growl, ngDialog) {
        $scope.user = AuthenticationFactory.User;
        if (!$scope.user.Saldo) {
            $scope.user.Saldo = {};
            $scope.user.Saldo.saldo = 0;
        }

    }
]);
