<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 20:08:58 Wed
 * @LastEditTime: 2022-02-17 18:51:17 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->

<template>
  <div id="app">
    <form>
      <ul class="pagination justify-content-center" style="margin-top: 20px">
        <li class="page-item active" @click="pageNumChange(-1)">
          <a class="page-link" href="javascript:void(0)">&laquo;</a>
        </li>
        <li
          class="page-item"
          v-for="(pageNum, index) in totalPageNum"
          :key="index"
          @click="pageNumChange(pageNum)"
        >
          <a class="page-link" href="javascript:void(0)">{{ pageNum }}</a>
        </li>

        <li class="page-item active" @click="pageNumChange(-2)">
          <a class="page-link" href="javascript:void(0)">&raquo;</a>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import bus from "../bus.js";
export default {
  name: "Pagination",
  data() {
    return {
      totalPageNum: 1,
    };
  },
  methods: {
    pageNumChange(pageNum) {
      console.log(pageNum);
      this.$emit("pageNumChange", pageNum);
    },
  },
  created() {
    console.log("pagination created");
    bus.$on("totalPageNum", (data) => {
      console.log(1111);
      this.totalPageNum = data;
    });
  },
};
</script>
