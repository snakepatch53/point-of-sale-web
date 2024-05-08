import { faCamera, faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "../panel.components/ui/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getCourses } from "../services/courses";
// import { isCedula, isEmail, isUrl, isValidateRequired } from "../utils/validations";
import { showNotification } from "../component/Notification";
import { updateProfile } from "./../services/users";
import CrudProgress from "../panel.components/CrudProgress";
import PageContent from "../component/PageContent";
import { SessionContext } from "../context/session";
import CrudBackground from "../panel.components/CrudBackground";
import { isEmail, isValidateRequired } from "../utils/validations";

export default function Profile() {
    const { session, updateSession } = useContext(SessionContext);
    const [progress, setProgress] = useState(null);
    const $form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const $_form = e.target;
        $form.current.onsubmit = (e) => {
            e.preventDefault();
            if (!isValidateRequired($_form, ["photo", "password", "confirm_password"]).isValidate) {
                return showNotification({
                    title: "Error de validación",
                    message: "Complete los campos requeridos (*)",
                    type: "warning",
                });
            }
            if (!isEmail($_form.email.value)) {
                return showNotification({
                    title: "Error de validación",
                    message: "El email debe ser válido",
                    type: "warning",
                });
            }
            if ($_form.password.value !== $_form.confirm_password.value) {
                return showNotification({
                    title: "Error de validación",
                    message: "Las contraseñas no coinciden",
                    type: "warning",
                });
            }
            const data = new FormData($_form);
            if ($_form.password.value.length == 0) {
                data.delete("password");
                data.delete("confirm_password");
            }
            setProgress(true);
            updateProfile({ data }).then((res) => {
                setProgress(false);
                if (res?.success) {
                    updateSession(res.data);
                    showNotification({
                        title: "Exito",
                        message: "Sus datos han sido actualizados correctamente",
                        type: "success",
                    });
                    $_form.password.value = "";
                    $_form.confirm_password.value = "";
                } else {
                    showNotification({
                        title: "Error desde el servidor",
                        message: res.message || "Error al actualizar sus datos",
                        type: "danger",
                    });
                }
            });
        };
    };

    return (
        <>
            <PageContent className="flex w-full m-auto">
                <CrudBackground src="/image/drink1.jpg" />
                <div className="scroll-style relative z-10 w-full max-w-[var(--max-width)] bg-white rounded-lg shadow-xl p-[--pdd]">
                    <form onSubmit={handleSubmit} ref={$form} className="flex w-full" noValidate>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 content-center w-full justify-center gap-10   ">
                            <InputImage
                                src={session.photo_url}
                                fileName="photo"
                                inputLabel="Cambiar Foto"
                                tagImgName="photo_img"
                            />
                            <Input label="Nombre" name="name" value={session.name} required />
                            <Input
                                label="Apellido"
                                name="lastname"
                                value={session.lastname}
                                required
                            />
                            <Input label="Celular" name="phone" value={session.phone} required />
                            <Input
                                label="Privilegio"
                                name="role"
                                value={session.role}
                                disabled
                                required
                            />
                            <Input
                                label="Estado"
                                name="state"
                                value={session.state}
                                disabled
                                required
                            />
                            <Input
                                label="Dirección"
                                name="address"
                                value={session.address}
                                required
                            />
                            <Input label="Email" name="email" value={session.email} required />
                            <Input label="Contraseña" name="password" type="password" />
                            <Input
                                label="Confirmar Contraseña"
                                name="confirm_password"
                                type="password"
                            />
                            <div className="col-span-1 lg:col-span-2 xl:col-span-3 flex flex-col justify-center items-center p-5 bg-white rounded-lg ">
                                <Button
                                    icon={faSave}
                                    text="Guardar Cambios"
                                    type="edit"
                                    _type="submit"
                                    className="w-full max-w-96 py-5 px-10 rounded-full bg-[--c6-bg] hover:scale-105"
                                    classNameText="text-base font-content2"
                                    classNameIcon="text-sm"
                                    classNameBeffore="hidden"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </PageContent>
            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </>
    );
}

const InputImage = ({
    src,
    fileName,
    inputLabel = "",
    inputIcon = faCamera,
    fileAccept = "image/jpg",
    tagImgName = "",
    imgObjectCover = true,
}) => {
    const $img = useRef(null);
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $img.current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex content-center justify-center col-span-1 lg:col-span-2 xl:col-span-3 mb-5">
            <div className="relative group/img w-full max-w-52 aspect-square rounded-full shadow-xl overflow-hidden">
                <img
                    ref={$img}
                    src={src}
                    alt={"Imagen de " + fileName}
                    className={
                        "w-full h-full object-center bg-gray-300 " +
                        (imgObjectCover ? "object-cover" : "object-contain")
                    }
                    name={tagImgName}
                />

                <input
                    type="file"
                    name={fileName}
                    id={fileName}
                    accept={fileAccept}
                    className="hidden"
                    onChange={handleChange}
                />
                <label
                    htmlFor={fileName}
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-0 max-h-0 overflow-hidden group-hover/img:max-w-52 group-hover/img:max-h-52 opacity-0 group-hover/img:opacity-100 flex flex-col gap-2 justify-center items-center bg-black/50 cursor-pointer duration-100"
                >
                    <FontAwesomeIcon icon={inputIcon} className="text-3xl text-white" />
                    <span
                        className="text-white"
                        style={{
                            textShadow:
                                "1px 0 1px #000, -1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000",
                        }}
                    >
                        {inputLabel}
                    </span>
                </label>
            </div>
        </div>
    );
};

const Input = ({
    label,
    type = "text",
    value = "",
    classNameWrapper = "",
    classNameSubWrapper = "",
    required = false,
    disabled = false,
    ...props
}) => {
    const $input = useRef(null);
    useEffect(() => {
        $input.current.value = value;
        haveText({ target: $input.current });
    }, [value]);
    const haveText = ({ target }) => {
        if (target.value.length > 0) target.classList.add("[&+label]:bottom-full");
        else target.classList.remove("[&+label]:bottom-full");
    };
    return (
        <div className={"flex justify-center w-full " + classNameWrapper}>
            <div
                className={
                    "group relative w-full max-w-80 border-b border-solid border-gray-300 " +
                    classNameSubWrapper
                }
            >
                <input
                    type={type}
                    {...props}
                    className={
                        "w-full [&:focus+label]:bottom-full " +
                        (disabled ? "opacity-70 hover:cursor-not-allowed" : "")
                    }
                    onInput={haveText}
                    ref={$input}
                    required={required}
                    disabled={disabled}
                />
                <label className="absolute left-0 bottom-0 group-hover:bottom-full opacity-50">
                    {label}
                    {required && <span className="text-red-500">*</span>}:{" "}
                </label>
            </div>
        </div>
    );
};
