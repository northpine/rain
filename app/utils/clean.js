
const cleanObject = (obj, predicate) => {
    return Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((prev, curKey) => prev[curKey] = obj[curKey], {});
}


export default (normalizedServer) => {
    const cleaned = normalizedServer;
    cleaned.services = cleanObject(normalizedServer.services, (service) => service.layers.length > 0);
    cleaned.folders = cleanObject(normalizedServer.folders, (arr) => arr.length > 0);
    cleaned.layers = {...normalizedServer.layers}
    return cleaned;
}