import { useRef } from "react";
import PageContent from "../component/PageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../utils/utils";
import Products from "../panel.pages/Products";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalProducts({ businessId, setBusinessId }) {
    const isOpen = businessId !== null;
    const onClose = () => setBusinessId(null);
    const modalRef = useRef();
    document.addEventListener("click", (e) => {
        if (modalRef.current && e.target === modalRef.current) {
            onClose();
        }
    });
    return (
        <PageContent
            className={cls(
                "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-full h-full bg-black/40",
                {
                    "w-0 h-0 overflow-hidden opacity-0": !isOpen,
                    "w-full h-full opacity-100": isOpen,
                }
            )}
        >
            <div
                ref={modalRef}
                className="relative flex justify-center items-center w-full h-full cursor-pointer"
            >
                <button
                    className="absolute top-1 right-1 flex justify-center items-center w-10 aspect-square rounded-full bg-black/50 opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faXmark} className="text-white text-2xl" />
                </button>
                <div
                    className={cls(
                        "container flex justify-center items-center bg-white rounded-xl",
                        {
                            "p-[--pdd]": isOpen,
                            "p-0": !isOpen,
                        }
                    )}
                >
                    {isOpen && <Products businessId={businessId} />}
                    {/* {business && <Products business={business} />} */}
                </div>
            </div>
        </PageContent>
    );
}
