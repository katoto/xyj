window.onload = function () {
    // 渲染时间
    function renderTime (hour, min, second) {
        function formatTime (time) {
            return time < 10 ? '0' + time.toString() : time;
        }
        $('.headtimer').text(formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(second));
    }

    // 根据time计算小时 分钟 秒数
    function calcTime (time) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor((time - (hour * 3600)) / 60);
        var second = (time - (hour * 3600)) % 60;
        return [hour, min, second]
    }
    
    // 更新计数器
    function updateInterval (time) {
        if (xyj._timer) {
            clearInterval(xyj._timer);
        }
        xyj._time = time;
        xyj._timer = setInterval(function () {
            var timeTime = calcTime(xyj._time)
            renderTime(timeTime[0], timeTime[1], timeTime[2]);
            xyj._time--;
        }, 1000);
    }

    // 播报弹窗
    function showMsg (msg) {
        if (xyj._msgTimer) {
            // 当前存在播报
        } else {
            // 当前没有播报
            $('.pop-success').text(msg)
            $('.pop-success').addClass('show')
            xyj._msgTimer = setTimeout(function () {
                $('.pop-success').removeClass('show')
            }, 6000)
        }
    }
    


//-----------------------------------------------------------------------------------------------------------------------------------------------

    // 获取合约剩余时间
    xyj.getTimeLeft(function (error, time) {
        if (error) {
            console.log(error)
        } else {
            updateInterval(time)
        }
    });
}