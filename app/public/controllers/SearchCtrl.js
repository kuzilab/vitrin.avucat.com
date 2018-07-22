var SearchCtrl = angular.module('SearchCtrl', []);

SearchCtrl.controller('SearchController', function ($timeout, $scope, $rootScope, $location, $sce, GoogleMapster, CrudData, MockData) {

    var vm = this;
    SearchType = "AVUKAT BUL";

    $('#searchFormTab li').click(function () {
        SearchType = $(this).text().trim();
        globe.SetValueByNameForSelect("FormIl", null);
        globe.SetValueByNameForSelect("FormIlce", null);
        globe.SetValueByNameForSelect("FormBureauIl", null);
        globe.SetValueByNameForSelect("FormBureauIlce", null);
    });

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }

    $scope.message = "";
    $scope.visible = true;
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";

    vm.searchData = {
        CityName: null,
        StateName: null,
        ExpertiseFields: null,
        BureauCityName: null,
        BureauStateName: null,
        BureauName: null,
        SearchCity: null,
        SearchState: null
    }

    vm.SortAlpha = function () {

        $scope.lawyers.sort(function (a, b) {
            return a.NameSurname.localeCompare(b.NameSurname);
        });
    }

    vm.SortScore = function () {
        console.log("Deneyim");
    }


    vm.Selected = function (item) {
        angular.forEach($scope.lawyers, function (ite) {
            if (item._id == ite._id) {
                ite.class = "active"
            } else {
                ite.class = "";
            }
        });
    }

    vm.SearchLawyers = function () {

        var item = {};
        var result = false;
        item.UserSituation = true;


        // Validation Situation ------------------------------------------------------------
        if (SearchType == "AVUKAT BUL") {

            var CityName = globe.GetValueByNameForSelect("FormIl");
            var StateName = globe.GetValueByNameForSelect("FormIlce");
            vm.searchData.CityName = CityName;
            vm.searchData.StateName = StateName;

            vm.searchData.BureauCityName = null;
            vm.searchData.BureauStateName = null;


            if ((CityName == null || CityName == "" || CityName.includes('?')) && (vm.searchData.ExpertiseFields == null)) {
                $scope.message = "Şehir veya Uzmanlık Alanını Doldurunuz :|";
                $scope.back = warn;
                $scope.setStyle();
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2500);

            } else {
                // Search Query
                result = true;
            }
        } else if (SearchType == "BÜRO BUL") {


            vm.searchData.BureauCityName = globe.GetValueByNameForSelect("FormBureauIl");
            vm.searchData.BureauStateName = globe.GetValueByNameForSelect("FormBureauIlce");
            vm.searchData.CityName = null;
            vm.searchData.StateName = null;

            if (vm.searchData.BureauName == null && (vm.searchData.BureauCityName == null || vm.searchData.BureauCityName == "" || vm.searchData.BureauCityName.includes('?'))) {
                $scope.message = "Büro veya Şehir Alanını Doldurunuz :|";
                $scope.back = warn;
                $scope.setStyle();
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2500);
            } else {
                // Search Query;
                result = true;
            }
        }
        // -----------------------------------------------------------------------------------------

        if (result) {

            // Edited Query ----------------------------------------------------------------------------------
            if (vm.searchData.CityName != null && vm.searchData.CityName != undefined & vm.searchData.CityName != "") {
                item.SearchCity = globe.convertSeoPath(vm.searchData.CityName);
            }
            if (vm.searchData.StateName != "" && vm.searchData.StateName != null && vm.searchData.StateName != undefined && vm.searchData.StateName != "? object:null ?") {
                item.SearchState = globe.convertSeoPath(vm.searchData.StateName);
            }
            if (SearchType == "AVUKAT BUL") {
                if (vm.searchData.ExpertiseFields != undefined && vm.searchData.ExpertiseFields != null && vm.searchData.ExpertiseFields != "") {
                    item.ExpertiseFields = vm.searchData.ExpertiseFields;
                }
            } else {
                if (vm.searchData.BureauName != null && vm.searchData.BureauName != undefined && vm.searchData.BureauName != "") {
                    item.BureauName = BureauName;
                }
            }

            console.log(vm.searchData);
            CrudData.getLawyersByCriticize(item, function (response) {
                if (response.data.success) {
                    $scope.lawyers = response.data.lawyers;
                    console.log($scope.lawyers);
                    runLawyers();
                }
            });
        }

    } // Search Lawyer End --------------------------------------------------------------------------



    // METHODS --------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------
    var params = $location.search();
    var CityName = params.CityName;
    var StateName = params.StateName;
    var SearchType = params.SearchType;
    var ExpertiseFields = params.ExpertiseFields;
    var BureauName = params.BureauName;
    var item = {};
    item.UserSituation = true;


    // Edited Query ----------------------------------------------------------------------------------
    if (CityName != null && CityName != undefined & CityName != "") {
        item.SearchCity = globe.convertSeoPath(CityName);
    }
    if (StateName != "" && StateName != null && StateName != undefined && StateName != "? object:null ?") {
        item.SearchState = globe.convertSeoPath(StateName);
    }
    if (SearchType == "AVUKAT BUL") {
        if (ExpertiseFields != undefined && ExpertiseFields != null && ExpertiseFields != "") {
            item.ExpertiseFields = ExpertiseFields;
        }
    } else {
        if (BureauName != null && BureauName != undefined && BureauName != "") {
            item.BureauName = BureauName;
        }
    }

    // Connect to DB ---------------------------------------------------------------------------------
    if ($rootScope.lawyers != undefined) {
        $scope.lawyers = $rootScope.lawyers;
        runLawyers();
    } else {
        CrudData.getLawyersByCriticize(item, function (response) {
            if (response.data.success) {
                $scope.lawyers = response.data.lawyers;
                runLawyers();
            }
        });
    }



    function runLawyers() {



        $rootScope.map = GoogleMapster.createGoogleMap();
        $rootScope.markers = [];
        $scope.isLocation = false;
        var sayac = 0;
        angular.forEach($scope.lawyers, function (item) {

            $scope.lawyer = item;
            var UserId = item._id;
            CrudData.getComments(UserId, function (response) {
                if (response.data.success) {
                    var comments = response.data.comments;
                    var total = 0;
                    var sayac = 0;

                    angular.forEach(comments, function (item) {
                        total += item.UserAverageScore;
                        sayac += 1;
                    });

                    console.log(total / sayac);
                }
            });


            if (sayac == 0) {
                $scope.lawyer.class = "active";
                sayac = 1;
            } else {
                $scope.lawyer.class = "";
            }


            var Phone = item.Phone;
            item.telBoard = "+90-" + globe.convertToTelFormat(Phone);
            item.telFormat = "tel:" + item.telBoard;
            item.EmailFormat = "mailto:" + item.Email;

            if ($rootScope.markers != undefined && $rootScope.markers != null) {

                contentText = "<div id='test' style='text-align: center'>" +
                    "<img src='" + item.ProfilePicPath + "' alt='Lawyer' style='width:20%;height:30%'>" +
                    "<div>" +
                    "<h4><b>" + item.NameSurname + "</b></h4>" +
                    "<p>" + item.BureauName + "</p>" +
                    "</div></div>"

                var parameters = {
                    lat: item.Lat,
                    lng: item.Lng,
                    content: contentText,
                    current: false
                }

                var marker = GoogleMapster._addMarker(parameters);
                /*
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.Lat, item.Lng),
                    map: $rootScope.map
                });
                */

                $rootScope.markers.push(marker);
                var message = 'Konum Alındı - Enlem : (' + item.Lat + ") Boylam : (" + item.Lng + ")";
                console.log(message);
            }

        });
    }

    //  LOCATION METHODS ----------------------------------------------------------------------------
    //  ---------------------------------------------------------------------------------------------
    $scope.deleteMarker = function () {
        for (var i = 0; i < $rootScope.markers.length; i++) {
            if ($rootScope.markers[i] != null) {
                $rootScope.markers[i].setMap(null);
                $rootScope.markers[i] = null;
            }
        }
    }
});