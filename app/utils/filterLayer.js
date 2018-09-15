export default (searchString, searchContents = false) =>  {
    if(searchString && searchString.length > 0) {
        return (searchContents) ? 
            (layer) => JSON.stringify(layer).includes(searchString)
            : (layer) => layer.url.includes(searchString) || layer.name.includes(searchString);
    } else {
        return () => true;
    }
}