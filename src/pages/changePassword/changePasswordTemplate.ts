export const changePasswordTemplate = `
div !{goBackAside}
    .card
        .container #[h1 Change password] #[img(class="avatar" src=avatarURL alt="avatar")] 
            form(class="container change-password-form") !{generalInputOldPassword} !{generalInputNewPassword} !{generalButtonSave}
`
