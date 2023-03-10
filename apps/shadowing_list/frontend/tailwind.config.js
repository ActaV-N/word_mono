/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./atomic/**/*.{js,ts,jsx,tsx}",
        "./layout/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Red
                "red-white": "#FFF5F5",
                "red-200": "#FFE3E3",
                "red-300": "#FFC9C9",
                "red-400": "#FFA8A8",
                "red-500": "#FF8787",
                "red-600": "#FF6B6B",
                "red-700": "#FA5252",
                "red-800": "#F03E3E",
                "red-900": "#E03131",
                red: "#C92A2A",
                // Orange
                "orange-white": "#FFF4E6",
                "orange-200": "#FFE8CC",
                "orange-300": "#FFD8A8",
                "orange-400": "#FFC078",
                "orange-500": "#FFA94D",
                "orange-600": "#FF922B",
                "orange-700": "#FD7E14",
                "orange-800": "#F76707",
                "orange-900": "#E8590C",
                orange: "#D9480F",
                // Green
                "green-white": "#E6FCF5",
                "green-200": "#C3FAE8",
                "green-300": "#96F2D7",
                "green-400": "#63E6BE",
                "green-500": "#38D9A9",
                "green-600": "#20C997",
                "green-700": "#12B886",
                "green-800": "#0CA678",
                "green-900": "#099268",
                green: "#087F5B",
                // Blue
                "blue-white": "#EDF2FF",
                "blue-200": "#DBE4FF",
                "blue-300": "#BAC8FF",
                "blue-400": "#91A7FF",
                "blue-500": "#748FFC",
                "blue-600": "#5C7CFA",
                "blue-700": "#4C6EF5",
                "blue-800": "#4263EB",
                "blue-900": "#3B5BDB",
                blue: "#364FC7",

                white: "#F8F9FA",
                black: "#212529",
                "slate-200": "#F1F3F5",
                "slate-300": "#E9ECEF",
                "slate-400": "#DEE2E6",
                "slate-500": "#CED4DA",
                "slate-600": "#ADB5BD",
                "slate-700": "#868E96",
                "slate-800": "#495057",
                "slate-900": "#343A40",
            },
            transitionProperty: {
                button: "opacity, box-shadow, color, background-color",
            },
        },
    },
    plugins: [],
};
