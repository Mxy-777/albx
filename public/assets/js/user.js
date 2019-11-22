//表单提交行为
$('#userForm').on('submit',function(){
    //获取用户输入数据并格式化为参数字符串
    var formDate = $(this).serialize();
    $.ajax({
         url:'/users',
         type:'post',
         data:formDate,
         success:function(){
             //刷新页面
             location.reload();
         },
         error:function(){
             alert('用户添加失败');
         }
         
    })
    return false;
})