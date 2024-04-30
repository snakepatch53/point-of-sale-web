import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../lib/utils";
import Button from "../../components/Button";

export default function CrudConfirm({ isOpen, text, onClickDelete, onClickCancel }) {
    return (
        <section
            className={cls(
                "fixed inset-0 flex justify-center items-center w-full m-auto bg-[--c3] z-50 overflow-hidden h-0 opacity-0 transition ",
                {
                    " h-full opacity-1 ": isOpen,
                }
            )}
            onClick={(evt) => {
                if (evt.target === evt.currentTarget) onClickCancel();
            }}
        >
            <div className="flex flex-col w-auto max-w-96 h-auto max-h-52 bg-[--c4] backdrop-blur-sm rounded-md ">
                <div className="relative flex py-5 px-10 border-solid border-b border-b-black/20 ">
                    <p className=" font-sans text-xl text-[--c3-txt] text-balance opacity-80 ">{text}</p>
                    <button className=" absolute top-0 right-0 flex justify-center items-center w-8 aspect-square text-lg text-[--c3-txt] opacity-50 transition hover:opacity-100 hover:text-2xl " onClick={onClickCancel}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="flex justify-end gap-3 p-3">
                    <Button text="Cancelar" icon={faBan} onClick={onClickCancel} />
                    <Button text="Eliminar" icon={faTrash}  onClick={onClickDelete} className="bg-[--c1] text-[--c1-txt] " />

                </div>
            </div>
        </section>
    );
}
