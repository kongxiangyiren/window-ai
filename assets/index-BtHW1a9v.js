(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const V={class:"container ivu-p"},h={class:"dialog"},w=["innerHTML"],_={class:"question ivu-mt"},x=Vue.defineComponent({__name:"App",setup(p){const a=markdownit(),o=Vue.ref(""),n=Vue.ref(!1),e=Vue.ref([]),t=Vue.ref(!0),l=Vue.ref(null);Vue.onMounted(async()=>{if(!window.ai){console.log("不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"),e.value.push({id:e.value.length+1,role:"ai",text:"不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"});return}const u=await window.ai.canCreateTextSession();if(u==="readily")console.log("模型已经准备好了"),l.value=window.ai.createTextSession(),t.value=!1;else if(u==="after-download"){console.log("模型正在下载中"),e.value.push({id:e.value.length+1,role:"ai",text:"模型正在下载中"});return}else{console.log("模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"),e.value.push({id:e.value.length+1,role:"ai",text:"模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"});return}});async function f(){if(n.value||o.value==="")return;n.value=!0;const u=o.value;o.value="",e.value.push({id:e.value.length+1,role:"me",text:u});const r=e.value.length+1;e.value.push({id:r,role:"ai",text:"AI 思考中..."});const c=e.value.find(s=>s.id===r);if(!l.value){console.log("session 不存在");return}console.log(e.value,"dialogs.value");const m=(await l.value).promptStreaming(u);c.text="";let d=0;for await(const s of m){const i=s.slice(d);d=s.length,c.text+=i,hljs.highlightAll()}console.log(c.text),n.value=!1}async function g(){if(e.value=[],!l.value){console.log("session 不存在");return}(await l.value).destroy(),l.value=window.ai.createTextSession()}return(u,r)=>{const c=Vue.resolveComponent("Input"),m=Vue.resolveComponent("Button"),d=Vue.resolveComponent("Col"),s=Vue.resolveComponent("Row");return Vue.openBlock(),Vue.createElementBlock("div",V,[Vue.createElementVNode("div",h,[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(e.value,(i,v)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:v,class:Vue.normalizeClass(["dialog-item",{"dialog-item-me":i.role==="me","dialog-item-ai":i.role==="ai"}])},[Vue.createElementVNode("div",{class:"dialog-item-main",innerHTML:Vue.unref(a).render(i.text)},null,8,w)],2))),128))]),Vue.createElementVNode("div",_,[Vue.createVNode(c,{modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=i=>o.value=i),type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"输入你的问题"},null,8,["modelValue"]),Vue.createVNode(s,{class:"ivu-mt"},{default:Vue.withCtx(()=>[Vue.createVNode(d,null,{default:Vue.withCtx(()=>[Vue.createVNode(m,{type:"primary",size:"large",icon:"md-send",disabled:t.value,loading:n.value,onClick:f},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 发送 ")]),_:1},8,["disabled","loading"])]),_:1}),Vue.createVNode(d,null,{default:Vue.withCtx(()=>[Vue.createVNode(m,{size:"large",class:"ivu-ml",icon:"md-add",disabled:n.value||t.value,onClick:g},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 新对话 ")]),_:1},8,["disabled"])]),_:1})]),_:1})])])}}}),y=(p,a)=>{const o=p.__vccOpts||p;for(const[n,e]of a)o[n]=e;return o},C=y(x,[["__scopeId","data-v-ac371c88"]]);console.log();Vue.createApp(C).use(ViewUIPlus).mount("#app");
