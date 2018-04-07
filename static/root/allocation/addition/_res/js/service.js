var app = angular.module('additServer',[]);
app.factory('additSer',function ($http) {
    return {
        additList:additList,
        additCount:additCount,
        additAdd:additAdd,
        additSee:additSee,
        additId:additId,
        additPermission:additPermission,
        additDetect:additDetect,//检测
        getAreaT:getAreaT,
        getDepartT:getDepartT,
        getProjectT:getProjectT,
        getTableT:getTableT,
        gitName:gitName,
        getId:getId,

        getArea:getArea,//执行人地区
        getDepart:getDepart,//执行人部门
        //-------------------列表新样式------------------------
        newAreas:newAreas,
        newDeparts:newDeparts,
        newMakeProjects:newMakeProjects,
        newProjects:newProjects
    };
    //菜单权限
    function additPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function additList(data) {
        return $http.get('/planList/list',{
            params: data
        })
    }
    function additSee(data) {
        return $http.get('/additSee/see',{
            params: data
        })
    }
    //获取用户列表
    function gitName(data) {
        return $http.get('/gitName/name',{
            params: data
        })
    }
    //添加
    function additAdd(data){
        return $http.post('/additAdd/add',data)
    }
    //id查询
    function additId(data){
        return $http.get('/additId/id',{
            params:data
        })
    }
    //分页总条数
    function additCount(data){
        return $http.get('/itemCount/count',{params:data})
    }
    //地区
    function getAreaT(){
        return $http.get('/getAreaT/area')
    }
    //项目组/部门
    function getDepartT(data){
        return $http.get('/getDepartT/depart',{
            params:data
        })
    }
    //检测
    function additDetect(data){
        return $http.post('/additDetect/detect',data)
    }
    //项目名称
    function getProjectT(data){
        return $http.get('/getProjectT/project',{
            params:data
        })
    }
    //项目表
    function getTableT(data){
        return $http.get('/getTableT/table',{
            params:data
        })
    }
    //执行人地区
    function getArea(){
        return $http.get('/getArea/area')
    }
    //执行人部门
    function getDepart(){
        return $http.get('/getDeparts/departs')
    }
    //查看任务节点详细内容（通过id查找）
    function getId(data){
        return $http.get('/getId/id',{
            params:data
        })
    }
    //-------------------列表新样式------------------------
    //地区下拉框
    function newAreas(data){
        return $http.get('/newAreas/areas',{
            params: data
        })
    }
    //部门下拉框
    function newDeparts(data){
        return $http.get('/newDeparts/departs',{
            params: data
        })
    }
    //立项情况下拉框
    function newMakeProjects(data){
        return $http.get('/newMakeProjects/makeProjects',{
            params: data
        })
    }
    //项目名称下拉框
    function newProjects(data){
        return $http.get('/newProjects/projects',{
            params: data
        })
    }
});
