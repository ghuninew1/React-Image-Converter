import { cx } from "../utils/cx";

function getLogIcon(type) {
    const icons = {
        info: "•",
        success: "✓",
        error: "✕",
        warning: "!",
    };

    return icons[type] || icons.info;
}

function ConversionLog({ logs, onClear }) {
    if (logs.length === 0) {
        return null;
    }

    return (
        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Conversion Log</h2>

                <button
                    type="button"
                    onClick={onClear}
                    className="text-sm font-medium text-gray-500 hover:text-red-600"
                >
                    Clear
                </button>
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="flex items-start gap-3 rounded-md bg-gray-50 px-3 py-2 text-sm"
                    >
                        <span
                            className={cx(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                log.type === "info" && "bg-blue-100 text-blue-600",
                                log.type === "success" && "bg-green-100 text-green-600",
                                log.type === "error" && "bg-red-100 text-red-600",
                                log.type === "warning" && "bg-yellow-100 text-yellow-600",
                            )}
                        >
                            {getLogIcon(log.type)}
                        </span>

                        <span className="min-w-0 break-words text-gray-600">
                            {log.message}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ConversionLog;