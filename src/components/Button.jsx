import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../lib/utils";

export default function Button({
    children,
    as = "button",
    text = null,
    icon = null,
    classNameWrap = "",
    classNameIcon = "",
    ...props
}) {
    const Component = as;
    return (
        <Component
            className={cls(
                "bg-[--c3] py-2 rounded-sm text-[--c3-txt] text-md uppercase ",
                classNameWrap
            )}
            {...props}
        >
            {children ? (
                children
            ) : (
                <>
                    {icon && <FontAwesomeIcon icon={icon} className={classNameIcon} />}
                    {text && <span>{text}</span>}
                </>
            )}
        </Component>
    );
}
