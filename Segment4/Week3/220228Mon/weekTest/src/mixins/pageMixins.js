/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 18:57:11 Tue
 * @LastEditTime: 2022-02-24 19:11:48 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 复用分页逻辑
 * @KeyWords: Vue, Web-Server, ElementUI
 */
export default {
    data() {
        return {
            pageData: {
                nowPageNum: 1,
                pageSize: 10,
                originDataList: [],
                showDataList: [],
                totalPageNum: 1
            }, dialogObj: {
                add: false,
                update: false
            }
        }
    },
    methods: {
        /**
         * @description: 1. get pagination data
         * @param {*} nowPageNum: 用于重置nowPageNum为1,防止点击第二页后,再点击多条件搜索,受到nowPageNum变为2产生的影响
         * @return {*}
         */
        pagination(nowPageNum) {
            return [...this.pageData.originDataList].splice(
                ((nowPageNum ?? this.pageData.nowPageNum) - 1) * this.pageData.pageSize,
                this.pageData.pageSize
            );
        },

        // 1.1 pageNumChange
        changeNowPage(pageNum) {
            if (pageNum < 0) {
                if (pageNum == -1 && this.pageData.nowPageNum > 1) {
                    this.pageData.nowPageNum -= 1;
                } else if (pageNum == -2 && this.pageData.nowPageNum < this.pageData.totalPageNum) {
                    this.pageData.nowPageNum += 1;
                }
            } else {
                this.pageData.nowPageNum = pageNum;
            }
            this.pageData.showDataList = this.pagination();
        },

        // 1.2 page size change
        changePageSize(pageSize) {
            this.pageData.pageSize = pageSize;
            this.pageData.showDataList = this.pagination();
        },

        // ## init
        initMixinsData() {
            this.pageData = {
                nowPageNum: 1,
                pageSize: 10,
                originDataList: [],
                showDataList: [],
                totalPageNum: 1
            };
            // console.log("lao zi init le");
        }
    }
}
