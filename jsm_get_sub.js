const $ = API("JSM", true); // API("APP") --> 无log输出


// 预留的空对象, 便于函数之间读取数据
let user = {};

// bark 推送
//user.bark_url = `https://api.day.app/aDM8YW6EEmNdv2MFvChEhc/Copy%20SubLink?copy=`;   // + user.v2Sub;
user.bark_url = `https://api.day.app/aDM8YW6EEmNdv2MFvChEhc/`;   



user.perpetual_url = "https://jsmvpn.com/";
user.userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36`;

//注册登录headers
const h = {
    'X-Requested-With' : `XMLHttpRequest`,
    'Connection' : `keep-alive`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'Content-Type' : `application/x-www-form-urlencoded; charset=UTF-8`,
    'Origin' : user.origin_url,
    'User-Agent' : user.userAgent,
    'Host' : user.host,
    'Referer' : user.register_url,
    'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
    'Accept' : `application/json, text/javascript, */*; q=0.01`
};


// 修改email注册新账号
const b = `email=xxooxxoofzyxlb%40gmail.com&name=zxcv&passwd=zxcvbnm123&repasswd=zxcvbnm123&code=0`;






//获取最新注册地址和其他url
function getUrl() {
    return $.http.get({
        url: user.perpetual_url,
    })
    .then((resp) => {
        const body = resp.body;
        user.origin_url = body.match(/<a[^>]*href=['"]([^"]*)['"][^>]*>用户中心<\/a>/)[1];
        user.host = user.origin_url.match(/https?:\/\/(.*)['\/]/)[1];
        user.register_url = user.origin_url + `auth/register`;
        user.u_url = user.origin_url + `user`;
        user.login_url = user.origin_url + `auth/login`;
        user.logout_url = user.origin_url + `user/logout`;
        //$.log(body);   
    })
    .catch((e) => {
        $.error("000000000000 getUrl error 0000000000000");
        $.error(e)
    })
};


//注册
function register() {
    return $.http.post({
        url: user.register_url,
        headers: h,
        body: b,
        //body: `email=${encodeURIComponent($.uid)}&name=${encodeURIComponent($.n)}&passwd=${encodeURIComponent($.pwd)}&repasswd=${encodeURIComponent($.repwd)}&code=0`
    })
    .then((resp) => {
        const body = JSON.parse(resp.body);
        //$.log(body.msg)  直接console.log(unicode)也可以看到中文
        const m = decodeURIComponent(body.msg);  //unicode转中文  
        $.log("000000000000 register 0000000000000");
        $.log(m);
    })
    .catch((e) => {
        $.error("000000000000 register error 0000000000000");
        $.error(e);
    })
}

//登录获取cookies
function getCookies() {
    return $.http.post({
        url: user.login_url,
        headers: h,
        body: b,
    })
    .then((resp) => {
        const cookies = resp.headers["set-cookie"];
        //$.log(cookies);
        var c = "";
        for (var i = 0; i < cookies.length; i++) {
            c = c + cookies[i].split(" ")[0];
        };
        user.cookies = c;
        $.log("000000000000 getCookies 0000000000000");
        $.log(user.cookies);
        //$.log(body);
    })
    .catch((e) => {
        $.error("000000000000 getCookies error 0000000000000");
        $.error(e);
    })
};



//获取订阅链接
function getSub() {
    var headers = {     //user页面headers单独设置
        //'Cookie' : `email=0000000%40qq.com; expire_in=1664644060; ip=bcxxxxxxxx; key=ffxxxxxx; uid=9xxxx; PHPSESSID=axxxxxxx; lang=zh-cn`,
        'Cookie' : user.cookies,
        'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
        'Connection' : `keep-alive`,
        'Referer' : user.register_url,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Host' : user.host,
        'User-Agent' : user.userAgent,
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
    };
    //$.log(headers)
    return $.http.get({
        url: user.u_url,
        headers: headers,
    })
    .then((resp) => {
        user.v2Sub = resp.body.match(/<a[^>]*data-clipboard-text=['"]([^"]*)['"]><[^>]*malio-v2rayng">/)[1];
        $.log("000000000000 getSub 0000000000000");
        $.log(user.v2Sub);
        $.notify("JsmGetSub", "SubLink", user.v2Sub, {
            "open-url": user.v2Sub,
        });
    })
    .catch((e) => {
        $.error("000000000000 getSub error 0000000000000");
        $.error(e);
    })
}


//logout
function logout() {
    var headers = {     //user页面headers单独设置
        'Cookie' : user.cookies,
        'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
        'Connection' : `keep-alive`,
        'Referer' : user.register_url,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Host' : user.host,
        'User-Agent' : user.userAgent,
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
    };
    return $.http.get({
        url: user.logout_url,
        headers: headers,
    })
    .then((resp) => {
        const body = resp;
        //$.log(body);
        $.log("000000000000 logout 0000000000000");
        $.log("退出登录成功")
    })
    .catch((e) => {
        $.error("000000000000 logout error 0000000000000");
        $.error(e);
    })
}

//bark 推送
function bark() {
    return $.http.get({
        url: user.bark_url + encodeURIComponent(user.v2Sub),
    })
    .then((resp) => {
        const body = JSON.parse(resp.body).message;
        //$.log(body);
        $.log("000000000000 bark 0000000000000");
        $.log(body)
    })
    .catch((e) => {
        $.error("000000000000 bark error 0000000000000");
        $.error(e);
    })
}



!(async () => {
    await getUrl();
    await logout();
    await register();
    await getCookies();
    await getSub();
    await logout();
    await bark();
/*     $.log(user)
    $.log(user.host) */
})().finally(() => $.done());







// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isScriptable:n,isNode:o}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(l=>u[l.toLowerCase()]=(u=>(function(u,l){l="string"==typeof l?{url:l}:l;const h=e.baseURL;h&&!r.test(l.url||"")&&(l.url=h?h+l.url:l.url);const a=(l={...e,...l}).timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...l.events};let f,d;if(c.onRequest(u,l),t)f=$task.fetch({method:u,...l});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[u.toLowerCase()](l,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){const e=new Request(l.url);e.method=u,e.headers=l.headers,e.body=l.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const p=a?new Promise((e,t)=>{d=setTimeout(()=>(c.onTimeout(),t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)),a)}):null;return(p?Promise.race([p,f]).then(e=>(clearTimeout(d),e)):f).then(e=>c.onResponse(e))})(l,u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||n)&&$persistentStore.write(e,this.name),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);o&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",l="",h={}){const a=h["open-url"],c=h["media-url"];if(s&&$notify(e,t,l,h),n&&$notification.post(e,t,l+`${c?"\n多媒体:"+c:""}`,{url:a}),i){let s={};a&&(s.openUrl=a),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,l):$notification.post(e,t,l,s)}if(o||u){const s=l+(a?`\n点击跳转: ${a}`:"")+(c?`\n多媒体: ${c}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e):o&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}
/*****************************************************************************/
