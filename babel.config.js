const presets = [
    ["@babel/env", {
        targets: {
            ie: "9"
        },
        modules: false,

    }]
];

module.exports = {
    presets,
    "plugins": ["transform-object-rest-spread"]
};
