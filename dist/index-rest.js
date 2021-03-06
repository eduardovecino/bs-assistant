"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_rest_1 = require("./app-rest");
const port = process.env.PORT || 3000;
app_rest_1.default.listen(port, (err) => {
    if (err)
        return console.log(err);
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index-rest.js.map