import axios from 'axios';
import store from './store';
import {addTraversal, removeTraversal, addServer} from '../../../app/constants/actions';
const requester = axios.create();
const requests = {};
requester.interceptors.request.use((config) => {
    requests[config.url]
})
const layerKeys = ['extent', 'id', 'name', 'description', 'geometryType'];
const extractData = (data) => {
    const copy = {};
    layerKeys.forEach(key => {
        copy[key] = data[key];
    });
    return copy;
}
const recurseTree = async (url, container, server) => {
    const fJson = `${url}?f=json`
    const response = await axios.get(fJson);
    const data = response.data;
    const folders = data.folders;
    if(folders && folders.length > 0) {
        container['folders'] = [];
        for(let i in folders) {
            const folder = folders[i];
            const newContainer = {
                name: folder,
                services: [],
                layers: []
            }
            container['folders'].push(newContainer);
            await recurseTree(`${url}/${folder}`, newContainer, server);
        }
        
    }
    const services = data.services;
    if(services && services.length > 0) {
        if(!container['services']) container['services'] = [];
            for(let i in services) {
                const service = services[i];
                const urlServiceName = (service.name.includes("/")) ? service['name'].split("/")[1] : service.name;
                const newUrl = url + "/" + urlServiceName + "/" + service['type'];
                var newContainer = {
                    name: service['name'],
                    layers: []
                }
                container['services'].push(newContainer);
                await recurseTree(newUrl, newContainer, server);

            }
        
    }
    const layers = data.layers;
    if(layers) {
        for(let i in layers) {
            const layer = layers[i];
            await recurseTree(url + "/" + layer.id, container['layers'], server);
        }
    }
    const id = data['id'];
    if(id) {
        const extracted = extractData(data);
        extracted.url = url;
        container.push(extracted);
    }
}
const traverseServer = async (baseUrl) => {
    console.log(`Beginning traversal of ${baseUrl}`);
    store.dispatch(addTraversal(baseUrl));
    const serverTree = {};
    serverTree.url = baseUrl;
    await recurseTree(baseUrl, serverTree, baseUrl);

    store.dispatch(removeTraversal(baseUrl));
    store.dispatch(addServer(serverTree));
    const normalized = store.getState().servers[baseUrl];
    normalized['server'] = baseUrl;
    console.log(normalized);
    await axios.post("https://pine.center/insert", normalized);
    console.log(`Finished traversal of ${baseUrl}`);
}

export default traverseServer;