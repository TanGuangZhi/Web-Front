<template>
    <!--1.添加电影-->
    <div id="addModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">添加电影</h4>
                </div>
                <div class="media-body">
                    <form class="text-center" id="addForm">
                        <p>
                            <img src="" width="100px" id="addImg">
                        </p>
                        <p class="form-inline justify-content-center" style="margin-top: 20px">
                            电影名称:<input type="text" name="filmName" class="form-control" placeholder="请输入电影名称">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影价格:<input type="text" name="filmPrice" class="form-control" placeholder="请输入电影价格">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影评分:<input type="text" name="filmScore" class="form-control" placeholder="请输入电影评分">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影类型:
                            <select name="filmType" class="form-control" style="width: 210px">
                                <option value="">请选择电影类型</option>
                                <option value="动画">动画</option>
                                <option value="动漫">动漫</option>
                                <option value="动作">动作</option>
                                <option value="武侠">武侠</option>
                                <option value="犯罪">犯罪</option>
                                <option value="名著">名著</option>
                                <option value="喜剧">喜剧</option>
                            </select>
                        </p>
                        <p class="form-inline justify-content-center">
                            电影图片:<input type="file" name="filmImg" id="addFile" class="form-control" style="width:210px">
                        </p>
                        <p class="form-inline justify-content-center">
                            <button type="button" class="btn btn-primary" id="addBtn">添加</button>
                            <button style="margin-left:10px" type="button" class="btn btn-info"  data-dismiss="modal">返回</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddFilm"
    }
</script>

<style scoped>

</style>