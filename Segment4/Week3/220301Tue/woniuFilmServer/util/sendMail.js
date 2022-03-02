/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-19 10:20:58 Wed
 * @LastEditTime: 2022-01-19 12:45:49 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '2723885760@qq.com',
        pass: 'ytbeztsqnzlgdfai' //授权码,通过QQ获取
    }
});
let sendEmail = function (receiveEmail, url) {
    var mailOptions = {
        from: '2723885760@qq.com', // 发送者
        to: receiveEmail, // 接受者,可以同时发送多个,以逗号隔开
        subject: '邮箱激活', // 标题
        html: `<h2>点击激活邮箱</h2>
        <h3> <a href="${url}">点击一下既可激活用户</a></h3>`
    };
    //a标签中的href加入路由路径，发送的邮件链接时，可以触发相对应的路由操作； 也可以在路径拼接中添加参数 ?params = 参数值，在触发路由时，可以通过req.query.params获取到参数值； 要是想点击邮件中的链接进行页面重定向，则在触发的对应的路由文件中添加res.redirect(路径),再触发相对应的路由到相应的页面；
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('发送成功');
        res.send('发送成功');  //res.send()后面的语句不会执行，若想要执行语句，放在res.send()语句前面；
    });
}
module.exports = sendEmail;
