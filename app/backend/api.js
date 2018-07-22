// Dependencies --------------------------
var https = require('https');
var express = require('express');
var apiHelper = require('../../app/backend/apiHelper');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');

var uploadProfileFiles = multer({
    dest: './app/public/assets/uploadProfileFiles/'
});
var uploadEssayFiles = multer({
    dest: './app/public/assets/uploadEssayFiles/'
});

var uploadCertificateFiles = multer({
    dest: './app/public/assets/uploadCertificateFiles/'
});

// Config File ------------------------
var config = require('../../config');

// Mongoose -----------------------------
var mongoose = require('mongoose');

// Models --------------------------------
var User = require('./models/user');
var Certificate = require('./models/certificate');
var Essay = require('./models/essay');
var Comment = require('./models/comment');
var Message = require('./models/message');

// upload methods -------------------------
var upload = {};
upload.uploadProfilePic = "/uploadProfilePic";
upload.uploadEssayFile = "/uploadEssayFile";
upload.uploadCertificateFile = "/uploadCertificateFile"


// authentication methods ------------------
var auth = {};
auth.login = "/login";
auth.signup = "/signup";
auth.me = "/me";
auth.isUser = "/isUser"


// crud methods ---------------------------
var crud = {};
crud.test = "/test";

crud.getLawyerByRoutePath = "/getLawyerByRoutePath";
crud.getLawyersByCriticize = "/getLawyersByCriticize";

crud.updateProfile = "/updateProfile";
crud.updateExtendProfile = "/updateExtendProfile";

crud.saveCertificate = "/saveCertificate";
crud.getCertificates = "/getCertificates";
crud.deleteCertificate = "/deleteCertificate";

crud.saveEssay = "/saveEssay";
crud.updateEssay = "/updateEssay";
crud.getEssays = "/getEssays"
crud.deleteEssay = "/deleteEssay";

crud.getComments = "/getComments";
crud.updateCommentVisible = "/updateCommentVisible";
crud.saveComment = "/saveComment";

crud.sendSupportMessage = "/sendSupportMessage";
crud.getSupportMessages = "/getSupportMessages";



//  SignUp Method ---------------------------
// Authentication Methods
router.post(auth.signup, function (req, res) {

    console.log(req.body.item);
    var item = req.body.item;
    var user = new User({
        ExpertiseFields: item.ExpertiseFields,
        UserKeywords: item.UserKeywords,
        NameSurname: item.NameSurname,
        Phone: item.Phone,
        RoutePath: item.RoutePath,
        Email: item.Email,
        LatLng: item.LatLng,
        Lat: item.Lat,
        Lng: item.Lng,
        City: item.City,
        State: item.State,
        Country: item.Country,
        SearchCity: item.SearchCity,
        SearchState: item.SearchState,
        CountryCode: item.CountryCode,
        Password: item.Password,
        PasswordPlain: item.PasswordPlain,
        ProcessDate: item.ProcessDate,
        UserSituation: true,
        LocationAddress: item.LocationAddress,
        ProfilePicPath: item.ProfilePicPath,
        BureauName: item.BureauName,
        BureauWebName: item.BureauWebName,
        Address: item.Address,
        ExperienceYear: item.ExperienceYear,
        UserWebName: item.UserWebName,
        Biography: item.Biography,
        TBBNo: item.TBBNo,
        ADLNo: item.ADLNo,
        BureauNo: item.BureauNo,
        BureauCity: item.BureauCity,
        LicenceSchoolName: item.LicenceSchoolName,
        LicenceSchoolId: item.LicenceSchoolId,
        LicenceSchoolDate: item.LicenceSchoolDate,
        HighLicenceSchoolName: item.HighLicenceSchoolName,
        HighLicenceSchoolId: item.HighLicenceSchoolId,
        HighLicenceSchoolDate: item.HighLicenceSchoolDate,
        PostLicenceSchoolName: item.PostLicenceSchoolName,
        PostLicenceSchoolId: item.PostLicenceSchoolId,
        PostLicenceSchoolDate: item.PostLicenceSchoolDate,
        IsBureauWebName: false,
        IsUserWebName: false,
        IsLicenceSchoolName: false,
        IsHighLicenceSchoolName: false,
        IsPostLicenceSchoolName: false,
        BureauCityId: item.BureauCityId,
        UserAppName: "avucat.com",
    });

    user.save(function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "create_issue",
                message: err,
                token: undefined
            });
        } else {

            var token = apiHelper.createToken(user);
            res.json({
                success: true,
                situation: "user_created",
                message: "Kullanıcı Oluşturuldu",
                token: token,
                user: user
            });
        }
    });
});


