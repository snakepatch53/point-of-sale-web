import Loading from "../components/Loading";
import { cls } from "../lib/utils";

export default function CrudProgress({ isOpen }) {
    return (
        <section
            className={cls(
                "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/50 w-full h-full opacity-0 max-w-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out",
                {
                    "max-w-full max-h-full opacity-100": isOpen,
                }
            )}
        >
            <div className="relative flex justify-center items-center w-full h-full">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                <div className="relative z-10  w-full h-full max-w-72 max-h-44 bg-white/80 rounded-md">
                    <Loading classWrapper="h-full" />
                </div>
            </div>
        </section>
    );
}
