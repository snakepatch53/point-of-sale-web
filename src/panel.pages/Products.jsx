import CrudHead from "../panel.components/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdImage,
    CrudTableTdText,
} from "../panel.components/CrudTable";
import { CrudForm } from "../panel.components/CrudForm";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import {
    destroyProduct,
    getProductsWithCategory,
    storageProduct,
    updateProduct,
} from "../services/products";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../component/PageContent";
import { getCategories } from "../services/categories";
import { useEffect, useState } from "react";
import CrudBackground from "../panel.components/CrudBackground";

export default function Products({ businessId = null }) {
    const extraValidations = ($form, showNotification) => {
        let validate = true;
        if ($form.photo?.files?.length && $form.photo?.files[0]?.size > 2000000) {
            showNotification("La foto debe pesar maximo 2MB");
            validate = false;
        }

        return validate;
    };

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
        entityName: "Product",
        pluralEntityName: "Productos",
        excludeFieldsValidationEdit: ["photo"],
        searchFields: ["name", "description", "price"],
        extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getProductsWithCategory,
        crudStorage: storageProduct,
        crudUpdate: updateProduct,
        crudDestroy: destroyProduct,
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((res) => {
            if (!res) return;
            if (!businessId) return setCategories(res);
            const _categories = res.filter((item) => item?.business_id == businessId);
            setCategories(_categories);
        });
    }, [businessId]);

    const [myProducts, setMyProducts] = useState(null);
    useEffect(() => {
        if (!businessId) return setMyProducts(datalist);
        if (!datalist) return setMyProducts(datalist);
        const _myProducts = datalist.filter((item) => item?.category?.business_id == businessId);
        setMyProducts(_myProducts);
    }, [businessId, datalist]);

    return (
        <PageContent className="flex flex-col gap-7 w-full">
            {!businessId && <CrudBackground src="/image/food3.jpg" />}
            <CrudHead
                title={pluralEntityName}
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Foto", "Nombre", "Descripcion", "Precio"]}
                dataList={myProducts}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.photo_url} alt={"Foto " + item.name} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.description} />
                        <CrudTableTdText value={item.price} />
                        <CrudTableTdFlex>
                            <Button
                                text="Editar"
                                icon={faPen}
                                type="edit"
                                onClick={() => handleModeEdit(item)}
                            />
                            <Button
                                text="Borrar"
                                icon={faTrash}
                                type="delete"
                                onClick={() => handleModeDelete(item)}
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
                    label="Precio"
                    placeholder="Escriba su numero de celular"
                    name="price"
                    required
                />
                <CrudFormInput label="Foto" name="photo" type="file" />
                <CrudFormInput label="Categoria" name="category_id" type="select" required>
                    <option value="">Seleccione una categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </CrudFormInput>
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este usuario?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
