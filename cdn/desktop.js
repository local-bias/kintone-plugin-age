(()=>{"use strict";(()=>{const e=JSON.parse('{"u2":{"ja":"年齢自動計算プラグイン"}}').u2.ja;const t=class{_pluginId;constructor(e){this._pluginId=e}launch=t=>{for(const n of t){const{enables:t=(()=>!0),events:r=["app.record.index.show"],action:o,disableMobile:s=!1}=n,i="function"==typeof r?r(this._pluginId):r,c=s?[]:i.map((e=>"mobile."+e)),a=n=>{try{return t(n)?o(n,this._pluginId):n}catch(t){n.error=`プラグイン「${e}」の処理内でエラーが発生しました。`}return n};kintone.events.on([...i,...c],a)}}},n=e=>{const t=kintone.plugin.app.getConfig(e);return Object.keys(t).length?Object.entries(t).reduce(((e,[t,n])=>({...e,[t]:JSON.parse(n)})),{}):r()},r=()=>({rows:[o()]}),o=()=>({src:"",dst:"",updates:!1}),s={events:["app.record.create.show","app.record.edit.show","app.record.index.edit.show"],action:async(e,t)=>{const r=n(t);if(!r||!r.rows.length)return e;window.AGE_PLUGIN=window.AGE_PLUGIN||{},window.AGE_PLUGIN.initialValues=[];for(const{src:t,dst:n}of r.rows)e.record[n].disabled=!0,window.AGE_PLUGIN.initialValues.push(e.record[t].value);return e}},i={events:["app.record.index.edit.submit","app.record.create.submit","app.record.edit.submit"],action:async(e,t)=>{const r=n(t);if(!r||!r.rows.length||!window.AGE_PLUGIN)return e;for(let t=0;t<r.rows.length;t++){const{src:n,dst:o,updates:s}=r.rows[t],i=window.AGE_PLUGIN.initialValues[t];if(!s&&(i||e.record[o].value))continue;const a=e.record[n].value;if(!a){e.record[o].value="";continue}const d=c(new Date(a));e.record[o].value=isFinite(d)?d:NaN}return e}},c=e=>{const t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date,s=o.getFullYear(),i=o.getMonth(),c=o.getDate(),a=s-t;return i>n||i===n&&c>=r?a:a-1};var a;a=kintone.$PLUGIN_ID,new t(a).launch([s,i])})()})();