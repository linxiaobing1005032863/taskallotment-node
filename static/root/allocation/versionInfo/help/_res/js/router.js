var app = angular.module('help', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.versionInfo.help", {
        url : "/help",
        views : {  
            "content@root.allocation.versionInfo" : {
                templateUrl : "root/allocation/versionInfo/help/_res/html/index.html",
                controller:"helpCtrl"
            },"menu@root.allocation.versionInfo" : {
                templateUrl : "root/allocation/versionInfo/help/_res/html/menu.html",
                controller:"helpMenuCtrl"
            }
        }
    }).state("root.allocation.versionInfo.help.list[12]",{
        url:"/list[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.help":{
                templateUrl : "root/allocation/versionInfo/help/list/_res/html/index.html",
                controller:'helpListCtrl'
            }
        }
    }).state("root.allocation.versionInfo.help.detail[12]",{
        url:"/detail[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.help":{
                templateUrl : "root/allocation/versionInfo/help/detail/_res/html/index.html",
                controller:'helpDetailCtrl'
            }
        }
    }).state("root.allocation.versionInfo.help.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.help":{
                templateUrl : "root/allocation/versionInfo/help/edit/_res/html/index.html",
                controller:'helpEditCtrl'
            }
        }
    }).state("root.allocation.versionInfo.help.answer[12]",{
        url:"/answer[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.help":{
                templateUrl : "root/allocation/versionInfo/help/answer/_res/html/index.html",
                controller:'answerCtrl'
            }
        }
    })
});