import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContent from "../components/PageContent";
import { faMinus, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useState } from "react";

export default function Home() {
    return (
        <PageContent className="flex flex-col xl:flex-row w-full p-3 gap-3">
            <div className="flex-1">
                <div className="flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
                    <Search placeholder="Busca por código, nombre o categoría" />
                    <div className="grid lg:grid-cols-2 gap-2">
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-3 xl:max-w-[600px] ">
                <div className=" flex flex-col gap-2 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
                    <Search placeholder="Busca por nombr o cédula" />
                    <span className="block p-3 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                        Consumidor final
                    </span>
                </div>
                <div className="flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
                    <table className="text-center border-collapse" border="1">
                        <thead className="text-[--c3-txt2] uppercase ">
                            <tr>
                                <th className="font-sans">Producto</th>
                                <th className="font-sans">Cantidad</th>
                                <th className="font-sans">Precio</th>
                                <th className="font-sans">Subtotal</th>
                                <th className="font-sans">Acción</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[--c3-txt] ">
                            <TableProductItem />
                            <TableProductItem />
                            <TableProductItem />
                            <TableProductItem />
                        </tbody>
                        <tfoot className=" font-bold text-[--c3-txt2] uppercase ">
                            <tr>
                                <td colSpan="2"></td>
                                <td className="font-sans">SUBTOTAL:</td>
                                <td className="font-sans">$80.00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2"></td>
                                <td className="font-sans">TAX (12%):</td>
                                <td className="font-sans">$10.00</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <Button
                        as="button"
                        text="Cobrar $90"
                        className="gap-0 bg-[--c1] text-[--c1-txt] "
                        classText="font-sans text-md"
                    />
                </div>
            </div>
        </PageContent>
    );
}

function Search({ placeholder }) {
    return (
        <div className="rounded-md ">
            <div className="w-full flex items-center gap-1 bg-[--c3] p-3 rounded-md text-white">
                <input
                    className="flex-1 bg-transparent"
                    type="text"
                    placeholder={placeholder || "Buscar..."}
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    );
}

function TableProductItem() {
    const [quantity, setQuantity] = useState(1);
    const handleQuantity = (sum) => () => {
        if (sum) return setQuantity((prev) => prev + 1);
        setQuantity((prev) => prev - 1);
    };
    return (
        <tr>
            <td className="font-sans">Producto 1</td>
            <td>
                <div className="flex justify-center items-center h-8">
                    <Button
                        as="button"
                        icon={faMinus}
                        className="aspect-square h-full"
                        onClick={handleQuantity(false)}
                    />
                    <span className="flex justify-center items-center aspect-square h-full font-sans">
                        {quantity}
                    </span>
                    <Button
                        as="button"
                        icon={faPlus}
                        className="aspect-square h-full"
                        onClick={handleQuantity(true)}
                    />
                </div>
            </td>
            <td className="font-sans">$10.00</td>
            <td className="font-sans">$10.00</td>
            <td>
                <div className="flex justify-center items-center py-1">
                    <Button as="button" icon={faTrash} className="text-sm aspect-square w-8" />
                </div>
            </td>
        </tr>
    );
}

function Item({ name, category, stock, price }) {
    return (
        <button className="flex gap-2 p-3 bg-[--c3] rounded-md cursor-pointer transition-all hover:scale-[1.03] hover:border-2 hover:border-[--c3-txt] hover:shadow-lg">
            <div className="h-full aspect-square rounded-md ">
                <img
                    src="https://via.placeholder.com/70"
                    alt="Producto"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex-1 flex flex-col items-start overflow-hidden ">
                <h3 className=" block w-full max-w-full font-sans leading-5 text-left text-lg text-[--c3-txt] text-ellipsis text-nowrap overflow-hidden">
                    {name || "Nombre del producto"}
                </h3>
                <p className="font-sans text-[--c3-txt2] text-ellipsis leading-5 text-nowrap overflow-hidden opacity-85 ">
                    {category || "Categoría"}
                </p>
                <span className="text-[--c3-txt2] opacity-75 leading-5">
                    <b className="font-sans text-sm ">Stock: </b>
                    {stock || 0}
                </span>
                <span className="font-josefin font-bold text-xl text-[--c3-txt3] opacity-75 leading-5">
                    {price || "$0.00"}
                </span>
            </div>
        </button>
    );
}
