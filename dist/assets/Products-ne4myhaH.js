import{r as t,E as N,j as e,P as T}from"./index-DKYCmnMZ.js";import{u as q,C as S,a as D,b as M,c as o,d as v,e as O,f as r,g as w}from"./CrudInput-CIJeCB1M.js";import{C as I}from"./ClientRouter-B1RYgFJW.js";import{c as B,n as L,m as R}from"./index.es-gRuHa-HP.js";import{g as U,s as _,u as V,d as G}from"./products-rLAu1C-k.js";import{B as l}from"./Button-gzgfriZS.js";import{g as H}from"./lockers-BpTf7eQW.js";import"./Search-DvZNMIQ2.js";function Y(){const{entity:d}=t.useContext(N),{entityName:i,pluralEntityName:n,head:c,table:u,form:p,confirm:m,progress:x,datalist:h,$form:b,handleModeNew:j,handleModeEdit:C,handleModeDelete:f,hanleCancel:s,handleSubmit:g,handleDelete:y,searchValue:P,searchOnChange:E}=q({entityName:"Producto",pluralEntityName:"Productos",excludeFieldsValidationEdit:["photo"],searchFields:["name","description","price"],isStorageMultipartFormData:!0,isUpdateMultipartFormData:!0,crudGet:U,crudStorage:_,crudUpdate:V,crudDestroy:G}),[F,k]=t.useState([]);return t.useEffect(()=>{H().then(a=>k(a))},[]),e.jsxs(T,{className:"flex flex-col gap-7 w-full p-3",children:[e.jsx(S,{title:n,icon:B,isOpen:c,onClickNew:j,searchValue:P,searchOnChange:E}),e.jsx(D,{titles:["Foto","Nombre","Stock","Precio"],dataList:h,isOpen:u,onRowPrint:a=>e.jsxs("tr",{children:[e.jsx(M,{src:a.photo_url,alt:"Foto "+a.name}),e.jsx(o,{value:a.name}),e.jsx(o,{value:a.stock}),e.jsx(o,{value:a.price}),e.jsxs(v,{children:[e.jsx(l,{icon:L,type:"edit",onClick:()=>C(a),classIcon:"text-[--c3-txt2]"}),e.jsx(l,{icon:R,type:"delete",onClick:()=>f(a),classIcon:"text-[--c3-txt2]"})]})]},a.id)}),e.jsxs(O,{title:i,isOpen:p,onClickCancel:s,onSubmit:g,formRef:b,children:[e.jsx("input",{type:"hidden",name:"entity_id",value:d.id}),e.jsx(r,{label:"Nombre",placeholder:"Escriba el nombre del producto",name:"name",required:!0}),e.jsx(r,{label:"Descripcion",placeholder:"Escriba una descripcion",name:"description",required:!0}),e.jsx(r,{label:"Código",placeholder:"Escriba el codigo del producto",name:"code",required:!0}),e.jsx(r,{label:"Marca",placeholder:"Escriba la marca del producto",name:"mark",required:!0}),e.jsx(r,{label:"Modelo",placeholder:"Escriba el modelo del producto",name:"model",required:!0}),e.jsx(r,{label:"Fecha de elaboración",type:"date",name:"elaboration",required:!0}),e.jsx(r,{label:"Fecha de expiración",type:"date",name:"expiration",required:!0}),e.jsxs(r,{label:"Bodega",name:"locker_id",type:"select",required:!0,children:[e.jsx("option",{value:"",children:"Seleccione una bodega"}),F.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx(r,{label:"Foto",name:"photo",type:"file"})]}),e.jsx(w,{isOpen:m,text:"¿Seguro de eliminar este producto?",onClickDelete:y,onClickCancel:s}),e.jsx(I,{isOpen:x,text:"Procesando tu solicitud..."})]})}export{Y as default};
