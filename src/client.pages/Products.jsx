import CrudHead from "../client.components/crud/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdImage,
    CrudTableTdText,
} from "../client.components/crud/CrudTable";
import { CrudForm } from "../client.components/crud/CrudForm";
import { CrudFormInput } from "../client.components/crud/CrudInput";
import CrudConfirm from "../client.components/crud/CrudConfirm";
import CrudProgress from "../client.components/crud/CrudProgress";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import { destroyProduct, getProducts, storageProduct, updateProduct } from "../services/products";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";
import { EntityContext } from "../contexts/entity";
import { useContext } from "react";
import { getLockers } from "../services/lockers";
import { useEffect, useState } from "react";
// import CrudBackground from "../client.components/crud/CrudBackground";

export default function Products() {
    const { entity } = useContext(EntityContext);
    // const extraValidations = ($form, showNotification) => {
    //     let validate = true;
    //     if ($form.photo?.files?.length && $form.photo?.files[0]?.size > 2000000) {
    //         showNotification("La foto debe pesar maximo 2MB");
    //         validate = false;
    //     }

    //     return validate;
    // };

    const {
        entityName,
        pluralEntityName,
        head,
        table,
        form,
        confirm,
        progress,
        datalist,
        $form,
        handleModeNew,
        handleModeEdit,
        handleModeDelete,
        hanleCancel,
        handleSubmit,
        handleDelete,
        searchValue,
        searchOnChange,
    } = useCrudPanel({
        entityName: "Producto",
        pluralEntityName: "Productos",
        excludeFieldsValidationEdit: ["photo"],
        searchFields: ["name", "description", "price"],
        // extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getProducts,
        crudStorage: storageProduct,
        crudUpdate: updateProduct,
        crudDestroy: destroyProduct,
    });
    const [lockers, setLockers] = useState([]);
    useEffect(() => {
        getLockers().then((res) => setLockers(res));
    }, []);

    // const [myProducts, setMyProducts] = useState(null);
    // useEffect(() => {
    //     if (!businessId) return setMyProducts(datalist);
    //     if (!datalist) return setMyProducts(datalist);
    //     const _myProducts = datalist.filter((item) => item?.category?.business_id == businessId);
    //     setMyProducts(_myProducts);
    // }, [businessId, datalist]);

    return (
        <PageContent className="flex flex-col gap-7 w-full p-3">
            <CrudHead
                title={pluralEntityName}
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Foto", "Nombre", "Stock", "Precio"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.photo_url} alt={"Foto " + item.name} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.stock} />
                        <CrudTableTdText value={item.price} />
                        <CrudTableTdFlex>
                            <Button
                                icon={faPen}
                                type="edit"
                                onClick={() => handleModeEdit(item)}
                                classIcon="text-[--c3-txt2]"
                            />
                            <Button
                                icon={faTrash}
                                type="delete"
                                onClick={() => handleModeDelete(item)}
                                classIcon="text-[--c3-txt2]"
                            />
                        </CrudTableTdFlex>
                    </tr>
                )}
            />

            <CrudForm
                title={entityName}
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                // message={msg}
                formRef={$form}
            >
                <input type="hidden" name="entity_id" value={entity.id} />

                <CrudFormInput
                    label="Nombre"
                    placeholder="Escriba el nombre del producto"
                    name="name"
                    required
                />
                <CrudFormInput
                    label="Descripcion"
                    placeholder="Escriba una descripcion"
                    name="description"
                    required
                />

                <CrudFormInput
                    label="Código"
                    placeholder="Escriba el codigo del producto"
                    name="code"
                    required
                />

                {/* <CrudFormInput label="Bodega" placeholder="Bodega" name="locker_id" required /> */}
                <CrudFormInput
                    label="Marca"
                    placeholder="Escriba la marca del producto"
                    name="mark"
                    required
                />
                <CrudFormInput
                    label="Modelo"
                    placeholder="Escriba el modelo del producto"
                    name="model"
                    required
                />
                <CrudFormInput
                    label="Fecha de elaboración"
                    type="date"
                    name="elaboration"
                    required
                />
                <CrudFormInput label="Fecha de expiración" type="date" name="expiration" required />
                <CrudFormInput label="Bodega" name="locker_id" type="select" required>
                    <option value="">Seleccione una bodega</option>
                    {lockers.map((locker) => (
                        <option key={locker.id} value={locker.id}>
                            {locker.name}
                        </option>
                    ))}
                </CrudFormInput>
                <CrudFormInput label="Foto" name="photo" type="file" />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este producto?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
