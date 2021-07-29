 export default function generateSrc(response) {
    const b64 = Buffer.from(response.data, "binary").toString("base64");
    const src = `data:${response["headers"]["content-type"]};base64,${b64}`;
    return src;
  }