var app = angular.module('allotsetServer',[]);
app.factory('allotsetSer',function ($http) {
    return {
        allotDelete:allotDelete,
        allotList:allotList,
        allotCount:allotCount,
        allotAdd:allotAdd,
        allotId:allotId,
        allotEdit:allotEdit,
        allotPermission:allotPermission,
        //----------------------
        getArea:getArea,
        getDeparts:getDeparts,
        getProjectT:getProjectT,
        getTableT:getTableT,
        getNameT:getNameT
    };
    //菜单权限
    function allotPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function allotList(data) {
        return $http.get('/allotList/list',{
            params: data
        })
    }
    //添加
    function allotAdd(data){
        return $http.post('/allotAdd/add',data)
    }
    //编辑
    function allotEdit(data){
        return $http.post('/allotEdit/edit',data)
    }
    //id查询
    function allotId(data){
        return $http.get('/allotId/id',{
            params:data
        })
    }
    //分页总条数
    function allotCount(data){
        return $http.get('/allotCount/count',{params:data})
    }
    //删除
    function allotDelete(data){
        return $http.get('/allotDelete/delete',{
            params: data
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
    //获取所有项目
    function getProjectT(data){
        return $http.get('/getProjectT/project',{
            params: data
        })
    }
    //获取所有项目表
    function getTableT(data){
        return $http.get('/getTableT/table',{
            params: data
        })
    }
    //获取所有个人
    function getNameT(data){
        return $http.get('/getNameT/name',{
            params: data
        })
    }
});
