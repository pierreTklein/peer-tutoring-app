// eslint-disable-next-line strict
"use strict";

import {
    View
} from "../src/Account/View";
import withThemeProvider from "../src/shared/HOC/withThemeProvider";

export default {
    component: withThemeProvider(View),
    props: {
        account: {
            tutor: {
                courses: [{
                    _id: "5ba6e1d844e481ec1ce9c9f6",
                    dept: "COMP",
                    code: 202,
                    name: "Foundations of Programming"
                }, {
                    _id: "5ba6e1d844e481ec1ce9c9f8",
                    dept: "COMP",
                    code: 250,
                    name: "Intro to Computer Science"
                }]
            },
            accountType: [
                "Tutor"
            ],
            firstName: "Tutor",
            lastName: "Blah",
            email: "tutor@helpdesk.com",
            id: "5c81f0198162dc642056f077"
        }
    }
};