// User Check ------------------------------
router.post(auth.isUser, function (req, res) {
    var Email = req.body.Email;
    User.findOne({
        Email: Email
    }).select('email').exec(function (err, user) {
        if (user !== null) {
            res.send({
                success: false,
                situation: "user_exist",
                message: "Kullanıcı sistemde mevcut !!!"
            });
        } else {
            res.send({
                success: true,
                situation: "no_user",
                message: "Kullanıcı sistemde değil !!!"
            });
        }
    })
});

//  GET LAWYER BY NAME  --------------------------------
router.post(crud.getLawyerByRoutePath, function (req, res) {
    var RoutePath = req.body.RoutePath;
    User.findOne({
        RoutePath: RoutePath,
        UserSituation: true
    }).select('RoutePath BureauCityId NameSurname ProfilePicPath Phone Email ExpertiseFields LatLng Lat Lng City SearchCity SearchState State Country CountryCode BureauName BureauWebName Address ExperienceYear UserWebName Biography TBBNo ADLNo BureauNo BureauCity LicenceSchoolName LicenceSchoolId LicenceSchoolDate HighLicenceSchoolName HighLicenceSchoolId HighLicenceSchoolDate PostLicenceSchoolName PostLicenceSchoolId PostLicenceSchoolDate UserKeywords ProcessDate LocationAddress').exec(function (err, lawyer) {

        if (lawyer == null) {
            res.send({
                success: false,
                situation: "no_user",
                message: "Kullanıcı sistemde kayıtlı değil !!!"
            });
        } else {
            res.json({
                success: true,
                situation: "user_exist",
                message: "Kullanıcı Kayıtlı",
                lawyer: lawyer
            });
        }
    });
});

// GET ALL LAWYERS BY CRITICIZE ---------------------------------------------
router.post(crud.getLawyersByCriticize, function (req, res) {

    var item = req.body.item;

    console.log(item);

    var query = {
        UserSituation: true
    };

    User.find(query).select('RoutePath BureauCityId NameSurname ProfilePicPath Phone Email ExpertiseFields LatLng Lat Lng City State SearchCity SearchState Country CountryCode BureauName BureauWebName Address ExperienceYear UserWebName Biography TBBNo ADLNo BureauNo BureauCity LicenceSchoolName LicenceSchoolId LicenceSchoolDate HighLicenceSchoolName HighLicenceSchoolId HighLicenceSchoolDate PostLicenceSchoolName PostLicenceSchoolId PostLicenceSchoolDate UserKeywords ProcessDate LocationAddress').exec(function (err, lawyers) {

        if (lawyers == null) {
            res.send({
                success: false,
                situation: "no_user",
                message: "Kullanıcı sistemde kayıtlı değil !!!"
            });
        } else {
            res.json({
                success: true,
                situation: "user_exist",
                message: "Kullanıcı Kayıtlı",
                lawyers: lawyers
            });
        }
    });


});


// User Login ---------------------------------
router.post(auth.login, function (req, res) {

    var Email = req.body.Email;
    var Password = req.body.Password;
    User.findOne({
        Email: Email
    }).select('_id IsBureauWebName RoutePath BureauCityId IsUserWebName IsHighLicenceSchoolName IsPostLicenceSchoolName IsLicenceSchoolName NameSurname ProfilePicPath Phone Email ExpertiseFields LatLng Lat Lng City State Country CountryCode SearchCity SearchState Password PasswordPlain BureauName BureauWebName Address ExperienceYear UserWebName Biography TBBNo ADLNo BureauNo BureauCity LicenceSchoolName LicenceSchoolId LicenceSchoolDate HighLicenceSchoolName HighLicenceSchoolId HighLicenceSchoolDate PostLicenceSchoolName PostLicenceSchoolId PostLicenceSchoolDate UserKeywords ProcessDate UserSituation UserAppName LocationAddress').exec(function (err, user) {
        // check User First Step
        if (user === null) {
            res.send({
                success: false,
                situation: "no_user",
                message: "Kullanıcı sistemde kayıtlı değil !!!"
            });
        } else if (user !== null) {
            // check password Second Step
            var validPassword = user.comparePassword(Password);

            if (!validPassword) {
                res.send({
                    success: false,
                    situation: "invalid_password",
                    message: "Geçersiz Şifre !!!"
                });
            } else {
                var token = apiHelper.createToken(user);
                res.json({
                    success: true,
                    situation: "valid_user",
                    message: "Giriş Başarılı",
                    token: token,
                    user: user
                });
            }
        }
    });
});


