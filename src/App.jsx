import Header from "./components/Header";
import ImageConverter from "./components/ImageConverter";

function App() {
    return (
        <main className="min-h-screen bg-gray-100 text-gray-900">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <Header />
                <ImageConverter />
                <p className="mt-4 text-center text-sm text-gray-500">
                    Powered by {"GhuniNew"}. All rights reserved.{" "}
                    <a
                        href="https://github.com/ghuninew1/React-Image-Converter"
                        className="text-blue-600 hover:underline"
                    >
                        GitHub
                    </a>
                </p>
                <p className="mt-2 text-center text-sm text-gray-500">
                    <a
                        href="https://github.com/ghuninew1/React-Image-Converter/blob/main/README.md"
                        className="text-blue-600 hover:underline"
                    >
                        Readme and Documentation
                    </a>
                </p>
            </div>
        </main>
    );
}

export default App;
