import { useRef, useState } from "react";
import { cx} from "../utils/cx";

function DropZone({ onFiles }) {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasFiles, setHasFiles] = useState(false);

    const handleFiles = (files) => {
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
        setHasFiles(imageFiles.length > 0);

        if (imageFiles.length > 0) {
            onFiles(imageFiles);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        handleFiles(event.dataTransfer.files);
    };

    const handleInputChange = (event) => {
        handleFiles(event.target.files);
        event.target.value = "";
    };

    return (
        <div
            onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cx(
                "flex min-h-10 md:min-h-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-1 text-center transition-colors bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white",
                isDragging ? "border-blue-500 hover:border-blue-400" : "border-gray-300 hover:border-gray-400",
                hasFiles && "border-green-500 hover:border-green-400",
            )}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                className="hidden"
            />

            <div className="mb-1 text-3xl md:text-5xl">+</div>

            <h2 className="text-md md:text-lg font-semibold">Drop images here</h2>

            <p className="text-sm md:text-base">or click to browse files</p>

            <p className="m-2 text-xs md:text-sm">JPG, PNG, WebP, AVIF and other browser-supported formats</p>
        </div>
    );
}

export default DropZone;
