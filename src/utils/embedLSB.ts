import {Jimp, JimpMime} from 'jimp';

interface ScanContext {
    bitmap: {
        data: Buffer;
    };
}

const embedLSB = async (imageBlob: Blob, binaryData: string): Promise<Blob> => {
    const image = await Jimp.read(URL.createObjectURL(imageBlob));
    let dataIndex = 0;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(this: ScanContext, x: number, y: number, idx: number) {
        if (dataIndex < binaryData.length) {
            // Modify LSB
            this.bitmap.data[idx] = (this.bitmap.data[idx] & 0xFE) | parseInt(binaryData[dataIndex], 2); 
            dataIndex++;
        }
    });

    // Convert back to Blob
    const outputBuffer = await image.getBuffer(JimpMime.png);
    return new Blob([outputBuffer], { type: 'image/png' });
}

export default embedLSB;