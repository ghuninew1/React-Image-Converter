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

function ImageConverter() {
    const [files, setFiles] = useState([]);

    const [settings, setSettings] = useState({
        format: "avif",
        quality: 85,
        width: "",
        height: "",
        keepAspectRatio: true,
    });
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const cancelRef = useRef(false);

    const updateFileStatus = (id, status) => {
        setFiles((currentFiles) => currentFiles.map((file) => (file.id === id ? { ...file, status } : file)));
    };

    const handleFiles = async (imageFiles) => {
        const newFiles = await Promise.all(
            imageFiles.map(async (file) => {
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

        cancelRef.current = false;
        setIsConverting(true);
        setProgress(0);

        const convertedFiles = [];
        let completed = 0;

        for (const file of files) {
            if (cancelRef.current) {
                break;
            }

            updateFileStatus(file.id, "converting");

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
            } catch (error) {
                console.error(`Failed to convert: ${file.name}`, error);

                updateFileStatus(file.id, "error");
            }

            completed += 1;

            setProgress(Math.round((completed / files.length) * 100));
        }

        if (!cancelRef.current && convertedFiles.length > 0) {
            const zipBlob = await createZip(convertedFiles);

            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "converted-images.zip";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        }

        setIsConverting(false);
    };

    return (
        <section>
            <DropZone onFiles={handleFiles} />

            <FileList files={files} onRemove={handleRemove} onClear={handleClear} />

            <ConverterSettings settings={settings} onChange={handleSettingsChange} />
            {isConverting && (
                <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Converting...</span>

                        <span className="text-sm text-gray-500">{progress}%</span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
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
                    className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                >
                    Cancel Conversion
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
        </section>
    );
}

export default ImageConverter;
