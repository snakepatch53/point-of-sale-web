import CrudHead from "../panel.components/crud/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/crud/CrudTable";
import { CrudForm } from "../panel.components/crud/CrudForm";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import { destroyClient, getClients, storageClient, updateClient } from "../services/clients";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";

export default function Clients() {
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
        entityName: "Cliente",
        pluralEntityName: "Clientes",
        searchFields: ["name", "description"],
        crudGet: getClients,
        crudStorage: storageClient,
        crudUpdate: updateClient,
        crudDestroy: destroyClient,
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
                titles={["DNI", "Nombre", "Apellido", "Ciudad", "Celular", "Email"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.dni} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.lastname} />
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
                    placeholder="Escriba el primer nombre "
                    name="name"
                    required
                />
                <CrudFormInput
                    label="Segundo Nombre"
                    placeholder="Escriba el segundo nombre "
                    name="name2"
                    required
                />
                <CrudFormInput
                    label="Apellido"
                    placeholder="Escriba el primer apellido "
                    name="lastname"
                    required
                />
                <CrudFormInput
                    label="Segundo Apellido"
                    placeholder="Escriba el segundo apellido "
                    name="lastname2"
                    required
                />
                <CrudFormInput
                    label="Cedula"
                    placeholder="Escriba el documento de identificación "
                    name="dni"
                    required
                />
                <CrudFormInput
                    label="Ruc"
                    placeholder="Escriba el número de ruc "
                    name="ruc"
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
                    placeholder="Escriba una dirección "
                    name="address"
                    required
                />
                <CrudFormInput
                    label="Teléfono"
                    placeholder="Escriba un número de teléfono "
                    name="phone"
                    required
                />
                <CrudFormInput
                    label="Celular"
                    placeholder="Escriba un número de celular "
                    name="cellphone"
                    required
                />
                <CrudFormInput
                    label="Email"
                    placeholder="Escriba un email "
                    name="email"
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este cliente?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
