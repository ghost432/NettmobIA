import{af as o,b4 as e}from"./index-B5bgjFPS.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M15 3v15a3 3 0 0 1 -6 0v-15",key:"svg-0"}],["path",{d:"M9 12h6",key:"svg-1"}],["path",{d:"M8 3h8",key:"svg-2"}]],c=o("outline","test-pipe-2","TestPipe2",s),l=t=>e.get("/evaluators",{params:t}),r=t=>e.post("/evaluators",t),v=t=>e.get(`/evaluators/${t}`),p=(t,a)=>e.put(`/evaluators/${t}`,a),n=t=>e.delete(`/evaluators/${t}`),i={getAllEvaluators:l,createEvaluator:r,getEvaluator:v,updateEvaluator:p,deleteEvaluator:n};export{c as I,i as e};
