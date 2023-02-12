const nextJest = require("next/jest");

const createConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/$1",
    },
    testEnvironment: "jest-environment-jsdom",
};

module.exports = createConfig(customJestConfig);
