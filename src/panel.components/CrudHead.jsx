import { faCirclePlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CrudHead({
    title,
    isOpen,
    onClickNew,
    icon = false,
    searchValue,
    searchOnChange,
    rightButtonComponent = false,
}) {
    return (
        <section
            className="relative z-10 grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-3 bg-[--c3-bg] rounded-sm border-solid border-t-[3px] border-[var(--c3-txt3)] shadow-[0_2px_5px_0_rgba(0,0,0,0.3)]"
            style={{
                margin: isOpen ? "0" : "0",
                padding: isOpen ? "10px" : "0",
                height: isOpen ? "auto" : "0",
                opacity: isOpen ? "1" : "0",
                overflow: isOpen ? "visible" : "hidden",
            }}
        >
            <div className="col-span-1 xl:col-span-1">
                <h3 className="flex gap-1 w-full h-full items-center justify-center md:justify-start font-content2 font-bold text-md text-[var(--c3-txt3)]">
                    {icon && <FontAwesomeIcon icon={icon} className="text-sm mb-1" />} {title}
                </h3>
            </div>
            {/* <div className="flex sm:justify-end xl:justify-start w-full h-full">
                <div className="flex justify-center w-full md:w-24 h-8 bg-[#4f7d8b] rounded-md">
                    <select className="px-1 h-full bg-transparent text-md text-white">
                        <option className="text-black" value="">
                            Reporte
                        </option>
                        <option className="text-black" value="pdf">
                            PDF
                        </option>
                        <option className="text-black" value="excel">
                            EXCEL
                        </option>
                        <option className="text-black" value="csv">
                            CSV
                        </option>
                    </select>
                </div>
            </div> */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex w-full h-8 items-center rounded-md overflow-hidden border border-solid border-[--c6-bg]">
                <span className="flex justify-center items-center h-full px-2 bg-[--c6-bg] text-[--c6-txt]">
                    Buscar:{" "}
                </span>
                <div className="flex items-center w-full h-full px-2 bg-[--c3-bg]">
                    <FontAwesomeIcon icon={faSearch} className="text-[--c3-txt4]" />
                    <input
                        type="search"
                        placeholder="Busca por cualquier campo.."
                        value={searchValue}
                        onChange={searchOnChange}
                        className="w-full pl-1 bg-[--c3-bg]"
                    />
                </div>
            </div>

            {!rightButtonComponent && (
                <div className="w-full flex justify-end">
                    <div className="w-full lg:w-24">
                        <Button
                            text="Agregar"
                            icon={faCirclePlus}
                            type="new"
                            onClick={onClickNew}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            )}
            {rightButtonComponent && (
                <div className="w-full flex justify-end">
                    <div className="w-full lg:w-24">{rightButtonComponent}</div>
                </div>
            )}
        </section>
    );
    // return (
    //     <section className={"panel-crudhead-component " + (isOpen ? "open" : "")}>
    //         <h3>{title}</h3>
    //         <hr className="d" />
    //         <div className="report ideareport">
    //             <select id="selectReport">
    //                 <option value="">Reporte</option>
    //                 <option value="pdf">PDF</option>
    //                 <option value="excel">EXCEL</option>
    //                 <option value="csv">CSV</option>
    //             </select>
    //         </div>
    //         <hr className="d" />
    //         <div className="search ideasearch w-full">
    //             <span>Buscar: </span>
    //             <div className="content">
    //                 <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
    //                 <input
    //                     type="search"
    //                     placeholder="Busca por cualquier campo.."
    //                     id="inputSearch"
    //                     className="w-full"
    //                 />
    //             </div>
    //         </div>
    //         <hr className="d" />

    //         <Button text="Agregar" icon={faCirclePlus} type="new" onClick={onClickNew} />
    //     </section>
    // );
}
