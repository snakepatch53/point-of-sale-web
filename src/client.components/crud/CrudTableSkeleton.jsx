export default function CrudTableSkeleton({ cols = 1, actionsNum }) {
    return (
        <tr className="relative bg-[--c3] skeleton">
            <>
                {Array(cols)
                    .fill()
                    .map((_, i) => (
                        <td key={i} className="h-full px-2">
                            <SkeletonRounded />
                        </td>
                    ))}
                <td>
                    <div className="flex justify-center gap-1">
                        {new Array(actionsNum).fill().map((_, i) => (
                            <SkeletonRounded key={i} className=" rounded-md min-w-none max-w-10 " />
                        ))}
                    </div>
                </td>
            </>
        </tr>
    );
}

function SkeletonRounded({ className }) {
    return (
        <>
            <div
                className={
                    "flex-1 flex h-full rounded-full bg-[--c3] text-[--c3] min-w-20 " + className
                }
            >
                .
            </div>
        </>
    );
}
