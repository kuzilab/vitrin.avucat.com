var LawDetailCtrl = angular.module('LawDetailCtrl', []);

LawDetailCtrl.controller('LawDetailController', function ($window, $scope, $rootScope, $location, $sce, $routeParams, GoogleMapster, MockData, CrudData) {

    var vm = this;
    console.log('LawDetail Controller');

    $('html,body').stop().animate({
        scrollTop: $('#main').offset().top
    }, 1000);

    var name = $routeParams.name;

    if ($rootScope.lawyers != undefined) {
        $scope.lawyers = $rootScope.lawyers;
        runLawyers();
    } else {
        var item = {
            id: "1"
        };

        // Convert ExpertiseField ID to Text -------------------------------
        // -----------------------------------------------------------------
        MockData.getExpertiseFields().then(function (data) {
            $rootScope.Fields = data;
        });

        CrudData.getLawyersByCriticize(item, function (response) {
            if (response.data.success) {
                $scope.lawyers = response.data.lawyers;
                angular.forEach($scope.lawyers, function (item) {


                    if (item.ProfileBase64Pic == undefined) {
                        item.ProfileBase64Pic = "../assets/img/user.png";
                    } else {
                        item.ProfileBase64Pic = item.ProfileBase64Pic;
                    }


                    var expertises = item.ExpertiseFields;
                    item.FieldTextList = [];
                    for (var i = 0; i < expertises.length; i++) {
                        var field = expertises[i];
                        for (var j = 0; j < $rootScope.Fields.length; j++) {
                            if (field == $rootScope.Fields[j].id) {
                                item.FieldTextList.push($rootScope.Fields[j].name);
                            }
                        }
                    }
                });
                runLawyers();
            }
        });
    }

    function runLawyers() {
        angular.forEach($scope.lawyers, function (item) {
            if (item.RoutePath == name) {
                $scope.lawyer = item;
                var Phone = item.Phone;

                item.telBoard = "+90-" + globe.convertToTelFormat(Phone);
                item.telFormat = "tel:" + item.telBoard;
                item.EmailFormat = "mailto:" + item.Email;

                GoogleMapster.createGoogleMapForSingleLawyer(item.Lat, item.Lng)

                // Convert ExpertiseField ID to Text -------------------------------
                // -----------------------------------------------------------------
                MockData.getExpertiseFields().then(function (data) {
                    $rootScope.Fields = data;
                });

                var expertises = $scope.lawyer.ExpertiseFields;
                item.FieldTextList = [];
                for (var i = 0; i < expertises.length; i++) {
                    var field = expertises[i];
                    for (var j = 0; j < $rootScope.Fields.length; j++) {
                        if (field == $rootScope.Fields[j].id) {
                            item.FieldTextList.push($rootScope.Fields[j].name);
                        }
                    }
                }
            }
        });
    }



});