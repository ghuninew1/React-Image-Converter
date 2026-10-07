import { useState, useRef } from "react";
import DropZone from "./DropZone";
import FileList from "./FileList";
import ConverterSettings from "./ConverterSettings";
import {
    cancelImageConversion,
    convertToAvif,
    convertToWebp,
    convertToJpeg,
    convertToPng,
} from "../utils/imageConverter";
import { createZip } from "../utils/createZip";
import { getImageDimensions } from "../utils/imageDimensions";
import ConversionLog from "./ConversionLog";

function formatFileSize(bytes) {
    if (bytes === 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / 1024 ** index;

    return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function calculateSizeReduction(originalSize, outputSize) {
    if (!originalSize || !outputSize) {
        return 0;
    }

    return Math.round(((originalSize - outputSize) / originalSize) * 100);
}

function ImageConverter() {
    const [files, setFiles] = useState([]);
    const [logs, setLogs] = useState([]);
    const [settings, setSettings] = useState({
        format: "avif",
        quality: 85,
        width: "",
        height: "",
        keepAspectRatio: true,
    });
    const [isConverting, setIsConverting] = useState(false);
    const [isCreatingZip, setIsCreatingZip] = useState(false);
    const [progress, setProgress] = useState(0);
    const cancelRef = useRef(false);

    const updateFileStatus = (id, status) => {
        setFiles((currentFiles) => currentFiles.map((file) => (file.id === id ? { ...file, status } : file)));
    };

    const addLog = (message, type = "info") => {
        setLogs((currentLogs) => [
            ...currentLogs,
            {
                id: crypto.randomUUID(),
                message,
                type,
            },
        ]);
    };

    const handleFiles = async (imageFiles) => {
        const newFiles = await Promise.all(
            imageFiles.map(async (file) => {
                try {
                    const dimensions = await getImageDimensions(file);

                    return {
                        id: crypto.randomUUID(),
                        file,
                        name: file.name,
                        size: file.size,
                        preview: URL.createObjectURL(file),
                        width: dimensions.width,
                        height: dimensions.height,
                        status: "waiting",
                    };
                } catch (error) {
                    console.error(`Failed to read image: ${file.name}`, error);

                    return {
                        id: crypto.randomUUID(),
                        file,
                        name: file.name,
                        size: file.size,
                        preview: URL.createObjectURL(file),
                        width: 0,
                        height: 0,
                        status: "error",
                    };
                }
            }),
        );

        setFiles((currentFiles) => [...currentFiles, ...newFiles]);
    };

    const handleRemove = (id) => {
        setFiles((currentFiles) => {
            const fileToRemove = currentFiles.find((file) => file.id === id);

            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

            return currentFiles.filter((file) => file.id !== id);
        });
    };

    const handleClear = () => {
        files.forEach((file) => {
            URL.revokeObjectURL(file.preview);
        });

        setFiles([]);
    };

    const handleSettingsChange = (changes) => {
        setSettings((currentSettings) => ({
            ...currentSettings,
            ...changes,
        }));
    };

    const handleCancel = () => {
        cancelRef.current = true;
        cancelImageConversion();
        setIsConverting(false);

        setFiles((currentFiles) =>
            currentFiles.map((file) => {
                if (file.status === "waiting" || file.status === "converting") {
                    return {
                        ...file,
                        status: "cancelled",
                    };
                }

                return file;
            }),
        );
    };

    const handleConvert = async () => {
        if (files.length === 0 || isConverting) {
            return;
        }
        const width = settings.width === "" ? null : Number(settings.width);
        const height = settings.height === "" ? null : Number(settings.height);
        const quality = Number(settings.quality);

        if (
            (width !== null && (!Number.isInteger(width) || width < 1)) ||
            (height !== null && (!Number.isInteger(height) || height < 1))
        ) {
            alert("Width and Height must be whole numbers greater than 0.");
            return;
        }

        if (quality < 1 || quality > 100) {
            alert("Quality must be between 1 and 100.");
            return;
        }

        cancelRef.current = false;
        setIsConverting(true);
        setProgress(0);

        const convertedFiles = [];

        const filesToConvert = files.filter((file) => file.status !== "error");
        if (filesToConvert.length === 0) {
            alert("No valid images available for conversion.");
            return;
        }

        let completed = 0;

        for (const file of filesToConvert) {
            if (cancelRef.current) {
                break;
            }

            updateFileStatus(file.id, "converting");
            addLog(`Converting: ${file.name}`, "info");

            try {
                const converters = {
                    avif: convertToAvif,
                    webp: convertToWebp,
                    jpeg: convertToJpeg,
                    png: convertToPng,
                };

                const convert = converters[settings.format];

                const result = await convert(file.file, {
                    quality: Number(settings.quality),
                    width: settings.width,
                    height: settings.height,
                    keepAspectRatio: settings.keepAspectRatio,
                });

                const { blob, width, height } = result;
                setFiles((currentFiles) =>
                    currentFiles.map((item) =>
                        item.id === file.id
                            ? {
                                  ...item,
                                  outputBlob: blob,
                                  outputSize: blob.size,
                                  outputWidth: width,
                                  outputHeight: height,
                                  outputFormat: settings.format,
                              }
                            : item,
                    ),
                );

                convertedFiles.push({
                    name: `${file.name.replace(/\.[^/.]+$/, "")}.${settings.format}`,
                    blob,
                });

                updateFileStatus(file.id, "done");

                const reduction = calculateSizeReduction(file.size, blob.size);

                addLog(
                    `Converted: ${file.name} → ${settings.format.toUpperCase()} | ` +
                        `${formatFileSize(file.size)} → ${formatFileSize(blob.size)} ` +
                        `(${reduction >= 0 ? "-" : "+"}${Math.abs(reduction)}%) | ` +
                        `${file.width} × ${file.height} → ${width} × ${height}`,
                    "success",
                );
            } catch (error) {
                console.error(`Failed to convert: ${file.name}`, error);

                addLog(`Failed: ${file.name}`, "error");

                updateFileStatus(file.id, "error");
            }
            if (cancelRef.current) {
                addLog("Conversion cancelled.", "warning");
            }

            completed += 1;

            setProgress(Math.round((completed / filesToConvert.length) * 100));
        }

        if (!cancelRef.current && convertedFiles.length > 0) {
            setIsCreatingZip(true);

            try {
                const zipBlob = await createZip(convertedFiles);

                const url = URL.createObjectURL(zipBlob);
                const link = document.createElement("a");

                link.href = url;
                link.download = "converted-images.zip";

                document.body.appendChild(link);
                link.click();
                link.remove();

                URL.revokeObjectURL(url);
            } finally {
                setIsCreatingZip(false);
            }
        }

        setIsConverting(false);
    };

    return (
        <section>
            <DropZone onFiles={handleFiles} />

            <FileList files={files} onRemove={handleRemove} onClear={handleClear} />

            <ConverterSettings settings={settings} onChange={handleSettingsChange} />
            {isConverting && (
                <div className="mt-6 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {isCreatingZip ? "Creating ZIP..." : "Converting..."}
                        </span>

                        <span className="text-sm">{progress}%</span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {isConverting ? (
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isCreatingZip}
                    className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                >
                    {isCreatingZip ? "Creating ZIP..." : "Cancel Conversion"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleConvert}
                    disabled={files.length === 0}
                    className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Convert to {settings.format.toUpperCase()} ({files.length} image{files.length > 1 ? "s" : ""})
                </button>
            )}
            <ConversionLog logs={logs} onClear={() => setLogs([])} />
        </section>
    );
}

export default ImageConverter;
