var app = angular.module('distServer',[]);
app.factory('distSer',function ($http) {
    return {
        distriCount:distriCount,
        distriList:distriList,
        distriId:distriId,
        distriEdit:distriEdit,
        distrifinish:distrifinish,
        distriunFinish:distriunFinish,
        distrireback:distrireback,
        // distrilistDetails:distrilistDetails,
        additPermission:additPermission,
        gitName:gitName,
        getArea:getArea,
        infoFiles:infoFiles,
        getDeparts:getDeparts,
        distrireaffirm:distrireaffirm,
        distrireunaffirm:distrireunaffirm

    };
    //菜单权限
    function additPermission(data) {
        return $http.get('/websitePermission/permission/'+data);
    }
    function distriList(data) {
        return $http.get('/distriList/list',{
            params: data
        })
    }
    //编辑
    function distriEdit(data){
        return $http.post('/planEdit/edit',data)
    }
      //批量确认
      function distrireaffirm(data){
        return $http.post('/tasknode/finishs',data)
    }
    //批量未确认
    function distrireunaffirm(data){
        return $http.post('/tasknode/unFinishs',data)
    }
    // //查看详情
    // function distrilistDetails(data){
    //     return $http.post('/distrilistDetails/listDetails',data)
    // }
    //id查询
    function distriId(data){
        return $http.get('/getId/id',{
            params:data
        })
    }
    //分页总条数
    function distriCount(data){
        return $http.get('/distriCount/count',{params:data})
    }
    //确认完成
    function distrifinish(data){
        return $http.get('/distrifinish/finish',{
            params: data
        })
    }
    //确认未完成
    function distriunFinish(data){
        return $http.get('/distriunFinish/unFinish',{
            params: data
        })
    }
    //撤回任务
    function distrireback(data){
        return $http.get('/distrireback/reback',{
            params: data
        })
    }
    //获取所有姓名
    function gitName(){
        return $http.get('/gitName/name')
    }
    //获取所有地区
    function getArea(){
        return $http.get('/getArea/area')
    }
    //获取所有部门
    function getDeparts(){
        return $http.get('/getDeparts/departs')
    }
    //文件附件列表
    function infoFiles(data){
        return $http.get('/infoFiles/files',{
            params: data
        })
    }
});
