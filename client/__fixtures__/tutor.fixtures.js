// eslint-disable-next-line strict
"use strict";

import {
    Tutor
} from "../src/Account/Tutor";
import withThemeProvider from "../src/shared/HOC/withThemeProvider";

export default {
    component: withThemeProvider(Tutor),
    props: {
        "tutor": {
            "courses": [{
                _id: "5ba6e1d844e481ec1ce9c9f6",
                dept: "COMP",
                code: 202,
                name: "Foundations of Programming"
            }, {
                _id: "5ba6e1d844e481ec1ce9c9f6",
                dept: "COMP",
                code: 202,
                name: "Foundations of Programming"
            }, {
                _id: "5ba6e1d844e481ec1ce9c9f6",
                dept: "COMP",
                code: 202,
                name: "Foundations of Programming"
            }, {
                _id: "5ba6e1d844e481ec1ce9c9f6",
                dept: "COMP",
                code: 202,
                name: "Foundations of Programming"
            }]
        }
    }
};