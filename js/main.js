$(function () {
    function renderTime (hour, min, second) {
        function formatTime (time) {
            return time < 10 ? '0' + time.toString() : time;
        }
        $('.headtimer').text(formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(second));
    }

    function calcTime (time) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor((time - (hour * 3600)) / 60);
        var second = (time - (hour * 3600)) % 60;
        return [hour, min, second]
    }
    
    function createInterval (time) {
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

    xyj.getTimeLeft(function (error, time) {
        if (error) {
            console.log(error)
        } else {
            createInterval(time)
        }
    });
})()

// 合约剩余时间