const test = `import React from "react";
import { render } from "tests";
import NAME from "PATH/NAME";

describe("NAME", () => {
    it("Renders correctly", () => {
        render(<NAME />);
    });
});
`;

module.exports = { test };
