<template>
    <div class="hello">
        <router-link to="/picker">picker</router-link>

        <transition name="slide-fade" class="fadeView">
            <div v-if="show">
                <image-view :imgArr="imgArr"
                            :showImageView="true"
                            :imageIndex="imageIndex"
                            v-on:hideImage="hideImageView"></image-view>
            </div>
        </transition>
        <h1 @click="showImgView">显示隐藏</h1>
        <img v-for="(item, index) in imgArr" :src="item" @click="selectImg(index)">
    </div>
</template>

<script>
    import imageView from 'vue-imageview'
    export default {
        name: 'hello',
        components: {
            'image-view': imageView
        },
        data () {
            return {
                // 图片数组
                imgArr: [
                    'https://image1.jyall.com/v1/tfs/T1yyATB7J_1R4n9VrK.gif',
                    'http://static.jyall.com/jyall_shop/dest/home/images/app100x100.jpg',
                    'http://img.blog.csdn.net/20160526104323632'
                ],
                // 显示组件
                show: false,
                // 从哪一张图片开始
                imageIndex: 0
            }
        },
        methods: {
            showImgView () {
                this.show = true
            },
            hideImageView () {
                this.show = false
            },
            selectImg (index) {
                this.show = true
                this.imageIndex = index
            }
        }
    }
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: opacity .5s ease;
    }

    .slide-fade-leave-active {
        transition: opacity .5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-active {
        opacity: 0;
    }
    h1, h2 {
        margin: 0;
        padding: 0;
    }
    img {
        display: block;
        margin: 10px auto;
        max-width: 400px;
    }
</style>
