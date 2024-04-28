import "./CrudForm.css";
import {
    faCircleXmark,
    faEye,
    faEyeSlash,
    faImage,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { cls } from "../../lib/utils";

export function CrudForm({
    children,
    title,
    onClickCancel,
    isOpen,
    onSubmit,
    formRef,
    showSaveButton = true,
    textCancel = "Cancelar",
}) {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit();
    // };

    return (
        <section className={"relative z-10 panel-crudform-component " + (isOpen ? "open" : "")}>
            <form className="ideaform" onSubmit={onSubmit} ref={formRef} noValidate>
                <div className="head">
                    <h3 className="uppercase font-sans font-bold text-md text-[--c3-txt2]">
                        {title}
                    </h3>
                </div>
                <div className="body">{children}</div>
                <div className="foot">
                    <div className="msg" id="msg"></div>
                    <div className="buttons">
                        {showSaveButton && (
                            <Button text="Guardar" icon={faSave} type="edit" _type="submit" />
                        )}
                        <Button
                            text={textCancel}
                            icon={faCircleXmark}
                            type="cancel"
                            onClick={onClickCancel}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}

export function CrudFormInput({
    label,
    name,
    placeholder,
    type = "text",
    required = false,
    classNameWrapper = "",
    ...props
}) {
    return (
        <div className={"campo " + classNameWrapper}>
            <span>
                {label} {required ? <b>*</b> : ""}:
            </span>

            <InputForm
                type={type}
                name={name}
                placeholder={placeholder}
                {...props}
                required={required}
            />
        </div>
    );
}

function InputForm({ radioOptions = [], ...props }) {
    const elements = [
        {
            type: "file",
            Component: ({ accept = "image/jpg" }) => (
                <label
                    htmlFor={"inputfile-" + props.name}
                    className="relative flex w-full cursor-pointer bg-[--c3] rounded-md "
                >
                    <input
                        id={"inputfile-" + props.name}
                        className="nostyles font-sans py-2 pl-3 text-[--c3-txt] opacity-80 w-full "
                        accept={accept}
                        {...props}
                    />
                    <div className="absolute inset-0 flex items-center gap-1 w-[164px] h-full pl-1 bg-[--c5] backdrop-blur-md rounded-tl-md rounded-bl-md font-sans text-[--c3-txt] cursor-pointer ">
                        <FontAwesomeIcon icon={faImage} />
                        Seleccionar archivo
                    </div>
                </label>
            ),
        },
        {
            type: "select",
            Component: () => <select {...props}>{props.children}</select>,
        },
        {
            type: "textarea",
            Component: () => (
                <textarea
                    {...props}
                    className={
                        "border-solid border border-gray-300 rounded-xm p-2 bg-white " +
                        props.className
                    }
                ></textarea>
            ),
        },
        {
            type: "password",
            Component: () => {
                const [showPass, setShowPass] = useState(true);
                const handleShowPass = () => {
                    setShowPass(!showPass);
                };
                return (
                    <div className="flex bg-[--c3] rounded-md ">
                        <input
                            className="nostyles flex-1 bg-transparent py-3 px-2.5 text-[--c3-txt] "
                            {...props}
                            type={showPass ? "password" : "text"}
                        />
                        <button
                            type="button"
                            className="flex justify-center items-center h-full aspect-square text-[--c3-txt2] rounded-md"
                            onClick={handleShowPass}
                        >
                            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                        </button>
                    </div>
                );
            },
        },
        {
            type: "radio",
            Component: () => (
                <div className="flex w-full rounded-md overflow-hidden bg-[--c3]">
                    {radioOptions.map(({ value, label, checked = false }) => (
                        <div className="relative flex-1" key={value}>
                            <input
                                {...props}
                                type="radio"
                                id={props.name + "-" + value}
                                name={props.name}
                                value={value}
                                className={
                                    "hidden [&:checked~div]:w-full [&:checked~label]:opacity-100 [&:checked~label]:font-bold [&:checked~label]:text-[--c3-txt2]  "
                                }
                                defaultChecked={checked}
                            />
                            <div className="absolute bottom-0 left-0 right-0 m-auto w-0 h-0.5 bg-[--c3-txt2] transition-all duration-200" />
                            <label
                                htmlFor={props.name + "-" + value}
                                className={cls(
                                    "cursor-pointer flex w-full h-full justify-center text-[--c3-txt] text-center py-2.5 px-1 transition-all duration-200 opacity-80 hover:opacity-100 ",
                                    {
                                        "cursor-not-allowed opacity-40": props?.disabled,
                                    }
                                )}
                            >
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    const match = elements.find((el) => el.type == props.type);
    if (match) {
        return <match.Component />;
    }
    return <input {...props} />;
}
