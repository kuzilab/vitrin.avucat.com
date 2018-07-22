var MainPageCtrl = angular.module('MainPageCtrl', []);

MainPageCtrl.controller('MainPageController', function ($timeout, $scope, $rootScope, $location, $sce, CrudData, GoogleMapster, MockData) {

    var vm = this;
    console.log('MainPage Controller');
    var SearchType = "AVUKAT BUL";

    $('#searchFormTab li').click(function () {
        SearchType = $(this).text().trim();
    });

    $('html,body').stop().animate({
        scrollTop: $('#aside').offset().top
    }, 1000);


    $scope.message = "";
    $scope.visible = true;
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";

    vm.mainData = {
        CityName: null,
        StateName: null,
        ExpertiseFields: null,
        BureauCityName: null,
        BureauStateName: null,
        BureauName: null,
        SearchCity: null,
        SearchState: null
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }

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
            $rootScope.lawyers = response.data.lawyers;
            angular.forEach($rootScope.lawyers, function (item) {
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
        }
    });
    // --------------------------------------------------------------------
    // --------------------------------------------------------------------

    // GET CITIES ---------------------------------------------------------
    MockData.getCities().then(function (data) {
        $scope.cities = data;
        console.log($scope.cities);
    });

    $scope.mottos = $rootScope.mottos;

    vm.SearchLawyers = function () {
        if (SearchType.trim() == "AVUKAT BUL") {

            var CityName = globe.GetValueByNameForSelect("FormIl");
            var StateName = globe.GetValueByNameForSelect("FormIlce");
            vm.mainData.CityName = CityName;
            vm.mainData.StateName = StateName;


            if ((CityName == null || CityName == "") && (vm.mainData.ExpertiseFields == null)) {
                $scope.message = "Şehir veya Uzmanlık Alanını Doldurunuz :|";
                $scope.back = warn;
                $scope.setStyle();
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2500);

            } else {
                // Search Query
                console.log(vm.mainData);
                $location.path('/avukat-arama').search({
                    CityName: vm.mainData.CityName,
                    StateName: vm.mainData.StateName,
                    SearchType: "AVUKAT BUL",
                    ExpertiseFields: vm.mainData.ExpertiseFields,
                    BureauName: vm.mainData.BureauName
                });
            }

        } else if (SearchType == "BÜRO BUL") {

            var BureauCityName = globe.GetValueByNameForSelect("FormBureauIl");
            var BureauStateName = globe.GetValueByNameForSelect("FormBureauIlce");
            vm.mainData.BureauCityName = BureauCityName;
            vm.mainData.BureauStateName = BureauStateName;
            vm.mainData.SearchCity = globe.convertSeoPath(BureauCityName);
            vm.mainData.SearchState = globe.convertSeoPath(BureauStateName);

            if (vm.mainData.BureauName == null && (BureauCityName == null || BureauCityName == "")) {
                $scope.message = "Büro veya Şehir Alanını Doldurunuz :|";
                $scope.back = warn;
                $scope.setStyle();
                $scope.visible = false;

                $timeout(function () {
                    $scope.visible = true;
                }, 2500);
            } else {
                // Search Query;
                console.log(vm.mainData);
                $location.path('/avukat-arama').search({
                    CityName: vm.mainData.BureauCityName,
                    StateName: vm.mainData.BureauStateName,
                    SearchType: "BÜRO BUL",
                    ExpertiseFields: vm.mainData.ExpertiseFields,
                    BureauName: vm.mainData.BureauName
                });
            }
        }

    }

    vm.GotoUserWebSite = function (url) {
        if (url != null) {
            $window.location.href = "http://" + url;
        }
    }

});