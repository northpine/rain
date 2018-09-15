import {createStore} from 'redux';
import {addServer, deleteServer, addCount} from '../constants/actions';
import servers from './servers';
import fakeData from '../../chrome/extension/background/fakeData';

const getFakeStore = () => {
    const store = createStore(servers);
    store.dispatch(addServer(fakeData));
    return store;
}

test('adds folders correctly to servers object', () => {
    const store = getFakeStore();
    const folderKeys = Object.keys(store.getState()[fakeData.url][`folders`]);
    expect(folderKeys).toHaveLength(3);
});

test('adds layers correctly to services', () => {
    const store = getFakeStore();
    const testService = store.getState()[fakeData.url]['services']['KingCo_SensitiveAreas'];
    expect(testService.layers).toHaveLength(2);
});

test('adds services correctly to servers object', () => {
    const store = getFakeStore();
    const serversKeys = Object.keys(store.getState()[fakeData.url]['services']);
    expect(serversKeys).toHaveLength(4);
});

test('add layers to correctly to servers object', () => {
    const store = getFakeStore();
    expect(Object.keys(store.getState()[fakeData.url]['layers'])).toHaveLength(9);
})

test('deletes server', () => {
    const store = getFakeStore();
    expect(store.getState()).toHaveProperty([fakeData.url]);
    store.dispatch(deleteServer(fakeData.url));
    expect(store.getState()).toStrictEqual({});
});

test('it marks for delete correctly', () => {
    const store = getFakeStore();
    const url = Object.keys(store.getState())[0];
    store.dispatch(addCount(url));
    expect(store.getState()[url].markedForDelete).toBeTruthy();
})