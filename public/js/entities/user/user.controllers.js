myApp.controller("UserListCtrl", ['$scope', '$window', 'datosServer', 'accesoBDfactory', "$location",'$uibModal', 'growl','Tablas',
    function ($scope, $window, datosServer, accesoBDfactory, $location, $uibModal, growl,Tablas) {

        $scope.usuarios = datosServer.data;
       

        $scope.Editar = function (User) {
            
            if(!User){
                $scope.UserEdit={};
                $scope.UserEdit.IdRol = 2;
            }
            else
                $scope.UserEdit = User;

            var modalInstance = $uibModal.open({

                templateUrl: 'myModalUser.html',
                controller: 'ModalUserCtrl',

                resolve: {
                    UserEdit: function () {
                        return $scope.UserEdit;
                    }
                }
            });

            modalInstance.result.then(function (userUpdate) {
                
                if(!userUpdate.id){
                
                    accesoBDfactory.create(Tablas.Jugadores, userUpdate).then(function (UserCreated) {
                       
                        $scope.usuarios.push(UserCreated.data);
                        growl.success('Creado correctamente', { title: 'Guardado' });
                    });
                
                }
                else
                {
                    accesoBDfactory.update(Tablas.Jugadores, userUpdate).then(function (userUpdated) {
                        var index = $scope.usuarios.indexOf(userUpdate);
                        $scope.usuarios[index] = userUpdated.data;
                        growl.success('Guardado correctamente', { title: 'Guardado' });
                    });
                }
                
            });
           
        }
        





        $scope.Borrar = function (User) {
            
            if(confirm("Vas a borrar a " + User.username + ". ¿Continuar?")){
                
                accesoBDfactory.delete(Tablas.Jugadores,User).then(function () {
                    growl.success('Borrado correctamente', { title: 'Borrado' });
                    var index = $scope.usuarios.indexOf(User);
                    $scope.usuarios.splice(index, 1);     
            });
                
                
            }
            

            
        }
    }
]);


myApp.controller('ModalUserCtrl', function ($rootScope,$scope, $uibModalInstance, UserEdit) {


 $scope.ListaRoles = [
                { Id: '1', Name: 'Administrador' },
                { Id: '2', Name: 'Usuario' }
            ];

    $scope.userEdit = UserEdit;
    
    $scope.RolSeleccionado = $.grep($scope.ListaRoles, function (e) { return e.Id == $scope.userEdit.IdRol; })[0];
    
    

    $scope.IsAdmin = function (route) {
            return $rootScope.session.isAdmin();
        }



        $scope.dropboxitemselected = function (item) {
            $scope.RolSeleccionado = item;
            $scope.userEdit.IdRol = item.Id;
        }
    

    $scope.ok = function () {
        $uibModalInstance.close($scope.userEdit);
    };

    $scope.cancelar = function () {
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

            $scope.RolSeleccionado = $.grep($scope.ListaRoles, function (e) { return e.Id == $scope.user.IdRol; })[0];



        }




        $scope.dropboxitemselected = function (item) {
            $scope.RolSeleccionado = item;
            $scope.user.IdRol = item.Id;
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