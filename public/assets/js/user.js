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
// 当用户选择文件的时候
$('#avatar').on('change',  function () {
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