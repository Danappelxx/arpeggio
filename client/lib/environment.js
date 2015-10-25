// Configuration of any client side packages

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    // enablePasswordChange: true,
    // forbidClientAccountCreation: false,
    // overrideLoginErrors: true,
    // sendVerificationEmail: false,
    // lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    // showAddRemoveServices: false,
    // showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    // showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    // privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Hooks
    onLogoutHook: () => {
        // Router.go('home');
    },
    onSubmitHook: (error, state) => {
        if (!error) {
            // if (state === "signIn") {
            //     // Successfully logged in
            //     // ...
            // }
            // if (state === "signUp") {
            //     // Successfully registered
            //     // ...
            // }
            Router.go('dash');
        }
    },
    preSignUpHook: () => {

    },

    // Texts
    // texts: {
    //   button: {
    //       signUp: "Register Now!"
    //   },
    //   socialSignUp: "Register",
    //   socialIcons: {
    //       "meteor-developer": "fa fa-rocket"
    //   },
    //   title: {
    //       forgotPwd: "Recover Your Password"
    //   },
    // },
});

AccountsTemplates.addFields([
    {
        _id: 'firstName',
        type: 'text',
        displayName: 'First name',
        placeholder: 'First name',
        required: true,
    },
    {
        _id: 'lastName',
        type: 'text',
        displayName: 'Last name',
        placeholder: 'Last name',
        required: true,
    },
]);

AccountsTemplates.addField({
    _id: 'userType',
    type: 'select',
    displayName: "Please select whether you are a student or a teacher.",
    select: [
        {
            text: "Student",
            value: "student",
        },
        {
            text: "Teacher",
            value: "teacher",
        },
    ],
    required: true,
});
