(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const v={class:"container ivu-p"},V={class:"dialog"},h={class:"dialog-item-main"},w={class:"question ivu-mt"},_=Vue.defineComponent({__name:"App",setup(p){const n=Vue.ref(""),l=Vue.ref(!1),t=Vue.ref([]),e=Vue.ref(!0),o=Vue.ref(null);Vue.onMounted(async()=>{if(!window.ai){console.log("不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"),t.value.push({id:t.value.length+1,role:"ai",text:"不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"});return}const i=await window.ai.canCreateTextSession();if(i==="readily")console.log("模型已经准备好了"),o.value=window.ai.createTextSession(),e.value=!1;else if(i==="after-download"){console.log("模型正在下载中"),t.value.push({id:t.value.length+1,role:"ai",text:"模型正在下载中"});return}else{console.log("模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"),t.value.push({id:t.value.length+1,role:"ai",text:"模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"});return}});async function u(){if(l.value||n.value==="")return;l.value=!0;const i=n.value;n.value="",t.value.push({id:t.value.length+1,role:"me",text:i});const r=t.value.length+1;t.value.push({id:r,role:"ai",text:"AI 思考中..."});const c=t.value.find(s=>s.id===r);if(!o.value){console.log("session 不存在");return}console.log(t.value,"dialogs.value");const f=(await o.value).promptStreaming(i);c.text="";let d=0;for await(const s of f){const a=s.slice(d);d=s.length,c.text+=a}console.log(c.text),l.value=!1}async function m(){if(t.value=[],!o.value){console.log("session 不存在");return}(await o.value).destroy(),o.value=window.ai.createTextSession()}return(i,r)=>{const c=Vue.resolveComponent("Input"),f=Vue.resolveComponent("Button"),d=Vue.resolveComponent("Col"),s=Vue.resolveComponent("Row");return Vue.openBlock(),Vue.createElementBlock("div",v,[Vue.createElementVNode("div",V,[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(t.value,(a,g)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:g,class:Vue.normalizeClass(["dialog-item",{"dialog-item-me":a.role==="me","dialog-item-ai":a.role==="ai"}])},[Vue.createElementVNode("div",h,Vue.toDisplayString(a.text),1)],2))),128))]),Vue.createElementVNode("div",w,[Vue.createVNode(c,{modelValue:n.value,"onUpdate:modelValue":r[0]||(r[0]=a=>n.value=a),type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"输入你的问题"},null,8,["modelValue"]),Vue.createVNode(s,{class:"ivu-mt"},{default:Vue.withCtx(()=>[Vue.createVNode(d,null,{default:Vue.withCtx(()=>[Vue.createVNode(f,{type:"primary",size:"large",icon:"md-send",disabled:e.value,loading:l.value,onClick:u},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 发送 ")]),_:1},8,["disabled","loading"])]),_:1}),Vue.createVNode(d,null,{default:Vue.withCtx(()=>[Vue.createVNode(f,{size:"large",class:"ivu-ml",icon:"md-add",disabled:l.value||e.value,onClick:m},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 新对话 ")]),_:1},8,["disabled"])]),_:1})]),_:1})])])}}}),x=(p,n)=>{const l=p.__vccOpts||p;for(const[t,e]of n)l[t]=e;return l},y=x(_,[["__scopeId","data-v-a9f3f209"]]);console.log();Vue.createApp(y).use(ViewUIPlus).mount("#app");
