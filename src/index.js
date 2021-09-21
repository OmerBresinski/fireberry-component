#!/usr/bin/env node
const inquirer = require("inquirer");
const { QUESTIONS } = require("./questions");
const { writeFileSync, mkdirSync } = require("fs");
const { test } = require("./config/fireberryComponent/test.js");
const { index } = require("./config/fireberryComponent/index.js");
const { style } = require("./config/fireberryComponent/style.js");
const { component } = require("./config/fireberryComponent/component.js");
const { componentWithRedux } = require("./config/fireberryComponent/componentWithRedux.js");

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
    const parsedIndexFileContent = index.replace(/NAME/g, name);
    const parsedStyleFileContent = style.replace(/NAME/g, name);
    if (withRedux === "Yes") {
        const parsedComponentWithReduxFileContent = componentWithRedux.replace(/NAME/g, name);
        return { component: parsedComponentWithReduxFileContent, style: parsedStyleFileContent, index: parsedIndexFileContent };
    } else {
        const parsedComponentFileContent = component.replace(/NAME/g, name);
        return { component: parsedComponentFileContent, style: parsedStyleFileContent, index: parsedIndexFileContent };
    }
};

const getTest = ({ name, withTest, path }) => {
    if (withTest === "No") return { test: undefined };
    const parsedTestFileContent = test.replace(/NAME/g, name).replace(/PATH/g, path);
    return { test: parsedTestFileContent };
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
