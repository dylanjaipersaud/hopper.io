const ASSET_NAMES = [
    'frog idle 1.png'
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName){
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            console.log(`Downloaded ${assetName}`);
            asset[assetName] = asset;
            resolve();
        };
        asset.src = `/assets/${assetName}`;
    });
}

export const downloadAsset = () => downloadPromise;

export const getAsset = assetName => assets[assetName];