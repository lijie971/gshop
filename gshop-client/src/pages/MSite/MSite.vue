<template>
  <section class="msite">
    <HearderTop :title="address.address">

         <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo sousuo"></i>
      </router-link>

      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
          </span>
          <span class="header_login_text" v-if="userInfo._id">
        <i class="iconfont icon-wode"></i>
          </span>
      </router-link>
    </HearderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(arr, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="category in arr"
              :key="category.id"
            >
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import HearderTop from "@/components/HearderTop/HearderTop.vue";
import ShopList from "@/components/ShopList/ShopList.vue";
export default {
  name: "MSite",
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: {
    HearderTop,
    ShopList,
  },
  watch: {
    //监视categorys与数据了
    categorys(newValue) {
      //nextTick当for循环执行完成后才执行
      this.$nextTick(function () {
        var mySwiper = new Swiper(".swiper-container", {
          autoplay: true, //自动轮播
          delay: 1000, //1秒切换一次
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true, //小球可以点
          },
        });
      });
    },
  },
  mounted() {
    //触发食品分类列表的action
    this.$store.dispatch("getCategorys");
  },
  computed: {
    // ...mapState(['address','categorys','userInfo'])
    address() {
      return this.$store.state.address;
    },
    categorys() {
      return this.$store.state.categorys;
    },
    //根据categorys一维数组生成二维数组
    categorysArr() {
      //解构一下
      const { categorys } = this;
      //准备一个空的二维数组
      const arr = [];
      let minArr = [];
      //遍历categorys
      categorys.forEach((item) => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(item);
      });
      return arr;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '@/common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .sousuo
    color white
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>