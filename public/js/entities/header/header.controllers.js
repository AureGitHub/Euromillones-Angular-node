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