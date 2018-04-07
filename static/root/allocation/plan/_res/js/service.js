var app = angular.module('planServer',[]);
app.factory('planSer',function ($http) {
    return {
        planList:planList,
        planEdit:planEdit,
        planEditSet:planEditSet,
        planEditSets:planEditSets,
        planDelete:planDelete,
        planDeleteNode:planDeleteNode,
        getId:getId,
        planCount:planCount,
        planTask:planTask,
        gitName:gitName,
        planInitiate:planInitiate,
        planPermission:planPermission,
        //-----------------------------------------------
        getTableName:getTableName,
        getMission:getMission,
        //-------------------列表新样式------------------------
        newAreas:newAreas,
        newDeparts:newDeparts,
        newMakeProjects:newMakeProjects,
        editState:editState,
        newProjects:newProjects,
        planlongTime:planlongTime
    };
    //菜单权限
    function planPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function planList(data) {
        return $http.get('/planList/list',{
            params: data
        })
    }
    function planlongTime(data){
        return $http.post('/tasknode/increase',data)
    }
    //获取用户列表
    function gitName(data) {
        return $http.get('/gitName/name',{
            params: data
        })
    }
    //编辑
    function planEdit(data){
        return $http.post('/planEdit/edit',data)
    }
    //发起任务
    function planInitiate(data){
        return $http.post('/planInitiate/initiate',data)
    }
    //设置任务节点
    function planEditSet(data){
        // console.log(data)
        return $http.post('/planEditSet/editSet',data)
    }
    //设置任务节点（新）
    function planEditSets(data){
        // console.log(data)
        return $http.post('/planEditSets/editSet',data)
    }
    //查看任务节点详细内容
    function planTask(data){
        return $http.post('/planTask/task',data)
    }
    //id查询
    function getId(data){
        return $http.get('/getId/id',{
            params:data
        })
    }
    //分页总条数
    function planCount(data){
        return $http.get('/planCount/count',{params:data})
    }
    //删除
    function planDelete(data){
        return $http.get('/planDelete/delete',{
            params: data
        })
    }
    //删除表
    function planDeleteNode(data){
        return $http.get('/planDeleteNode/deleteNode',{
            params: data
        })
    }
    //----------------------------------------
  /*  //项目表
    function getTableName(data){
        return $http.get('/getTableName/tableName',{
            params: data
        })
    }*/
    //获取所有项目
    function getTableName(data){
        return $http.get('/project/table/names',{
            params: data
        })
    }
   /* //任务名称
    function getMission(data){
        return $http.get('/getMission/mission',{
            params: data
        })
    }*/
    //任务名称
    function getMission(data){
        return $http.get('/tasknode/taskNames',{
            params: data
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
    //编辑
    function editState(data){
        return $http.post('/editState/edit',data)
    }
});
