function Header() {
    return (
        <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Image Converter </h1>

            <span className="mt-2 text-gray-400 md:text-lg">
                Convert and optimize your images directly in your browser.{" "}
                <span className="mt-2 text-gray-600 md:text-lg">
                    Author:{"Ghuninew"} |{" "}
                    <a
                        href="https://github.com/ghuninew1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Github
                    </a>{" "}
                </span>
            </span>
        </header>
    );
}

export default Header;