// Get Certificates Method -------------------------------
router.post(crud.getCertificates, function (req, res) {

    var UserId = req.body.UserId;
    Certificate.find({
        UserId: UserId,
        CertificateSituation: true
    }).select('_id UserId CertificateFileName CertificateFilePath FileType ThumbnailType CertificateSituation SavedDate').exec(function (err, certificates) {

        if (certificates !== null) {
            res.json({
                success: true,
                situation: "get_success",
                message: "Dosyalar Alındı",
                certificates: certificates
            });
        } else {
            res.json({
                success: false,
                situation: "get_failed",
                message: err
            });
        }
    });
});


// Get Comments Method -------------------------------------
router.post(crud.getComments, function (req, res) {

    var UserId = req.body.UserId;
    Comment.find({
        UserId: UserId,
        CommentVisible: true
    }).select('_id UserId WhoComment WhoEmail CommentContent UserSpeed UserExperince UserNetwork UserAverageScore CommentVisible SavedDate').exec(function (err, comments) {
        if (comments !== null) {
            res.json({
                success: true,
                situation: "get_success",
                message: "Yorumlar Alındı",
                comments: comments
            });
        } else {
            res.json({
                success: false,
                situation: "get_failed",
                message: err
            });
        }
    });
});

// Save Comment Method --------------------------------
router.post(crud.saveComment, function (req, res) {
    var item = req.body.item;
    var comment = new Comment({
        UserId: item.UserId,
        WhoComment: item.WhoComment,
        CommentContent: item.CommentContent,
        UserSpeed: item.UserSpeed,
        UserExperince: item.UserExperince,
        UserNetwork: item.UserNetwork,
        UserAverageScore: item.UserAverageScore,
        CommentVisible: true,
        SavedDate: item.SavedDate,
        WhoEmail: item.WhoEmail
    });
    comment.save(function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "comment_issue",
                message: err
            });
        } else {
            res.json({
                success: true,
                situation: "basic_created",
                message: "Yorun Oluşturuldu :)",
                comment: comment
            });
        }
    });
});


// Send Support Message --------------------------------------------------

router.post(crud.sendSupportMessage, function (req, res) {

    var item = req.body.item;

    var message = new Message({
        UserId: item.UserId,
        NameSurname: item.NameSurname,
        Phone: item.Phone,
        Email: item.Email,
        Content: item.Content,
        SavedDate: item.SavedDate
    });

    message.save(function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "message_issue",
                message: err
            });
        } else {
            res.json({
                success: true,
                situation: "basic_created",
                message: "Mesaj Oluşturuldu :)",
                message: message
            });
        }
    });
});


// MiddleWare -------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

router.use(function (req, res, next) {
    console.log("Kullanıcı uygulamaya geldi.");
    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    console.log(token);

    // check if token exist
    if (token) {
        jwt.verify(token, 'secretKey', function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(403).send({
                    success: false,
                    situation: "noauthenticate",
                    message: "Authenticate Başarısız !!!"
                });
            } else {
                req.decoded = decoded;

                next();
            }
        });
    } else {
        res.status(403).send({
            success: false,
            situation: "notoken",
            message: "Token Sağlanmadı !!!"
        });
    }
});

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------


// Update Profile Method -------------------------------------------------
router.post(crud.updateProfile, function (req, res) {

    var item = req.body.item;
    var _id = mongoose.Types.ObjectId(item._id);



    bcrypt.hash(item.Password, null, null, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            item.Password = hash;
            var condition = {
                "_id": _id
            };
            var update = {
                $set: {
                    "NameSurname": item.NameSurname,
                    "ProfilePicPath": item.ProfilePicPath,
                    "Phone": item.Phone,
                    "Email": item.Email,
                    "ExpertiseFields": item.ExpertiseFields,
                    "LatLng": item.LatLng,
                    "Lat": item.Lat,
                    "Lng": item.Lng,
                    "LocationAddress": item.LocationAddress,
                    "Password": item.Password,
                    "PasswordPlain": item.PasswordPlain,
                    "ProcessDate": item.ProcessDate,
                    "RoutePath": item.RoutePath
                }
            }
            var options = {
                multi: true
            };
            User.update(condition, update, options, function (err) {
                if (err) {
                    res.json({
                        success: false,
                        situation: "update_failed",
                        message: "Güncelleme Başarısız !!!",
                    });
                } else {

                    res.json({
                        success: true,
                        situation: "update_success",
                        message: "Güncelleme Başarılı",
                    });
                }
            });
        }
    });
});

