"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_dialogflow_1 = require("./app-dialogflow");
const port = process.env.PORT || 3000;
app_dialogflow_1.default.listen(port, (err) => {
    if (err)
        return console.log(err);
    return console.log(`DialgogFlow Test for Prod server is listening on ${port}`);
});
//# sourceMappingURL=index-dialogflow.js.map