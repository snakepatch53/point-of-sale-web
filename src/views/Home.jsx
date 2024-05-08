import { useEffect, useState } from "react";
import { getEntities } from "../services/entity";
import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function Home() {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        getEntities().then((response) => {
            setEntities(response);
        });
    }, []);
    return (
        <PageContent className="flex justify-center px-[--padding] py-10 ">
            <div className="container max-w-[--max-w] ">
                <div className="flex mx-auto w-24 aspect-square">
                    <img className="w-full h-full object-contain opacity-80 " src="/img/logo.png" />
                </div>
                <h1 className=" font-sans uppercase text-center text-3xl text-[--gd1-txt] opacity-75 ">
                    Welcome to Ideasoft Sell
                </h1>
                <p className=" font-sans text-center text-[--gd1-txt] text-xl opacity-60 ">
                    What is your business?
                </p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {entities.map((entity) => (
                        <Link
                            className=" flex flex-col justify-center items-center gap-2 p-5 mt-10 bg-[--c3] text-[--c3-txt] opacity-70 rounded transition hover:opacity-100 hover:scale-105 "
                            to={entity.name}
                            key={entity.id}
                        >
                            <img
                                className=" w-32 aspect-video object-contain "
                                src={entity.logo_url}
                            />
                            {entity.name}
                        </Link>
                    ))}
                </ul>
            </div>
        </PageContent>
    );
}
