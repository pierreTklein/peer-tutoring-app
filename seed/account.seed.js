"use strict";
var fs = require("fs");
const path = require("path");

const Account = require("../models/account.model");
const Services = {
    Account: require("../services/account.service")
};

/**
 * Drops all elements in Accounts
 */
function dropAll() {
    return Account.deleteMany({});
}

function readAccounts() {
    const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, "./accounts.json"), "utf8"));
    for (const account of accounts) {
        account.password = Services.Account.hashPassword(account.password);
    }
    return accounts;
}

/**
 * Stores all of the Accounts in the db
 * @param {Account[]} attributes all attributes
 */
function storeAll(attributes) {
    const roleDocs = [];
    const roleNames = [];
    attributes.forEach((attribute) => {
        roleDocs.push(new Account(attribute));
        roleNames.push(attribute.name);
    });
    return Account.collection.insertMany(roleDocs);
}

module.exports = {
    storeAll: storeAll,
    dropAll: dropAll,
    readAccounts: readAccounts
};