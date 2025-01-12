import { _ as _export_sfc, o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app-657f6655.js";
let script;
const _sfc_main = {
  mounted() {
    script = require("busuanzi.pure.js");
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        script.fetch();
      }
    }
  }
};
const _hoisted_1 = { class: "busuanzi" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
    createStaticVNode('<span id="busuanzi_container_site_pv" style="display:none;"> 本站总访问量 <span id="busuanzi_value_site_pv"></span>次 <span class="post-meta-divider">|</span></span><span id="busuanzi_container_site_uv" style="display:none;"> 本站访客数 <span id="busuanzi_value_site_uv"></span>人 </span>', 2)
  ]));
}
const VisitorRecord = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "VisitorRecord.vue"]]);
export {
  VisitorRecord as default
};
