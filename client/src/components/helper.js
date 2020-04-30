import cookie from 'cookie-js'

//save cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
    cookie.set(key, value, {expires:1})
    }
}

//get cookie
export const getCookie = (key) => {
    if (window !== 'undefined') {
    return cookie.get(key)
    }
}

//remove cookie
export const removeCookie = (key) =>{
    if (window !== 'undefined') {
    cookie.remove(key)
    }
}

//save to localstorage
export const saveToLocalstorage = (key, value) => {
    if (window !== 'undefined') {
    localStorage.setItem( key, JSON.stringify(value))
    }
}

// remove from localStorage
export const getFromLocalstorage = (key) => {
    if (window !== 'undefined') {
    localStorage.getItem(key)
    }
}

// remove from localStorage
export const removeFromLocalstorage = (key) => {
    if (window !== 'undefined') {
    localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (res, next) => {
    
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE');
    setCookie('token', res.data.token);
    saveToLocalstorage('user', res.data.user);
    next();
};

// access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = next => {
    removeCookie('token');
    removeFromLocalstorage('user');
    next();
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS');
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};