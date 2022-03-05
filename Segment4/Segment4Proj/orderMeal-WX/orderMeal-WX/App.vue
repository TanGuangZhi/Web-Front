<!--
 * @Author: TanGuangZhi
 * @Date: 2022-03-04 11:42:13 Fri
 * @LastEditTime: 2022-03-04 17:29:30 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<script>
export default {
  onLaunch: function () {
    wx.cloud.init({
      env: "diancan-database-0fk3qml16f38db2",
      traceUser: true,
    });
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>
