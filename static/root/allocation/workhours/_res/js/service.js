var app = angular.module('worksetServer',[]);
app.factory('worksetSer',function ($http) {
    return {
        workList:workList,
        workAdd:workAdd,
        workEdit:workEdit,
        workDelete:workDelete,
        workId:workId,
        workCount:workCount,
        getArea:getArea,
        getDeparts:getDeparts,
        gitName:gitName,
        workPermission:workPermission
    };
    //菜单权限
    function workPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function workList(data) {
        return $http.get('/workList/list',{
            params: data
        })
    }

    //添加
    function workAdd(data){
        return $http.post('/workAdd/add',data)
    }
    //编辑
    function workEdit(data){
        return $http.post('/workEdit/edit',data)
    }
    //id查询
    function workId(data){
        return $http.get('/workId/id',{
            params:data
        })
    }
    //分页总条数
    function workCount(data){
        return $http.get('/workCount/count',{params:data})
    }
    //删除
    function workDelete(data){
        return $http.get('/workDelete/delete',{
            params: data
        })
    }
    
    //获取所有地区
    function getArea(){
        return $http.get('/getArea/area')
    }
    //获取所有项目组/部门
    function getDeparts(){
        return $http.get('/getDeparts/departs')
    }
    //获取所有姓名
    function gitName(){
        return $http.get('/gitName/name')
    }
});
