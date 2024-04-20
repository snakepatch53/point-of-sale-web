import "./CrudConfirm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faCircleXmark, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CrudConfirm({ isOpen, text, onClickDelete, onClickCancel }) {
    return (
        <section
            className={"panel-crudconfirm-component " + (isOpen ? "open" : "")}
            onClick={(evt) => {
                if (evt.target === evt.currentTarget) onClickCancel();
            }}
        >
            <div className="ideaconfirm">
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
    );
}
