var app = angular.module('completeServer',[]);
app.factory('completeSer',function ($http) {
    return {
        completeSummary:completeSummary,
        subsPermission:subsPermission,
        //-----------------------------
        getArea:getArea,
        getDeparts:getDeparts,
        getTableCT:getTableCT,
        getNameT:getNameT,
        collTableCT:collTableCT,
        getAllProjects:getAllProjects,
        //------------------------
        completeFigure : completeFigure
    };
    //汇总图形化
    function completeFigure(data){
        return $http.post('/completeFigure/figure',data)
    }
    //菜单权限
    function subsPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    //日汇总
    function completeSummary(data){
        return $http.get('/completeSummary/summary',{
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
    //新增汇总根据地区项目组获取所有项目
    function getAllProjects(data){
        return $http.get('/getAllProjects/allProjects',{
            params: data
        })
    }
    //获取所有项目表
    function getTableCT(data){
        return $http.get('/getTableCT/table',{
            params: data
        })
    }
    //获取所有个人
    function getNameT(data){
        return $http.get('/getNameT/name',{
            params: data
        })
    }
    //汇总里面的根据项目获取任务
    function collTableCT(data){
        return $http.get('/collTableCT/table',{
            params: data
        })
    }
});
