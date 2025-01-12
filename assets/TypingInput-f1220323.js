import { _ as _export_sfc, o as openBlock, c as createElementBlock, b as createBaseVNode, n as normalizeStyle, f as createCommentVNode } from "./app-657f6655.js";
const TypingInput_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      typedText: "",
      showTypingEffect: false,
      typingTimeout: null,
      cursorPosition: "0"
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const inputText = this.text;
      for (let i = 0; i < inputText.length; i++) {
        setTimeout(() => {
          this.typedText = inputText.substr(0, i + 1);
          this.cursorPosition = `calc(${(i + 1) * 100}% - 1px)`;
        }, i * 150);
      }
      setTimeout(() => {
        this.showTypingEffect = false;
      }, inputText.length * 100);
    },
    startTyping() {
      this.typingTimeout = setTimeout(() => {
        this.typedText = "";
        this.showTypingEffect = true;
        this.typeText();
      }, 1500);
    },
    stopTyping() {
      clearTimeout(this.typingTimeout);
    }
  }
};
const _hoisted_1 = { class: "typing-input" };
const _hoisted_2 = ["value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode(
      "div",
      {
        class: "input-container",
        onMouseenter: _cache[0] || (_cache[0] = (...args) => $options.startTyping && $options.startTyping(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => $options.stopTyping && $options.stopTyping(...args))
      },
      [
        createBaseVNode("input", {
          ref: "input",
          class: "input-field text-xl",
          type: "text",
          value: $data.typedText,
          disabled: ""
        }, null, 8, _hoisted_2),
        $data.showTypingEffect ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: "typing-cursor",
            style: normalizeStyle({ left: $data.cursorPosition })
          },
          null,
          4
          /* STYLE */
        )) : createCommentVNode("v-if", true)
      ],
      32
      /* NEED_HYDRATION */
    )
  ]);
}
const TypingInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "TypingInput.vue"]]);
export {
  TypingInput as default
};
