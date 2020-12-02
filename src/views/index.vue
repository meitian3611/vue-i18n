<template>
  <div>
    <!-- header头部导航 -->
    <el-row class="header_nav" type="flex" justify="center" align="middle">
      <el-row
        type="flex"
        class="header-row borderBox"
        justify="space-between"
        align="middle"
        :gutter="20"
      >
        <!-- 导航左侧图标 -->
        <el-row class="header-row-left" type="flex">
          <div class="logo">
            <router-link to="/">
              <img
                src="../../static/images/home/logo.png"
                height="55"
                width="200"
              />
            </router-link>
          </div>
        </el-row>

        <!-- 导航右侧 -->
        <el-row
          class="header-row-right"
          type="flex"
          justify="end"
          align="middle"
        >
          <span>
            <a style="color: #fff">{{ user.deptName }}</a>
          </span>
          <img src="../../static/images/home/shuxian.png" class="line" />

          <img :src="userImageUrl" alt class="header-avatar" />
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ user.fullName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logoutHandler"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 多语言 -->
          <img src="../../static/images/home/shuxian.png" class="line" />
          <el-dropdown @command="handleChange">
            <span class="el-dropdown-link">
              {{ language }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh-CN" style="font-size: 15px"
                >中文</el-dropdown-item
              >
              <el-dropdown-item command="en-US" style="font-size: 15px"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <img src="../../static/images/home/shuxian.png" class="line" />
          <span>
            <a
              style="color: #fff; text-decoration: none"
              href="http://ce.oa.com/products/view/2301"
              target="_blank"
              >{{ $t("m.name") }}</a
            >
          </span>
        </el-row>
      </el-row>
    </el-row>
    <!-- 导航内容 -->
    <el-row
      class="header_navbottom"
      type="flex"
      justify="center"
      align="middle"
    >
      <el-row
        type="flex"
        class="header-row borderBox"
        justify="space-between"
        align="middle"
        :gutter="20"
      >
        <el-row class="header-row-left" type="flex">
          <div class="header-link-item" v-for="item in menuData" :key="item.id">
            <router-link
              :to="item.url"
              v-if="item.code !== 'OUTTER_SYSTEM'"
              v-cloak
              >{{ item.name }}</router-link
            >
            <el-row
              class="outter-dropdown"
              v-if="item.code === 'OUTTER_SYSTEM'"
            >
              <span>
                {{ item.name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <div class="ul">
                <div class="li" v-for="itm in item.children" :key="itm.name">
                  <a
                    v-if="isExternalUrl(itm.url)"
                    :href="itm.url"
                    target="_blank"
                    >{{ itm.name }}</a
                  >
                  <router-link v-else :to="itm.url" v-cloak>{{
                    itm.name
                  }}</router-link>
                </div>
              </div>
            </el-row>
            <!-- <el-dropdown v-if="item.code === 'OUTTER_SYSTEM'">
              <span class="el-dropdown-link">
                {{item.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="itm in item.children" :key="itm.name">
                  <router-link :to="itm.url" v-cloak>{{itm.name}}</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
          </div>
        </el-row>
      </el-row>
    </el-row>

    <!-- content -->
    <div class="content borderBox">
      <div class="container_left" id="content-wrapper">
        <div class="content_img">
          <img style="width: 100%" src="../../static/images/home/11.png" />
        </div>
        <el-row class="panel-group" type="flex">
          <router-link
            v-for="item in navList"
            :key="item.title"
            :to="item.path"
            :style="{ backgroundColor: item.background }"
            class="card-panel-col"
          >
            <el-row
              class="card-panel-opacity"
              :style="{
                background: 'url(' + item.src + ') no-repeat center/contain',
              }"
            ></el-row>
            <img :src="item.src" />
            <el-row class="card-panel-title">{{ item.title }}</el-row>
          </router-link>
          <!-- <router-link :to="{ path: 'Budgeting' }" class="card-panel-col one">
              <img src="/static/images/home/icon_grzx@2x.png" />
              <el-row class="card-panel-title">预算调整</el-row>
          </router-link>-->
        </el-row>
        <!-- 公告 -->
        <div class="msg-cont">
          <el-row
            class="title-item"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <div class="title-left flexRow">
              <img src="/static/images/home/icon_gg@2x.png" />
              <p>公告</p>
            </div>
          </el-row>
          <div class="msg-data-cont">
            <el-row :gutter="20">
              <el-col :span="12">
                <div
                  class="msg-item flexRow"
                  v-for="item in msgDataLeft"
                  :key="item.id"
                >
                  <p class="msg-icon"></p>
                  <p class="msg-title ellipsis" :title="item.name">
                    <template v-if="item.url">
                      <a :href="item.url" target="_blank">{{ item.name }}</a>
                    </template>
                    <template v-else>{{ item.name }}</template>
                  </p>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="msg-item flexRow"
                  v-for="item in msgDataRight"
                  :key="item.id"
                >
                  <p class="msg-icon"></p>
                  <p class="msg-title ellipsis" :title="item.name">
                    {{ item.name }}
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 预算接口人 -->
        <div class="msg-cont">
          <el-row
            class="title-item"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <div class="title-left flexRow">
              <img src="/static/images/home/icon_ysjkr@2x.png" />
              <p>推广费接口人</p>
            </div>
          </el-row>
          <div class="help-data-cont">
            <el-row :gutter="2">
              <el-col :span="12">
                <div
                  class="msg-item flexRow"
                  v-for="item in navFirData"
                  :key="item.id"
                >
                  <p class="jkr-icon"></p>
                  <p class="msg-title ellipsis" :title="item.name">
                    {{ item.name }}
                  </p>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="msg-item flexRow"
                  v-for="item in navSecData"
                  :key="item.index"
                >
                  <p class="jkr-icon"></p>
                  <p class="msg-title ellipsis" :title="item.name">
                    {{ item.name }}
                  </p>
                </div>
              </el-col>
              <!-- <el-col :span="8">
                <div class="msg-item flexRow" v-for="item in navTirData" :key="item.id">
                  <p class="jkr-icon"></p>
                  <p class="msg-title ellipsis" :title="item.name">{{item.name}}</p>
                </div>
              </el-col>-->
            </el-row>
          </div>
        </div>
      </div>
      <!-- <side-nav :todoCount="todoCount" class="container_right" /> -->
    </div>
    <!-- 页脚 -->
    <div class="footer">
      <p>Copyright © 1998 - 2019 Tencent. All Rights Reserved.</p>
      <p>腾讯公司 财经线-S系统财务管理 技术支持：IT热线-财经系统支持(8001)</p>
    </div>
  </div>
</template>


<script>
// import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      // side nav
      todoCount: 0,

      // 小方块
      navList: [
        {
          path: {
            path: "config",
          },
          src: "../../static/images/home/icon_ystz@2x.png",
          title: "预算调整",
          background: "#69A6FF",
          backgroundImage: "../../static/images/home/icon_ystz@2x.png",
        },
        {
          path: {
            path: "Budgeting/BgtDataAppend",
          },
          src: "/static/images/home/icon_yszj@2x.png",
          title: "预算追加",
          background: "#36C2CF",
          backgroundImage: "/static/images/home/icon_ystz@2x.png",
        },
        {
          path: {
            path: "CreateProject/ProjectFillinMarketing",
          },
          src: "/static/images/home/icon_lx@2x.png",
          title: "立项",
          background: "#FFB95F",
          backgroundImage: "/static/images/home/icon_lx@2x.png",
        },
        {
          path: {
            path: "CloseProject/CloseProjectSearch",
          },
          src: "/static/images/home/icon_jx@2x.png",
          title: "结项",
          background: "#67D36F",
          backgroundImage: "/static/images/home/icon_jx@2x.png",
        },
        {
          path: {
            path: "CommonQuery",
          },
          src: "/static/images/home/icon_cycx@2x.png",
          title: "常用查询",
          background: "#739BFF",
          backgroundImage: "/static/images/home/icon_cycx@2x.png",
        },
      ],

      // 用户信息
      user: {
        //name: "momo.zxy"
      },
      //头像地址
      userImageUrl: "",
      // 代办数量
      number: 5,
      //同意、驳回选中
      isShow: false,

      //菜单
      menuData: [],

      currentIndex: 0,
      timer: "",
      activeName: "",

      // 重要公告
      msgDataLeft: [
        {
          name: "MBA系统7.1 CDG上线！推广目标效果更清晰！戳我看详情!",
          url: "http://km.oa.com/group/smarts/articles/show/382908",
          id: 1,
        },
        {
          name: "其他BG 8.8上线（WPC系统的业务除外），尽请期待",
          id: 2,
        },
        {
          name: "立项必看 之 如何选对资源类型？戳我看详情!",
          url:
            "http://km.oa.com/group/29461/articles/show/383515?ts=1561481443",
          id: 3,
        },
      ],
      msgDataRight: [
        {
          name: "立项必看 之 衡量的效果指标都是什么？尽请期待",
          id: 4,
        },
      ],
      // 帮助文档三栏
      navFirData: [
        {
          name: "IEG：cathyxu(徐璇)、mingmyang(杨鸣) ",
          id: 1,
        },
        {
          name: "WXG：mingmyyang(杨洺)、melodyzhou(周小平)",
          id: 2,
        },
        {
          name: "CDG-FIT：royyingluo(罗盈)、astridliu(刘馨)",
          id: 3,
        },
        {
          name: "CDG-IBG：fionaqhe(贺茜)",
          id: 4,
        },
        {
          name: "CDG-AMS：sylvialyang(杨柳)",
          id: 5,
        },
      ],
      navSecData: [
        {
          name: "CDG-其他：janetyen(颜宁)、amandaycliu(刘钰纯)",
          index: 1,
        },
        {
          name: "PCG：lilylizhu(朱李)、bellayxwang(王玉雪)、traceyhuang(黄莹)",
          index: 2,
        },
        {
          name: "CSIG：bingbfyuan(袁炳璠)",
          index: 3,
        },
        {
          name: "TEG：candyyhuang(黄秀钿)",
          index: 4,
        },
        {
          name: "S线：irenelzhou(周琳)、cathiehuang(黄瀛婵)、riachen(陈慧琴)",
          id: 5,
        },
      ],
      navTirData: [],
      name: "new",
      total: 0,
      tableData: [],
      tableDataTabs: [],
      projectId: "",
      projectCode: "",
      sheetCode: "",
      actionAggree: "AGREE",
      actionReject: "REJECT",
      dialogFormVisible: false,
      dialogActive: "",
      operateParam: {
        message: "",
      },
      currentStatusType: {
        Processing: "处理中",
        WaitSubmit: "待提交",
        WaitApproval: "财管审批",
        WaitAdminApproval: "管理员审批",
        Finish: "完成",
      },
      bgtCategoryType: {
        Annual: "年度编制",
        Middle: "年中Review",
        Append: "预算追加",
        Move: "预算调整",
      },
      enabledFlagType: {
        N: { enabledFlag: "失效", type: "info" },
        Y: { enabledFlag: "生效", type: "primary" },
      },
      projectType: {
        Claimed: "立项",
        Completed: "结项",
        Budget: "预算",
      },
      listQuery: {
        taskStatus: "Claimed",
        pager: {
          pageIndex: 1,
          pageSize: 1,
        },
      },
      tableLoading: false,
      passLoading: false,
      language: "中文",
    };
  },
  methods: {
    handleChange(item) {
      this.$i18n.locale = item;
      // this.$store.state.locale = item;
      if (item == "en-US") {
        this.language = "English";
      } else {
        this.language = "中文";
      }
    },
    //退出登录
    logoutHandler() {
      window.location.href = config.serverHost() + "logout";
      // this.$router.push("/")
    },
    isExternalUrl(url) {
      return isExternal(url);
    },
  },
};

//数组对象排序
function reserved(array) {
  return array.sort(function (a, b) {
    var x = a["order"];
    var y = b["order"];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
</script>

<style lang="scss" >
$pageWidth: 1200px;

body {
  width: 100%;
  height: 100%;
  margin: 0;
}
/*boxSizing 可继承类*/
.borderBox {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.flexRowTop {
  display: flex;
}

/*flex组 可继承类*/
.flexRow {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

/*头部header*/
.header_nav {
  width: 100%;
  height: 70px;
  background: #3a84fb;
}
.header_navbottom {
  width: 100%;
  height: 45px;
  background: #246bdd;
  margin-bottom: 10px;
}
.outter-dropdown {
  position: relative;
  .ul {
    display: none;
    position: absolute;
    left: 0;
    bottom: 0px;
    transform: translateY(100%);
    width: 100%;
    background: #3a84fb;
    line-height: 45px;
    // border-radius: 4px;
  }
  .li {
    text-indent: 10px;
  }
  .li:not(:nth-last-of-type(1)) {
    border-bottom: 1px solid #ccc;
  }
  .li:hover {
    background: #246bdd;
  }
}
.header-link-item:hover .ul {
  display: block;
}

.header-row {
  width: $pageWidth;
  height: 100%;
  color: #fff;
}

/*header left*/
.header-row-left {
  align-items: center;
  .logo {
    margin-right: 25px;
  }
  .header-link-item {
    line-height: 45px;
    cursor: pointer;
    padding: 0 25px;
  }
}
/*header middle*/
.header-row-middle .el-col {
  cursor: pointer;
}

/*header right*/
.header-row-right img {
  cursor: pointer;
}

.header-avatar {
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 30px;
  margin: 0 5px;
}
.line {
  width: 20px;
  height: 30px;
}
/*content*/
.content {
  width: $pageWidth;
  height: auto;
  background: #fff;
  padding: 21px;
  margin: 0 auto 0;
  display: flex;
}
/* 内容区域 */
.container_left {
  flex: 1;
}
.container_right {
  width: 180px;
  margin-left: 15px;
}

/*页脚*/
.footer {
  width: 100%;
  height: auto;
}

.footer p {
  width: 100%;
  height: 20px;
  text-align: center;
  color: #777;
  font-size: 12px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
}

.el-icon-arrow-down {
  color: #ffffff;
  font-size: 14px;
}

[v-cloak] {
  display: none;
}
// router_card
.panel-group {
  margin-top: 18px;
  font-size: 12px;
  height: 88px;
  color: #fff;
  .card-panel- {
    &col {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      margin-right: 20px;
      border-radius: 4px;
      overflow: hidden;
    }
    &col:nth-last-of-type(1) {
      margin-right: 0;
    }
    &opacity {
      position: absolute;
      left: 50%;
      top: 28px;
      transform: translateX(-50%);
      width: 88px;
      height: 100%;
      opacity: 0.1;
    }
    &title {
      padding-top: 5px;
    }
  }
}

/*公告*/
.msg-cont {
  margin-top: 10px;
  margin-bottom: 50px;
}
.msg-cont_card {
  margin: 4px;
  font-size: 14px;
  color: #515151;
}
.gr span {
  font-size: 14px;
  color: #246bdd;
}
.msg-cont_card .title-item img {
  width: 23px;
  height: 23px;
}
.msg-cont img {
  width: 19px;
  height: 19px;
  margin-bottom: 4px;
  margin-right: 4px;
}
.msg-data-cont,
.msg-item {
  width: 100%;
}
.msg-item {
  height: 40px;
  justify-content: flex-start;
  -ms-align-items: center;
  align-items: center;
}
.msg-icon {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: #2c75ec;
  margin-right: 8px;
}
.jkr-icon {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: #c9c9c9;
  margin-right: 8px;
}
.help {
  height: 24px;
  line-height: 24px;
}
.ithelp_icon {
  width: 4px;
  height: 4px;
  background: #2c75ec;
  display: inline-block;
  border-radius: 4px;
  margin: 4px;
}
.msg-title {
  font-size: 14px;
}

/*信息头*/
.title-item {
  height: 40px;
  border-bottom: 1px solid #2c75ec;
  margin-bottom: 10px;
}

.title-left {
  font-weight: bold;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.title-left span {
  color: #f35747;
}

.title-right {
  color: #3a84fb;
  cursor: pointer;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.title-right img {
  width: auto;
  height: 12px;
  margin: 2px 0 0 4px;
}
.right_card {
  width: 180px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 1px;
}
.card1 {
  margin-bottom: 30px;
}
.font_color {
  color: #3a84fb;
  font-size: 16px;
}
</style>
