import axios from 'axios';
import store from './store';
import {ADD_DISCOVERED} from '../../../app/constants/actions';
import traverseServer from './traverse';
const filter = {
    urls: ['<all_urls>']
}
//Common identifiers for ArcGIS Server endpoint urls. Used to filter potential matches for servers. Mapped to Upper case 
const arcIdentifiers = ['FeatureServer', 'MapServer', 'ImageServer', 'rest/services', 'arcgis'].map(el => el.toUpperCase());
//Checks url contains any sort of identifiers associated with ArcGIS Server
const containsArcIdentifiers = (url) => {
    const upper = url.toUpperCase();
    const test = (el) => upper.includes(el);
    return arcIdentifiers.some(test);
}

const parseBaseUrl = (endpoint) => {
    var url = new URL(endpoint);
    var splitPath = url.pathname.split("/");
    if(splitPath.length < 3) {
        return;
    }
    //Parses: https://gismaps.kingcounty.gov/arcgis/rest/services/Hello/FeatureServer/0
    //To: https://gismaps.kingcounty.gov/arcgis/rest/services/
    var restServices = "/" + splitPath[1] + "/" + splitPath[2] + "/" + splitPath[3];
    //Sometimes an endpoint can have an extra endpoint: https://hazards.fema.gov/gis/nfhl/rest/services
    if(splitPath[4] === "services") {
        restServices = restServices + "/" + splitPath[4];
    }
    var protocolHost = url.protocol + "//" + url.host;
    var qualified = protocolHost + restServices.toLocaleLowerCase();
    return qualified;
}



chrome.webRequest.onCompleted.addListener((request) => {
    if(containsArcIdentifiers(request.url)) {
        let baseUrl = parseBaseUrl(request.url)
        if(!store.getState().discovered[baseUrl]) {
            //Even if its not a valid server, we don't want to request again if we know its a bad url
            store.dispatch({
                type: ADD_DISCOVERED,
                server: baseUrl
            });
            axios.get(`${baseUrl}?f=json`).then(resp => {
                if(resp.data['currentVersion']) {
                    traverseServer(baseUrl);
                }
            });
        }
    }
}, filter, ['responseHeaders']);


