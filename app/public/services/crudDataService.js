'use strict'
var crudDataService = angular.module('crudDataService', []);

crudDataService.service('CrudData', function ($rootScope, $window, $http) {

    var crudService = {};

    // ----------------------------------------------------------------------
    crudDataService.getLawyerByRoutePath = function (callback) {
        return $http.post('/api/getLawyerByRoutePath', {}).then(function (response) {
            callback(response);
        });
    }
    // -----------------------------------------------------------------------

    crudService.getLawyersByCriticize = function (item, callback) {
        return $http.post('/api/getLawyersByCriticize', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }

    // ----------------------------------------------------------------------


    // -----------------------------------------------------------------------
    crudService.updateProfile = function (item, callback) {
        return $http.post('/api/updateProfile', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // ------------------------------------------------------------------------
    crudService.updateExtendProfile = function (item, callback) {
        return $http.post('/api/updateExtendProfile', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // -------------------------------------------------------------------------
    crudService.saveCertificate = function (item, callback) {
        return $http.post('/api/saveCertificate', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // -------------------------------------------------------------------------
    crudService.getCertificates = function (UserId, callback) {
        return $http.post('/api/getCertificates', {
            UserId: UserId
        }).then(function (response) {
            callback(response)
        });
    }
    // --------------------------------------------------------------------------
    crudService.deleteCertificate = function (item, callback) {
        return $http.post('/api/deleteCertificate', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // ---------------------------------------------------------------------------
    crudService.saveEssay = function (item, callback) {
        return $http.post('/api/saveEssay', {
            item: item
        }).then(function (response) {
            callback(response)
        });
    }
    // -----------------------------------------------------------------------------
    crudService.getEssays = function (UserId, callback) {
        return $http.post('/api/getEssays', {
            UserId: UserId
        }).then(function (response) {
            callback(response);
        });
    }
    // ------------------------------------------------------------------------------
    crudService.updateEssay = function (item, callback) {
        return $http.post('/api/updateEssay', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // ------------------------------------------------------------------------------
    crudService.deleteEssay = function (item, callback) {
        return $http.post('/api/deleteEssay', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // ------------------------------------------------------------------------------
    crudService.saveComment = function (item, callback) {
        return $http.post('/api/saveComment', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }
    // ------------------------------------------------------------------------------
    crudService.getComments = function (UserId, callback) {
        return $http.post('/api/getComments', {
            UserId: UserId
        }).then(function (response) {
            callback(response);
        });
    }
    // -------------------------------------------------------------------------------
    crudService.updateCommentVisible = function (item, callback) {
        return $http.post('/api/updateCommentVisible', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }

    // -------------------------------------------------------------------------------
    crudService.sendSupportMessage = function (item, callback) {
        return $http.post('/api/sendSupportMessage', {
            item: item
        }).then(function (response) {
            callback(response);
        });
    }


    return crudService;
});