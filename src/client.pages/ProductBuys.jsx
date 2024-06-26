import CrudHead from "../client.components/crud/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../client.components/crud/CrudTable";
import { CrudForm } from "../client.components/crud/CrudForm";
import { CrudFormInput } from "../client.components/crud/CrudInput";
import CrudConfirm from "../client.components/crud/CrudConfirm";
import CrudProgress from "../client.components/crud/CrudProgress";
import { faFilePdf, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import {
    destroyProductBuy,
    getProductBuys,
    storageProductBuy,
    updateProductBuy,
} from "../services/productBuys";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";
import { getSuppliers } from "../services/suppliers";
import { useEffect, useState } from "react";
import { getUsers } from "../services/users";

export default function ProductBuys() {
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
        handleModeDelete,
        hanleCancel,
        handleSubmit,
        handleDelete,
        handleSearch,
    } = useCrudPanel({
        entityName: "Venta",
        pluralEntityName: "Ventas",
        searchFields: ["name", "description"],
        crudGet: getProductBuys,
        crudStorage: storageProductBuy,
        crudUpdate: updateProductBuy,
        crudDestroy: destroyProductBuy,
    });

    const [supliers, setSuppliers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getSuppliers().then((res) => setSuppliers(res));
        getUsers().then((res) => setUsers(res));
    }, []);

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
                titles={["Fecha", "Proveedor", "Total"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.date_str} />
                        <CrudTableTdText value={item?.suplier?.name} />
                        <CrudTableTdText value={"$" + item.total} />
                        <CrudTableTdFlex>
                            <Button
                                icon={faFilePdf}
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
                <CrudFormInput label="Fecha de venta" type="date" name="date_buy" required />
                <CrudFormInput label="Iva" placeholder="Escriba el iva  " name="tax" required />
                <CrudFormInput label="Proveedor" name="suplier_id" type="select" required>
                    <option value="">Seleccione un proveedor</option>
                    {supliers.map((suplier) => (
                        <option key={suplier.id} value={suplier.id}>
                            {suplier.name}
                        </option>
                    ))}
                </CrudFormInput>
                <CrudFormInput label="Usuario" name="user_id" type="select" required>
                    <option value="">Seleccione un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </CrudFormInput>
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar esta venta?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </PageContent>
    );
}
