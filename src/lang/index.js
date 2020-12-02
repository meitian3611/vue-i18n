import Vue from "vue"
import VueI18n from "vue-i18n"
import LangZh from "./zh.json"  //自定义中文语言包
import LangEn from "./en.json"  //自定义英文语言包
import enLocale from 'element-ui/lib/locale/lang/en'        //element-ui英文语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'     //element-ui中文语言包

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale:"zh-CN",
    messages: {
        "zh-CN": {
            ...LangZh,
            ...zhLocale
        },
        "en-US": {
            ...LangEn,
            ...enLocale
        }
    }
})

export default i18n