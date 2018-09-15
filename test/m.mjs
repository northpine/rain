import {normalize, schema} from 'normalizr';
import fakeData from '../chrome/extension/background/fakeData';

const unnormalizedData = {servers: fakeData};

const layer = schema.Entity('layer');
const service = schema.Entity('service', {
    layers: [layer]
});
const folder = schema.Entity('folder', {
    services: [service],
    layers: [layer]
});


const server = schema.Entity('server', {
    folders: [folder],
    services: [service]
});

const serverList = schema.Entity('serverList', {
    servers: [server]
})

const normalizedData = normalize(unnormalizedData, serverList);
console.log(normalizedData);