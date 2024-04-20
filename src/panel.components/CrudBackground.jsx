export default function CrudBackground({
    src = "/image/food1.jpg",
    withOpacity = true,
    withBlur = true,
}) {
    return (
        <div className="fixed inset-0 w-full h-full">
            <img src={src} className="w-full h-full object-cover" />
            {withOpacity && <div className="absolute inset-0 bg-black/50 " />}
            {withBlur && <div className="absolute inset-0 backdrop-blur-[3px]" />}
        </div>
    );
}
