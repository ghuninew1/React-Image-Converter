import Header from "./components/Header";
import ImageConverter from "./components/ImageConverter";
import ThemeToggle from "./components/ThemeToggle";

function App() {
    return (
        <main className="relative flex min-h-screen bg-background font-sans text-foreground antialiased selection:bg-cyan-500 selection:text-white">
            <div className="pointer-events-none absolute top-1/4 -left-20 z-0 size-96 rounded-full bg-green-500/5 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-1/4 z-0 size-96 rounded-full bg-red-400/5 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

            <div className="mx-auto max-w-5xl w-full px-6 py-8">
            <ThemeToggle />
                <Header />
                <ImageConverter />
                <p className="mt-4 text-center text-sm">
                    Powered by {"GhuniNew"}. All rights reserved.{" "}
                    <a
                        href="https://github.com/ghuninew1/React-Image-Converter"
                        className="text-blue-600 hover:underline"
                    >
                        GitHub
                    </a>
                </p>
                <p className="mt-2 text-center text-sm">
                    <a
                        href="https://github.com/ghuninew1/React-Image-Converter/blob/main/README.md"
                        className="text-blue-600 hover:underline"
                    >
                        Readme and Documentation
                    </a>
                </p>
                {/* <div className="bg-white text-black dark:bg-gray-900 dark:text-white">Theme Test</div> */}
            </div>
        </main>
    );
}

export default App;
