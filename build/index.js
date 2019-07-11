"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
console.log("On");
const server = new server_1.Server();
server.bootstrap([users_router_1.userRouter]).then(server => {
    console.log("Server Running on ", server.application.address());
})
    .catch(error => {
    console.log("Server Failed");
    console.error(error);
    process.exit(1);
});