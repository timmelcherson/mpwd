export function getFromStorage(key) {
    console.log("getFromStorage key: " + key);
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);

        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        return null;
    }
}

export function setInStorage(key, obj) {
    console.log("setInStorage key: " + key + " and obj: ");
    console.log(obj);
    if (!key) {
        console.log('Error: Key is missing');
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.log(err);
    }
}