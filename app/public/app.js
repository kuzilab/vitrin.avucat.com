var app = angular.module('app', ['ngCookies', 'ngRoute', 'MainPageCtrl', 'SearchCtrl', 'IndexCtrl', 'LawDetailCtrl', 'LawCertificatesCtrl', 'LawCommentsCtrl', 'LawEssaysCtrl', 'LawLoginCtrl', 'LawSignUpCtrl', 'LawVerificationCtrl', 'googleMapService', 'crudDataService', 'passDataService', 'authDataService', 'mockDataService']);


// Environments ---------------------------------
app.run(function ($rootScope, $location) {

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log("route is changed");



        var path = $location.path();
        // Gecici Çözüm --- :((
        if (path == "/" || path == "/avukat-arama" || path.includes("yorumlar") || path.includes("/avukat-kayit-ol")) {
            console.log("iceriyorum");
            $rootScope.$on('$viewContentLoaded', function () {
                Initializer();
            });
        }

    });
});
// Routing -------------------------------------
app.config(function ($httpProvider, $routeProvider, $locationProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: '../views/mainpage.html',
            controller: 'MainPageController',
            controllerAs: 'mainpage'
        })
        .when('/avukat-arama', {
            templateUrl: '../views/search.html',
            controller: 'SearchController',
            controllerAs: 'search'
        })
        .when('/avukat-profil/:name', {
            templateUrl: '../views/law-detail.html',
            controller: 'LawDetailController',
            controllerAs: 'detail'
        })
        .when('/avukat-profil-sertifikalar/:name', {
            templateUrl: '../views/law-certificates.html',
            controller: 'LawCertificatesController',
            controllerAs: 'certificates'
        })
        .when('/avukat-profil-yayinlar/:name', {
            templateUrl: '../views/law-essays.html',
            controller: 'LawEssaysController',
            controllerAs: 'essays'
        })
        .when('/avukat-profil-yorumlar/:name', {
            templateUrl: '../views/law-comments.html',
            controller: 'LawCommentsController',
            controllerAs: 'comments'
        })
        .when('/avukat-giris-yap', {
            templateUrl: '../views/law-giris-yap.html',
            controller: 'LawLoginController',
            controllerAs: 'login'
        })
        .when('/avukat-kayit-ol', {
            templateUrl: '../views/law-kayit-ol.html',
            controller: 'LawSignUpController',
            controllerAs: 'signup'
        })
        .when('/avukat-kayit-dogrulama', {
            templateUrl: '../views/law-verification.html',
            controller: 'VerificationController',
            controllerAs: 'verification'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});