// Update Extend Profile Method ---------------------------------------
router.post(crud.updateExtendProfile, function (req, res) {
    var item = req.body.item;
    var UserId = mongoose.Types.ObjectId(item.UserId);

    bcrypt.hash(item.Password, null, null, function (err, hash) {

        if (err) {
            res.json({
                success: false,
                situation: "hash_failed",
                message: err,
            });
        } else {

            item.password = hash;
            var condition = {
                "_id": UserId
            };
            var update = {
                $set: {
                    "BureauName": item.BureauName,
                    "BureauWebName": item.BureauWebName,
                    "Address": item.Address,
                    "ExperienceYear": item.ExperienceYear,
                    "UserWebName": item.UserWebName,
                    "Biography": item.Biography,
                    "TBBNo": item.TBBNo,
                    "ADLNo": item.ADLNo,
                    "BureauNo": item.BureauNo,
                    "BureauCity": item.BureauCity,
                    "LicenceSchoolName": item.LicenceSchoolName,
                    "LicenceSchoolDate": item.LicenceSchoolDate,
                    "HighLicenceSchoolName": item.HighLicenceSchoolName,
                    "HighLicenceSchoolDate": item.HighLicenceSchoolDate,
                    "PostLicenceSchoolName": item.PostLicenceSchoolName,
                    "PostLicenceSchoolDate": item.PostLicenceSchoolDate,
                    "UserKeywords": item.UserKeywords,
                    "ProcessDate": item.ProcessDate,
                    "IsBureauWebName": item.IsBureauWebName,
                    "IsUserWebName": item.IsUserWebName,
                    "IsLicenceSchoolName": item.IsLicenceSchoolName,
                    "IsHighLicenceSchoolName": item.IsHighLicenceSchoolName,
                    "IsPostLicenceSchoolName": item.IsPostLicenceSchoolName,
                    "BureauCityId": item.BureauCityId
                }
            }
            var options = {
                multi: true
            };
            User.update(condition, update, options, function (err, affected) {

                if (err) {
                    res.json({
                        success: false,
                        situation: "update_failed",
                        message: "Güncelleme Başarısız !!!",
                    });
                } else {

                    res.json({
                        success: true,
                        situation: "update_success",
                        message: "Güncelleme Başarılı",
                    });
                }
            });
        }
    });
});

// Save Certificate Methods ---------------------------------------
router.post(crud.saveCertificate, function (req, res) {

    var item = req.body.item;
    var certificate = new Certificate({
        UserId: item.UserId,
        CertificateFileName: item.CertificateFileName,
        CertificateFilePath: item.CertificateFilePath,
        FileType: item.FileType,
        SavedDate: item.SavedDate,
        CertificateSituation: item.CertificateSituation,
        ThumbnailType: item.ThumbnailType
    });

    certificate.save(function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "create_issue",
                message: err
            });
        } else {

            res.json({
                success: true,
                situation: "certificate_created",
                message: "Sertifika Oluşturuldu :)",
                certificate: certificate
            });
        }
    });
});



// Delete Certificate Method ------------------------------
router.post(crud.deleteCertificate, function (req, res) {

    var _id = mongoose.Types.ObjectId(req.body.item._id);
    var UserId = req.body.item.UserId;

    var condition = {
        "_id": _id,
        "UserId": UserId
    };

    var update = {
        $set: {
            "CertificateSituation": false
        }
    }
    var options = {
        multi: true
    };
    Certificate.update(condition, update, options, function (err, affected) {

        if (err) {
            res.json({
                success: false,
                situation: "update_failed",
                message: "Silme Başarısız !!!",
            });
        } else {

            res.json({
                success: true,
                situation: "update_success",
                message: "Silme Başarılı",
            });
        }
    });
});


// Save Essay Method -----------------------------------
router.post(crud.saveEssay, function (req, res) {

    var item = req.body.item;

    var essay = new Essay({
        UserId: item.UserId,
        EssayName: item.EssayName,
        EssaySubject: item.EssaySubject,
        EssayImgPath: item.EssayImgPath,
        EssayContent: item.EssayContent,
        ProcessDate: item.ProcessDate,
        EssaySituation: true,
        EssayPicName: item.EssayPicName,
    });

    essay.save(function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "essay_issue",
                message: err
            });
        } else {
            res.json({
                success: true,
                situation: "essay_created",
                message: "Yayın Oluşturuldu :)",
                essay: essay
            });
        }
    });
});

