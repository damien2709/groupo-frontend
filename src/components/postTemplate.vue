<template>
    <div class="postTemplate">
        <div class="title text-start">
            <h2 class="titlePost fs-3">TitlePost</h2>
        </div>
        <div class="content text-start">
            <p class="contentPost">Content Post</p>
        </div>
        <div class="author text-start">
            <p class="authorPost">Damien Will</p>
        </div>
        <div class="like text-start">
            <img src="../assets/images/heart.png" alt="" class="likeImg">
            <span class="countLike">1</span>
        </div>
    </div>  
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.likeImg {
    height: 20px;
    width: auto;
}
</style>