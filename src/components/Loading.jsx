import { cls } from "../lib/utils";
import PageContent from "./PageContent";

export default function Loading({ classWrapper = "" }) {
    return (
        <PageContent
            className={cls(
                "flex justify-center items-center h-screen w-full px-[--padding]",
                classWrapper
            )}
        >
            <div className="container flex flex-col justify-center items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    className="w-20 fill-[--c1] stroke-[--c1]"
                >
                    <circle strokeWidth="5" r="15" cx="40" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="1.4s"
                            values="65;140;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.4"
                        ></animate>
                    </circle>
                    <circle strokeWidth="5" r="15" cx="100" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="1.4s"
                            values="65;140;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.2"
                        ></animate>
                    </circle>
                    <circle strokeWidth="5" r="15" cx="160" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="1.4s"
                            values="65;140;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="0"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </PageContent>
    );
}
