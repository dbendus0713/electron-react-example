class Api { 
  constructor(apiType, url, header, jsonBody, queryStr) { 
    this._apiType = apiType; 
    this._url = url; 
    this._header = header;
    this._jsonBody = jsonBody;
    this._queryStr = queryStr; 
  } 
  get apiType() {
    return this._apiType;
  }
  get url() {
    return this._url;
  }
  get header() {
    return this._header;
  }
  get jsonBody() {
    return this._jsonBody;
  }
  get queryStr() {
    return this._queryStr;
  }
  
  set apiType(value) {
    this._apiType = value;
  }
  set url(value) {
    this._url = value;
  }
  set header(value) {
    this._header = value;
  }
  set jsonBody(value) {
    this._jsonBody = value;
  }
  set queryStr(value) {
    this._queryStr = value;
  }
  
} 

module.exports = Api;
 