import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../ui/Search";
import Button from "../../components/Button";

export default function CrudHead({
    title,
    isOpen,
    onClickNew,
    icon = false,
    rightButtonComponent = false,
    handleSearch,
}) {
    return (
        <section
            className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-5 w-full bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2]"
            style={{
                margin: isOpen ? "0" : "0",
                padding: isOpen ? "10px" : "0",
                height: isOpen ? "auto" : "0",
                opacity: isOpen ? "1" : "0",
                overflow: isOpen ? "visible" : "hidden",
            }}
        >
            <div className="col-span-1 xl:col-span-1">
                <h3 className="flex gap-1 w-full h-full items-center justify-center md:justify-start font-sans font-bold uppercase text-md text-[--c3-txt2]">
                    {icon && <FontAwesomeIcon icon={icon} className="text-sm" />} {title}
                </h3>
            </div>

            <Search
                className="flex-1 w-full md:max-w-96"
                onSearch={handleSearch}
                placeholder="Buscar por cualquier campo..."
            />

            {!rightButtonComponent && (
                <Button
                    as="button"
                    text="Agregar"
                    icon={faPlus}
                    onClick={onClickNew}
                    className="bg-[--c1] w-full md:w-auto"
                    classText="font-sans"
                    classIcon="text-sm"
                />
            )}
            {rightButtonComponent && (
                <div className="flex justify-end">
                    <div className="w-full lg:w-24">{rightButtonComponent}</div>
                </div>
            )}
        </section>
    );
}
