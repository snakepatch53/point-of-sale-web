import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../contexts/info";
import { SalesDashboardContext, SalesDashboardProvider } from "../contexts/sales-dashboard";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import PageContent from "../components/PageContent";
import Button from "../components/Button";
import Search from "../panel.components/ui/Search";

export default function Home() {
    return (
        <SalesDashboardProvider>
            <PageContent className="flex flex-col xl:flex-row w-full p-3 gap-3">
                <div className="flex-1">
                    <SectionProducts />
                </div>
                <div className="flex-1 flex flex-col gap-3 xl:max-w-[600px] ">
                    <SectionClient />
                    <SectionSale />
                </div>
            </PageContent>
        </SalesDashboardProvider>
    );
}

function SectionProducts() {
    const { products, addSale } = useContext(SalesDashboardContext);
    const [filteredProducts, setFilteredProducts] = useState(null);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleAddSale = (product) => () => addSale(product);

    const handleSearch = (e) => {
        const value = e.target.value.toString().toLowerCase();
        if (!value) return setFilteredProducts(products);
        const filtered = products?.filter(
            (product) =>
                product?.name?.toString()?.toLowerCase()?.includes(value) ||
                product?.mark?.toString()?.toLowerCase()?.includes(value) ||
                product?.category?.toString()?.toLowerCase()?.includes(value)
        );
        setFilteredProducts(filtered);
    };
    return (
        <div className="flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <Search placeholder="Busca por código, nombre o categoría" onSearch={handleSearch} />
            <div className="grid lg:grid-cols-2 gap-2">
                {filteredProducts?.map((product) => (
                    <SectionProductItem
                        key={product.id}
                        src={product.photo_url}
                        name={product.name}
                        mark={product.mark}
                        stock={product.stock}
                        price={product.price}
                        onClick={handleAddSale(product)}
                    />
                ))}
            </div>
        </div>
    );
}

function SectionClient() {
    const { searchClient, selectedClient } = useContext(SalesDashboardContext);

    const handleSearch = (e) => {
        const value = e.target.value.toString().toLowerCase();
        searchClient(value);
    };

    return (
        <div className=" flex flex-col gap-2 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <Search placeholder="Busca por nombr o cédula" onSearch={handleSearch} />
            {!selectedClient && (
                <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                    Consumidor final
                </span>
            )}
            {selectedClient && (
                <>
                    <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                        {selectedClient?.name} {selectedClient?.name2} {selectedClient.lastname}{" "}
                        {selectedClient.lastname2}
                    </span>
                    <span className="block p-2 rounded-md text-[--c3-txt] text-center opacity-70 border-solid border border-black/30 ">
                        {selectedClient?.dni}
                    </span>
                </>
            )}
        </div>
    );
}

function SectionSale() {
    const { sales, removeSale, incrementQuantity, decrementQuantity, sale } =
        useContext(SalesDashboardContext);
    const { info } = useContext(InfoContext);
    const subtotal = sales?.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);
    const iva = (subtotal * info?.tax) / 100;
    const total = subtotal + iva;

    const handleRemoveSale = (sale) => () => removeSale(sale);
    const handleQuantityDown = (sale) => () => decrementQuantity(sale);
    const handleQuantityUp = (sale) => () => incrementQuantity(sale);

    return (
        <div className=" flex-1 flex flex-col gap-4 bg-[--c3] p-4 rounded-md border-solid border-t-2 border-t-[--c3-txt2] ">
            <div className=" scroll-style overflow-x-auto ">
                <table className="w-full text-center">
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
                        {sales?.map((sale) => (
                            <TableProductItem
                                key={sale.id}
                                name={sale.name}
                                price={sale.price}
                                quantity={sale.quantity}
                                onQuantityDown={handleQuantityDown(sale)}
                                onQuantityUp={handleQuantityUp(sale)}
                                onRemove={handleRemoveSale(sale)}
                            />
                        ))}
                        {sales?.length == 0 && (
                            <tr>
                                <td colSpan="5" className="font-sans opacity-80 py-4">
                                    No hay productos en la lista
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className=" font-bold text-[--c3-txt2] uppercase ">
                        <tr>
                            <td colSpan="2"></td>
                            <td className="font-sans">SUBTOTAL:</td>
                            <td className="font-sans">${subtotal.toFixed(2)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td className="font-sans">TAX ({info?.tax}%):</td>
                            <td className="font-sans">${iva.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Button
                as="button"
                text={"Cobrar $" + total.toFixed(2)}
                className="gap-0 bg-[--c1] text-[--c1-txt] "
                classText="font-sans text-md"
                onClick={sale}
            />
        </div>
    );
}

function SectionProductItem({
    src = "https://via.placeholder.com/70",
    name = "Nombre del proyecto",
    mark = "Marca",
    stock = 0,
    price = 0,
    onClick,
}) {
    return (
        <button
            className="flex gap-2 p-3 bg-[--c3] rounded-md cursor-pointer transition-all hover:scale-[1.03] hover:border-2 hover:border-[--c3-txt] hover:shadow-lg"
            onClick={onClick}
        >
            <div className="h-20 aspect-square rounded-md ">
                <img
                    src={src}
                    alt="Producto"
                    className="w-full h-full object-cover rounded-md bg-[--c3]"
                />
            </div>
            <div className="flex-1 flex flex-col items-start overflow-hidden ">
                <h3 className=" block w-full max-w-full font-sans leading-5 text-left text-lg text-[--c3-txt] text-ellipsis text-nowrap overflow-hidden">
                    {name}
                </h3>
                <p className="font-sans text-[--c3-txt2] text-ellipsis leading-5 text-nowrap overflow-hidden opacity-85 ">
                    {mark}
                </p>
                <span className="text-[--c3-txt2] opacity-75 leading-5">
                    <b className="font-sans text-sm ">Stock: </b>
                    {stock}
                </span>
                <span className="font-josefin font-bold text-xl text-[--c3-txt3] opacity-75 leading-5">
                    ${price}
                </span>
            </div>
        </button>
    );
}

function TableProductItem({ name, price, quantity, onQuantityDown, onQuantityUp, onRemove }) {
    return (
        <tr>
            <td className="font-sans">{name}</td>
            <td>
                <div className="flex justify-center items-center h-8">
                    <Button
                        as="button"
                        icon={faMinus}
                        className="aspect-square h-full"
                        onClick={onQuantityDown}
                    />
                    <span className="flex justify-center items-center aspect-square h-full font-sans">
                        {quantity}
                    </span>
                    <Button
                        as="button"
                        icon={faPlus}
                        className="aspect-square h-full"
                        onClick={onQuantityUp}
                    />
                </div>
            </td>
            <td className="font-sans">${price}</td>
            <td className="font-sans">${price * quantity}</td>
            <td>
                <div className="flex justify-center items-center py-1">
                    <Button
                        as="button"
                        icon={faTrash}
                        className="text-sm aspect-square w-8"
                        onClick={onRemove}
                    />
                </div>
            </td>
        </tr>
    );
}
