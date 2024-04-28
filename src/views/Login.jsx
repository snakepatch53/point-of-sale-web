import { cls } from "../lib/utils";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { showNotification } from "../components/Notification";
import { useContext } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SessionContext } from "../contexts/session";
import { InfoContext } from "../contexts/info";
import Button from "../components/Button";

export default function Login() {
    const { info } = useContext(InfoContext);
    return (
        <>
            <section className="relative flex justify-center items-center  overflow-hidden font-content min-h-dvh">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `var(--gd1)`,
                    }}
                />
                <div className="relative z-10 flex flex-col  items-center p-10  w-full max-w-[400px] bg-black/10 rounded-sm">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full max-w-32 aspect-video bg-white rounded-lg p-1">
                            <img
                                src={info.logo_url}
                                alt={"Logo de " + info.name}
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                        <h3 className="text-[--c1-txt] text-3xl text-center font-title p-5 mb-2 text-white">
                            Iniciar sesion
                        </h3>
                    </div>
                    <Form />
                </div>
            </section>
        </>
    );
}
function Form() {
    const { progress, login } = useContext(SessionContext);
    return (
        <Formik
            validationSchema={Yup.object({
                email: Yup.string().required("Ingrese su correo electrónico"),
                password: Yup.string().required("Ingrese su contraseña"),
            })}
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values, { resetForm }) => {
                login(values).then((res) => {
                    if (!res?.success)
                        return showNotification({
                            title: "Cancelado",
                            message: res?.message || "Error al iniciar sesion",
                            type: "warning",
                        });
                    resetForm();
                    showNotification({
                        title: "Sesión iniciada",
                        message: "Bienvenido",
                        type: "success",
                    });
                });
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
                    <Input name="email" text="Correo electrónico" />
                    <Input name="password" text="Contraseña" type="password" />
                    <Button
                        as="button"
                        type="submit"
                        text={!progress ? "Iniciar Sesión" : ""}
                        icon={progress ? faSpinner : ""}
                        classIcon="animate-spin text-sm my-1"
                        className={cls("", {
                            "text-white/80 bg-black/30 hover:cursor-wait": progress,
                        })}
                    />
                </form>
            )}
        </Formik>
    );
}
function Input({ text, name, type = "text", className }) {
    return (
        <>
            <Field
                type={type}
                name={name}
                placeholder={text}
                className={cls(
                    "not-italic placeholder-shown:italic py-2 w-full border-solid border-b border-gray-400 bg-transparent text-[--c1-txt] outline-none text-white",
                    className
                )}
            />
            <div className="w-full h-5 text-red-500 text-sm">
                <ErrorMessage name={name} />
            </div>
        </>
    );
}
