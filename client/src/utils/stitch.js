import {
    Stitch,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} from 'mongodb-stitch-browser-sdk';

const stitchClient = Stitch.initializeDefaultAppClient("stitch-quickstarts-zhpox");

const emailPasswordClient = stitchClient.auth
    .getProviderClient(UserPasswordAuthProviderClient.factory, "userpass");

// Register a new application user when the user submits their information
async function handleSignup(email, password) {
    try {

        await emailPasswordClient.registerWithEmail(email, password)
        console.log("Successfully registered. Check your inbox for a confirmation email.")

    } catch (e) {
        console.log(e)
    }
}

// Authenticate an application user based on the submitted information
async function handleLogin(email, password) {
    return new Promise(async (resolve, reject) => {
        const credential = new UserPasswordCredential(email, password);

        try {

            await stitchClient.auth.loginWithCredential(credential);
            const user = stitchClient.auth.user;
            resolve(user)

        } catch (e) {
            reject(e)
        }
    })

}

async function handleLogout() {
    await stitchClient.auth.logout();
}

async function handleResendConfirmation(email) {
    await emailPasswordClient.resendConfirmationEmail(email);
}

export {
    handleSignup,
    handleLogin,
    handleLogout,
    handleResendConfirmation
}