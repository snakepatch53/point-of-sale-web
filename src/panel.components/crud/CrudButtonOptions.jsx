import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";

export default function CrudButtonOptions({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const optionsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) setIsOpen(false);
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // if click outside close

    return (
        <div ref={optionsRef} className="flex flex-col justify-center items-center w-full">
            <div className="relative w-10 aspect-square">
                <button
                    className="flex justify-center items-center w-full h-full rounded-full cursor-pointer opacity-60 hover:opacity-100 hover:bg-black/10"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={faEllipsisV} className="text-lg" />
                </button>
                <div
                    className={
                        "absolute right-[calc(100%+5px)] top-[50%] translate-y-[-50%] overflow-hidden flex h-auto gap-1 bg-white/40 rounded-lg shadow " +
                        (isOpen ? "max-w-[500px] p-2 opacity-100" : "max-w-0 p-0 opacity-0")
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
