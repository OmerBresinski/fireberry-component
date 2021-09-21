#!/usr/bin/env node
const inquirer = require("inquirer");
const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const { QUESTIONS } = require("./questions");

const initializeComponent = async () => {
    try {
        const { name, withRedux, withTest, path } = await inquirer.prompt(QUESTIONS);
        const { component, style, index } = getComponentTemplate({ name, withRedux });
        const { test } = getTest({ name, withTest, path });

        createComponent({ name, component, style, index, test, path });
    } catch (ex) {
        console.log(ex);
    }
};

const getComponentTemplate = ({ name, withRedux }) => {
    const index = readFileSync("src/config/fireberryComponent/index.js", "utf8").replace(/NAME/g, name);
    const style = readFileSync("src/config/fireberryComponent/style.js", "utf8").replace(/NAME/g, name);
    if (withRedux === "Yes") {
        const component = readFileSync("src/config/fireberryComponent/componentWithRedux.js", "utf8").replace(/NAME/g, name);
        return { component, style, index };
    } else {
        const component = readFileSync("src/config/fireberryComponent/component.js", "utf8").replace(/NAME/g, name);
        return { component, style, index };
    }
};

const getTest = ({ name, withTest, path }) => {
    if (withTest === "No") return { test: undefined };
    const test = readFileSync("src/config/fireberryComponent/test.js", "utf8").replace(/NAME/g, name).replace(/PATH/g, path);
    return { test };
};

const createComponent = ({ name, component, style, index, test, path }) => {
    mkdirSync(`src/${path}`, { recursive: true });
    writeFileSync(`src/${path}/${name}.js`, component);
    writeFileSync(`src/${path}/style.js`, style);
    writeFileSync(`src/${path}/index.js`, index);
    test && mkdirSync(`src/${path}/__tests__`, { recursive: true });
    test && writeFileSync(`src/${path}/__tests__/${name}.test.js`, test);
};

initializeComponent();
