import{af as a,b4 as o}from"./index-B5bgjFPS.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]],p=a("outline","user","User",n),s=e=>o.get(`/role?organizationId=${e}`),l=e=>o.get(`/auth/roles/${e}`),r=e=>o.post("/role",e),c=e=>o.put("/role",e),i=e=>o.get(`/auth/roles/name/${e}`),d=(e,t)=>o.delete(`/role?id=${e}&organizationId=${t}`),R={getAllRolesByOrganizationId:s,getRoleById:l,createRole:r,updateRole:c,getRoleByName:i,deleteRole:d};export{p as I,R as r};
