// import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../lib/utils";

export default function Button({
    icon = null,
    text,
    type = "normal",
    _type = "button",
    tagType = 1,
    className = "",
    classNameText = "",
    classNameIcon = "",
    classNameBeffore = "",
    ...props
}) {
    let _className = "";
    if (type == "normal") _className = "bg-var[--color1-bg] text-[var(--color1-txt)]";
    if (type == "new") _className = "bg-[#00a65a] text-white";
    if (type == "edit") _className = "bg-[#037bfd] text-white";
    if (type == "delete") _className = "bg-[#dc3144] text-white";
    if (type == "cancel") _className = "bg-[#db5968] text-white";

    let classNameWrapper = cls(
        "relative group flex overflow-hidden w-auto h-8 gap-1 px-2 py-4 justify-center items-center rounded cursor-pointer",
        _className,
        className
    );

    let childrens = (
        <>
            <div
                className={cls(
                    "absolute bottom-0 left-[50%] translate-x-[-50%] w-0 h-0.5 bg-white duration-300 transition-all group-hover:w-full",
                    classNameBeffore
                )}
            />
            {icon && (
                <FontAwesomeIcon icon={icon} className={cls("text-[0.65rem]", classNameIcon)} />
            )}
            <span className={cls("text-sm", classNameText)}>{text}</span>
        </>
    );

    if (tagType == 1)
        return (
            <button type={_type} className={cls(classNameWrapper, className)} {...props}>
                {childrens}
            </button>
        );

    if (tagType == 2)
        return (
            <a
                type={_type}
                className={cls(classNameWrapper, "cursor-pointer", className)}
                {...props}
            >
                {childrens}
            </a>
        );
}
