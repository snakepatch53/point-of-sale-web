import PageContent from "../component/PageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ShopCartContext } from "../context/shop-cart";
import { cls } from "../utils/utils";
import CrudBackground from "../panel.components/CrudBackground";
import useShop from "../hooks/useShop";
import { Link } from "react-router-dom";

export default function Shop() {
    const {
        productFilter,
        categories,
        categorySelected,
        setCategorySelected,
        handleSearch,
        categoriesIsOpen,
        togleCategories,
    } = useShop();
    return (
        <PageContent className="relative flex flex-col w-full">
            <CrudBackground src="/image/food1.jpg" withBlur={false} />
            <div
                className="sticky top-0 z-20 flex w-full bg-[--c6-bg] text-[--c6-txt] mb-5 lg:mb-10 rounded-md overflow-hidden shadow-xl py-1"
                style={{
                    boxShadow: "0px 1px 10px 1px rgba(0,0,0,0.8)",
                }}
            >
                <span className="flex h-full items-center px-3 font-link text-lg">Buscar:</span>
                <input
                    type="text"
                    className="w-full p-2 rounded-md text-black"
                    placeholder="Escribe el nombre del producto"
                    onChange={handleSearch}
                />
                <div className="flex h-full aspect-square mx-1">
                    <div className="hidden lg:flex h-full w-full justify-center items-center">
                        <FontAwesomeIcon icon={faSearch} className="text-md" />
                    </div>
                    <button
                        className="flex lg:hidden h-full w-full justify-center items-center rounded-md transition-all duration-200 hover:bg-black/10"
                        onClick={togleCategories}
                    >
                        <FontAwesomeIcon icon={faBars} className="text-md" />
                    </button>
                </div>
            </div>
            <div className="relative z-10 flex flex-1  gap-5 lg:gap-10">
                <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5 lg:gap-10 ">
                    {productFilter?.map((item) => (
                        <Item key={item.id} {...item} />
                    ))}
                    {productFilter == null && (
                        <>
                            <SkullItem />
                            <SkullItem />
                            <SkullItem />
                            <SkullItem />
                        </>
                    )}
                    {productFilter?.length == 0 && (
                        <div className="col-span-4 grid place-content-center rounded-md">
                            <h2
                                className="font-content uppercase text-3xl text-center select-text text-white"
                                style={{
                                    textShadow:
                                        "1px 0 1px #000, -1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000",
                                }}
                            >
                                No hay productos
                            </h2>
                        </div>
                    )}
                </div>
                <SectionCategories
                    isOpen={categoriesIsOpen}
                    categorySelected={categorySelected}
                    setCategorySelected={setCategorySelected}
                    categories={categories}
                />
            </div>
        </PageContent>
    );
}

function Item({ ...product }) {
    const { addProduct } = useContext(ShopCartContext);
    const handleAddProduct = (product) => {
        return () => addProduct(product);
    };
    return (
        <div className="flex flex-col items-center w-full bg-white rounded-md shadow-xl overflow-hidden mb-auto">
            <div className="group/photo w-full aspect-video overflow-hidden rounded-sm shadow-lg">
                <img
                    src={product.photo_url}
                    // src="/image/food1.jpg"
                    className="flex w-full h-full object-cover object-center group-hover/photo:scale-110 transition-all duration-200"
                />
            </div>
            <div className="flex-1 flex flex-col w-full pb-3 px-2">
                <div className="flex flex-col w-full">
                    <h3 className="block text-nowrap text-ellipsis overflow-hidden font-link text-lg text-center mt-2 select-text">
                        {product.name}
                    </h3>
                    {/* <span>{product.}</span> */}
                    <p className="max-h-12 min-h-12 h-full font-content text-xs text-left opacity-80 overflow-hidden text-pretty select-text">
                        {product.description}
                    </p>
                </div>
                <div className="flex flex-row items-center w-full gap-1 justify-between px-2">
                    <Link
                        to={"/panel/shop/" + product?.category.business_id}
                        className="flex-1 flex items-center gap-1 text-lg text-nowrap text-ellipsis overflow-hidden"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 min-w-4 fill-blue-500 pt-[1.5px]">
                            <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
                        </svg>
                        <span className="block text-nowrap text-ellipsis overflow-hidden font-bold font-link first-letter:uppercase lowercase">
                            {product?.category?.business?.name}
                        </span>
                    </Link>
                    <div className="flex gap-1">
                        <h3 className="font-bold font-link text-lg my-1 select-text line-through text-red-500 ml-auto">
                            ${product.price + product.price * 0.2}
                        </h3>
                        <h3 className="font-link font-bold text-lg my-1 select-text text-green-600">
                            ${product.price}
                        </h3>
                    </div>
                </div>
                <button
                    className="flex gap-1 justify-center items-center w-full py-2 px-3 mt-auto opacity-85 hover:opacity-100 rounded-md transition-all duration-300 bg-blue-500 text-white"
                    onClick={handleAddProduct(product)}
                >
                    <span>Agregar al Carrito</span>
                    <FontAwesomeIcon icon={faCartPlus} className="text-base" />
                </button>
            </div>
        </div>
    );
}

