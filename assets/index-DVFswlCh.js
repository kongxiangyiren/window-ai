(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const _={class:"container ivu-p"},w={class:"dialog"},y=["innerHTML"],x={class:"question ivu-mt"},b=Vue.defineComponent({__name:"App",setup(m){const c=markdownit(),l=Vue.ref(""),i=Vue.ref(!1),e=Vue.ref([]),t=Vue.ref(!0),a=Vue.ref(null);Vue.onMounted(async()=>{if(!window.ai){console.log("不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"),e.value.push({id:e.value.length+1,role:"ai",text:"不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"});return}const s=await window.ai.canCreateTextSession();if(s==="readily")console.log("模型已经准备好了"),a.value=window.ai.createTextSession(),t.value=!1;else if(s==="after-download"){console.log("模型正在下载中"),e.value.push({id:e.value.length+1,role:"ai",text:"模型正在下载中"});return}else{console.log("模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"),e.value.push({id:e.value.length+1,role:"ai",text:"模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"});return}});async function v(){if(i.value||l.value==="")return;i.value=!0;const s=l.value;l.value="",e.value.push({id:e.value.length+1,role:"me",text:s});const u=e.value.length+1;e.value.push({id:u,role:"ai",text:"AI 思考中..."});const p=e.value.find(n=>n.id===u);if(!a.value){console.log("session 不存在");return}console.log(e.value,"dialogs.value");const d=(await a.value).promptStreaming(s);p.text="";let o=0;for await(const n of d){const r=n.slice(o);o=n.length,p.text+=r,hljs.highlightAll()}console.log(p.text),h(),i.value=!1}async function V(){if(e.value=[],!a.value){console.log("session 不存在");return}(await a.value).destroy(),a.value=window.ai.createTextSession()}const f=Vue.ref();function h(){var d;const s=`<div class="codecopy-btn" data-title="复制" data-clipboard-action="copy" data-clipboard-target="#code_index" onclick="let t=this;t.innerHTML='复制成功';setTimeout(function(){t.innerHTML='复制';},1500);">复制</div>`;if(!f.value[f.value.length-1])return;const u=f.value[f.value.length-1].getElementsByTagName("pre");for(let o=0;o<u.length;o++){const n=u[o],r=s.replace(/index/g,o+"");if(((d=n.querySelector("code"))==null?void 0:d.nodeName)=="CODE"){n.querySelector("code").id="code_"+o;const g=n.innerHTML+r;n.innerHTML=g}}new ClipboardJS(".codecopy-btn").on("error",function(o){console.log(o)})}return(s,u)=>{const p=Vue.resolveComponent("Input"),d=Vue.resolveComponent("Button"),o=Vue.resolveComponent("Col"),n=Vue.resolveComponent("Row");return Vue.openBlock(),Vue.createElementBlock("div",_,[Vue.createElementVNode("div",w,[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(e.value,(r,g)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:g,class:Vue.normalizeClass(["dialog-item",{"dialog-item-me":r.role==="me","dialog-item-ai":r.role==="ai"}])},[Vue.createElementVNode("div",{class:"dialog-item-main",ref_for:!0,ref_key:"preview",ref:f,innerHTML:Vue.unref(c).render(r.text)},null,8,y)],2))),128))]),Vue.createElementVNode("div",x,[Vue.createVNode(p,{modelValue:l.value,"onUpdate:modelValue":u[0]||(u[0]=r=>l.value=r),type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"输入你的问题"},null,8,["modelValue"]),Vue.createVNode(n,{class:"ivu-mt"},{default:Vue.withCtx(()=>[Vue.createVNode(o,null,{default:Vue.withCtx(()=>[Vue.createVNode(d,{type:"primary",size:"large",icon:"md-send",disabled:t.value,loading:i.value,onClick:v},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 发送 ")]),_:1},8,["disabled","loading"])]),_:1}),Vue.createVNode(o,null,{default:Vue.withCtx(()=>[Vue.createVNode(d,{size:"large",class:"ivu-ml",icon:"md-add",disabled:i.value||t.value,onClick:V},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 新对话 ")]),_:1},8,["disabled"])]),_:1})]),_:1})])])}}}),C=(m,c)=>{const l=m.__vccOpts||m;for(const[i,e]of c)l[i]=e;return l},N=C(b,[["__scopeId","data-v-10446d9f"]]);console.log();Vue.createApp(N).use(ViewUIPlus).mount("#app");