import PageContent from "../components/PageContent";

export default function Home() {
    return (
        <PageContent>
            <section className="flex flex-col w-full h-full bg-[--c1] text-[--c1-txt]">
                <h1>Home</h1>
                <p>Welcome to the home page</p>
            </section>
        </PageContent>
    );
}
