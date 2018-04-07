var app = angular.module('setting', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.allocation.setting", {
        url : "/setting",
        views : {
            "content@root.allocation" : {
                templateUrl : "root/allocation/setting/_res/html/index.html",
                controller:"settingCtrl"
            },"menu@root.allocation" : {
                templateUrl : "root/allocation/setting/_res/html/menu.html",
                controller:"settingMenuCtrl"
            }
        }
    }).state("root.allocation.setting.edit[12]",{
        url:"/edit[12]?id=&page=",
        views:{
            "content@root.allocation.setting":{
                templateUrl : "root/allocation/setting/edit/_res/html/index.html",
                controller:'settingEditCtrl'
            }
        }
    }).state("root.allocation.setting.list[12]",{
        url:"/list[12]?page=",
        views:{
            "content@root.allocation.setting":{
                templateUrl : "root/allocation/setting/list/_res/html/index.html",
                controller:'settingListCtrl'
            }
        }
    })
});