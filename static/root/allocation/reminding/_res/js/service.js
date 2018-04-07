var app = angular.module('remindServer',[]);
app.factory('remindSer',function ($http) {
    return {
        remindList:remindList,
        remindId:remindId,
        remindCount:remindCount,
        remindDelete:remindDelete,
        remindAdd:remindAdd,
        remindEdit:remindEdit,
        getProjectTask:getProjectTask,
        getNameTask:getNameTask,
        getTableTask:getTableTask,
        remindPermission:remindPermission
    };
    //菜单权限
    function remindPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function remindList(data) {
        return $http.get('/remindList/list',{
            params: data
        })
    }
    //添加
    function remindAdd(data){
        return $http.post('/remindAdd/add',data)
    }
    //编辑
    function remindEdit(data){
        return $http.post('/remindEdit/edit',data)
    }
    //id查询
    function remindId(data){
        return $http.get('/remindId/id',{
            params:data
        })
    }
    //分页总条数
    function remindCount(data){
        return $http.get('/remindCount/count',{params:data})
    }
    //删除
    function remindDelete(data){
        return $http.get('/remindDelete/delete',{
            params: data
        })
    }
    //获取所有项目名称
    function getProjectTask(data){
        return $http.get('/getProjectTask/project',{
            params: data
        })
    }
    //根据项目表获取任务名
    function getNameTask(data){
        return $http.get('/getNameTask/name',{
            params: data
        })
    }
    //根据项目获取项目表
    function getTableTask(data){
        return $http.get('/getTableTask/table',{
            params: data
        })
    }
});
