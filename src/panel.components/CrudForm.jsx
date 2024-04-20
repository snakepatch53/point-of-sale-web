import "./CrudForm.css";
import {
    faCircleXmark,
    faEye,
    faEyeSlash,
    faImage,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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
                    <h3>{title}</h3>
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
                <div className="inputfile">
                    <input className="placeholder_off" accept={accept} {...props} />
                    <FontAwesomeIcon icon={faImage} />
                </div>
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
                    <div className="inputpass ">
                        <input {...props} type={showPass ? "password" : "text"} />
                        <button
                            type="button"
                            className="ideabutton showpass flex justify-center items-center"
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
                <div
                    className="flex w-full rounded-sm overflow-hidden bg-white"
                    style={{ border: "solid 1px rgba(0, 0, 0, 0.2)" }}
                >
                    {radioOptions.map(({ value, label, checked = false }) => (
                        <div className="relative flex-1" key={value}>
                            <input
                                {...props}
                                type="radio"
                                id={props.name + "-" + value}
                                name={props.name}
                                value={value}
                                className={
                                    "hidden [&:checked~div]:w-full [&:checked~label]:opacity-100 [&:checked~label]:font-bold [&:checked~label]:text-[var(--info)] "
                                }
                                defaultChecked={checked}
                            />
                            <div className="absolute bottom-0 left-0 right-0 m-auto w-0 h-0.5 bg-[var(--info)] transition-all duration-200" />
                            <label
                                htmlFor={props.name + "-" + value}
                                className={
                                    "cursor-pointer flex w-full h-full justify-center text-center p-1 transition-all duration-200 opacity-80 hover:opacity-100 " +
                                    (props?.disabled ? "cursor-not-allowed opacity-40" : "")
                                }
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
