var LawCommentsCtrl = angular.module('LawCommentsCtrl', []);

LawCommentsCtrl.controller('LawCommentsController', function ($timeout, $scope, $rootScope, $location, $sce, CrudData, $routeParams, MockData) {

    var vm = this;
    console.log('Comment Controller');
    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";
    var name = $routeParams.name;

    vm.commentData = {
        UserId: null,
        WhoComment: null,
        CommentContent: null,
        UserExperince: null,
        UserNetwork: null,
        UserSpeed: null,
        UserAverageScore: null,
        CommentVisible: null,
        SavedDate: null,
        WhoEmail: null
    }


    if ($rootScope.lawyers != undefined) {
        $scope.lawyers = $rootScope.lawyers;
        runComments();
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
                runComments();
            }
        });
    }

    function runComments() {
        angular.forEach($scope.lawyers, function (item) {
            if (item.RoutePath == name) {
                $scope.lawyer = item;
                var Phone = item.Phone;
                item.telBoard = "+90-" + globe.convertToTelFormat(Phone);
                item.telFormat = "tel:" + item.telBoard;
                item.EmailFormat = "mailto:" + item.Email;

                var UserId = item._id;
                vm.commentData.UserId = item._id;
                CrudData.getComments(UserId, function (response) {
                    if (response.data.success) {
                        $scope.comments = response.data.comments;
                    }
                });
            }
        });
    }

    $scope.SaveComment = function () {

        var ExperienceValue = globe.GetValueById("Experience");
        var NetworkValue = globe.GetValueById("Network");
        var SpeedValue = globe.GetValueById("Speed");
        var WhoCommentValue = globe.GetValueById("WhoComment");
        var CommentContentValue = globe.GetValueById("CommentContent");
        var WhoEmailValue = globe.GetValueById("WhoEmail");

        vm.commentData.SavedDate = globe.getDate();
        vm.commentData.CommentVisible = true;
        vm.commentData.UserExperince = ExperienceValue;
        vm.commentData.UserNetwork = NetworkValue;
        vm.commentData.UserSpeed = SpeedValue;
        vm.commentData.WhoComment = WhoCommentValue;
        vm.commentData.CommentContent = CommentContentValue;
        vm.commentData.WhoEmail = WhoEmailValue;
        vm.commentData.UserAverageScore = ((parseFloat(SpeedValue) + parseFloat(ExperienceValue) + parseFloat(NetworkValue)) / 3).toFixed(2);

        CrudData.saveComment(vm.commentData, function (response) {

            if (response.data.success) {
                $scope.message = "Yorum Alındı :)";
                $scope.back = success;
                $scope.setStyle();
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2500);

            }
        });


    }


    $scope.SetStyleExperience = function (item) {
        return {
            width: item.UserExperince + "%"
        }
    }
    $scope.SetStyleNetwork = function (item) {
        return {
            width: item.UserNetwork + "%"
        }
    }
    $scope.SetStyleSpeed = function (item) {
        return {
            width: item.UserSpeed + "%"
        }
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }


});