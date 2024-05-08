import CrudHead from "../client.components/crud/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../client.components/crud/CrudTable";
import { CrudForm } from "../client.components/crud/CrudForm";
import { CrudFormInput } from "../client.components/crud/CrudInput";
import CrudConfirm from "../client.components/crud/CrudConfirm";
import CrudProgress from "../client.components/crud/CrudProgress";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import { destroyLocker, getLockers, storageLocker, updateLocker } from "../services/lockers";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";

export default function Lockers() {
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
        entityName: "Bodega",
        pluralEntityName: "Bodegas",
        searchFields: ["name", "description"],
        crudGet: getLockers,
        crudStorage: storageLocker,
        crudUpdate: updateLocker,
        crudDestroy: destroyLocker,
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
                titles={["Nombre", "Descripción"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.description} />
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
                    label="Descripción"
                    placeholder="Escriba una descripción "
                    name="description"
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar esta bodega?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
