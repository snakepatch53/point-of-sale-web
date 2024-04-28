import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../lib/utils";

export default function Button({
    children,
    as = "button",
    text = null,
    icon = null,
    className = "",
    classText = "",
    classIcon = "",
    ...props
}) {
    const Component = as;
    return (
        <Component
            className={cls(
                "flex justify-center items-center gap-1 bg-[--c3] py-2 px-2 rounded-sm font-sans text-[--c3-txt] text-md uppercase opacity-80 transition-all hover:scale-[1.02] hover:opacity-100 ",
                className
            )}
            {...props}
        >
            {children ? (
                children
            ) : (
                <>
                    {icon && <FontAwesomeIcon icon={icon} className={classIcon} />}
                    {text && <span className={cls(classText)}>{text}</span>}
                </>
            )}
        </Component>
    );
}
