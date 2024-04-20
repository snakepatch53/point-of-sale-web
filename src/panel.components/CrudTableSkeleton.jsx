export default function CrudTableSkeleton({ cols = 1, actionsNum }) {
    return (
        <tr className="relative bg-[var(--color6-bg)] rounded skeleton">
            <>
                {Array(cols)
                    .fill()
                    .map((_, i) => (
                        <td key={i} className="h-full px-2">
                            <SkeletonRounded />
                        </td>
                    ))}
                <td className="td-action">
                    <div className="buttons-flex">
                        {new Array(actionsNum).fill().map((_, i) => (
                            <SkeletonRounded key={i} className="rounded-md" />
                        ))}
                    </div>
                    <div className="brigth-animation absolute inset-0" />
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
                    "flex-1 flex h-full rounded-full bg-[var(--color6-txt)] text-[var(--color6-txt)] min-w-20 " +
                    className
                }
            >
                .
            </div>
        </>
    );
}
