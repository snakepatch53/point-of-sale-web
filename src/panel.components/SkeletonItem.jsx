import AnimateElement from "../components/AnimateElement";

export default function Home() {
    return (
        <AnimateElement className="flex flex-col w-full">
            <div className=" flex flex-col h-full w-full relative overflow-hidden rounded-3xl p-4 cursor-pointer">
                <div className="brigth-animation absolute inset-0" />

                <div className="flex flex-col gap-4 w-full h-full">
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-lg" />
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-full" />
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-full" />
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-full" />
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-full" />
                    <div className="flex w-full h-14 bg-[var(--color6-txt)] rounded-full" />
                </div>
            </div>
        </AnimateElement>
    );
}
