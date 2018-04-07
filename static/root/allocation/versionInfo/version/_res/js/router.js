var app = angular.module('version', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.versionInfo.version", {
        url : "/version",
        views : {  
            "content@root.allocation.versionInfo" : {
                templateUrl : "root/allocation/versionInfo/version/_res/html/index.html",
                controller:"versionCtrl"
            },"menu@root.allocation.versionInfo" : {
                templateUrl : "root/allocation/versionInfo/version/_res/html/menu.html",
                controller:"versionMenuCtrl"
            }
        }
    }).state("root.allocation.versionInfo.version.list[12]",{
        url:"/list[12]?id=&page=&name=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/list/_res/html/index.html",
                controller:'versionInfoListCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/add/_res/html/index.html",
                controller:'versionInfoAddCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/edit/_res/html/index.html",
                controller:'versionInfoEditCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.view[12]",{
        url:"/view[12]?id=&page=&view=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/view/_res/html/index.html",
                controller:'versionInfoViewCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.upload[12]",{
        url:"/upload[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/upload/_res/html/index.html",
                controller:'versionInfoUploadCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.detail[12]",{
        url:"/detail[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/detail/_res/html/index.html",
                controller:'detailCtrl'
            }
        }
    }).state("root.allocation.versionInfo.version.ask[12]",{
        url:"/ask[12]?id=&page=",
        views:{
            "content@root.allocation.versionInfo.version":{
                templateUrl : "root/allocation/versionInfo/version/ask/_res/html/index.html",
                controller:'askCtrl'
            }
        }
    })
});