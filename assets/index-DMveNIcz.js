(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(o){if(o.ep)return;o.ep=!0;const e=n(o);fetch(o.href,e)}})();const g="window-ai",V=[self.location.hostname,"unpkg.com"],v=a=>{const l=Date.now(),n=new URL(a.url);return n.protocol=self.location.protocol,n.hostname===self.location.hostname&&(n.search+=(n.search?"&":"?")+"cache-bust="+l),n.href};self.addEventListener("activate",a=>{a.waitUntil(self.clients.claim())});self.addEventListener("fetch",a=>{if(V.indexOf(new URL(a.request.url).hostname)>-1){const l=caches.match(a.request),n=v(a.request),t=fetch(n,{cache:"no-store"}),o=t.then(e=>e.clone());a.respondWith(Promise.race([t.catch(e=>l),l]).then(e=>e||t).catch(e=>{})),a.waitUntil(Promise.all([o,caches.open(g)]).then(([e,s])=>e.ok&&s.put(a.request,e)).catch(e=>{}))}});const w={class:"container ivu-p"},_={class:"dialog"},x={class:"dialog-item-main"},y={class:"question ivu-mt"},C=Vue.defineComponent({__name:"App",setup(a){const l=Vue.ref(""),n=Vue.ref(!1),t=Vue.ref([]),o=Vue.ref(!0),e=Vue.ref(null);Vue.onMounted(async()=>{if(!window.ai){console.log("不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"),t.value.push({id:t.value.length+1,role:"ai",text:"不支持AI功能, 请在支持AI功能的浏览器中打开,详情参考：https://github.com/kongxiangyiren/window-ai"});return}const u=await window.ai.canCreateTextSession();if(u==="readily")console.log("模型已经准备好了"),e.value=window.ai.createTextSession(),o.value=!1;else if(u==="after-download"){console.log("模型正在下载中"),t.value.push({id:t.value.length+1,role:"ai",text:"模型正在下载中"});return}else{console.log("模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"),t.value.push({id:t.value.length+1,role:"ai",text:"模型还没下载,详情参考：https://github.com/kongxiangyiren/window-ai"});return}});async function s(){if(n.value||l.value==="")return;n.value=!0;const u=l.value;l.value="",t.value.push({id:t.value.length+1,role:"me",text:u});const c=t.value.length+1;t.value.push({id:c,role:"ai",text:"AI 思考中..."});const d=t.value.find(r=>r.id===c);if(!e.value){console.log("session 不存在");return}console.log(t.value,"dialogs.value");const p=(await e.value).promptStreaming(u);d.text="";let f=0;for await(const r of p){const i=r.slice(f);f=r.length,d.text+=i}console.log(d.text),n.value=!1}async function m(){if(t.value=[],!e.value){console.log("session 不存在");return}(await e.value).destroy(),e.value=window.ai.createTextSession()}return(u,c)=>{const d=Vue.resolveComponent("Input"),p=Vue.resolveComponent("Button"),f=Vue.resolveComponent("Col"),r=Vue.resolveComponent("Row");return Vue.openBlock(),Vue.createElementBlock("div",w,[Vue.createElementVNode("div",_,[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(t.value,(i,h)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:h,class:Vue.normalizeClass(["dialog-item",{"dialog-item-me":i.role==="me","dialog-item-ai":i.role==="ai"}])},[Vue.createElementVNode("div",x,Vue.toDisplayString(i.text),1)],2))),128))]),Vue.createElementVNode("div",y,[Vue.createVNode(d,{modelValue:l.value,"onUpdate:modelValue":c[0]||(c[0]=i=>l.value=i),type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"输入你的问题"},null,8,["modelValue"]),Vue.createVNode(r,{class:"ivu-mt"},{default:Vue.withCtx(()=>[Vue.createVNode(f,null,{default:Vue.withCtx(()=>[Vue.createVNode(p,{type:"primary",size:"large",icon:"md-send",disabled:o.value,loading:n.value,onClick:s},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 发送 ")]),_:1},8,["disabled","loading"])]),_:1}),Vue.createVNode(f,null,{default:Vue.withCtx(()=>[Vue.createVNode(p,{size:"large",class:"ivu-ml",icon:"md-add",disabled:n.value||o.value,onClick:m},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 新对话 ")]),_:1},8,["disabled"])]),_:1})]),_:1})])])}}}),N=(a,l)=>{const n=a.__vccOpts||a;for(const[t,o]of l)n[t]=o;return n},b=N(C,[["__scopeId","data-v-a9f3f209"]]);console.log();Vue.createApp(b).use(ViewUIPlus).mount("#app");
