// ==========================================
// GROCERYGO AUTHENTICATION SYSTEM
// ==========================================

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const REMEMBER_KEY = "rememberMe";


// ==========================================
// USERS
// ==========================================

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        console.error("Could not read users:", error);

        return [];
    }
}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


// ==========================================
// DEFAULT ADMIN
// ==========================================

function initializeAdmin() {

    const users = getUsers();

    const adminExists =
        users.some(
            user => user.role === "admin"
        );


    if (!adminExists) {

        users.push({

            id: "admin-001",

            name: "Administrator",

            email: "admin@grocerygo.com",

            password: "admin123",

            role: "admin"

        });


        saveUsers(users);

    }

}


initializeAdmin();


// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {

    try {

        const localUser =
            localStorage.getItem(
                CURRENT_USER_KEY
            );


        if (localUser) {

            return JSON.parse(localUser);

        }


        const sessionUser =
            sessionStorage.getItem(
                CURRENT_USER_KEY
            );


        if (sessionUser) {

            return JSON.parse(sessionUser);

        }

    } catch (error) {

        console.error(
            "Could not read current user:",
            error
        );

    }


    return null;

}


// ==========================================
// SET CURRENT USER
// ==========================================

function setCurrentUser(
    user,
    rememberMe = false
) {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );


    if (rememberMe) {

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(user)
        );


        localStorage.setItem(
            REMEMBER_KEY,
            "true"
        );

    } else {

        sessionStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(user)
        );


        localStorage.removeItem(
            REMEMBER_KEY
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );

    localStorage.removeItem(
        REMEMBER_KEY
    );


    const isNestedPage =
        window.location.pathname.includes("/user/") ||
        window.location.pathname.includes("/admin/");


    window.location.href =
        isNestedPage
            ? "../login.html"
            : "login.html";

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    element,
    message,
    color
) {

    if (!element) {

        return;
    }


    element.textContent =
        message;

    element.style.color =
        color;

}


// ==========================================
// ROLE REDIRECTION
// ==========================================

function redirectByRole(user) {

    const isNestedPage =
        window.location.pathname.includes("/user/") ||
        window.location.pathname.includes("/admin/");

    if (user.role === "admin") {

        window.location.href =
            isNestedPage
                ? "../admin/dashboard.html"
                : "admin/dashboard.html";

    } else {

        window.location.href =
            isNestedPage
                ? "../user/dashboard.html"
                : "user/dashboard.html";

    }

}


// ==========================================
// PAGE PROTECTION
// ==========================================

function protectPage(requiredRole = null) {

    const user = getCurrentUser();

    const isNestedPage =
        window.location.pathname.includes("/user/") ||
        window.location.pathname.includes("/admin/");

    const loginUrl =
        isNestedPage
            ? "../login.html"
            : "login.html";

    if (!user) {

        window.location.href = loginUrl;

        return null;

    }

    if (requiredRole && user.role !== requiredRole) {

        redirectByRole(user);

        return null;

    }

    return user;

}


// ==========================================
// REGISTER
// ==========================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("password")
                    ?.value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirmPassword"
                    )
                    ?.value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    message,
                    "Please fill in all fields.",
                    "#d9534f"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    message,
                    "Password must be at least 6 characters.",
                    "#d9534f"
                );

                return;

            }


            if (
                password !== confirmPassword
            ) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "#d9534f"
                );

                return;

            }


            const users =
                getUsers();


            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    message,
                    "This email is already registered.",
                    "#d9534f"
                );

                return;

            }


            const newUser = {

                id:
                    `user-${Date.now()}`,

                name,

                email,

                password,

                role:
                    "user"

            };


            users.push(newUser);


            saveUsers(users);


            showMessage(
                message,
                "Registration successful! Redirecting...",
                "#19a463"
            );


            registerForm.reset();


            setTimeout(
                () => {

                    window.location.href =
                        "login.html";

                },
                900
            );

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    const rememberCheckbox =
        document.getElementById(
            "rememberMe"
        );


    const savedRemember =
        localStorage.getItem(
            REMEMBER_KEY
        ) === "true";


    if (rememberCheckbox) {

        rememberCheckbox.checked =
            savedRemember;

    }


    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    ?.value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    ?.value;


            const rememberMe =
                document
                    .getElementById(
                        "rememberMe"
                    )
                    ?.checked || false;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const user =
                getUsers().find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            if (!user) {

                showMessage(
                    message,
                    "Invalid email or password.",
                    "#d9534f"
                );

                return;

            }


            setCurrentUser(
                user,
                rememberMe
            );


            showMessage(
                message,
                "Login successful! Redirecting...",
                "#19a463"
            );


            setTimeout(
                () => {

                    redirectByRole(user);

                },
                600
            );

        }
    );

}


// ==========================================
// GLOBAL AUTH OBJECT
// ==========================================

window.GroceryAuth = {

    getCurrentUser,

    logout,

    setCurrentUser,

    protectPage,

    redirectByRole,

    getUsers,

    saveUsers

};

// Global aliases for direct HTML onclick handlers
window.logout = logout;
window.getCurrentUser = getCurrentUser;
window.protectPage = protectPage;