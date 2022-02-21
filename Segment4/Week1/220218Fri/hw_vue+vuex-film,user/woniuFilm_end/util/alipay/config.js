// 支付宝配置文件
// 文件读取 应用私钥
let fs=require("fs");
let path=require("path");
let appPrivateKey = fs.readFileSync(path.join(__dirname,'./file/private.txt'),'ascii');
// 支付宝 公钥
let alipayPublicKey = fs.readFileSync(path.join(__dirname,'./file/public.txt'),'ascii');
const alipayConfig = {
    // APPId 应用id
    appId:2016100100641271,
    // 应用私钥，我这里直接读取它生成的.txt文件
    privateKey:appPrivateKey.toString(),
    // 支付宝公钥,一样是读取的.txt文件
    alipayPublicKey:alipayPublicKey.toString(),
    // 支付宝网关
    gateway:'https://openapi.alipaydev.com/gateway.do',
    // 编码字符集
    charset:'utf-8',
    // 版本默认 1.0
    version:'1.0',
    // 加密方式，与自己的加密方式对应
    signType:'RSA2'
}
// 将配置 导出
module.exports = {
    alipayConfig
}
