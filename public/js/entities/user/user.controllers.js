myApp.controller("UserListCtrl", ['$rootScope', '$scope', '$window', 'datosServer', 'accesoBDfactory', "$location", '$uibModal', 'growl', 'Tablas', '$filter', 'ngDialog',
    function($rootScope, $scope, $window, datosServer, accesoBDfactory, $location, $uibModal, growl, Tablas, $filter, ngDialog) {

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
                    var SaldoUpdate= jQuery.extend(true, {}, $scope.UserIncrementar.Saldo);
                    if (isNaN(SaldoUpdate.saldo))
                        SaldoUpdate.saldo = 0;
                    SaldoUpdate.saldo += SaldoUpdate.IncrementoSaldo;
                    accesoBDfactory.update(Tablas.Saldos, SaldoUpdate).then(function() {
                        $scope.UserIncrementar.Saldo= jQuery.extend(true, {}, SaldoUpdate);
                        growl.success('Saldo incrementado correctamente en ' + $scope.UserIncrementar.Saldo.IncrementoSaldo + ' €', {
                            title: 'Guardado'
                        });

                    });
                }
                else
                    $scope.UserIncrementar.Saldo.IncrementoSaldo=null;
            });
        };


        $scope.PreIncrementaSaldo1 = function(row) {
            ngDialog.open({
                template: 'templateId',
                controller: 'IncrementarSaldoCtrl',
                data: row.entity
            });
        };



        $scope.Editar = function(row) {
            var User = row.entity;
            if (!User) {
                $scope.UserEdit = {};
                $scope.UserEdit.IdRol = 2;
            }
            else
                $scope.UserEdit = User;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalUser.html',
                controller: 'ModalUserCtrl',

                resolve: {
                    UserEdit: function() {
                        return $scope.UserEdit;
                    }
                }
            });

            modalInstance.result.then(function(userUpdate) {

                if (!userUpdate.id) {

                    accesoBDfactory.create(Tablas.Jugadores, userUpdate).then(function(UserCreated) {

                        $scope.usuarios.push(UserCreated.data);
                        growl.success('Creado correctamente', {
                            title: 'Guardado'
                        });
                    });

                }
                else {
                    accesoBDfactory.update(Tablas.Jugadores, userUpdate).then(function(userUpdated) {
                        var index = $scope.usuarios.indexOf(userUpdate);
                        $scope.usuarios[index] = userUpdated.data;
                        growl.success('Guardado correctamente', {
                            title: 'Guardado'
                        });
                    });
                }

            });

        }


        $scope.Borrar = function(row) {
            var User = row.entity;
            $scope.confirmacion = {mensaje : 'Se va a borrar el jugador ' + row.entity.Nombre};

            ngDialog.openConfirm({
                template: 'PanelConfirm',
                scope  : $scope
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


myApp.controller('IncrementarSaldoCtrl', ['$scope', 'accesoBDfactory', 'Tablas', 'growl',
    function($scope, accesoBDfactory, Tablas, growl) {

        $scope.jugador = $scope.ngDialogData;

        $scope.IncrementaSaldo = function() {

            if (isNaN($scope.jugador.Saldo.IncrementoSaldo) || $scope.jugador.Saldo.IncrementoSaldo == 0)
                return;

            if (isNaN($scope.jugador.Saldo.saldo))
                $scope.jugador.Saldo.saldo = 0;
            $scope.jugador.Saldo.saldo += $scope.jugador.Saldo.IncrementoSaldo;
            $scope.jugador.Saldo.id = $scope.jugador.id;



            accesoBDfactory.update(Tablas.Saldos, $scope.jugador.Saldo).then(function() {
                growl.success('Saldo incrementado correctamente en ' + $scope.jugador.Saldo.IncrementoSaldo + ' €', {
                    title: 'Guardado'
                });
                this.closeThisDialog();
            });


        }

    }
]);


myApp.controller('ModalUserCtrl', function($rootScope, $scope, $uibModalInstance, UserEdit) {


    $scope.ListaRoles = [{
        Id: '1',
        Name: 'Administrador'
    }, {
        Id: '2',
        Name: 'Usuario'
    }];

    $scope.userEdit = UserEdit;

    $scope.RolSeleccionado = $.grep($scope.ListaRoles, function(e) {
        return e.Id == $scope.userEdit.IdRol;
    })[0];



    $scope.IsAdmin = function(route) {
        return $rootScope.session.isAdmin();
    }



    $scope.dropboxitemselected = function(item) {
        $scope.RolSeleccionado = item;
        $scope.userEdit.IdRol = item.Id;
    }


    $scope.ok = function() {
        $uibModalInstance.close($scope.userEdit);
    };

    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    };
});



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
