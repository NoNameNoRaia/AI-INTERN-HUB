document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('auth-container');
    
    // Mobile toggles
    const mobileSignUp = document.getElementById('mobile-signUp');
    const mobileSignIn = document.getElementById('mobile-signIn');

    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    // Mobile fallback events
    if (mobileSignUp) {
        mobileSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add("right-panel-active");
        });
    }

    if (mobileSignIn) {
        mobileSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.remove("right-panel-active");
        });
    }
});
