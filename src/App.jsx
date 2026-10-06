import Header from "./components/Header";
import ImageConverter from "./components/ImageConverter";
import ThemeToggle from "./components/ThemeToggle";

function App() {
    return (
        <main className="relative min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <ThemeToggle />
            <div className="mx-auto max-w-6xl px-6 py-8">
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
