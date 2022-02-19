<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 20:08:58 Wed
 * @LastEditTime: 2022-02-16 20:13:40 Wed
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
export default {
  name: "Pagination",
  props: {
    totalPageNum: { Number },
  },
  methods: {
    pageNumChange(pageNum) {
      this.$emit("pageNumChange", pageNum);
    },
  },
};
</script>
