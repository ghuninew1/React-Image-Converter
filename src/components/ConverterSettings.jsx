import { cx } from "../utils/cx";

function ConverterSettings({ settings, onChange }) {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        onChange({
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const isPng = settings.format === "png";

    return (
        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Conversion Settings</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="format" className="mb-2 block text-sm font-medium">
                        Output Format
                    </label>

                    <select
                        id="format"
                        name="format"
                        value={settings.format}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="webp">WebP</option>
                        <option value="avif">AVIF</option>
                        <option value="jpeg">JPG</option>
                        <option value="png">PNG</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="quality" className="mb-2 block text-sm font-medium">
                        Quality
                    </label>

                    <div className="flex items-center gap-3">
                        <input
                            id="quality"
                            name="quality"
                            type="range"
                            min="1"
                            max="100"
                            value={settings.quality}
                            onChange={handleChange}
                            disabled={isPng}
                            className={cx("flex-1", isPng && "cursor-not-allowed opacity-40")}
                        />

                        <span className={cx("w-12 text-right text-sm", isPng ? "text-gray-400" : "text-gray-600")}>
                            {isPng ? "—" : `${settings.quality}%`}
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                        {isPng ? "Not applicable for PNG (Lossless)" : "Higher quality produces larger files."}
                    </p>
                </div>

                <div>
                    <label htmlFor="width" className="mb-2 block text-sm font-medium">
                        Width
                    </label>

                    <input
                        id="width"
                        name="width"
                        type="number"
                        min="1"
                        value={settings.width}
                        onChange={handleChange}
                        placeholder="Original"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label htmlFor="height" className="mb-2 block text-sm font-medium">
                        Height
                    </label>

                    <input
                        id="height"
                        name="height"
                        type="number"
                        min="1"
                        value={settings.height}
                        onChange={handleChange}
                        placeholder="Original"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    name="keepAspectRatio"
                    checked={settings.keepAspectRatio}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300"
                />

                <span className="text-sm font-medium">Keep Aspect Ratio</span>
            </label>
        </section>
    );
}

export default ConverterSettings;
