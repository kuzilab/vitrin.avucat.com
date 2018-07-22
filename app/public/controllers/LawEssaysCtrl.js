var LawEssaysCtrl = angular.module('LawEssaysCtrl', []);

LawEssaysCtrl.controller('LawEssaysController', function ($scope, $rootScope, $location, $sce, CrudData, ) {

    var vm = this;
    console.log('Law Essays Controller');



    $(document).on('click', function () {
        $('#mainTable').DataTable();
        console.log('click');
    });



});