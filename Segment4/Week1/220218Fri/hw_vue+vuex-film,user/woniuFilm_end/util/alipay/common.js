// 导入sdk环境 注意这个default
const AlipaySDK = require('alipay-sdk').default
// 引入配置文件 , 路径看自己
const config = require('./config')
// 实例化对象
let alipay = new AlipaySDK(config.alipayConfig)
// PC支付接口 alipay.trade.page.pay 返回的内容为 表单
let AlipayFormData = require('alipay-sdk/lib/form').default

/**
 * 创建订单支付宝封装
 * 异步方法
 * @param {Object} goods  商品信息
 */
const createOrder = async (goods) => {
    // 设置调用的接口
    let method = 'alipay.trade.page.pay'
    // 根据官方给的api文档提供一个参数合集
    let bizContent = {
        out_trade_no: goods.orderNumber, //订单号 时间戳
        product_code: 'FAST_INSTANT_TRADE_PAY', // 商品码
        total_amount: goods.allTotal, // 商品价格
        subject: "蜗牛影院",//goods.orderName, // 订单名称
        timeout_express: '5m', // 超时时间
        passback_params: JSON.stringify({success:200})//JSON.stringify(goods.pack_params) // 返回一个参数，用于自定义商品信息最后做通知使用
    }
    // 创建formData 对象
    const formData = new AlipayFormData()
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get')
    // 客户支付成功之后会同步跳回的地址 看自己的
    formData.addField('returnUrl','http://localhost:8000/')
    // 支付宝在用户支付成功之后会异步通知的回调地址，必须在公网ip 才能收到 根据自己的网址
    formData.addField('notifyUrl','http://localhost:8000/')
    // 将必要的参数集合添加进 form 表单
    formData.addField('bizContent', bizContent);
    // 异步向支付宝 发送生成订单请求，第二个参数为公共参数，可以为空
    const result = await alipay.exec(method, {}, {
        formData: formData
    })
    return result
}
// 导出方法
module.exports = {
    createOrder
}