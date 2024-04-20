import {
    faMinus,
    faPlus,
    faShoppingCart,
    faSpinner,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../utils/utils";
import { useContext, useRef, useState } from "react";
import { ShopCartContext } from "../context/shop-cart";
import Button from "./Button";
import { SessionContext } from "../context/session";
import { createBulkCart } from "../services/carts";
import { showNotification } from "../component/Notification";
import { InfoContext } from "../context/info";

export default function ShopCart() {
    const { session } = useContext(SessionContext);
    const { shopCart, removeProduct, addQuantity, removeQuantity, clearShopCart } =
        useContext(ShopCartContext);

    const { info } = useContext(InfoContext);
    const [isOpen, setIsOpen] = useState(false);
    const shopRef = useRef();
    // document.addEventListener("click", (e) => {
    //     if (shopRef.current && !shopRef.current.contains(e.target)) {
    //         setIsOpen(false);
    //     }
    // });

    const [isLoad, setIsLoad] = useState(false);

    const handleShop = () => {
        setIsLoad(true);
        // navigator.geolocation.getCurrentPosition((position) => {
        //     console.log(position.coords);
        // });
        if (shopCart.length == 0) {
            setIsLoad(false);
            return showNotification({
                title: "Error",
                message: "No hay productos en el carrito",
                type: "warning",
            });
        }
        let data = {
            products: shopCart,
            phone: session.phone || "undefined.",
            address: session.address || "undefined.",
            location: "123456",
        };
        createBulkCart({ data }).then((res) => {
            setIsLoad(false);
            if (res?.success) {
                showNotification({
                    title: "Exito",
                    message: "Compra realizada con exito",
                    type: "success",
                });
                setIsOpen(false);
                clearShopCart();
                // open pdf from response in new tab
                const wtp_message = `Hola 👋, me contacto desde su pagina web 💻: travelvfb.com\n\n*Nombre:* ${session.name}\n*Asunto:* Gestion de carrito de compras 🎉\n*Url:* ${res?.data?.pdf_url}`;
                const url = `https://api.whatsapp.com/send?phone=${info.whatsapp.trim()}&text=${wtp_message}`;
                const encodedUrl = encodeURI(url);
                window.open(encodedUrl, "_blank");
            } else {
                showNotification({
                    title: "Error",
                    message: res.message || "Error al realizar la compra",
                    type: "danger",
                });
            }
        });
    };

    return (
        <div ref={shopRef} className="relative">
            <div className="flex w-full h-full p-2">
                <button
                    className="flex justify-center items-center h-full aspect-square rounded-full transition-all duration-200 opacity-80 hover:opacity-100 bg-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} className="text-base text-blue-600" />
                </button>
            </div>
            <div
                className={cls(
                    "scroll-style absolute top-full right-0 bg-[--c4-bg] text-[--c4-txt] w-screen max-w-[700px] rounded-b-lg p-5 pt-0 shadow-xl max-h-[50dvh] overflow-y-auto",
                    {
                        "max-h-0 p-0": !isOpen,
                    }
                )}
            >
                <h1 className="font-title2 text-5xl text-center pt-4">Shop Cart</h1>
                <table className="table-with-border-collapse w-full text-center mt-2">
                    <thead>
                        <tr className="sticky z-10 top-0 bg-[--c4-bg]">
                            <th className="font-link py-3">Imagen</th>
                            <th className="font-link py-3">Producto</th>
                            <th className="font-link py-3">Negocio</th>
                            <th className="font-link py-3">Precio</th>
                            <th className="font-link py-3">Cantidad</th>
                            <th className="font-link py-3">Subtotal</th>
                            <th className="font-link py-3">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shopCart.map((item) => (
                            <ProductItem
                                key={item.id}
                                {...item}
                                remove={() => removeProduct(item)}
                                addQuantity={() => addQuantity(item)}
                                removeQuantity={() => removeQuantity(item)}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"></td>
                            <td className="font-link font-bold">Total:</td>
                            <td>
                                $
                                {shopCart.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                )}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <Button
                    text={isLoad ? "" : "Comprar"}
                    type="edit"
                    icon={isLoad ? faSpinner : faShoppingCart}
                    classNameIcon={isLoad ? "animate-spin text-sm" : ""}
                    className={cls("w-full mt-3 opacity-70 hover:opacity-100", {
                        "opacity-50 hover:opacity-50 cursor-default": isLoad,
                    })}
                    classNameBeffore={isLoad ? "hidden" : ""}
                    onClick={handleShop}
                    disabled={isLoad}
                />
            </div>
        </div>
    );
}

function ProductItem({ remove, addQuantity, removeQuantity, ...product }) {
    return (
        <tr className="hover:bg-black/10 opacity-80">
            <td className="py-1">
                <img
                    src={product.photo_url}
                    // src="/image/food1.jpg"
                    className="w-[55px] aspect-square object-cover rounded-sm mx-auto shadow-xl"
                />
            </td>
            <td className="font-link">{product.name}</td>
            <td className="font-link">{product?.category?.business?.name}</td>
            <td className="font-link">${product.price}</td>
            <td>
                <InputQuantity value={product.quantity} add={addQuantity} remove={removeQuantity} />
            </td>
            <td>${product.price * product.quantity}</td>
            <td>
                <button className="hover:bg-black/10 w-7 aspect-square rounded-sm" onClick={remove}>
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>
            </td>
        </tr>
    );
}

function InputQuantity({ value = 1, add, remove }) {
    return (
        <div className="flex justify-center">
            <button
                className="hover:bg-black/10 flex justify-center items-center w-7 aspect-square "
                onClick={remove}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="text" className="w-14 text-center bg-black/20" value={value} disabled />
            <button
                className="hover:bg-black/10 flex justify-center items-center w-7 aspect-square "
                onClick={add}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
