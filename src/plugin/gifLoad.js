var SuperGif = require('libgif/libgif');

function loadGif(url, imageArr = []) {
    const img = document.createElement('img');
    img.src = url
    // gif库需要img标签配置下面两个属性
    img.setAttribute('rel:animated_src', url)
    img.setAttribute('rel:auto_play', '0')
    document.body.appendChild(img)
    // 新建gif实例
    const rub = new SuperGif({ gif: img });
    return new Promise((resolve) => {
        rub.load(() => {
            for (let i = 1; i <= rub.get_length(); i++) {
                // 遍历gif实例的每一帧
                rub.move_to(i);
                imageArr.push(rub.get_canvas().toDataURL())
            }
            resolve(imageArr)
            // document.body.removeChild(img)
        });
    })
}

export default {
    install: function (Vue) {
        Vue.prototype.$loadGif = (url, imageArr) => loadGif(url, imageArr)
    }
}