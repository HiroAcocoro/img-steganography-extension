import { Jimp, JimpMime } from "jimp";

interface ScanContext {
  bitmap: {
    data: Buffer;
  };
}

const embedLSB = async (imageBlob: Blob, binaryData: string): Promise<Blob> => {
  const image = await Jimp.read(URL.createObjectURL(imageBlob));
  let dataIndex = 0;

  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (this: ScanContext, _x: number, _y: number, idx: number) {
      if (dataIndex < binaryData.length) {
        this.bitmap.data[idx] =
          (this.bitmap.data[idx] & 0xfe) | parseInt(binaryData[dataIndex], 2);
        dataIndex++;
      }
    },
  );

  const outputBuffer = await image.getBuffer(JimpMime.png);
  return new Blob([outputBuffer], { type: "image/png" });
};

export default embedLSB;
