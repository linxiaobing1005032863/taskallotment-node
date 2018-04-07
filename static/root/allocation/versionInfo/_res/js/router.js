var app = angular.module('versionInfo',[]);
app.config(function ($provide, $stateProvider) {
    $stateProvider.state("root.allocation.versionInfo", {
        url: "/versionInfo",
        views: {
            "content@root.allocation": {
                templateUrl: "root/allocation/versionInfo/_res/html/index.html",
                controller: "versionInfoCtrl"
            }
        }
    })
})