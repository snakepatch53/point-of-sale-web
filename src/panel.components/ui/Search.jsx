import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../lib/utils";

export default function Search({ className = "", placeholder, onSearch }) {
    return (
        <div className={cls("rounded-md", className)}>
            <div className="w-full flex items-center gap-1 bg-[--c3] p-3 rounded-md text-white">
                <input
                    className="flex-1 bg-transparent"
                    type="text"
                    placeholder={placeholder || "Buscar..."}
                    onChange={onSearch}
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    );
}
