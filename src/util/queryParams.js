export function getAllParamsFromQueryParams(location) {
    if (Object.prototype.toString.call(location) !== '[object Location]') {
        throw TypeError("Expected type Location")
    }
    let allParams = {}

    location.search
        .substr(1)
        .split("&")
        .forEach((item) => {
            allParams[item.split("=")[0]] = item.split("=")[1]
        });

    return allParams
}
