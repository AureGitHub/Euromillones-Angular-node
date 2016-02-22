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


myApp.controller("UserEditCtrl", ['$scope', 'accesoBDfactory', "$location", 'AuthenticationFactory', '$route', 'growl','Tablas',
    function ($scope, accesoBDfactory, $location, AuthenticationFactory, $route, growl,Tablas) {


        $scope.user = AuthenticationFactory.User;
       



        $scope.save = function () {
           
                    accesoBDfactory.updateJugadoresNoAdmin(Tablas.Jugadores,$scope.user).then(function () {
                        growl.success('Guardado correctamente', { title: 'Guardado' });
                    });
           
            
            //Mensaje de OK
            
           
        }

       



        $scope.cancelar = function () {

            $location.path("/");
        }

    }
]);