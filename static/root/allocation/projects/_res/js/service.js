var app = angular.module('itemServer',[]);
app.factory('itemSer',function ($http) {
    return {
        itemList:itemList,
        itemAdd:itemAdd,
        itemEdit:itemEdit,
        itemDelete:itemDelete,
        itemId:itemId,
        itemTableId:itemTableId,
        itemCount:itemCount,
        itemEditTab:itemEditTab,
        itemAddTab:itemAddTab,
        itemPermission:itemPermission,
        //------------------
        getArea:getArea,
        getProject:getProject,
        getInternal:getInternal,
        getDeparts:getDeparts,
        getApproval:getApproval,
        getNums:getNums,
        //--------------------------
        getProjectTask:getProjectTask,
        getTableName:getTableName

    };
    //菜单权限
    function itemPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function itemList(data) {
        return $http.get('/itemList/list',{
            params: data
        })
    }
    //添加
    function itemAdd(data){
        return $http.post('/itemAdd/add',data)
    }
    //编辑
    function itemEdit(data){
        return $http.post('/itemEdit/edit',data)
    }
    //编辑表
    function itemEditTab(data){
        return $http.post('/itemEditTab/editTab',data)
    }
    //添加表
    function itemAddTab(data){
        return $http.post('/itemAddTab/addTab',data)
    }
    //id查询
    function itemId(data){
        return $http.get('/itemId/id',{
            params:data
        })
    }
    //表id查询
    function itemTableId(data){
        return $http.get('/itemTableId/id',{
            params:data
        })
    }
    //分页总条数
    function itemCount(data){
        return $http.get('/itemCount/count',{params:data})
    }
    //删除
    function itemDelete(data){
        return $http.get('/itemDelete/delete',{
            params: data
        })
    }
    //-----------------------
    //获取地区
    function getArea(){
        return $http.get('/getArea/area')
    }
    //获取项目名称
    function getProject(){
        return $http.get('/getProject/project')
    }
    //获取内部项目名称
    function getInternal(){
        return $http.get('/getInternal/internal')
    }
    //获取所属项目组
    function getDeparts(){
        return $http.get('/getDeparts/departs')
    }
    //获取立项情况
    function getApproval(){
        return $http.get('/getApproval/approval')
    }
    //获取派工单号
    function getNums(){
        return $http.get('/getNums/nums')
    }
    //-------------------------------
    //项目表
    function getTableName(){
        return $http.get('/getTableName/tableName')
    }
    //项目名称
    function getProjectTask(){
        return $http.get('/getProjectTask/project')
    }
});
