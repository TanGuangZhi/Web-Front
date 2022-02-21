<template>
    <!--2.修改电影-->
    <div id="updateModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">修改电影</h4>
                </div>
                <div class="media-body">
                    <form class="text-center" id="updateForm">
                        <input name="oldFilmImg" value="lookFilm.filmImg" type="hidden"/>
                        <p>
                            <img  width="100px" id="updateImg">
                        </p>
                        <p class="form-inline justify-content-center" style="margin-top: 20px">
                            编　　号:<input type="text" name="_id"  readonly class="form-control" placeholder="请输入用户名">
                        </p>
                        <p class="form-inline justify-content-center" style="margin-top: 20px">
                            电影名称:<input type="text" name="filmName" class="form-control" placeholder="请输入电影名称">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影价格:<input type="text" name="filmPrice"  class="form-control" placeholder="请输入电影价格">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影评分:<input type="text" name="filmScore"  class="form-control" placeholder="请输入电影评分">
                        </p>
                        <p class="form-inline justify-content-center">
                            电影类型:
                            <select name="filmType" class="form-control" style="width:210px">
                                <option value="">请选择电影类型</option>
                                <option value="动画">动画</option>
                                <option value="动漫">动漫</option>
                                <option value="动作">动作</option>
                                <option value="爱情">爱情</option>
                                <option value="喜剧">喜剧</option>
                            </select>
                        </p>
                        <p class="form-inline justify-content-center">
                            电影图片:<input type="file" name="filmImg"  id="updateFile" class="form-control" style="width: 210px">
                        </p>
                        <p class="form-inline justify-content-center">
                            <button type="button" class="btn btn-primary">修改</button>
                            <button style="margin-left:10px" type="button" class="btn btn-info"  data-dismiss="modal">返回</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        name: "UpdateFilm",
    }
</script>

<style scoped>

</style>