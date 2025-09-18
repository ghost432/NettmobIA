import{s as Ne,a as se,r as n,c as Q,v as gt,H as Ie,j as e,D as ne,m as ie,n as de,B as W,a5 as jt,i as B,aA as yt,aB as vt,d as V,o as H,w as le,P as A,aq as Ct,ar as bt,a8 as St,a3 as Dt,Q as Te,R as Le,U as Me,X as ze,W as Z,_ as Ve,p as kt,q as $,f as Oe,aC as wt,S as U,ah as It,k as G,l as J,u as Rt,O as Re,t as _t,b as At,ak as Et,M as $t,a0 as Nt,e as Tt,x as Be,y as ce,a2 as N,a7 as _,E as Fe,ax as Lt,C as re,aa as Mt,V as zt,J as Vt,K as Ot,$ as _e,L as Bt,N as Ft,aD as Pt,ae as L}from"./index-B5bgjFPS.js";import{D as qt,A as Ut}from"./AddDocStoreDialog-GuDOo9eQ.js";import{B as Wt}from"./BackdropLoader-Ch3nVEPr.js";import{d as F}from"./documentstore-CRtiIDJT.js";import{I as Ae}from"./InputAdornment-v58Edx4J.js";import{b as Ht}from"./IconSearch-4bUU90FL.js";import{E as Gt}from"./ErrorBoundary-x4bZaoHs.js";import{V as Jt}from"./ViewHeader-t5dVj9Vk.js";import{d as Pe}from"./ExpandMore-BZIzyY2F.js";import{T as qe}from"./Table-CZOZGZoJ.js";import{n as Kt}from"./nodes-Qb-8otVq.js";import{v as Yt}from"./v4-CtRu48qb.js";import{A as Ue,d as We,e as He,M as Xt}from"./MemoizedReactMarkdown-mGWPD7hJ.js";import{u as Qt,C as Zt}from"./ConfirmDialog-Dfe34hOz.js";import{d as Ge}from"./Delete-4D-T7tnN.js";import{d as ea}from"./Edit-CCiZd6ZI.js";import{I as ta}from"./IconRefresh-CtZoTUkg.js";import{I as Ee}from"./IconPlus-j8jP5X4Z.js";import{S as b}from"./Skeleton-DJP3nnUt.js";import"./IconCopy-bbAsun7S.js";import"./StyledFab-DFomU4Vk.js";import"./TooltipWithParser-D26Faoyy.js";import"./index-D--Rb2MU.js";import"./Tooltip-CXmeiPEa.js";import"./unsupportedIterableToArray-Bh0GkvIo.js";import"./toPropertyKey-C9c9JG92.js";const Je=({show:a,dialogProps:r,onCancel:m,onDocLoaderSelected:v})=>{const T=document.getElementById("portal"),S=Ne(),h=se(),[g,c]=n.useState(""),[x,k]=n.useState([]),d=Q(F.getDocumentLoaders),E=l=>{c(l)};function w(l){return l.name.toLowerCase().indexOf(g.toLowerCase())>-1}n.useEffect(()=>{r.documentLoaders&&k(r.documentLoaders)},[r]),n.useEffect(()=>{d.request()},[]),n.useEffect(()=>{d.data&&k(d.data)},[d.data]),n.useEffect(()=>(S(a?{type:gt}:{type:Ie}),()=>S({type:Ie})),[a,S]);const M=a?e.jsxs(ne,{fullWidth:!0,maxWidth:"md",open:a,onClose:m,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(ie,{sx:{fontSize:"1rem",p:3,pb:0},id:"alert-dialog-title",children:r.title}),e.jsxs(de,{sx:{display:"flex",flexDirection:"column",gap:2,maxHeight:"75vh",position:"relative",px:3,pb:3},children:[e.jsx(W,{sx:{backgroundColor:h.palette.background.paper,pt:2,position:"sticky",top:0,zIndex:10},children:e.jsx(jt,{sx:{width:"100%",pr:2,pl:2,position:"sticky"},id:"input-search-credential",value:g,onChange:l=>E(l.target.value),placeholder:"Search",startAdornment:e.jsx(Ae,{position:"start",children:e.jsx(Ht,{stroke:1.5,size:"1rem",color:h.palette.grey[500]})}),endAdornment:e.jsx(Ae,{position:"end",sx:{cursor:"pointer",color:h.palette.grey[500],"&:hover":{color:h.palette.grey[900]}},title:"Clear Search",children:e.jsx(B,{stroke:1.5,size:"1rem",onClick:()=>E(""),style:{cursor:"pointer"}})}),"aria-describedby":"search-helper-text",inputProps:{"aria-label":"weight"}})}),e.jsx(yt,{sx:{width:"100%",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:2,py:0,zIndex:9,borderRadius:"10px",[h.breakpoints.down("md")]:{maxWidth:370}},children:[...x].filter(w).map(l=>e.jsxs(vt,{alignItems:"center",onClick:()=>v(l.name),sx:{border:1,borderColor:h.palette.grey[900]+25,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"start",textAlign:"left",gap:1,p:2},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:"50%",backgroundColor:"white",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:7,borderRadius:"50%",objectFit:"contain"},alt:l.name,src:`${V}/api/v1/node-icon/${l.name}`})}),e.jsx(H,{children:l.label})]},l.name))})]})]}):null;return le.createPortal(M,T)};Je.propTypes={show:A.bool,dialogProps:A.object,onCancel:A.func,onDocLoaderSelected:A.func};const Ke=({show:a,dialogProps:r,onCancel:m,onDelete:v})=>{const T=document.getElementById("portal"),[S,h]=n.useState({}),[g,c]=n.useState(!1),[x,k]=n.useState([]),[d,E]=n.useState([]),w=Q(Kt.getSpecificNode),M=s=>(j,t)=>{const p={...S};p[s]=t,h(p)};n.useEffect(()=>{if(r.recordManagerConfig){const s=r.recordManagerConfig.name;if(s&&w.request(s),r.vectorStoreConfig){const j=r.vectorStoreConfig.name;j&&w.request(j)}}return()=>{h({}),c(!1),k([]),E([])}},[r]),n.useEffect(()=>{if(w.data){const s=Ct.cloneDeep(bt(w.data,Yt()));let j="vectorStoreConfig";s.category==="Record Manager"&&(j="recordManagerConfig");const t=[];for(const p in r[j].config){const f=s.inputParams.find(D=>D.name===p);if(!f||f.type==="credential")continue;let I={};const C=r[j].config[p];C&&(typeof C=="string"&&C.startsWith("{{")&&C.endsWith("}}")||(I={label:f==null?void 0:f.label,name:f==null?void 0:f.name,type:f==null?void 0:f.type,value:C},t.push(I)))}j==="vectorStoreConfig"?k([{label:s.label,name:s.name,category:s.category,id:s.id,paramValues:t}]):j==="recordManagerConfig"&&E([{label:s.label,name:s.name,category:s.category,id:s.id,paramValues:t}])}},[w.data]);const l=a?e.jsxs(ne,{fullWidth:!0,maxWidth:r.recordManagerConfig?"md":"sm",open:a,onClose:m,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(ie,{sx:{fontSize:"1rem",p:3,pb:0},id:"alert-dialog-title",children:r.title}),e.jsxs(de,{sx:{display:"flex",flexDirection:"column",gap:2,maxHeight:"75vh",position:"relative",px:3,pb:3},children:[e.jsx("span",{style:{marginTop:"20px"},children:r.description}),r.type==="STORE"&&r.recordManagerConfig&&e.jsx(St,{control:e.jsx(Dt,{checked:g,onChange:s=>c(s.target.checked)}),label:"Remove data from vector store and record manager"}),g&&e.jsxs("div",{children:[e.jsx(Te,{component:Le,children:e.jsx(Me,{sx:{minWidth:650},"aria-label":"simple table",children:e.jsx(ze,{children:e.jsx(Z,{sx:{"& td":{border:0}},children:e.jsx(Ve,{sx:{pb:0,pt:0},colSpan:6,children:e.jsx(W,{children:[...x,...d].map((s,j)=>e.jsxs(Ue,{expanded:S[s.name]||!0,onChange:M(s.name),disableGutters:!0,children:[e.jsx(We,{expandIcon:e.jsx(Pe,{}),"aria-controls":`nodes-accordian-${s.name}`,id:`nodes-accordian-header-${s.name}`,children:e.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx("div",{style:{width:40,height:40,marginRight:10,borderRadius:"50%",backgroundColor:"white"},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:7,borderRadius:"50%",objectFit:"contain"},alt:s.name,src:`${V}/api/v1/node-icon/${s.name}`})}),e.jsx(H,{variant:"h5",children:s.label})]})}),e.jsx(He,{children:s.paramValues[0]&&e.jsx(qe,{sx:{minWidth:150},rows:s.paramValues,columns:Object.keys(s.paramValues[0])})})]},j))})})})})})}),e.jsx("span",{style:{marginTop:"30px",fontStyle:"italic",color:"#b35702"},children:"* Only data that were upserted with Record Manager will be deleted from vector store"})]})]}),e.jsxs(kt,{sx:{pr:3,pb:3},children:[e.jsx($,{onClick:m,color:"primary",children:"Cancel"}),e.jsx($,{variant:"contained",onClick:()=>v(r.type,r.file,g),color:"error",children:"Delete"})]})]}):null;return le.createPortal(l,T)};Ke.propTypes={show:A.bool,dialogProps:A.object,onCancel:A.func,onDelete:A.func};const Ye=({show:a,dialogProps:r,onCancel:m})=>{const[v,T]=n.useState({}),[S,h]=n.useState(""),g=se(),c=Oe(t=>t.customization),[x,k]=n.useState({}),d=Q(F.getDocumentStoreConfig),E=()=>`With the Upsert API, you can choose an existing document and reuse the same configuration for upserting.

\`\`\`python
import requests
import json

API_URL = "${V}/api/v1/document-store/upsert/${r.storeId}"
API_KEY = "your_api_key_here"

# use form data to upload files
form_data = {
    "files": ('my-another-file.pdf', open('my-another-file.pdf', 'rb'))
}

body_data = {
    "docId": "${r.loaderId}",
    "metadata": {}, # Add additional metadata to the document chunks
    "replaceExisting": True, # Replace existing document with the new upserted chunks
    "createNewDocStore": False, # Create a new document store
    "loaderName": "Custom Loader Name", # Override the loader name
    "splitter": json.dumps({"config":{"chunkSize":20000}}) # Override existing configuration
    # "loader": "",
    # "vectorStore": "",
    # "embedding": "",
    # "recordManager": "",
    # "docStore": ""
}

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}"
}

def query(form_data):
    response = requests.post(API_URL, files=form_data, data=body_data, headers=headers)
    print(response)
    return response.json()

output = query(form_data)
print(output)
\`\`\`

\`\`\`javascript
// use FormData to upload files
let formData = new FormData();
formData.append("files", input.files[0]);
formData.append("docId", "${r.loaderId}");
formData.append("loaderName", "Custom Loader Name");
formData.append("splitter", JSON.stringify({"config":{"chunkSize":20000}}));
// Add additional metadata to the document chunks
formData.append("metadata", "{}");
// Replace existing document with the new upserted chunks
formData.append("replaceExisting", "true");
// Create a new document store
formData.append("createNewDocStore", "false");
// Override existing configuration
// formData.append("loader", "");
// formData.append("embedding", "");
// formData.append("vectorStore", "");
// formData.append("recordManager", "");
// formData.append("docStore", "");

async function query(formData) {
    const response = await fetch(
        "${V}/api/v1/document-store/upsert/${r.storeId}",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer <your_api_key_here>"
            },
            body: formData
        }
    );
    const result = await response.json();
    return result;
}

query(formData).then((response) => {
    console.log(response);
});
\`\`\`

\`\`\`bash
curl -X POST ${V}/api/v1/document-store/upsert/${r.storeId} \\
  -H "Authorization: Bearer <your_api_key_here>" \\
  -F "files=@<file-path>" \\
  -F "docId=${r.loaderId}" \\
  -F "loaderName=Custom Loader Name" \\
  -F "splitter={"config":{"chunkSize":20000}}" \\
  -F "metadata={}" \\
  -F "replaceExisting=true" \\
  -F "createNewDocStore=false" \\
  # Override existing configuration:
  # -F "loader=" \\
  # -F "embedding=" \\
  # -F "vectorStore=" \\
  # -F "recordManager=" \\
  # -F "docStore="
\`\`\`
`,w=()=>`With the Upsert API, you can choose an existing document and reuse the same configuration for upserting.
 
\`\`\`python
import requests

API_URL = "${V}/api/v1/document-store/upsert/${r.storeId}"
API_KEY = "your_api_key_here"

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}"
}

def query(payload):
    response = requests.post(API_URL, json=payload, headers=headers)
    return response.json()

output = query({
    "docId": "${r.loaderId}",
    "metadata": "{}", # Add additional metadata to the document chunks
    "replaceExisting": True, # Replace existing document with the new upserted chunks
    "createNewDocStore": False, # Create a new document store
    "loaderName": "Custom Loader Name", # Override the loader name
    # Override existing configuration
    "loader": {
        "config": {
            "text": "This is a new text"
        }
    },
    "splitter": {
        "config": {
            "chunkSize": 20000
        }
    },
    # embedding: {},
    # vectorStore: {},
    # recordManager: {}
    # docStore: {}
})
print(output)
\`\`\`

\`\`\`javascript
async function query(data) {
    const response = await fetch(
        "${V}/api/v1/document-store/upsert/${r.storeId}",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer <your_api_key_here>"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({
    "docId": "${r.loaderId}",
    "metadata": "{}", // Add additional metadata to the document chunks
    "replaceExisting": true, // Replace existing document with the new upserted chunks
    "createNewDocStore": false, // Create a new document store
    "loaderName": "Custom Loader Name", // Override the loader name
    // Override existing configuration
    "loader": {
        "config": {
            "text": "This is a new text"
        }
    },
    "splitter": {
        "config": {
            "chunkSize": 20000
        }
    },
    // embedding: {},
    // vectorStore: {},
    // recordManager: {}
    // docStore: {}
}).then((response) => {
    console.log(response);
});
\`\`\`

\`\`\`bash
curl -X POST ${V}/api/v1/document-store/upsert/${r.storeId} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <your_api_key_here>" \\
  -d '{
        "docId": "${r.loaderId}",
        "metadata": "{}",
        "replaceExisting": true,
        "createNewDocStore": false,
        "loaderName": "Custom Loader Name",
        "loader": {
            "config": {
                "text": "This is a new text"
            }
        },
        "splitter": {
            "config": {
                "chunkSize": 20000
            }
        }
        // Override existing configuration
        // "embedding": {},
        // "vectorStore": {},
        // "recordManager": {}
        // "docStore": {}
      }'

\`\`\`
`,M=t=>{const p={},f=new Set;let I=!1;t.forEach(C=>{const{node:D,nodeId:K,label:ee,name:q,type:P}=C;q==="files"&&(I=!0),f.add(D),p[D]||(p[D]={nodeIds:[],params:[]}),p[D].nodeIds.includes(K)||p[D].nodeIds.push(K);const Y={label:ee,name:q,type:P};p[D].params.some(X=>JSON.stringify(X)===JSON.stringify(Y))||p[D].params.push(Y)});for(const C in p)p[C].nodeIds.sort();T(p),h(I?E():w())},l=t=>(p,f)=>{const I={...x};I[t]=f,k(I)};n.useEffect(()=>{d.data&&M(d.data)},[d.data]),n.useEffect(()=>{a&&r&&d.request(r.storeId,r.loaderId)},[a,r]);const s=document.getElementById("portal"),j=a?e.jsxs(ne,{onClose:m,open:a,fullWidth:!0,maxWidth:"lg","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(ie,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:r.title}),e.jsxs(de,{children:[e.jsxs(W,{sx:{display:"flex",alignItems:"center",padding:2,mb:3,background:c.isDarkMode?"linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.1) 100%)":"linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)",color:c.isDarkMode?"white":"#333333",fontWeight:400,borderRadius:2,border:`1px solid ${c.isDarkMode?"rgba(33, 150, 243, 0.3)":"rgba(33, 150, 243, 0.2)"}`,gap:1.5},children:[e.jsx(wt,{size:20,style:{color:c.isDarkMode?"#64b5f6":"#1976d2",flexShrink:0}}),e.jsxs(W,{sx:{flex:1},children:[e.jsx("strong",{children:"Note:"})," Upsert API can only be used when the existing document loader has been upserted before."]})]}),e.jsx(Xt,{children:S}),e.jsx(H,{sx:{mt:3,mb:1},children:"You can override existing configurations:"}),e.jsx(U,{direction:"column",spacing:2,sx:{width:"100%",my:2},children:e.jsx(It,{sx:{borderColor:g.palette.primary[200]+75,p:2},variant:"outlined",children:Object.keys(v).sort().map(t=>e.jsxs(Ue,{expanded:x[t]||!1,onChange:l(t),disableGutters:!0,children:[e.jsx(We,{expandIcon:e.jsx(Pe,{}),"aria-controls":`nodes-accordian-${t}`,id:`nodes-accordian-header-${t}`,children:e.jsxs(U,{flexDirection:"row",sx:{gap:2,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(H,{variant:"h5",children:t}),v[t].nodeIds.length>0&&v[t].nodeIds.map((p,f)=>e.jsx("div",{style:{display:"flex",flexDirection:"row",width:"max-content",borderRadius:15,background:"rgb(254,252,191)",padding:5,paddingLeft:10,paddingRight:10},children:e.jsx("span",{style:{color:"rgb(116,66,16)",fontSize:"0.825rem"},children:p})},f))]})}),e.jsx(He,{children:e.jsx(qe,{rows:v[t].params.map(p=>{const{node:f,nodeId:I,...C}=p;return C}),columns:Object.keys(v[t].params[0]).slice(-3)})})]},t))})})]})]}):null;return le.createPortal(j,s)};Ye.propTypes={show:A.bool,dialogProps:A.object,onCancel:A.func};var ue={},aa=G;Object.defineProperty(ue,"__esModule",{value:!0});var pe=ue.default=void 0,oa=aa(J()),ra=e,sa=(0,oa.default)((0,ra.jsx)("path",{d:"M10 4h4v4h-4zM4 16h4v4H4zm0-6h4v4H4zm0-6h4v4H4zm10 8.42V10h-4v4h2.42zm6.88-1.13-1.17-1.17c-.16-.16-.42-.16-.58 0l-.88.88L20 12.75l.88-.88c.16-.16.16-.42 0-.58zM11 18.25V20h1.75l6.67-6.67-1.75-1.75zM16 4h4v4h-4z"}),"AppRegistration");pe=ue.default=sa;var he={},na=G;Object.defineProperty(he,"__esModule",{value:!0});var me=he.default=void 0,ia=na(J()),da=e,la=(0,ia.default)((0,da.jsx)("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"}),"NoteAdd");me=he.default=la;var xe={},ca=G;Object.defineProperty(xe,"__esModule",{value:!0});var Xe=xe.default=void 0,ua=ca(J()),pa=e,ha=(0,ua.default)((0,pa.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");Xe=xe.default=ha;var fe={},ma=G;Object.defineProperty(fe,"__esModule",{value:!0});var Qe=fe.default=void 0,xa=ma(J()),fa=e,ga=(0,xa.default)((0,fa.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");Qe=fe.default=ga;var ge={},ja=G;Object.defineProperty(ge,"__esModule",{value:!0});var Ze=ge.default=void 0,ya=ja(J()),va=e,Ca=(0,ya.default)((0,va.jsx)("path",{d:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"}),"Code");Ze=ge.default=Ca;const ba="/assets/doc_store_details_empty-B8g8M--k.svg",i=ce(Ve)(({theme:a})=>({borderColor:a.palette.grey[900]+25,padding:"6px 16px",[`&.${_e.head}`]:{color:a.palette.grey[900]},[`&.${_e.body}`]:{fontSize:14,height:64}})),$e=ce(Z)(()=>({"&:last-child td, &:last-child th":{border:0}})),et=ce(a=>e.jsx(Vt,{elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},...a}))(({theme:a})=>({"& .MuiPaper-root":{borderRadius:6,marginTop:a.spacing(1),minWidth:180,boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:a.palette.text.secondary,marginRight:a.spacing(1.5)},"&:active":{backgroundColor:Ot(a.palette.primary.main,a.palette.action.selectedOpacity)}}}})),Ka=()=>{var Se,De,ke,we;const a=se(),r=Oe(o=>o.customization),m=Rt(),v=Ne(),{hasAssignedWorkspace:T}=Re();_t();const{confirm:S}=Qt(),h=(...o)=>v(Bt(...o)),g=(...o)=>v(Ft(...o)),{error:c,setError:x}=At(),{hasPermission:k}=Re(),d=Q(F.getSpecificDocumentStore),[E,w]=n.useState(!0),[M,l]=n.useState(!1),[s,j]=n.useState(!1),[t,p]=n.useState({}),[f,I]=n.useState({}),[C,D]=n.useState(!1),[K,ee]=n.useState({}),[q,P]=n.useState(!1),[Y,X]=n.useState({}),[je,ye]=n.useState(!1),[at,ot]=n.useState({}),[ve,te]=n.useState(null),ae=!!ve,{storeId:z}=Et(),rt=o=>{m("/document-stores/"+z+"/"+o)},Ce=o=>{m("/document-stores/chunks/"+z+"/"+o)},st=o=>{m("/document-stores/query/"+o)},nt=o=>{D(!1),m("/document-stores/"+z+"/"+o)},it=o=>{m("/document-stores/vector/"+o)},be=()=>{ee({title:"Select Document Loader"}),D(!0)},dt=async o=>{try{await F.deleteVectorStoreDataFromStore(o)}catch(y){console.error(y)}},lt=async(o,y,O)=>{if(l(!0),P(!1),o==="STORE"){O&&await dt(z);try{const u=await F.deleteDocumentStore(z);l(!1),u.data&&(h({message:"Store, Loader and associated document chunks deleted",options:{key:new Date().getTime()+Math.random(),variant:"success",action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}}),m("/document-stores/"))}catch(u){l(!1),x(u),h({message:`Failed to delete Document Store: ${typeof u.response.data=="object"?u.response.data.message:u.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}})}}else if(o==="LOADER")try{const u=await F.deleteLoaderFromStore(z,y.id);l(!1),u.data&&(h({message:"Loader and associated document chunks deleted",options:{key:new Date().getTime()+Math.random(),variant:"success",action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}}),oe())}catch(u){x(u),l(!1),h({message:`Failed to delete Document Loader: ${typeof u.response.data=="object"?u.response.data.message:u.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}})}},ct=(o,y,O)=>{const u={title:"Delete",description:`Delete Loader ${o.loaderName} ? This will delete all the associated document chunks.`,vectorStoreConfig:y,recordManagerConfig:O,type:"LOADER",file:o};X(u),P(!0)},ut=(o,y)=>{var u;const O={title:"Delete",description:`Delete Store ${(u=d.data)==null?void 0:u.name} ? This will delete all the associated loaders and document chunks.`,vectorStoreConfig:o,recordManagerConfig:y,type:"STORE"};X(O),P(!0)},pt=async o=>{if(await S({title:"Refresh all loaders and upsert all chunks?",description:"This will re-process all loaders and upsert all chunks. This action might take some time.",confirmButtonName:"Refresh",cancelButtonName:"Cancel"})){te(null),l(!0);try{(await F.refreshLoader(o)).data&&h({message:"Document store refresh successfully!",options:{key:new Date().getTime()+Math.random(),variant:"success",action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}}),l(!1)}catch(u){l(!1),h({message:`Failed to refresh document store: ${typeof u.response.data=="object"?u.response.data.message:u.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",action:R=>e.jsx($,{style:{color:"white"},onClick:()=>g(R),children:e.jsx(B,{})})}})}}},ht=()=>{const y={title:"Edit Document Store",type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Update",data:{name:t.name,description:t.description,id:t.id}};I(y),j(!0)},oe=()=>{j(!1),d.request(z)},mt=o=>{o.preventDefault(),o.stopPropagation(),te(o.currentTarget)},xt=(o,y)=>{ot({title:"Upsert API",storeId:o,loaderId:y}),ye(!0)},ft=()=>{te(null)};return n.useEffect(()=>{d.request(z)},[]),n.useEffect(()=>{if(d.data){const o=d.data.workspaceId;if(!T(o)){m("/unauthorized");return}p(d.data)}},[d.data]),n.useEffect(()=>{w(d.loading)},[d.loading]),e.jsxs(e.Fragment,{children:[e.jsx($t,{children:c?e.jsx(Gt,{error:c}):e.jsxs(U,{flexDirection:"column",sx:{gap:3},children:[e.jsxs(Jt,{isBackButton:!0,isEditButton:k("documentStores:create,documentStores:update"),search:!1,title:t==null?void 0:t.name,description:t==null?void 0:t.description,onBack:()=>m("/document-stores"),onEdit:()=>ht(),children:[((t==null?void 0:t.status)==="STALE"||(t==null?void 0:t.status)==="UPSERTING")&&e.jsx(Nt,{permissionId:"documentStores:view",onClick:oe,size:"small",color:"primary",title:"Refresh Document Store",children:e.jsx(ta,{})}),e.jsx(Tt,{permissionId:"documentStores:add-loader",variant:"contained",sx:{ml:2,minWidth:200,borderRadius:2,height:"100%",color:"white"},startIcon:e.jsx(Ee,{}),onClick:be,children:"Add Document Loader"}),e.jsx($,{id:"document-store-header-action-button","aria-controls":ae?"document-store-header-menu":void 0,"aria-haspopup":"true","aria-expanded":ae?"true":void 0,variant:"outlined",disableElevation:!0,color:"secondary",onClick:mt,sx:{minWidth:150},endIcon:e.jsx(Be,{}),children:"More Actions"}),e.jsxs(et,{id:"document-store-header-menu",MenuListProps:{"aria-labelledby":"document-store-header-menu-button"},anchorEl:ve,open:ae,onClose:ft,children:[e.jsxs(N,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)==="UPSERTING",onClick:()=>Ce("all"),disableRipple:!0,children:[e.jsx(pe,{}),"View & Edit Chunks"]}),e.jsx(_,{permission:"documentStores:upsert-config",children:e.jsxs(N,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)==="UPSERTING",onClick:()=>it(t.id),disableRipple:!0,children:[e.jsx(me,{}),"Upsert All Chunks"]})}),e.jsxs(N,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)!=="UPSERTED",onClick:()=>st(t.id),disableRipple:!0,children:[e.jsx(Xe,{}),"Retrieval Query"]}),e.jsx(_,{permission:"documentStores:upsert-config",children:e.jsxs(N,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)!=="UPSERTED",onClick:()=>pt(t.id),disableRipple:!0,title:"Re-process all loaders and upsert all chunks",children:[e.jsx(Qe,{}),"Refresh"]})}),e.jsx(Fe,{sx:{my:.5}}),e.jsxs(N,{onClick:()=>ut(t.vectorStoreConfig,t.recordManagerConfig),disableRipple:!0,children:[e.jsx(Ge,{}),"Delete"]})]})]}),e.jsx(qt,{status:t==null?void 0:t.status}),((De=(Se=d.data)==null?void 0:Se.whereUsed)==null?void 0:De.length)>0&&e.jsxs(U,{flexDirection:"row",sx:{gap:2,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{style:{paddingLeft:"15px",paddingRight:"15px",paddingTop:"10px",paddingBottom:"10px",fontSize:"0.9rem",width:"max-content",display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(Lt,{style:{marginRight:5},size:17}),"Chatflows Used:"]}),d.data.whereUsed.map((o,y)=>e.jsx(re,{clickable:!0,style:{width:"max-content",borderRadius:"25px",boxShadow:r.isDarkMode?"0 2px 14px 0 rgb(255 255 255 / 10%)":"0 2px 14px 0 rgb(32 40 45 / 10%)"},label:o.name,onClick:()=>m("/canvas/"+o.id)},y))]}),!E&&t&&!((ke=t==null?void 0:t.loaders)!=null&&ke.length)?e.jsxs(U,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[e.jsx(W,{sx:{p:2,height:"auto"},children:e.jsx("img",{style:{objectFit:"cover",height:"16vh",width:"auto"},src:ba,alt:"doc_store_details_emptySVG"})}),e.jsx("div",{children:"No Document Added Yet"}),e.jsx(Mt,{variant:"contained",sx:{borderRadius:2,height:"100%",mt:2,color:"white"},startIcon:e.jsx(Ee,{}),onClick:be,children:"Add Document Loader"})]}):e.jsx(Te,{sx:{border:1,borderColor:a.palette.grey[900]+25,borderRadius:2},component:Le,children:e.jsxs(Me,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(zt,{sx:{backgroundColor:r.isDarkMode?a.palette.common.black:a.palette.grey[100],height:56},children:e.jsxs(Z,{children:[e.jsx(i,{children:" "}),e.jsx(i,{children:"Loader"}),e.jsx(i,{children:"Splitter"}),e.jsx(i,{children:"Source(s)"}),e.jsx(i,{children:"Chunks"}),e.jsx(i,{children:"Chars"}),e.jsx(_,{permission:"documentStores:preview-process,documentStores:delete-loader",children:e.jsx(i,{children:"Actions"})})]})}),e.jsx(ze,{children:E?e.jsxs(e.Fragment,{children:[e.jsxs($e,{children:[e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(_,{permission:"documentStores:preview-process,documentStores:delete-loader",children:e.jsx(i,{children:e.jsx(b,{variant:"text"})})})]}),e.jsxs($e,{children:[e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(i,{children:e.jsx(b,{variant:"text"})}),e.jsx(_,{permission:"documentStores:preview-process,documentStores:delete-loader",children:e.jsx(i,{children:e.jsx(b,{variant:"text"})})})]})]}):e.jsx(e.Fragment,{children:(t==null?void 0:t.loaders)&&(t==null?void 0:t.loaders.length)>0&&(t==null?void 0:t.loaders.map((o,y)=>e.jsx(tt,{index:y,loader:o,theme:a,onEditClick:()=>rt(o.id),onViewChunksClick:()=>Ce(o.id),onDeleteClick:()=>ct(o,t==null?void 0:t.vectorStoreConfig,t==null?void 0:t.recordManagerConfig),onChunkUpsert:()=>m(`/document-stores/vector/${t.id}/${o.id}`),onViewUpsertAPI:()=>xt(t.id,o.id)},y)))})})]})}),((we=d.data)==null?void 0:we.status)==="STALE"&&e.jsx("div",{style:{width:"100%",textAlign:"center",marginTop:"20px"},children:e.jsx(H,{color:"warning",style:{color:"darkred",fontWeight:500,fontStyle:"italic",fontSize:12},children:"Some files are pending processing. Please Refresh to get the latest status."})})]})}),s&&e.jsx(Ut,{dialogProps:f,show:s,onCancel:()=>j(!1),onConfirm:oe}),C&&e.jsx(Je,{show:C,dialogProps:K,onCancel:()=>D(!1),onDocLoaderSelected:nt}),q&&e.jsx(Ke,{show:q,dialogProps:Y,onCancel:()=>P(!1),onDelete:lt}),je&&e.jsx(Ye,{show:je,dialogProps:at,onCancel:()=>ye(!1)}),M&&e.jsx(Wt,{open:M}),e.jsx(Zt,{})]})};function tt(a){var g;const[r,m]=n.useState(null),v=!!r,T=c=>{c.preventDefault(),c.stopPropagation(),m(c.currentTarget)},S=()=>{m(null)},h=(c,x)=>c&&Array.isArray(c)&&c.length>0?c.map(k=>k.name).join(", "):x&&typeof x=="string"&&x.includes("base64")?Pt(x):x&&typeof x=="string"&&x.startsWith("[")&&x.endsWith("]")?JSON.parse(x).join(", "):x||"No source";return e.jsx(e.Fragment,{children:e.jsxs(Z,{hover:!0,sx:{"&:last-child td, &:last-child th":{border:0},cursor:"pointer"},children:[e.jsx(i,{onClick:a.onViewChunksClick,scope:"row",style:{width:"5%"},children:e.jsx("div",{style:{display:"flex",width:"20px",height:"20px",backgroundColor:((g=a.loader)==null?void 0:g.status)==="SYNC"?"#00e676":"#ffe57f",borderRadius:"50%"}})}),e.jsx(i,{onClick:a.onViewChunksClick,scope:"row",children:a.loader.loaderName}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.splitterName??"None"}),e.jsx(i,{onClick:a.onViewChunksClick,children:h(a.loader.files,a.loader.source)}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.totalChunks&&e.jsx(re,{variant:"outlined",size:"small",label:a.loader.totalChunks.toLocaleString()})}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.totalChars&&e.jsx(re,{variant:"outlined",size:"small",label:a.loader.totalChars.toLocaleString()})}),e.jsx(_,{permission:"documentStores:preview-process,documentStores:delete-loader",children:e.jsx(i,{children:e.jsxs("div",{children:[e.jsx($,{id:"document-store-action-button","aria-controls":v?"document-store-action-customized-menu":void 0,"aria-haspopup":"true","aria-expanded":v?"true":void 0,disableElevation:!0,onClick:c=>T(c),endIcon:e.jsx(Be,{}),children:"Options"}),e.jsxs(et,{id:"document-store-actions-customized-menu",MenuListProps:{"aria-labelledby":"document-store-actions-customized-button"},anchorEl:r,open:v,onClose:S,children:[e.jsx(_,{permission:"documentStores:preview-process",children:e.jsxs(N,{onClick:a.onEditClick,disableRipple:!0,children:[e.jsx(ea,{}),"Preview & Process"]})}),e.jsx(_,{permission:"documentStores:preview-process",children:e.jsxs(N,{onClick:a.onViewChunksClick,disableRipple:!0,children:[e.jsx(pe,{}),"View & Edit Chunks"]})}),e.jsx(_,{permission:"documentStores:preview-process",children:e.jsxs(N,{onClick:a.onChunkUpsert,disableRipple:!0,children:[e.jsx(me,{}),"Upsert Chunks"]})}),e.jsx(_,{permission:"documentStores:preview-process",children:e.jsxs(N,{onClick:a.onViewUpsertAPI,disableRipple:!0,children:[e.jsx(Ze,{}),"View API"]})}),e.jsx(Fe,{sx:{my:.5}}),e.jsx(_,{permission:"documentStores:delete-loader",children:e.jsxs(N,{onClick:a.onDeleteClick,disableRipple:!0,children:[e.jsx(Ge,{}),"Delete"]})})]})]})})})]},a.index)})}tt.propTypes={loader:L.any,index:L.number,open:L.bool,theme:L.any,onViewChunksClick:L.func,onEditClick:L.func,onDeleteClick:L.func,onChunkUpsert:L.func,onViewUpsertAPI:L.func};export{Ka as default};
