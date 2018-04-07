var app = angular.module('comsetServer',[]);
app.factory('comsetSer',function ($http) {
    return {
        compDelete:compDelete,
        compList:compList,
        compCount:compCount,
        compAdd:compAdd,
        compId:compId,
        compEdit:compEdit,
        compPermission:compPermission,
        //----------------------
        getArea:getArea,
        getDeparts:getDeparts,
        getProjectT:getProjectT,
        getTableT:getTableT,
        getNameT:getNameT
    };
    //菜单权限
    function compPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function compList(data) {
        return $http.get('/compList/list',{
            params: data
        })
    }
    //添加
    function compAdd(data){
        return $http.post('/compAdd/add',data)
    }
    //编辑
    function compEdit(data){
        return $http.post('/compEdit/edit',data)
    }
    //id查询
    function compId(data){
        return $http.get('/compId/id',{
            params:data
        })
    }
    //分页总条数
    function compCount(data){
        return $http.get('/compCount/count',{params:data})
    }
    //删除
    function compDelete(data){
        return $http.get('/compDelete/delete',{
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
