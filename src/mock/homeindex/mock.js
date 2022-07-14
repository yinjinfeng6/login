let Mock = require('mockjs');

let data = [
    { id: 0, name: "兜兜风", text: "啥地方法规" },
    { id: 1, name: "护肤", text: "萨尔" },
    { id: 2, name: "高峰过后", text: "雨天" },
    { id: 3, name: "黑寡妇的", text: "u衣服都是" },
]

// 获取
Mock.mock("/api/homeindex", 'get', function (config) {
    // console.log(config);
    return data;
})

// 修改
Mock.mock(/\/api\/homeindex\/edit\/\d/, 'put', function (config) {
    // console.log(config);
    let arr = config.url.split('/');
    let id = arr.pop();
    let obj = JSON.parse(config.body);
    data[id].name = obj.name;
    data[id].text = obj.text;
    return data;
})

// 删除
Mock.mock(/\/api\/homeindex\/del\/\d/, 'delete', function (config) {
    // console.log(config);
    let arr = config.url.split('/');
    let id = arr.pop();
    data.splice(id, 1);
})

// 添加
Mock.mock('/api/homeindex/add', 'post', function (config) {
    // console.log(config);
    let obj = JSON.parse(config.body);
    let name = obj.name;
    let text = obj.text;
    data = data.map(function (item, id) {
        return {
            id,
            name: item.name,
            text: item.text
        }
    })
    data.push({ id: data.length, name, text });
    return data;
})