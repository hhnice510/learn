const $ = API("JSM", true); // API("APP") --> 无log输出
let user = {};

const url = `https://jsmao.org/user`
const headers = {
    'Cookie' : `email=273728828%40qq.com; expire_in=1664644060; ip=bc8085d049fee98b79591747e1873e1a; key=ffbcd00905b48d9bcbf242e968adea258a07581b7c54b; uid=92764; PHPSESSID=ajbf51d00ulbrjg97pkktrkgk5; lang=zh-cn`,
    'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
    'Connection' : `keep-alive`,
    'Referer' : `https://jsmao.org/auth/register`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'Host' : `jsmao.org`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Mobile/15E148 Safari/604.1`,
    'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
};

const cookies = [
    "uid=98366; expires=Sun, 02-Oct-2022 16:25:23 GMT; Max-Age=86400; path=/",
    "email=qqqhxhjds%40gmail.com; expires=Sun, 02-Oct-2022 16:25:23 GMT; Max-Age=86400; path=/",
    "key=4ee15177290bf50f36d020105efc3372091080d6f65e9; expires=Sun, 02-Oct-2022 16:25:23 GMT; Max-Age=86400; path=/",
    "ip=762c1f222d7dd57dc2e09bfe1ee0395d; expires=Sun, 02-Oct-2022 16:25:23 GMT; Max-Age=86400; path=/",
    "expire_in=1664727923; expires=Sun, 02-Oct-2022 16:25:23 GMT; Max-Age=86400; path=/"
];
    
function get() {
    return $.http.get({
        url,
        headers,
    })
    .then((resp) => {
        const body = resp.body.match(/<a[^>]*data-clipboard-text=['"]([^"]*)['"]><[^>]*malio-v2rayng">/)[1];
        //re = /<a[^>]*data-clipboard-text=['"]([^"]*)['"]><[^>]*malio-v2rayng">/
        $.log(body);
    })
}

!(async () => {
    //await get();
    var c = "";
    for (var i = 0; i < cookies.length; i++) {
        c = c + cookies[i].split(" ")[0]
    }
    $.log(c)
/*     uid = cookies[0].split(" ")[0]
    $.log(uid) */
})().finally(() => {$.done()});






$.done();




// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isScriptable:n,isNode:o}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(l=>u[l.toLowerCase()]=(u=>(function(u,l){l="string"==typeof l?{url:l}:l;const h=e.baseURL;h&&!r.test(l.url||"")&&(l.url=h?h+l.url:l.url);const a=(l={...e,...l}).timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...l.events};let f,d;if(c.onRequest(u,l),t)f=$task.fetch({method:u,...l});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[u.toLowerCase()](l,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){const e=new Request(l.url);e.method=u,e.headers=l.headers,e.body=l.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const p=a?new Promise((e,t)=>{d=setTimeout(()=>(c.onTimeout(),t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)),a)}):null;return(p?Promise.race([p,f]).then(e=>(clearTimeout(d),e)):f).then(e=>c.onResponse(e))})(l,u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||n)&&$persistentStore.write(e,this.name),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);o&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",l="",h={}){const a=h["open-url"],c=h["media-url"];if(s&&$notify(e,t,l,h),n&&$notification.post(e,t,l+`${c?"\n多媒体:"+c:""}`,{url:a}),i){let s={};a&&(s.openUrl=a),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,l):$notification.post(e,t,l,s)}if(o||u){const s=l+(a?`\n点击跳转: ${a}`:"")+(c?`\n多媒体: ${c}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e):o&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}
/*****************************************************************************/








/* email=273728828%40qq.com; 2
expire_in=1664644060; 5
//ip=bc8085d049fee98b79591747e1873e1a; 4
key=ffbcd00905b48d9bcbf242e968adea258a07581b7c54b; 3
uid=92764; 1
//PHPSESSID=ajbf51d00ulbrjg97pkktrkgk5; 
//lang=zh-cn */




