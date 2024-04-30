import styled from "styled-components";
import { cls } from "../../lib/utils";
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
        <TableContainer
            className={cls(
                "relative z-10 flex justify-around items-center w-full bg-[--c3] border-t-2 border-solid border-t-[--c3-txt2] rounded-md",
                " m-0 p-0 h-0 overflow-hidden opacity-0 ",
                classWrapper,
                {
                    " p-3 h-auto opacity-100 overflow-visible open ": isOpen,
                }
            )}
        >
            <div className=" scroll-style content_table w-full h-auto max-h-[calc(100vh-300px)] overflow-auto ">
                <table className="w-full text-center">
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
        </TableContainer>
    );
}

const TableContainer = styled.section`
    & table thead tr th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--c4);
        backdrop-filter: blur(2px);
        color: var(--c3-txt2);
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
        --radius: 10px;
    }

    & table thead tr th:first-child {
        border-radius: var(--radius) 0 0 var(--radius);
    }

    & table thead tr th:last-child {
        border-radius: 0 var(--radius) var(--radius) 0;
    }

    & table tr {
        height: 50px;
    }

    & table tbody tr:nth-child(2n) {
        background: rgba(0, 0, 0, 0.03);
    }

    & table tbody tr:hover:not(.skeleton) {
        background: rgba(0, 0, 0, 0.1);
    }

    & table tbody tr td {
        color: var(--c3-txt);
        opacity: 0.8;
    }
`;

export function CrudTableTdText({ value, classNameText = "" }) {
    return (
        <td>
            <span className={classNameText}>{value}</span>
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
                <img
                    src={src}
                    className=" w-10 max-h-10 aspect-square object-contain object-center rounded-sm "
                    alt={alt}
                />
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
        <td>
            <div className="flex gap-1 justify-center">{children}</div>
        </td>
    );
}
