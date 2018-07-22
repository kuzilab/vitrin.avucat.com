var LawLoginCtrl = angular.module('LawLoginCtrl', []);

LawLoginCtrl.controller('LawLoginController', function ($cookieStore, $window, $scope, $rootScope, $location, $sce, CrudData, Auth, AuthUser, $cookieStore) {

    var vm = this;


    console.log('Law Login Controller');
    vm.loginData = {
        Email: null,
        Password: null,
        RememberMe: null
    }

    var RememberMe = $cookieStore.get('RememberMe');
    if (RememberMe != undefined) {
        vm.loginData.RememberMe = RememberMe;
        vm.loginData.Email = $cookieStore.get('Email');
        vm.loginData.Password = $cookieStore.get('Password');
    } else {
        vm.loginData.Email = null;
        vm.loginData.Password = null;
    }


    vm.doLogin = function () {
        if (vm.loginData.RememberMe != null && vm.loginData.RememberMe != false) {
            $cookieStore.put('RememberMe', true);
            $cookieStore.put('Email', vm.loginData.Email);
            $cookieStore.put('Password', vm.loginData.Password);
        } else {
            $cookieStore.remove("RememberMe");
            $cookieStore.remove('Email');
            $cookieStore.remove('Password');
        }

        Auth.isUser(vm.loginData.Email, function (response) {
            if (!response.data.success) {
                Auth.login(vm.loginData.Email, vm.loginData.Password, function (response) {
                    if (response.data.success) {
                        console.log(response);
                        $window.location.href = "http://localhost:3000/"
                    } else {
                        vm.message = response.data.message;
                        vm.situation = response.data.situation;

                        if (vm.situation === "no_user") {
                            console.log(vm.message)
                        } else if (vm.situation === "invalid_password") {
                            console.log(vm.message)
                        } else if (vm.situation === "valid_user") {
                            console.log(vm.message)

                        }
                    }
                });
            }
        });
    }
});