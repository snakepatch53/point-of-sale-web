import CrudHead from "../panel.components/crud/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/crud/CrudTable";
import { CrudForm } from "../panel.components/crud/CrudForm";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import {
    destroySupplier,
    getSuppliers,
    storageSupplier,
    updateSupplier,
} from "../services/suppliers";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";

export default function Supliers() {
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
        handleSearch,
    } = useCrudPanel({
        entityName: "Proveedor",
        pluralEntityName: "Proveedores",
        searchFields: ["name", "description"],
        crudGet: getSuppliers,
        crudStorage: storageSupplier,
        crudUpdate: updateSupplier,
        crudDestroy: destroySupplier,
    });

    return (
        <PageContent className="flex flex-col gap-7 w-full p-3">
            <CrudHead
                title={pluralEntityName}
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                handleSearch={handleSearch}
            />

            <CrudTable
                titles={["Nombre", "Ciudad", "Celular", "Email"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.city} />
                        <CrudTableTdText value={item.cellphone} />
                        <CrudTableTdText value={item.email} />
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
                <CrudFormInput
                    label="Nombre"
                    placeholder="Escriba el nombre "
                    name="name"
                    required
                />

                <CrudFormInput
                    label="Provincia"
                    placeholder="Escriba la provincia "
                    name="province"
                    required
                />

                <CrudFormInput
                    label="Ciudad"
                    placeholder="Escriba la ciudad "
                    name="city"
                    required
                />

                <CrudFormInput
                    label="Dirección"
                    placeholder="Escriba la dirección "
                    name="address"
                    required
                />

                <CrudFormInput
                    label="Teléfono"
                    placeholder="Escriba el número de telefono "
                    name="phone"
                    required
                />

                <CrudFormInput
                    label="Celular"
                    placeholder="Escriba el número de celular "
                    name="cellphone"
                    required
                />

                <CrudFormInput
                    label="Email"
                    placeholder="Escriba el email "
                    name="email"
                    required
                />

                <CrudFormInput label="Ruc" placeholder="Escriba el ruc  " name="ruc" required />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este proveedor ?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
