import FileItem from "./FileItem";

function FileList({ files, onRemove, onClear }) {
    if (files.length === 0) {
        return null;
    }

    return (
        <section className="mt-6 rounded-xl p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">Selected Images</h2>

                    <p className="mt-1 text-sm">
                        {files.length} image{files.length > 1 ? "s" : ""}
                    </p>
                </div>

                <button type="button" onClick={onClear} className="text-sm font-medium text-red-600 hover:text-red-700 md:text-base">
                    Clear All
                </button>
            </div>

            <div className="space-y-3">
                {files.map((file) => (
                    <FileItem key={file.id} file={file} onRemove={onRemove} />
                ))}
            </div>
        </section>
    );
}

export default FileList;
