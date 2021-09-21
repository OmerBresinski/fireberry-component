const QUESTIONS = [
    { type: "input", name: "name", message: "Name:" },
    {
        type: "list",
        name: "withRedux",
        message: "With redux?",
        choices: ["Yes", "No"],
    },
    {
        type: "list",
        name: "withTest",
        message: "With tests?",
        choices: ["Yes", "No"],
    },
    { type: "input", name: "path", message: "Path:" },
];

module.exports = { QUESTIONS };
