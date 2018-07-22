var LawSignUpCtrl = angular.module('LawSignUpCtrl', []);

LawSignUpCtrl.controller('LawSignUpController', function ($window, $timeout, $scope, $rootScope, $location, $sce, CrudData, Auth, MockData, GoogleMapster) {

    var vm = this;
    console.log('Law Sign Up Controller');
    vm.RePassword = null;
    vm.Deal = null;
    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";

    vm.signupData = {
        ExpertiseFields: null,
        UserKeywords: null,
        NameSurname: null,
        Phone: null,
        RoutePath: null,
        Email: null,
        LatLng: null,
        Lat: null,
        Lng: null,
        City: null,
        State: null,
        Country: null,
        CountryCode: null,
        SearchCity: null,
        SearchState: null,
        Password: null,
        PasswordPlain: null,
        ProcessDate: null,
        UserSituation: true,
        LocationAddress: null,
        ProfilePicPath: null,
        BureauName: null,
        BureauWebName: null,
        Address: null,
        ExperienceYear: null,
        UserWebName: null,
        Biography: null,
        TBBNo: null,
        ADLNo: null,
        BureauNo: null,
        BureauCity: null,
        LicenceSchoolName: null,
        LicenceSchoolId: null,
        LicenceSchoolDate: null,
        HighLicenceSchoolName: null,
        HighLicenceSchoolId: null,
        HighLicenceSchoolDate: null,
        PostLicenceSchoolName: null,
        PostLicenceSchoolId: null,
        PostLicenceSchoolDate: null,
        IsBureauWebName: false,
        IsUserWebName: false,
        IsLicenceSchoolName: false,
        IsHighLicenceSchoolName: false,
        IsPostLicenceSchoolName: false,
        BureauCityId: null,
        UserAppName: null,
    }

    vm.getExpertiseFields = function () {
        console.log(vm.signupData.ExpertiseFields)
    }

    if (vm.signupData.ProfilePicPath == null) {
        vm.signupData.ProfilePicPath = "../assets/img/user.png";
    }

    // GET EXPERTISE FIELDS ------------------------------------------------------------------------
    MockData.getExpertiseFields().then(function (data) {
        $scope.expertises = data;

    });

    //  LOCATION METHODS ----------------------------------------------------------------------------
    //  ---------------------------------------------------------------------------------------------
    vm.deleteMarker = function () {
        for (var i = 0; i < $rootScope.markers.length; i++) {
            if ($rootScope.markers[i] != null) {
                $rootScope.markers[i].setMap(null);
                $rootScope.markers[i] = null;
            }
        }
    }

    $rootScope.markers = [];
    $scope.isLocation = false;
    // Create Default Map
    $scope.map = GoogleMapster.createGoogleMap();

    google.maps.event.addListener($scope.map, 'click', function (event) {
        vm.deleteMarker();
        vm.signupData.LatLng = event.latLng.lat() + "," + event.latLng.lng();
        vm.signupData.Lat = event.latLng.lat();
        vm.signupData.Lng = event.latLng.lng();
        $scope.isLocation = true;
        if (vm.signupData.Lat != null && vm.signupData.Lng != null) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                map: $scope.map
            });
            $rootScope.markers.push(marker);
            var message = 'Konum Alındı - Enlem : (' + $scope.lat + ") Boylam : (" + $scope.lng + ")";
        }
    });

    vm.ok = function () {
        var geocoder = new google.maps.Geocoder();
        position = {
            lat: vm.signupData.Lat,
            lng: vm.signupData.Lng
        }
        geocoder.geocode({
            location: position
        }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                vm.signupData.LocationAddress = results[0].formatted_address;

                if (results[1]) {
                    var item = globe.GetCityStateCountryAndCode(results);
                    vm.signupData.City = item.City;
                    vm.signupData.State = item.State;
                    vm.signupData.Country = item.Country;
                    vm.signupData.CountryCode = item.CountryCode;
                    vm.signupData.SearchCity = item.SearchCity;
                    vm.signupData.SearchState = item.SearchState;
                }
            }
            $scope.$apply(function () {});;
        });
    }


    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }

    vm.doSignUp = function () {
        if (vm.signupData.LocationAddress != null) {

            console.log(vm.signupData);

            vm.signupData.RoutePath = globe.convertSeoPath(vm.signupData.NameSurname);
            vm.signupData.ProcessDate = globe.getDate();
            vm.signupData.Password = vm.signupData.PasswordPlain;
            Auth.signup(vm.signupData, function (response) {
                vm.processing = false;

                Auth.login(vm.signupData.Email, vm.signupData.PasswordPlain, function (response) {
                    if (response.data.success) {

                        $scope.message = "Kayıt Oluşturulmuştur. Panele Yönlendiriliyorsunuz... :)";
                        $scope.back = success;
                        $scope.setStyle();
                        $scope.visible = false;
                        $timeout(function () {
                            $scope.visible = true;
                            $window.location.href = "http://localhost:3000/"

                        }, 2000);
                    }
                });
            });


        } else {
            $scope.message = "Konum Bilginizi Seçmelisiniz :|";
            $scope.back = warn;
            $scope.setStyle();
            $scope.visible = false;
            $timeout(function () {
                $scope.visible = true;
            }, 2000);
        }
    }




});