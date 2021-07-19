window.onload = function () {
    //main
    var main = document.querySelector('#main');
    //唱片区域
    var player = document.querySelector('#main>#player');
    //黑胶唱片背景
    var playerBg = document.querySelector('#main>#player>#bg');
    //播放按钮
    var playBtn = document.querySelector('#main>#player>img:last-of-type');
    //音频
    var audio = document.querySelector('audio');
    //音乐已播放时长
    var alreadyLength = document.querySelector('#time>span:first-of-type');
    //音乐总时长
    var musicLength = document.querySelector('#time>span:last-of-type');
    //进度条
    var bar = document.querySelector('#main>#control>#time>#bar');
    //进度条拖拽点
    var whitePoint = document.querySelector('#main>#control>#time>#bar>i');
    //进度条已播放长度
    var alreadyPlayed = document.querySelector('#main>#control>#time>#bar>p');
    //获取歌词ul和li
    var ul = document.querySelector('#main>#lyric>div>ul');

    //添加歌词
    var lyrics = [
        '作词 : 黄家驹',
        '作曲 : 黄家驹',
        '编曲 : Beyond/Kunihiko Ryo',
        '制作人 : Beyond/Kunihiko Ryo',
        '今天我 寒夜里看雪飘过',
        '怀着冷却了的心窝漂远方',
        '风雨里追赶 雾里分不清影踪',
        '天空海阔你与我',
        '可会变（谁没在变）',
        '多少次 迎着冷眼与嘲笑',
        '从没有放弃过心中的理想',
        '一刹那恍惚 若有所失的感觉',
        '不知不觉已变淡',
        '心里爱（谁明白我）',
        '原谅我这一生不羁放纵爱自由',
        '也会怕有一天会跌倒',
        '背弃了理想 谁人都可以',
        '哪会怕有一天只你共我',
        '今天我 寒夜里看雪飘过',
        '怀着冷却了的心窝漂远方',
        '风雨里追赶 雾里分不清影踪',
        '天空海阔你与我',
        '可会变（谁没在变）',
        '原谅我这一生不羁放纵爱自由',
        '也会怕有一天会跌倒',
        '背弃了理想 谁人都可以',
        '哪会怕有一天只你共我',
        '仍然自由自我 永远高唱我歌',
        '走遍千里',
        '原谅我这一生不羁放纵爱自由',
        '也会怕有一天会跌倒',
        '背弃了理想 谁人都可以',
        '哪会怕有一天只你共我',
        '背弃了理想 谁人都可以',
        '哪会怕有一天只你共我',
        '原谅我这一生不羁放纵爱自由',
        '也会怕有一天会跌倒',
        '背弃了理想 谁人都可以',
        '哪会怕有一天只你共我',
    ];
    lyrics.forEach(function (item, index) {
        var liObj = document.createElement('li');
        liObj.innerHTML = item;
        ul.appendChild(liObj);
    });

    //定义一些全局变量
    var flag = true;
    var deg = 0;
    var timer1 = null;
    var timer2 = null;
    var nowSecond = 0;
    var nowTime = 0;

    //给进度条右边的时间赋值
    var second = '0' + parseInt(audio.duration / 60) + ':' + parseInt(audio.duration % 60);
    musicLength.innerHTML = second;

    //点击main区域播放、暂停歌曲
    player.onclick = function () {
        if (flag) {
            playBtn.style.visibility = 'hidden'; flag = false;
            audio.play();
            //添加定时器，旋转图片
            timer1 = setInterval(function () {
                deg += 1;
                playerBg.style.transform = 'rotate(' + deg + 'deg)';
                ul.style.top = -(nowTime / audio.duration) * ul.offsetHeight + 'px'
                //设置音乐播放结束后的动作
                if (audio.ended) {
                    audio.pause();
                    clearInterval(timer1);
                    clearInterval(timer2);
                    nowTime = 0;
                    ul.style.top = 0;
                    audio.currentTime = nowTime;
                    whitePoint.style.left = alreadyPlayed.style.width = 0 + 'px';
                    playBtn.style.visibility = 'visible'; flag = true;
                    alreadyLength.innerText = '00:00';
                }
            }, 60)
            //添加定时器，自动赋值时间
            timer2 = setInterval(function name(params) {
                nowTime++;
                nowSecond = check(parseInt(nowTime / 60)) + ':' + check(parseInt(nowTime % 60));
                alreadyLength.innerText = nowSecond;
                whitePoint.style.left = alreadyPlayed.style.width = bar.offsetWidth * (nowTime / audio.duration) + 'px';
            }, 1000);
        }
        else {
            playBtn.style.visibility = 'visible'; flag = true;
            clearInterval(timer1);
            clearInterval(timer2);
            audio.pause();
        }
    }
    // 按到哪里白点会到那里
    // bar.onclick = function (downE) {
    //     var dE = downE || window.event;
    //     whitePoint.style.left = alreadyPlayed.style.width = dE.offsetX + 'px';
    //     whitePoint.style.transform = 'scale(2,2)';
    //     document.onmouseup = function (downE) {
    //         whitePoint.style.transform = 'scale(1,1)';
    //     }
    // }

    //拖动白点控制音乐播放
    whitePoint.onmousedown = function (downE) {
        var dE = downE || window.event;
        document.onmousemove = function (moveE) {
            var mE = moveE || window.event;
            var moveX = mE.clientX - (bar.offsetLeft + main.offsetLeft);
            if (moveX <= 0) moveX = 0;
            if (moveX >= bar.offsetWidth) moveX = bar.offsetWidth;
            //设置白点和已播放条的位置、长度
            whitePoint.style.left = alreadyPlayed.style.width = moveX + 'px';
            //拖动控制音乐时间
            nowTime = (moveX / bar.offsetWidth) * audio.duration;
            audio.currentTime = nowTime;
            //给已播放时间赋值
            nowSecond = check(parseInt(nowTime / 60)) + ':' + check(parseInt(nowTime % 60));
            alreadyLength.innerText = nowSecond;
            return false;
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }

    //给小于10的时间加上0
    function check(x) {
        return x < 10 ? '0' + x : x;
    }
}