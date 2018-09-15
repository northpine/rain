/**
 * 
 * Output should be linked with url of server as a key.
 * 
 * Output Schema:
 * {
 *  'urlOfServer': {
 *   "folders": {
 *      [folderName]: {
 *          services: [
 *              'serviceName1'
 *              'serviceName2'
 *          ]
 *      }
 *   },
 *   "services": {
 *      [serviceName]: {
 *          layers: [
 *              'layerUrl1',
 *              'layerUrl2'
 *          ]
 *      }
 *   },
 *   "layers": {
 *     [layerUrl]: {
 *          //Data for layer
 *     }
 *   }
 * }
 * }
 */

export default (server) => {
    const norm = {
        folders: {},
        services: {},
        layers: {}
    }
    const {folders, services, layers} = norm;
    if(server.folders && server.folders.length > 0) {
        server.folders.forEach(folder => {
            if(folder.services.length > 0) {
                folders[folder.name] = {
                    services: folder.services.map(service => service.name)
                }
                folder.services.forEach(service => {
                    if(service.layers.length > 0) {
                        services[service.name] = {
                            layers: service.layers.map(layer => layer.url)
                        }
                        service.layers.forEach(layer => {
                            layers[layer.url] = layer;
                        });
                    }
                })
            }
        });
    }
    if(server.services && server.services.length > 0) {
        server.services.forEach(service => {
            if(service.layers.length > 0) {
                services[service.name] = {
                    layers: service.layers.map(layer => layer.url)
                }
                service.layers.forEach(layer => {
                    layers[layer.url] = layer;
                });
            }
        });
    }

    return norm;
}
