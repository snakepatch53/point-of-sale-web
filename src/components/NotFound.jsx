import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageContent from "./PageContent";

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <PageContent className="w-full min-h-[var(--heigh-not-headers)] flex items-center">
            <div className="container flex flex-col justify-center items-center">
                <h1 className="text-[7rem] font-title leading-[7rem]">404</h1>
                <h2 className="text-[2.6rem] font-title leading-3">Not Found</h2>
                <p className="text-lg font-link mt-10">
                    The page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="mt-5 text-lg font-link border-2 border-current px-5 py-2 rounded-md hover:bg-[var(--color1-bg)] hover:text-[var(--color1-txt)] transition-all duration-500 ease-in-out
                "
                >
                    Go to Home
                </Link>
            </div>
        </PageContent>
    );
}