function SkullItem() {
    return (
        <div className="flex flex-col items-center w-full bg-white rounded-md shadow-xl overflow-hidden mb-auto animate-pulse">
            <div className=" w-full p-2">
                <div className="w-full aspect-video rounded-sm bg-black/15" />
            </div>
            <div className="flex-1 flex flex-col w-full pb-3 px-2">
                <div className="flex flex-col w-full">
                    <div className="block mt-2 h-6 w-2/3 bg-black/15 rounded-full mx-auto" />
                    <div className="block mt-2 h-5 w-full bg-black/15 rounded-full mx-auto" />
                </div>
                <div className="flex flex-row items-center w-full gap-5 justify-between">
                    <div className="block my-1 h-4 w-full bg-black/15 rounded-full mx-auto" />
                    <div className="block my-1 h-4 w-full bg-black/15 rounded-full mx-auto" />
                </div>
                <div className="block w-full h-10 py-2 px-3 mt-2 rounded-md bg-black/20" />
            </div>
        </div>
    );
}

function SectionCategories({ isOpen, categorySelected, setCategorySelected, categories = [] }) {
    return (
        <div
            className={cls(
                "scroll-style absolute top-0 z-10 max-h-[calc(100vh-190px)] w-full overflow-y-auto bg-white rounded-md pr-1 shadow-xl mb-auto",
                "lg:sticky lg:top-20 lg:flex-1 lg:max-w-48",
                {
                    "max-h-0 opacity-0 lg:max-h-[calc(100vh-190px)] lg:opacity-100": !isOpen,
                }
            )}
        >
            <div className="flex flex-col w-full gap-1">
                <div className="sticky top-0 z-10 flex justify-center items-center h-10 bg-white">
                    <h2 className="font-link font-bold text-center text-xl tracking-widest">
                        Categorias
                    </h2>
                </div>
                <Button
                    name="Todos"
                    icon=""
                    id="0"
                    selected={categorySelected}
                    onClick={() => setCategorySelected(0)}
                />
                {categories?.map((item) => (
                    <Button
                        key={item.id}
                        {...item}
                        selected={categorySelected}
                        onClick={() => setCategorySelected(item.id)}
                    />
                ))}

                {!categories && (
                    <>
                        <SkullButton />
                        <SkullButton />
                        <SkullButton />
                        <SkullButton />
                        <SkullButton />
                    </>
                )}
            </div>
        </div>
    );
}

function Button({ selected, onClick, ...category }) {
    return (
        <button
            onClick={onClick}
            className={cls(
                "group/button relative flex items-center justify-between py-2 px-4 hover:bg-gray-300 font-link",
                {
                    "bg-gray-300": selected == category.id,
                }
            )}
        >
            <div
                className={cls(
                    "absolute left-0 top-1/5 -translate-y-1/5 w-[3px] h-0 group-hover/button:h-full bg-[--c6-bg] transition-all duration-300",
                    {
                        "h-full": selected == category.id,
                    }
                )}
            />
            <span className="block text-nowrap text-ellipsis overflow-hidden font-link text-left text-[--c4-bg]">
                {category.name}
            </span>
            <div
                dangerouslySetInnerHTML={{ __html: category.icon }}
                className="w-4 min-w-4 fill-[--c4-bg] ml-1"
            />
        </button>
    );
}

function SkullButton() {
    return (
        <div className="flex items-center justify-between py-2 px-4 bg-black/20 animate-pulse">
            <span className="block h-5 w-full rounded-full bg-black/10" />
            <div className="h-5 aspect-square rounded-full ml-1 bg-black/10" />
        </div>
    );
}
