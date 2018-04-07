var app = angular.module('personnelServer',[]);
app.factory('personnelSer',function ($http) {
    return {
        personnelSummary:personnelSummary,
        personnelSummaryOne:personnelSummaryOne,
        subsPermission:subsPermission,
        //-----------------------
        getArea:getArea,
        getDeparts:getDeparts,
        getNameT:getNameT,
        //--------------------------
        personnelFigureOne : personnelFigureOne,
        personnelFigure : personnelFigure
    };
    //个人汇总图形化
    function personnelFigureOne(data){
        return $http.post('/personnelFigureOne/figure',data)
    }
    //汇总图形化
    function personnelFigure(data){
        return $http.post('/personnelFigure/figure',data)
    }
    //菜单权限
    function subsPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    //日汇总
    function personnelSummary(data){
        return $http.get('/personnelSummary/summary',{
            params:data
        })
    }
    //周汇总
    function personnelSummaryOne(data){
        return $http.get('/personnelSummaryOne/summaryOne',{
            params:data
        })
    }
    //获取所有地区
   function getArea(){
    return $http.get('/getArea/area')
    }
    //获取所有项目组
    function getDeparts(){
        return $http.get('/getDeparts/departs')
    }
//获取所有个人
    function getNameT(data){
        return $http.get('/getNameT/name',{
            params: data
        })
    }
});
