var IndexCtrl = angular.module('IndexCtrl', []);

IndexCtrl.controller('IndexController', function ($timeout, $scope, $rootScope, $location, $sce, CrudData, MockData) {

    var vm = this;
    console.log('Index Controller');

    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";


    console.log($rootScope.mottos);

    if ($rootScope.mottos == undefined) {

        // GET MOTTOS ---------------------------------------------------------
        MockData.getMottos().then(function (data) {
            $rootScope.mottos = data;
            $scope.mottos = $rootScope.mottos;
        });
    }

    vm.supportData = {
        NameSurname: null,
        Email: null,
        Phone: null,
        Content: null,
        SavedDate: null
    }

    vm.sendSupportMessage = function () {

        vm.supportData.SavedDate = globe.getDate();
        CrudData.sendSupportMessage(vm.supportData, function (response) {

            if (response.data.success) {
                alert("Mesajınız Alınmıştır En Kısa Sürede Size Ulaşacağız :)");
            } else {
                alert("Mesaj Gönderilirken Hata Oluştu Daha Sonra Tekrar Deneyiniz :(");
            }
        });
    }

    $scope.setStyle = function () {
        return {
            background: success
        }
    }

});