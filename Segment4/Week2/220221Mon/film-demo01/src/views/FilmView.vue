<template>
    <div id="app">
        <UpdateFilm/>
        <AddFilm/>
        <h3 class="text-center" style="line-height: 100px">电影管理</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-8" style="line-height: 60px">
                    <form class="form-inline">
                        电影名称:<input type="text" placeholder="请输入电影名称" name="filmName" class="form-control">
                        电影类型:
                        <select name="filmType" class="form-control">
                            <option value="">请选择电影类型</option>
                            <option value="动画">动画</option>
                            <option value="动漫">动漫</option>
                            <option value="动作">动作</option>
                            <option value="武侠">武侠</option>
                            <option value="犯罪">犯罪</option>
                            <option value="名著">名著</option>
                            <option value="喜剧">喜剧</option>
                        </select>
                        <button type="button" class="btn btn-info">搜索</button>
                    </form>
                </div>
                <div class="col-md-4 text-right">
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#addModal">添加</button>
                    <button type="button" class="btn btn-danger">批量删除</button>
                </div>
            </div>
            <div class="row">
                <table class="col-md-12 table-bordered text-center">
                    <tr style="line-height:60px;background: lightblue">
                        <td><input type="checkbox" id="allId">全选/全消</td>
                        <td>编号</td>
                        <td>电影名称</td>
                        <td>电影价格</td>
                        <td>电影类型</td>
                        <td>电影图片</td>
                        <td>电影评分</td>
                        <td colspan="2">操作</td>
                    </tr>
                    <tr>
                        <td>选择<input type="checkbox" class="sel"></td>
                        <td>1</td>
                        <td>1</td>
                        <td>1元</td>
                        <td>1</td>
                        <td><img  src="" width="50px" class="img-thumbnail"></td>
                        <td>1分</td>
                        <td>
                            <button type="button" class="btn btn-danger" ><span class="glyphicon glyphicon-remove"></span>删除</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-pencil"></span>修改</button>
                        </td>
                    </tr>
                </table>
            </div>
            <ul class="pagination justify-content-center" style="margin-top: 20px">
                <li class="page-item active"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0)">2</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0)">4</a></li>
                <li class="page-item active"><a class="page-link" href="javascript:void(0)">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import AddFilm from "./film/AddFilm.vue";
    import UpdateFilm from "./film/UpdateFilm.vue";
    export default {
        name: "FilmView",
        components:{
            AddFilm,
            UpdateFilm
        }
    }
</script>

<style scoped>

</style>