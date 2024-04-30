import CrudHead from "../panel.components/crud/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdImage,
    CrudTableTdText,
} from "../panel.components/crud/CrudTable";
import { CrudForm } from "../panel.components/crud/CrudForm";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import { destroyUser, getUsers, storageUser, updateUser } from "../services/users";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";
import { CrudFormInput } from "../panel.components/crud/CrudInput";

export default function Users() {
    const extraValidations = ($form, showNotification, { isEmail }) => {
        let validate = true;
        if ($form.password?.value && $form.password?.value?.length < 8) {
            showNotification("La contraseña debe tener minimo 8 caracteres");
            validate = false;
        }
        if ($form.photo?.files?.length && $form.photo?.files[0]?.size > 2000000) {
            showNotification("La foto debe pesar maximo 2MB");
            validate = false;
        }
        if (!isEmail($form.email?.value)) {
            showNotification("El correo electronico no es valido");
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
        handleSearch,
    } = useCrudPanel({
        entityName: "Usuario",
        pluralEntityName: "Usuarios",
        excludeFieldsValidationEdit: ["password", "photo"],
        searchFields: ["name", "lastname", "email", "role"],
        extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getUsers,
        crudStorage: storageUser,
        crudUpdate: updateUser,
        crudDestroy: destroyUser,
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
                titles={["Foto", "Nombre", "Apellido", "Email", "Privilegio"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.photo_url} alt={"Foto " + item.name} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.lastname} />
                        <CrudTableTdText value={item.email} />
                        <CrudTableTdText value={item.role} />
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
                    label="Nombres"
                    placeholder="Escriba los nombres"
                    name="name"
                    required
                />
                <CrudFormInput
                    label="Apellidos"
                    placeholder="Escriba los apellidos"
                    name="lastname"
                    required
                />
                <CrudFormInput
                    label="Celular"
                    placeholder="Escriba su numero de celular"
                    name="phone"
                    required
                />
                <CrudFormInput
                    label="Direccion"
                    placeholder="Escriba una direccion"
                    name="address"
                    required
                />
                <CrudFormInput
                    label="Correo Electronico"
                    placeholder="Escriba el correo electronico"
                    name="email"
                    required
                />
                <CrudFormInput
                    label="Contraseña"
                    placeholder="Escriba la contraseña"
                    type="password"
                    name="password"
                    required
                />
                <CrudFormInput
                    name="role"
                    label="Privilegios"
                    type="radio"
                    radioOptions={[
                        { value: "Administrador", label: "Administrador", checked: true },
                        { value: "Vendedor", label: "Vendedor" },
                        { value: "Cliente", label: "Cliente" },
                    ]}
                    required
                />
                <CrudFormInput
                    name="state"
                    label="Estado"
                    type="radio"
                    radioOptions={[
                        { value: "Activo", label: "Activo", checked: true },
                        { value: "Inactivo", label: "Inactivo" },
                    ]}
                    required
                />
                <CrudFormInput label="Foto" name="photo" type="file" />
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
