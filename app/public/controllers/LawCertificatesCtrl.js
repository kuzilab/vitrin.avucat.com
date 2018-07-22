var LawCertificatesCtrl = angular.module('LawCertificatesCtrl', []);

LawCertificatesCtrl.controller('LawCertificatesController', function ($scope, $rootScope, $location, $sce, CrudData, $routeParams, MockData) {

    var vm = this;
    console.log('Certificate Controller');
    var name = $routeParams.name;


    if ($rootScope.lawyers != undefined) {
        $scope.lawyers = $rootScope.lawyers;
        runCertificates();
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
                runCertificates();
            }
        });
    }

    function runCertificates() {
        angular.forEach($scope.lawyers, function (item) {
            if (item.RoutePath == name) {
                $scope.lawyer = item;
                var Phone = item.Phone;
                item.telBoard = "+90-" + globe.convertToTelFormat(Phone);
                item.telFormat = "tel:" + item.telBoard;
                item.EmailFormat = "mailto:" + item.Email;

                var UserId = item._id;
                CrudData.getCertificates(UserId, function (response) {
                    if (response.data.success) {
                        $scope.certificates = response.data.certificates;
                        console.log(response.data.certificates);
                    }
                });
            }
        });

    }
});