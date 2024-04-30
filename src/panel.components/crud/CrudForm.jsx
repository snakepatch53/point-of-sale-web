import { faBan, faSave } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../lib/utils";
import Button from "../../components/Button";

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
    return (
        <section
            className={cls(
                "relative z-10 flex justify-around items-center w-full bg-[--c3] border-t-2 border-solid border-t-[--c3-txt2] rounded-md ",
                "m-0 px-0 py-0 h-0 overflow-hidden opacity-0 ",
                {
                    "px-4 py-2 h-auto opacity-100 overflow-visible ": isOpen,
                }
            )}
        >
            <form
                className=" flex flex-col w-full h-auto "
                onSubmit={onSubmit}
                ref={formRef}
                noValidate
            >
                <div className=" flex justify-start items-center w-full h-10 ">
                    <h3 className="uppercase font-sans font-bold text-lg text-[--c3-txt2]">
                        {title}
                    </h3>
                </div>
                <div className=" grid lg:grid-cols-2 gap-5 py-3 ">{children}</div>
                <div className=" flex flex-col py-5 ">
                    <div className=" flex gap-2 ">
                        {showSaveButton && (
                            <Button
                                text="Guardar"
                                icon={faSave}
                                type="submit"
                                className="bg-[--c1] "
                            />
                        )}
                        <Button text={textCancel} icon={faBan} onClick={onClickCancel} />
                    </div>
                </div>
            </form>
        </section>
    );
}
