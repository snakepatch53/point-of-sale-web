import { cls } from "../utils/utils";
import "./CrudTable.css";
import CrudTableSkeleton from "./CrudTableSkeleton";

export function CrudTable({
    titles,
    isOpen,
    dataList,
    onRowPrint,
    actionsNum = 2,
    actionText = "Acción",
    classWrapper = "",
}) {
    return (
        <section
            className={cls("relative z-10 panel-crudtable-component", classWrapper, {
                open: isOpen,
            })}
        >
            <div className="content_table ideatable scroll-style">
                <table border="1">
                    <thead>
                        <tr>
                            {titles.map((title) => (
                                <th key={title}>{title}</th>
                            ))}
                            <th>{actionText}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.map((row) => onRowPrint(row))}
                        {!dataList && (
                            <>
                                <CrudTableSkeleton cols={titles.length} actionsNum={actionsNum} />
                                <CrudTableSkeleton cols={titles.length} actionsNum={actionsNum} />
                                <CrudTableSkeleton cols={titles.length} actionsNum={actionsNum} />
                                <CrudTableSkeleton cols={titles.length} actionsNum={actionsNum} />
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export function CrudTableTdText({ value, classNameText = "" }) {
    return (
        <td>
            <span className={"td-span " + classNameText}>{value}</span>
        </td>
    );
}

export function CrudTableTdUrl({ value, className = "", ...props }) {
    return (
        <td>
            <a className={"td-span hover:underline " + className} {...props}>
                {value}
            </a>
        </td>
    );
}

export function CrudTableTdImage({ src, alt }) {
    return (
        <td>
            <div className="flex justify-center">
                <img src={src} className="td-photo" alt={alt} />
            </div>
        </td>
    );
}

export function CrudTableTdSvg({ code, className = "", fill = "#000", ...props }) {
    return (
        <td>
            <div className={"flex justify-center" + className} {...props}>
                <div className="w-5 aspect-square">
                    <div
                        dangerouslySetInnerHTML={{ __html: code }}
                        style={{ fill }}
                        className="w-full h-ful"
                    />
                </div>
            </div>
        </td>
    );
}

export function CrudTableTdFlex({ children }) {
    return (
        <td className="td-action">
            <div className="buttons-flex">{children}</div>
        </td>
    );
}
