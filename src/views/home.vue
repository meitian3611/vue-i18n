<template>
  <div class="home">
    <el-container>
      <!-- 头部导航 -->
      <el-header style="background: #3a84fb; color: #fff; line-height: 60px">{{
        $t("config.header")
      }}</el-header>
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside :width="iscollapse ? '65px' : '200px'">
          <el-menu
            background-color="#fff"
            text-color="#333"
            active-text-color="#3A84FB "
            :collapse="iscollapse"
            :collapse-transition="false"
            router
          >
            <div class="btn-s" :style="navCenter">
              <el-button
                type="default"
                @click="handleClick"
                style="
                  font-size: 28px;
                  padding: 0;
                  background: #f1f1f1;
                  border: 0;
                "
                :icon="btn_icon"
              ></el-button>
            </div>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{ $t("config.menu") }}</span>
              </template>
              <el-menu-item index="/config/DimConfig">{{
                $t("config.item01")
              }}</el-menu-item>
              <el-menu-item index="/config/rule">{{
                $t("config.item02")
              }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主内容 -->
        <el-main style="background: #fff; margin: 20px 20px 0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iscollapse: false,
      activePath: 1,
      btn_icon: "el-icon-s-fold",
      navCenter: "",
    };
  },
  created() {
    console.log(this.$store.state.locale);
  },
  watch: {
    iscollapse() {
      this.iscollapse
        ? ((this.btn_icon = "el-icon-s-unfold"),
          (this.navCenter = { justifyContent: "center" }))
        : ((this.btn_icon = "el-icon-s-fold"), (this.navCenter = ""));
    },
  },
  methods: {
    handleClick() {
      this.iscollapse = !this.iscollapse;
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #f1f1f1;
}
.home {
  width: 100%;
}
.home .el-container {
  height: 88vh;
}
.home .el-container .el-aside ul {
  height: 100%;
}
.home .el-container .el-aside .el-submenu .el-menu-item {
  min-width: 0;
  padding: 0;
}
.home .el-container .el-aside .el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
  background: rgba(58, 132, 251, 0.2) !important;
}
.home .btn-s {
  display: flex;
  justify-content: flex-end;
  background: #f1f1f1;
  padding: 5px 0;
}
</style>