// Get Essays Method --------------------------------
router.post(crud.getEssays, function (req, res) {

    var UserId = req.body.UserId;
    Essay.find({
        UserId: UserId,
        EssaySituation: true
    }).select('_id UserId EssayName EssaySubject EssayImgPath EssayContent ProcessDate EssayPicName EssaySituation').exec(function (err, essays) {

        if (essays !== null) {
            res.json({
                success: true,
                situation: "get_success",
                message: "Yayınlar Alındı",
                essays: essays
            });
        } else {
            res.json({
                success: false,
                situation: "get_failed",
                message: err
            });
        }
    });
});

// Update Essay Method ------------------------------------
router.post(crud.updateEssay, function (req, res) {

    var item = req.body.item;
    var UserId = item.UserId;
    var _id = mongoose.Types.ObjectId(item._id);


    var condition = {
        "_id": _id,
        "UserId": UserId
    };
    var update = {
        $set: {
            "UserId": item.UserId,
            "EssayName": item.EssayName,
            "EssaySubject": item.EssaySubject,
            "EssayImgPath": item.EssayImgPath,
            "EssayContent": item.EssayContent,
            "ProcessDate": item.ProcessDate,
            "EssayPicName": item.EssayPicName
        }
    }
    var options = {
        multi: true
    };

    Essay.update(condition, update, options, function (err, affected) {
        if (err) {
            res.json({
                success: false,
                situation: "update_failed",
                message: "Güncelleme Başarısız !!!",
            });
        } else {
            res.json({
                success: true,
                situation: "update_success",
                message: "Güncelleme Başarılı",
            });
        }
    });
});

// Delete Essay Method -------------------------------------
router.post(crud.deleteEssay, function (req, res) {

    var _id = mongoose.Types.ObjectId(req.body.item._id);
    var UserId = req.body.item.UserId;

    var condition = {
        "_id": _id,
        "UserId": UserId
    };

    var update = {
        $set: {
            "EssaySituation": false
        }
    }
    var options = {
        multi: true
    };
    Essay.update(condition, update, options, function (err, affected) {

        if (err) {
            res.json({
                success: false,
                situation: "update_failed",
                message: "Silme Başarısız !!!",
            });
        } else {

            res.json({
                success: true,
                situation: "update_success",
                message: "Silme Başarılı",
            });
        }
    });



});


// Update Comment Method ----------------------------------------
router.post(crud.updateCommentVisible, function (req, res) {

    var item = req.body.item;
    var _id = mongoose.Types.ObjectId(item._id);
    var UserId = item.UserId;

    var condition = {
        "_id": _id,
        "UserId": UserId
    };
    var update = {
        $set: {
            "CommentVisible": item.CommentVisible
        }
    }
    var options = {
        multi: true
    };

    Comment.update(condition, update, options, function (err) {
        if (err) {
            res.json({
                success: false,
                situation: "update_failed",
                message: "Güncelleme Başarısız !!!",
            });
        } else {
            res.json({
                success: true,
                situation: "update_success",
                message: "Güncelleme Başarılı",
            });
        }
    });
});

// Upload Profile Picture ----------------------------------------
router.post(upload.uploadProfilePic, uploadProfileFiles.any(), function (req, res) {

    var originalname = req.files[0].originalname;
    if (req.files[0]) {
        req.files.forEach(function (file) {

            fs.rename(file.path, './app/public/assets/uploadProfileFiles/' + originalname, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Dosya Yüklendi.")
                }
            });
        });
    }
});

// Upload Essay File ---------------------------------------------
router.post(upload.uploadEssayFile, uploadEssayFiles.any(), function (req, res) {

    var originalname = req.files[0].originalname;

    console.log(originalname);

    if (req.files[0]) {
        req.files.forEach(function (file) {
            fs.rename(file.path, './app/public/assets/uploadEssayFiles/' + req.decoded.user._id + "_" + originalname, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Dosya Yüklendi.")
                }
            });
        });
    }
});

// Upload Certificate File ---------------------------------------
router.post(upload.uploadCertificateFile, uploadCertificateFiles.any(), function (req, res) {

    var originalname = req.files[0].originalname;

    if (req.files) {
        req.files.forEach(function (file) {
            var FileName = req.body.FileName;

            fs.rename(file.path, './app/public/assets/uploadCertificateFiles/' + originalname, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Dosya Yüklendi.")
                }
            });
        });
    }


});

// Return  router
module.exports = router;