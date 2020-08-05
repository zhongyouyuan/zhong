$(function () {
    $('.input_sub').on('click', function () {
        const username = $('.input_txt').val().trim();
        const password = $('.input_pass').val().trim();

        if (username === '' || password === '') {
            alert('用户名和密码不能为空');
            return;
        } else {
            $.ajax({
                url: 'http://localhost:8080/api/v1/admin/user/login',
                type: 'post',
                dataType: 'json',
                data: { username, password },
                success: function (res) {
                    // 登录成功
                    if (res.code === 200) {
                        // 保存本地存储
                        localStorage.setItem('bignews_token', res.token)

                        $('#tips').text(res.msg);
                        $('#myModal').modal('show');
                        // 事件监听
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            window.location.href = './index.html';
                        })

                    } else {
                        // 登录失败
                        $('#tips').text(res.msg);
                        $('#myModal').modal('show');
                    }
                }
            });
        }
    })
})
// 确定事件
$(function () {
    $('.btn-primary').on('click', function () {
        $('#myModal').modal('hide');
    })
})
