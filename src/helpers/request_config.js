import qs from "qs";

function generateKeyValuePairs(arr) {
    const obj = {};
    arr.forEach((item) => {
      if (item.key && item.value) obj[item.key] = item.value;
    });
    return obj;
  }

export default function generateAxiosConfig(url, method, params, headers, content_type, body ){
    const request_config = {};
    request_config["url"] = url;
    request_config["method"] = method;
    request_config["params"] = generateKeyValuePairs(params);
    request_config["headers"] = generateKeyValuePairs(headers);
    if (method !== "get") {
      request_config["data"] = generateKeyValuePairs(body);
      if (
        content_type === "application/x-www-form-urlencoded" &&
        request_config["data"] !== {}
      ) {
        request_config["data"] = qs.stringify(request_config["data"]);
        request_config["headers"]["content-type"] =
          "application/x-www-form-urlencoded;charset=utf-8";
      }
    }

    return request_config;
}