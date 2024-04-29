import "./CrudConfirm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { faCircleXmark, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../lib/utils";

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
            <div className="flex flex-col w-auto max-w-96 h-auto max-h-52 bg-[--c4] rounded-md  ">
                <div className="head">
                    <p className="msg">{text}</p>
                    <button id="modalClose" onClick={onClickCancel}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="foot">
                    <Button
                        text="Cancelar"
                        icon={faCircleXmark}
                        type="cancel"
                        onClick={onClickCancel}
                        className="bg-gray-500"
                    />
                    <Button text="Eliminar" icon={faTrash} type="delete" onClick={onClickDelete} />
                </div>
            </div>
        </section>
        // <section
        //     className={"panel-crudconfirm-component " + (isOpen ? "open" : "")}
        //     onClick={(evt) => {
        //         if (evt.target === evt.currentTarget) onClickCancel();
        //     }}
        // >
        //     <div className="ideaconfirm">
        //         <div className="head">
        //             <p className="msg">{text}</p>
        //             <button id="modalClose" onClick={onClickCancel}>
        //                 <FontAwesomeIcon icon={faClose} />
        //             </button>
        //         </div>
        //         <div className="foot">
        //             <Button
        //                 text="Cancelar"
        //                 icon={faCircleXmark}
        //                 type="cancel"
        //                 onClick={onClickCancel}
        //                 className="bg-gray-500"
        //             />
        //             <Button text="Eliminar" icon={faTrash} type="delete" onClick={onClickDelete} />
        //         </div>
        //     </div>
        // </section>
    );
}
