import { useContext, useEffect, useState } from "react";
import PageContent from "../component/PageContent";
import CrudBackground from "../panel.components/CrudBackground";
import { getCartsAllData, updateCartState } from "../services/carts";
import { cls, separateCarts } from "../utils/utils";
import { faCheck, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../panel.components/Button";
import { SessionContext } from "../context/session";
import { showNotification } from "../component/Notification";

export default function Orders() {
    const { session } = useContext(SessionContext);
    const [carts, setCarts] = useState(null);

    useEffect(() => {
        getCartsAllData().then((res) => {
            if (!res) return;
            setCarts(orderCarts(res));
        });
    }, []);

    const handleSetCarts = (_carts) => {
        if (_carts) setCarts(orderCarts(_carts));
    };

    const orderCarts = (_carts) => {
        return _carts.sort((a) => {
            if (a.state == "Pendiente") return -1;
            if (a.state == "Entregado") return 1;
            return 0;
        });
    };
    return (
        <PageContent className="w-full">
            <CrudBackground src="/image/food6.jpg" />
            <div className="relative z-10 flex flex-col gap-5">
                {carts != null && session.role != "Cliente" && <Title text="Pedidos" />}
                <ItemsAdmin session={session} carts={carts} setCarts={handleSetCarts} />
                <ItemsSeller session={session} carts={carts} />
                {carts != null && <Title text="Mis Pedidos" />}
                <ItemsClient session={session} carts={carts} />
            </div>
        </PageContent>
    );
}

// excalidraw

function ItemsAdmin({ session, carts, setCarts }) {
    const [loading, setLoading] = useState(false);
    if (session.role != "Administrador") return null;
    const handleChangeState = (item) => {
        const { id, state } = item;
        return () => {
            setLoading(true);
            const _state = state == "Pendiente" ? "Entregado" : "Pendiente";
            updateCartState({ id, data: { state: _state } }).then((res) => {
                setLoading(false);
                if (!res?.success)
                    return showNotification({
                        title: "Cancelado",
                        message: res?.message || "No se pudo cambiar el estado",
                        type: "warning",
                    });
                showNotification({
                    title: "Cambiado",
                    message: "Se cambio el estado del pedido",
                    type: "success",
                });
                const _carts = carts.map((cart) => (cart.id == id ? res.data : cart));
                setCarts(_carts);
            });
        };
    };
    return (
        <Items onUpdate={handleChangeState} isLoading={loading} carts={carts} setCarts={setCarts} />
    );
}

function ItemsSeller({ session, carts }) {
    if (session.role != "Vendedor") return null;
    const extendedCarts = separateCarts(carts);
    const filteredCarts = extendedCarts?.filter((item) => {
        item.pdf_url =
            item.pdf_seller_url + "/" + item?.product_carts[0]?.product?.category?.business_id;
        return item?.product_carts[0]?.product?.category?.business?.user_id == session.id;
    });
    return <Items carts={filteredCarts} />;
}

function ItemsClient({ session, carts }) {
    const filteredCarts = carts?.filter((item) => item?.user_id == session.id);
    return <Items carts={filteredCarts} />;
}

function Items({ isLoading = false, onUpdate = false, carts }) {
    return (
        <>
            {carts == null && <Title text="Cargando pedidos.." />}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {carts?.map((item) => {
                    return (
                        <Item
                            key={item.key || item.id}
                            onchangeState={onUpdate ? onUpdate(item) : null}
                            buttonIsLoading={isLoading}
                            {...item}
                        />
                    );
                })}
                {carts == null && (
                    <>
                        <SkullItem />
                        <SkullItem />
                        <SkullItem />
                        <SkullItem />
                    </>
                )}
            </div>
        </>
    );
}

function Title({ text }) {
    return (
        <h3
            className="font-title2 text-6xl text-white text-center select-text mt-5"
            style={{
                textShadow:
                    "1px 0 1px var(--c6-bg), -1px 0 1px var(--c6-bg), 0 1px 1px var(--c6-bg), 0 -1px 1px var(--c6-bg)",
            }}
        >
            {text}
        </h3>
    );
}

function Item({ onchangeState, buttonIsLoading, ...item }) {
    let business = null;
    if (item?.product_carts?.length > 0)
        business = item?.product_carts[0]?.product?.category?.business;
    const total = item?.product_carts?.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
    return (
        <div className="relative flex flex-col bg-[--c3-bg] w-full items-center rounded-lg overflow-hidden p-4">
            <div
                className={cls("absolute top-0 left-0 w-full h-full bg-black/40", {
                    hidden: item.state == "Pendiente",
                })}
            />
            <div className="">
                <div className="flex flex-col w-full aspect-square bg-[--c6-bg] items-center justify-center overflow-hidden rounded-md">
                    <img src={item?.user?.photo_url} className="w-full h-full object-cover" />
                </div>

                <div className="w-full flex flex-col items-center py-2">
                    <span className="w-full block text-nowrap text-ellipsis overflow-hidden font-link font-bold uppercase text-base text-center select-text">
                        {item?.user?.name} {item?.user?.lastname}
                    </span>

                    <div className="flex flex-row items-center w-full gap-1 justify-between">
                        <div className="flex-1 flex items-center gap-[2px] text-sm text-nowrap text-ellipsis overflow-hidden">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-3 min-w-3 h-3 fill-blue-500 pt-[1.5px] "
                            >
                                <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
                            </svg>
                            <span className="block text-nowrap text-ellipsis overflow-hidden font-link first-letter:uppercase lowercase select-text">
                                {business?.name}
                            </span>
                        </div>
                        <h3 className="font-link font-bold text-sm my-1 select-text text-green-600">
                            ${total}
                        </h3>
                    </div>
                    <span className="w-full font-link text-sm opacity-80 select-text">
                        {item.date_str}
                    </span>
                </div>
                <div className="flex w-full h-[1px] bg-gray-400" />
                <div className="flex justify-between w-full mt-1 gap-1">
                    <span
                        className={cls("text-sm select-text", {
                            "text-green-600": item.state == "Entregado",
                            "text-yellow-600": item.state == "Pendiente",
                        })}
                    >
                        {item.state}
                    </span>
                    <Button
                        icon={faFilePdf}
                        type="new"
                        tagType={2}
                        className="group p-0 aspect-square h-6 bg-transparent border border-solid border-red-600 hover:bg-red-600 hover:border-red-600 ml-auto"
                        classNameText="hidden"
                        classNameIcon="text-red-600 group-hover:text-white text-sm duration-0 transition-all"
                        classNameBeffore="hidden"
                        href={item.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                    />
                    {onchangeState != null && (
                        <Button
                            icon={item.state == "Pendiente" ? faCheck : faTimes}
                            type="new"
                            className={cls(
                                "group p-0 aspect-square h-6 bg-transparent border border-solid ",
                                {
                                    "border-green-600 hover:bg-green-600 hover:border-green-600":
                                        item.state == "Pendiente",
                                    "border-white hover:bg-white hover:border-white":
                                        item.state == "Entregado",
                                }
                            )}
                            classNameText="hidden"
                            classNameIcon={cls(
                                "group-hover:text-white text-sm duration-0 transition-all",
                                {
                                    "text-green-600": item.state == "Pendiente",
                                    "text-white group-hover:text-black": item.state == "Entregado",
                                }
                            )}
                            classNameBeffore="hidden"
                            disabled={buttonIsLoading}
                            onClick={onchangeState}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function SkullItem() {
    return (
        <div className="flex flex-col bg-white/70 w-full items-center rounded-lg overflow-hidden p-4 animate-pulse">
            <div className="w-full aspect-square bg-black/40 items-center justify-center overflow-hidden rounded-md" />
            <div className="flex flex-col w-full items-center pt-3 gap-2">
                <div className="w-32 h-5 bg-black/40 rounded-full " />
                <div className="flex flex-col w-full items-start gap-2 ">
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-row gap-1 items-end ">
                            <div className="w-3 h-3 aspect-square bg-black/40 rounded-full"></div>
                            <div className="w-20 h-4 bg-black/40 rounded-full" />
                        </div>
                        <div className="w-10 h-4 bg-black/40 rounded-full" />
                    </div>
                    <div className="w-40 h-4 bg-black/40 rounded-full " />
                </div>
                <div className="flex flex-row items-center w-full justify-between">
                    <div className="w-20 h-4 bg-black/40 rounded-full" />
                    <div className="flex gap-1">
                        <div className="w-6 aspect-square bg-black/40 rounded-md" />
                        <div className="w-6 aspect-square bg-black/40 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
