const storageKey = "ckzoj9ruj000mpj86i0zg13dm";
const isBrowser = () => typeof window !== "undefined";
const loadStorageObject = () => {
    const data = JSON.parse((isBrowser() && window.localStorage.getItem(storageKey)) || 'null');
    return data && data.jwt && JSON.parse(atob(data.jwt.split('.')[1])).exp * 1000 > new Date().getTime()
        ? fetch(
            `${process.env.B2B_API_BASE}/profile`,
            {credentials: 'include', headers: {Authorization: `Bearer ${data.jwt}`}}
        )
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(
                ({refreshToken, data}) => saveStorageObject({user: data, jwt: refreshToken}),
                () => logout(() => null)
            ) && {user: data.user, jwt: data.jwt}
        : logout(() => null);
};
const saveStorageObject = data => isBrowser() && window.localStorage.setItem(storageKey, JSON.stringify(data));
export const getUser = () => (loadStorageObject() || {user: null}).user;
export const performLogin = (username, password) =>
    fetch(`${process.env.B2B_API_BASE}/login`, {
        method: 'POST',
        body: new URLSearchParams({user: username, pass: password}),
    })
        .then(response => response.text().then(text => [response.ok, text]))
        .then(([ok, text]) => ok ? Promise.resolve(text) : Promise.reject(text))
        .then(jwt => fetch(
            `${process.env.B2B_API_BASE}/profile`,
            {credentials: 'include', headers: {Authorization: `Bearer ${jwt}`}}
        ))
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(({refreshToken, data}) => saveStorageObject({user: data, jwt: refreshToken}));
export const isLoggedIn = () => !!getUser();
export const logout = callback => {
    isBrowser() && window.localStorage.removeItem(storageKey);
    callback();
};