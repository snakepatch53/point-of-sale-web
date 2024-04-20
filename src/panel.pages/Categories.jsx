import CrudHead from "../panel.components/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdSvg,
    CrudTableTdText,
} from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faBox, faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../component/PageContent";
import CrudBackground from "../panel.components/CrudBackground";
import CrudButtonOptions from "../panel.components/CrudButtonOptions";
import { useEffect, useState } from "react";
import ModalProducts from "../panel.components/ModalProducts";
import {
    destroyCategory,
    getCategoriesWithBusiness,
    storageCategory,
    updateCategory,
} from "../services/categories";

import { getBusinesses } from "../services/businesses";

export default function Categories() {
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
        entityName: "Categoria",
        pluralEntityName: "Categorias",
        excludeFieldsValidationEdit: ["icon"],
        searchFields: ["name", "state"],
        crudGet: getCategoriesWithBusiness,
        crudStorage: storageCategory,
        crudUpdate: updateCategory,
        crudDestroy: destroyCategory,
    });
    const [businesses, setBusiness] = useState([]);
    useEffect(() => {
        getBusinesses().then((data) => setBusiness(data));
    }, []);
    const [businessIdSelected, setBusinessIdSelected] = useState(null);
    return (
        <PageContent className="flex flex-col gap-7 w-full">
            <CrudBackground src="/image/food4.jpg" />
            <CrudHead
                title={pluralEntityName}
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Icono", "Nombre", "Descripción", "Tienda"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdSvg code={item.icon} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.description} />
                        <CrudTableTdText value={item?.business?.name} />
                        <CrudTableTdFlex>
                            <CrudButtonOptions>
                                <Button
                                    text="Productos"
                                    icon={faBox}
                                    type="cancel"
                                    onClick={() => setBusinessIdSelected(item.business_id)}
                                />
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
                            </CrudButtonOptions>
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
                    placeholder="Escriba el nombre de la categoria "
                    name="name"
                    required
                />
                <CrudFormInput label="Icono" placeholder="Selecione un icono " name="icon" />
                <CrudFormInput
                    label="Descripcion"
                    placeholder="Escriba una descripcion"
                    name="description"
                    required
                />
                <CrudFormInput label="Negocio" name="business_id" type="select" required>
                    <option value="">Seleccione un Negocio</option>
                    {businesses.map((business) => (
                        <option key={business.id} value={business.id}>
                            {business.name}
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
            <ModalProducts businessId={businessIdSelected} setBusinessId={setBusinessIdSelected} />
        </PageContent>
    );
}
