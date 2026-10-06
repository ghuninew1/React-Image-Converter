import { useTheme } from "../hooks/useTheme";
import { cx } from "../utils/cx";

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path
            strokeLinecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
    </svg>
);

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3
         7 7 0 0 0 21 12.79Z"
        />
    </svg>
);

const SystemIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path strokeLinecap="round" d="M8 21h8M12 18v3" />
    </svg>
);

const ThemeToggle = () => {
    const { theme, setTheme, themes } = useTheme();

    const options = [
        {
            value: themes.LIGHT,
            label: "Light",
            icon: <SunIcon />,
        },
        {
            value: themes.DARK,
            label: "Dark",
            icon: <MoonIcon />,
        },
        {
            value: themes.SYSTEM,
            label: "System",
            icon: <SystemIcon />,
        },
    ];

    const currentOption = options.find((option) => option.value === theme) ?? options[2];

    return (
        <div className="group absolute right-0 top-0">
            {/* Theme options */}
            <div
                className={cx(
                    "absolute right-0 top-0",
                    "flex items-center gap-1",
                    "transition-all duration-200",
                    "pointer-events-none opacity-0",
                    "group-hover:pointer-events-auto group-hover:opacity-100",
                    "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                )}
            >
                {options.map(({ value, label, icon }) => {
                    const isActive = theme === value;

                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTheme(value)}
                            aria-label={label}
                            aria-pressed={isActive}
                            title={label}
                            className={cx(
                                "flex size-10 items-center justify-center rounded-full",
                                "border border-gray-200 bg-white shadow-sm",
                                "transition-colors",
                                "dark:border-gray-700 dark:bg-gray-800",
                                isActive
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
                            )}
                        >
                            {icon}
                        </button>
                    );
                })}
            </div>

            {/* Current theme */}
            <button
                type="button"
                aria-label={`Theme: ${currentOption.label}`}
                title={currentOption.label}
                className={cx(
                    "relative z-10 flex size-10 items-center justify-center rounded-full",
                    "border border-gray-200 bg-white text-gray-600 shadow-sm",
                    "transition-opacity duration-200",
                    "group-hover:opacity-0",
                    "group-focus-within:opacity-0",
                    "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
                )}
            >
                {currentOption.icon}
            </button>
        </div>
    );
};

export default ThemeToggle;
