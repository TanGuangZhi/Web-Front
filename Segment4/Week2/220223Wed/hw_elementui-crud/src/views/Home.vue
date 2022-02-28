<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-24 13:14:45 Thu
 * @LastEditTime: 2022-02-26 18:04:28 Sat
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("film");
export default {
  name: "CountFilm",
  data() {
    return {
      filmList: [],
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
  methods: {
    ...mapActions(["queryFilmAsync"]),
    async query5BestFilm() {
      let searchCondition = {
        sortBy: "filmScore",
        limit: 5,
      };
      await this.queryFilmAsync(searchCondition);
      this.filmList = [...this.pageInfo.filmList];
      let option = {
        title: {
          text: "口碑前5电影",
          left: "center",
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
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      this.filmList.forEach((item, index) => {
        //1.得到filmName 数据集
        option.xAxis.data.push(item.filmName);
        this.option1.xAxis.data.push(item.filmName);
        //2.得到filmName 对应的分数集合
        option.series[0].data.push(item.filmScore);
      });
      //渲染页面的时候执行 (说明标签全部生成了...)
      //1.得到统计图渲染的标签(需要渲染到那个标签中)
      let chartsDom01 = document.querySelector("#charts01");
      //2.将统计图添加到dom对象中
      let charts01 = echarts.init(chartsDom01);
      //3.根据参数绘制出 指定参数对应的图形
      charts01.setOption(option);
    },
    async query5SaleBestFilm() {
      let searchCondition = {
        sortBy: "boxOffice",
        limit: 5,
      };
      await this.queryFilmAsync(searchCondition);
      this.filmList = [...this.pageInfo.filmList];
      let option = {
        title: {
          text: "销量前5电影",
          left: "center",
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
            data: [],
            type: "line",
            smooth: true,
          },
        ],
      };
      this.filmList.forEach((item, index) => {
        //1.得到filmName 数据集
        option.xAxis.data.push(item.filmName);
        this.option1.xAxis.data.push(item.filmName);
        //2.得到filmName 对应的分数集合
        option.series[0].data.push(item.boxOffice);
      });
      //渲染页面的时候执行 (说明标签全部生成了...)
      //1.得到统计图渲染的标签(需要渲染到那个标签中)
      let chartsDom02 = document.querySelector("#charts02");
      //2.将统计图添加到dom对象中
      let charts02 = echarts.init(chartsDom02);
      //3.根据参数绘制出 指定参数对应的图形
      charts02.setOption(option);
    },
    async queryFilmType() {
      let filmTypeList = await this.$http("film/queryFilmType");
      filmTypeList = filmTypeList.data;
      console.log(filmTypeList);
      let option = {
        title: {
          text: "电影类型分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      for (let index = 0; index < filmTypeList.length; index++) {
        const item = filmTypeList[index];
        option.series[0].data.push({ value: item.count, name: item._id });
      }
      //渲染页面的时候执行 (说明标签全部生成了...)
      //1.得到统计图渲染的标签(需要渲染到那个标签中)
      let chartsDom03 = document.querySelector("#charts03");
      //2.将统计图添加到dom对象中
      let charts03 = echarts.init(chartsDom03);
      //3.根据参数绘制出 指定参数对应的图形
      charts03.setOption(option);
    },
  },
  created() {
    this.query5BestFilm();
    this.query5SaleBestFilm();
    this.queryFilmType();
  },
  mounted() {},
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
#charts01,
#charts02,
#charts03 {
  width: 50%;
  float: left;
  height: 700px;
  border: 1px solid gray;
  box-sizing: border-box;
}
</style>
