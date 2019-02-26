"use strict";

const path = require("path");
const Services = {
    env: require("../services/env.service")
};
const db = require("../services/database.service");

const envLoadResult = Services.env.load(path.join(__dirname, "../.env"));
if (envLoadResult.error) {
    Services.log.error(envLoadResult.error);
}

const Seed = {
    Course: require("./course.seed"),
    Account: require("./account.seed")

};

//connect to db
db.connect(undefined, () => {
    onConnected().catch((reason) => {
        console.error(reason);
        process.exit(1);
    }).then(() => {
        process.exit(0);
    });
});

//called when the db is connected
async function onConnected() {
    await dropAll();
    console.log("Finished dropping");
    await storeAll();
    console.log("Finished seeding");
}

async function dropAll() {
    await Seed.Course.dropAll();
    await Seed.Account.dropAll();
}

async function storeAll() {
    await Seed.Course.storeAll(Seed.Course.readCourses());
    await Seed.Account.storeAll(Seed.Account.readAccounts());
}