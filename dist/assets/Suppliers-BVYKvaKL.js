import{j as e,P as g}from"./index-DKYCmnMZ.js";import{u as v,C as y,a as P,c as l,d as S,e as N,f as r,g as q}from"./CrudInput-CIJeCB1M.js";import{C as T}from"./ClientRouter-B1RYgFJW.js";import{c as k,n as D,m as O}from"./index.es-gRuHa-HP.js";import{g as w,s as F,u as R,d as I}from"./suppliers-v6ASJCyT.js";import{B as i}from"./Button-gzgfriZS.js";import"./Search-DvZNMIQ2.js";function z(){const{entityName:o,pluralEntityName:t,head:n,table:d,form:c,confirm:u,progress:p,datalist:m,$form:x,handleModeNew:h,handleModeEdit:C,handleModeDelete:b,hanleCancel:s,handleSubmit:j,handleDelete:f,handleSearch:E}=v({entityName:"Proveedor",pluralEntityName:"Proveedores",searchFields:["name","description"],crudGet:w,crudStorage:F,crudUpdate:R,crudDestroy:I});return e.jsxs(g,{className:"flex flex-col gap-7 w-full p-3",children:[e.jsx(y,{title:t,icon:k,isOpen:n,onClickNew:h,handleSearch:E}),e.jsx(P,{titles:["Nombre","Ciudad","Celular","Email"],dataList:m,isOpen:d,onRowPrint:a=>e.jsxs("tr",{children:[e.jsx(l,{value:a.name}),e.jsx(l,{value:a.city}),e.jsx(l,{value:a.cellphone}),e.jsx(l,{value:a.email}),e.jsxs(S,{children:[e.jsx(i,{icon:D,type:"edit",onClick:()=>C(a),classIcon:"text-[--c3-txt2]"}),e.jsx(i,{icon:O,type:"delete",onClick:()=>b(a),classIcon:"text-[--c3-txt2]"})]})]},a.id)}),e.jsxs(N,{title:o,isOpen:c,onClickCancel:s,onSubmit:j,formRef:x,children:[e.jsx(r,{label:"Nombre",placeholder:"Escriba el nombre ",name:"name",required:!0}),e.jsx(r,{label:"Provincia",placeholder:"Escriba la provincia ",name:"province",required:!0}),e.jsx(r,{label:"Ciudad",placeholder:"Escriba la ciudad ",name:"city",required:!0}),e.jsx(r,{label:"Dirección",placeholder:"Escriba la dirección ",name:"address",required:!0}),e.jsx(r,{label:"Teléfono",placeholder:"Escriba el número de telefono ",name:"phone",required:!0}),e.jsx(r,{label:"Celular",placeholder:"Escriba el número de celular ",name:"cellphone",required:!0}),e.jsx(r,{label:"Email",placeholder:"Escriba el email ",name:"email",required:!0}),e.jsx(r,{label:"Ruc",placeholder:"Escriba el ruc  ",name:"ruc",required:!0})]}),e.jsx(q,{isOpen:u,text:"¿Seguro de eliminar este proveedor ?",onClickDelete:f,onClickCancel:s}),e.jsx(T,{isOpen:p,text:"Procesando tu solicitud..."})]})}export{z as default};
