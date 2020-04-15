// This will be used as the base for the url
const CLIENT_ORIGIN = process.env.clientOrigin;

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// in the future
module.exports = {

    // This is what the user will see when they are sent the confirmation email
    confirm: id => ({
        subject: 'React Confirm Email',
        html: `
          <a href='${CLIENT_ORIGIN}/users/confirmEmail/${id}'>
            click to confirm email
          </a>
        `,
        text: `Copy and paste this link: ${CLIENT_ORIGIN}/users/confirmEmail/${id}`
    })
}
