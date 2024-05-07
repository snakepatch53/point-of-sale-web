import CrudHead from "../panel.components/crud/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/crud/CrudTable";
import { CrudForm } from "../panel.components/crud/CrudForm";
import { CrudFormInput } from "../panel.components/crud/CrudInput";
import CrudConfirm from "../panel.components/crud/CrudConfirm";
import CrudProgress from "../panel.components/crud/CrudProgress";
import { faBan, faFilePdf, faUsers } from "@fortawesome/free-solid-svg-icons";
import "react-notifications-component/dist/theme.css";
import {
    destroyProductSale,
    getProductSales,
    storageProductSale,
    updateProductSale,
} from "../services/productSales";
import useCrudPanel from "../hooks/useCrudPanel";
import PageContent from "../components/PageContent";
import Button from "../components/Button";

export default function ProductSales() {
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
        crudGet: getProductSales,
        crudStorage: storageProductSale,
        crudUpdate: updateProductSale,
        crudDestroy: destroyProductSale,
    });

    return (
        <PageContent className="flex flex-col gap-7 w-full p-3">
            <CrudHead
                title={pluralEntityName}
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                handleSearch={handleSearch}
                rightButtonComponent={true}
            />

            <CrudTable
                titles={["Fecha", "Cliente", "Total"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.date_str} />
                        <CrudTableTdText value={item?.client?.name} />
                        <CrudTableTdText value={"$" + item.total} />
                        <CrudTableTdFlex>
                            <Button
                                icon={faFilePdf}
                                onClick={() => handleModeDelete(item)}
                                classIcon="text-[--c3-txt2]"
                            />
                            <Button
                                icon={faBan}
                                // onClick={() => handleModeDelete(item)}
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
                    label="Fecha de venta"
                    placeholder="Escriba la fecha "
                    name="date"
                    required
                />
                <CrudFormInput label="Iva" placeholder="Escriba el iva  " name="tax" required />
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
