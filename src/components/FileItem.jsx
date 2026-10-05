import { cx } from "../utils/cx";

function formatFileSize(bytes) {
    if (bytes === 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    const size = bytes / 1024 ** index;

    return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function getStatusLabel(status) {
    const labels = {
        waiting: "Waiting",
        converting: "Converting...",
        done: "Done",
        cancelled: "Cancelled",
        error: "Error",
    };

    return labels[status] || "Waiting";
}

function calculateSizeReduction(originalSize, outputSize) {
    if (!originalSize || !outputSize) {
        return 0;
    }

    return Math.round(((originalSize - outputSize) / originalSize) * 100);
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function FileItem({ file, onRemove }) {
    const reduction = calculateSizeReduction(file.size, file.outputSize);

    const outputFilename = file.outputFormat ? `${file.name.replace(/\.[^/.]+$/, "")}.${file.outputFormat}` : "";

    return (
        <div className="flex gap-2 md:gap-4 rounded-lg border border-gray-200 p-4 flex-col md:flex-row md:items-center justify-center md:justify-between">
            <img src={file.preview} alt={file.name} className="h-15 w-auto md:h-20 mx-auto overflow-hidden rounded-md object-cover items-center justify-center" />

            <div className="min-w-0 flex-1 items-center justify-center text-center md:text-left md:ml-4 ">
                <p className="truncate text-sm md:text-lg font-medium">{file.name}</p>

                <div className="mt-1 text-sm text-gray-500">
                    <p>Original: {formatFileSize(file.size)}</p>

                    <p>
                        {file.width} × {file.height} px
                    </p>
                </div>
            </div>
            {file.outputBlob && (
                <div className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm md:text-base md:mt-0 md:ml-4 flex flex-col items-center justify-center">
                    <p className="font-medium text-gray-700 text-xs md:text-sm">Converted</p>

                    <p className="mt-1 text-gray-500">
                        {file.outputWidth} × {file.outputHeight} px
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-sm md:text-base">
                        <span className="text-gray-500">{formatFileSize(file.outputSize)}</span>

                        <span className={cx("font-medium", reduction >= 0 ? "text-green-600" : "text-red-600")}>
                            {reduction >= 0 ? "-" : "+"}
                            {Math.abs(reduction)}%
                        </span>
                    </div>
                </div>
            )}
            <div className="flex shrink-0 flex-col md:flex-row items-center md:items-between justify-center gap-0 mt-0 md:mt-2 md:ml-4">
                <span
                    className={cx(
                        "text-xs md:text-base font-medium",
                        file.status === "waiting" && "text-yellow-500",
                        file.status === "converting" && "text-purple-600",
                        file.status === "done" && "text-green-600",
                        file.status === "cancelled" && "text-gray-500",
                        file.status === "error" && "text-red-600",
                    )}
                >
                   {getStatusLabel(file.status)}
                </span>

                <div className="flex shrink-0 flex-col md:flex-row items-center gap-2 mt-2 md:mt-0 md:ml-2 w-full md:w-auto justify-center">
                    {file.outputBlob && (
                        <button
                            type="button"
                            onClick={() => downloadFile(file.outputBlob, outputFilename)}
                            className="w-full md:w-auto rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 md:text-base disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Download
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => onRemove(file.id)}
                        disabled={file.status === "converting"}
                        className="w-full md:w-auto rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-red-50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base md:font-medium"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileItem;
