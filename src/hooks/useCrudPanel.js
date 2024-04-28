import { useEffect, useRef, useState } from "react";
import { isValidateRequired, resetForm, setValuesForm } from "../lib/validations";
import * as validator from "../lib/validations";
import { showNotification } from "../components/Notification";

export default function useCrudPanel({
    entityName,
    pluralEntityName,
    excludeFieldsValidationEdit = [],
    extraValidations = () => true,
    isStorageMultipartFormData = false,
    isUpdateMultipartFormData = false,
    crudGet = null,
    crudStorage = null,
    crudUpdate = null,
    crudDestroy = null,
    gender = true,
    searchFields = [],
}) {
    const [head, setHead] = useState(true);
    const [table, setTable] = useState(true);
    const [form, setForm] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [progress, setProgress] = useState(false);

    const modeForm = () => {
        setHead(false);
        setTable(false);
        setForm(true);
        setConfirm(false);
        setProgress(false);
    };

    const modeTable = () => {
        setHead(true);
        setTable(true);
        setForm(false);
        setConfirm(false);
        setProgress(false);
    };

    const modeConfirm = () => {
        setHead(true);
        setTable(true);
        setForm(false);
        setConfirm(true);
        setProgress(false);
    };

    const showProgress = (bool) => {
        setProgress(bool);
    };

    const [datalist, setDatalist] = useState(null);
    const [datalistFilter, setDatalistFilter] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const $form = useRef(null);

    useEffect(() => {
        if (!crudGet) return setDatalist([]);
        crudGet().then((res) => setDatalist(res));
    }, [crudGet]);

    function handleSearch(e) {
        console.log("hola");
        const search = e.target.value.toLowerCase();

        if (!search) return setDatalistFilter(null);
        // search can be a object "teacher.name" or "name" etc
        const filter = datalist.filter((item) => {
            let isMatch = false;

            for (const field of searchFields) {
                const value = item[field] ? item[field].toString().toLowerCase() : "";
                if (field.includes(".")) {
                    const [object, key] = field.split(".");
                    if (item[object][key]?.toLowerCase()?.includes(search)) isMatch = true;
                } else if (value?.toLowerCase()?.includes(search)) isMatch = true;
            }
            return isMatch;
        });
        setDatalistFilter(filter);
    }

    function handleModeNew() {
        modeForm();
        setSelectedItem(null);
        resetForm($form.current);
    }

    function handleModeEdit(row) {
        modeForm();
        setSelectedItem(row);
        setValuesForm(row, $form.current, 100);
    }

    function handleModeDelete(row) {
        modeConfirm();
        setSelectedItem(row);
    }

    function hanleCancel() {
        modeTable();
        showNotification({
            title: "Cancelado",
            message: "Se cancelo la operación",
            type: "warning",
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const $form = e.target;
        let validate = isValidateRequired($form);
        if (selectedItem) validate = isValidateRequired($form, excludeFieldsValidationEdit);

        if (!validate.isValidate) {
            return showNotification({
                title: "Error de validación",
                message: "Complete los campos requeridos (*)",
                type: "warning",
            });
        }

        if (!extraValidations($form, showWarnningNotification, validator)) return;

        const formData = validator.getFormDataFieldsNotVoid($form);
        showProgress(true);
        if (selectedItem) return handleUpdate(formData);
        return handleNew(formData);
    }

    function handleNew(formData) {
        let data = formData;
        if (!isStorageMultipartFormData) data = validator.formdataToObject(formData);
        crudStorage({ data }).then((res) => {
            showProgress(false);
            if (res?.success) {
                const newUser = res.data;
                setDatalist([...datalist, newUser]);
                showNotification({
                    title: "Exito",
                    message: `${entityName} cread${gender ? "o" : "a"} correctamente`,
                    type: "success",
                });
                modeTable();
            } else {
                showNotification({
                    title: "Error desde el servidor",
                    message: res.message || `"Error al crear ${gender ? "el" : "la"} ${entityName}`,
                    type: "danger",
                });
            }
        });
    }

    function handleUpdate(formData) {
        let data = formData;
        if (!isUpdateMultipartFormData) data = validator.formdataToObject(formData);
        crudUpdate({ id: selectedItem.id, data }).then((res) => {
            showProgress(false);
            if (res?.success) {
                const newUser = res.data;
                const index = datalist.findIndex((item) => item.id === newUser.id);
                const newUsers = [...datalist];
                newUsers[index] = newUser;
                setDatalist(newUsers);
                showNotification({
                    title: "Exito",
                    message: `${entityName} actualizad${gender ? "o" : "a"} correctamente`,
                    type: "success",
                });
                modeTable();
            } else {
                showNotification({
                    title: "Error desde el servidor",
                    message:
                        res.message || `Error al actualizar ${gender ? "el" : "la"} ${entityName}`,
                    type: "danger",
                });
            }
        });
    }

    function handleDelete() {
        if (!selectedItem?.id)
            return showNotification({
                title: "Error de validación",
                message: `Seleccione ${gender ? "un" : "una"} ${entityName} a eliminar`,
                type: "danger",
            });
        showProgress(true);
        crudDestroy({ id: selectedItem.id }).then((res) => {
            showProgress(false);
            if (res?.success) {
                const newUsers = datalist.filter((item) => item.id !== selectedItem.id);
                setDatalist(newUsers);
                showNotification({
                    title: "Exito",
                    message: `${entityName} eliminad${gender ? "o" : "a"} correctamente`,
                    type: "success",
                });
            } else {
                showNotification({
                    title: "Error desde el servidor",
                    message:
                        res?.message || `Error al eliminar ${gender ? "el" : "la"} ${entityName}`,
                    type: "danger",
                });
            }
            modeTable();
        });
    }

    return {
        entityName,
        pluralEntityName,
        head,
        table,
        form,
        confirm,
        progress,
        datalist: datalistFilter || datalist,
        $form,
        handleModeNew,
        handleModeEdit,
        handleModeDelete,
        hanleCancel,
        handleSubmit,
        handleDelete,
        handleSearch,
        showProgress,
        updateDatalist: (newDatalist) => setDatalist(newDatalist),
    };
}

function showWarnningNotification(message) {
    showNotification({
        title: "Error de validación",
        message,
        type: "warning",
    });
}
