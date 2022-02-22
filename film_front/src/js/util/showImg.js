/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 19:07:11 Thu
 * @LastEditTime: 2022-01-20 19:50:25 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
export let showImg = function (file, imgDom) {
    //通过此对象 读取文件资源
    let fr = new FileReader();
    //从file里面读取上传过来的文件资源  并且将信息保存到  fr的result属性
    //file[0]代表读取上传文件的路径
    fr.readAsDataURL(file.files[0]);
    //读取的数据发生改变的时候 此方法就会被调用一次
    fr.onload = function () {
        imgDom.src = this.result;
    }
}
