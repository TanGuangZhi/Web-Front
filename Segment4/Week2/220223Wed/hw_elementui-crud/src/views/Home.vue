<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-24 13:14:45 Thu
 * @LastEditTime: 2022-02-24 15:27:42 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="app">
    <div id="charts01"></div>

    <div id="charts02"></div>

    <div id="charts03"></div>

    <div id="charts04"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "CountFilm",
  data() {
    return {
      filmList: [
        {
          filmName: "夏洛特烦恼",
          filmScore: 8.5,
          lookCount: 78980,
          boxOffice: 10.27,
        },
        {
          filmName: "喜剧之王",
          filmScore: 8.8,
          lookCount: 56470,
          boxOffice: 15.27,
        },
        {
          filmName: "三国演义",
          filmScore: 6.5,
          lookCount: 89470,
          boxOffice: 4.27,
        },
        {
          filmName: "西虹市首富",
          filmScore: 8.2,
          lookCount: 34470,
          boxOffice: 8.27,
        },
        {
          filmName: "一念天堂",
          filmScore: 9.8,
          lookCount: 45470,
          boxOffice: 6.27,
        },
        {
          filmName: "天天开心",
          filmScore: 8.5,
          lookCount: 58470,
          boxOffice: 7.27,
        },
        {
          filmName: "功夫足球",
          filmScore: 7.5,
          lookCount: 23470,
          boxOffice: 12.27,
        },
      ],
      typeList: [
        { type: "喜剧", typeCount: 10 },
        { type: "动作", typeCount: 22 },
        { type: "经典", typeCount: 19 },
        { type: "动画", typeCount: 14 },
        { type: "动漫", typeCount: 18 },
        { type: "名著", typeCount: 26 },
        { type: "爱情", typeCount: 15 },
      ],
      option1: {
        legend: {
          orient: "vertical",
          left: "right",
        },
        title: {
          text: "电影评分，观影人数,票房统计(柱状图)",
          subtext: "Movie ratings, audience,boxOffice statistics",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "评分(满分10分)",
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
          {
            name: "观影人数(/万人次)",
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
          {
            name: "票房(/亿元)",
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "10%",
          left: "center",
        },
        title: {
          text: "总票房",
          subtext: "total box offices",
          left: "center",
        },
        series: [
          {
            name: "filmName",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.filmList.forEach((item, index) => {
      //1.得到filmName 数据集
      this.option1.xAxis.data.push(item.filmName);
      //2.得到filmName 对应的分数集合
      this.option1.series[0].data.push(item.filmScore);
      //3.得到电影的 观影人数
      this.option1.series[1].data.push(item.lookCount / 10000);
      //4.得到电影的票房
      this.option1.series[2].data.push(item.boxOffice);
      this.option2.series[0].data.push({
        name: item.filmName,
        value: item.boxOffice,
      });
    });
  },
  mounted() {
    //渲染页面的时候执行 (说明标签全部生成了...)
    //1.得到统计图渲染的标签(需要渲染到那个标签中)
    let chartsDom01 = document.querySelector("#charts01");
    //2.将统计图添加到dom对象中
    let charts01 = echarts.init(chartsDom01);
    //3.根据参数绘制出 指定参数对应的图形
    charts01.setOption(this.option1);

    let chartsDom02 = document.querySelector("#charts02");
    let charts02 = echarts.init(chartsDom02);
    charts02.setOption(this.option2);
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
#charts01,
#charts02 {
  width: 50%;
  float: left;
  height: 700px;
  border: 1px solid gray;
  box-sizing: border-box;
}
</style>
