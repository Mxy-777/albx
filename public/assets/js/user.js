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
// 上传用户头像当用户选择文件的时候
//avatar在script模板中不能用change交给父元素处理
$('#modifyBox').on('change','#avatar',function(){
     // 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			console.log(response)
			// 实现头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		}
	})
});
//用户列表展示
$.ajax({
    url:'/users',
    type:'get',
    success:function(response){
       console.log(response);
       var html = template('userTpl',{data: response});
       $('#userBox').html(html);
    }
})
//修改用户信息功能利用事件委托
$('#userBox').on('click','.edit',function(){
     var id = $(this).attr('data-id');
     $.ajax({
         url:'/users/'+id,
         type:'get',
         data:id,
         success:function(response){
             console.log(response);
             var html = template('modifyTpl',response);
             $('#modifyBox').html(html);
         }
     })
})
//为修改的表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取用户输入的内容
    var formData = $(this).serialize();
    //获取要修改的id
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;

})
//删除用户功能
$('#userBox').on('click','.delete',function(){
    if(confirm('你真的要删除用户吗')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})