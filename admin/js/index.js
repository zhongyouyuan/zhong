$(function () {
    $.ajax({
        headers: {
            Authorization: localStorage.getItem('bignews_token')
        },
        url: 'http://localhost:8080/api/v1/admin/user/info',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            $('.user_info > img').attr('src', res.data.userPic);
            $('.user_info > span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
        },
        error: (err) => {
            if (err.statusText === 'Forbidden') {
                alert('未登录,请先登录');
                location.href = './login.html'
            }
        }
    });

    // 左边栏
    $('.level01').on('click', function () {
        // 排他思想
        $(this).addClass('active').siblings().removeClass('active');
        // 单击文章管理，展开它的子项
        if ($(this).next().hasClass('level02')) {
            // 切换展开和合并
            $('.level02').slideToggle();
            // 箭头旋转
            $(this).find('b').toggleClass('rotate0');

        } else {
            // 让子项合并
            $('.level02').slideUp();
            // 让箭头还原到原始状态
            $('.level01').eq(1).find('b').removeClass('rotate0');
            // 清除子项可能添加的acitve样式
            $('.level02 > li').removeClass('active')
        }
    })
    // 单击文章管理的子项切换样式效果事件
    $('.level02 > li').on('click', () => {
        $(this).addClass('active').sibling().removeClass('active')
    })


    // 顶部退出
    $('.logout').on('click', function () {
        // 清除token
        localStorage.removeItem('bignews_token');
        // 回到登录页
        location.href = './login.html';

    })

})