const {WELCOME,FORGOT_PASS} = require("../config/email-action.enum");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome into this show',
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: 'Your date is under mine protection.',
        templateName: 'forgot-pass'
    }
}