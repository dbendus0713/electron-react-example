const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const Api = require("../src/domain/Api");
const {
  SEND_REQ_TRANSFER,
  SEND_CHANGE_BTN,
} = require("../src/constants/RenderCode");
const jsonData = require("../src/constants/trans-rst.json");
const d_url = "http://localhost:8080/api"; 

const commonHeader = {
  api_key:
    "aa",
};

let gloval_interval_value = undefined;
let gloval_interval_boolean = false;
const INTERVAL_TIME = 20000; 

app.whenReady().then(() => {
  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: `${__dirname}/preload.js`,
    },
  });
  win.loadURL("http://localhost:3000");
  win.webContents.openDevTools();
  // console.log("-----:" + process.env.mode);
  // if (process.env.mode === 'dev') {
  //   win.loadURL('http://localhost:3000')
  //   win.webContents.openDevTools()
  // } else {
  //   win.loadFile(`${path.join(__dirname, '../build/index.html')}`)
  //   win.webContents.openDevTools()
  // }

  win.once("ready-to-show", () => win.show());
  win.on("closed", () => {
    win = null;
  });


});

app.on("window-all-closed", () => {
  app.quit();
});

const changeBtnFnc = (fromOrgId, rst) => {
  jsonData.item.map((v) => {
    if (v.fromOrgId === fromOrgId) {
      v.rst = rst;
    }
    return v;
  });
  const jsnStr = JSON.stringify(jsonData);
  fs.writeFileSync(
    `${path.join(__dirname, "../src/constants/trans-rst.json")}`,
    jsnStr,
    { encoding: "utf8", flag: "w" }
  ); 
}

ipcMain.on(SEND_REQ_TRANSFER, (event, transObj) => {
  if (!gloval_interval_boolean) {
    event.sender.send(SEND_CHANGE_BTN, transObj.key, transObj.fromOrgId, "P"); 
  
    const callbackFnc = (key, fromOrgId, rst) => {
      event.sender.send(SEND_CHANGE_BTN, key, fromOrgId, rst);
      changeBtnFnc(fromOrgId, rst);
    }
    reqTransferApi(transObj.key, transObj.fromOrgId, transObj.targetOrgId, callbackFnc);
  }
});

const setMyInterval = (key, fromDeptCode, targetDeptCode, eventFnc) => {
  gloval_interval_boolean = true;
  gloval_interval_value = setInterval(() => {
    console.log(
      "interval Fnc executing : ",
      fromDeptCode,
      targetDeptCode
    );
    checkApi(key, fromDeptCode, targetDeptCode, eventFnc);
  }, INTERVAL_TIME);
}

const clearMyInterval = () => {
  if (gloval_interval_boolean) {
  // if (typeof gloval_interval_value !== "undefined") {
    clearInterval(gloval_interval_value); 
    gloval_interval_boolean = false;
  }
};

const reqTransferApi = (key, fromDeptCode, targetDeptCode, eventFnc) => {
  setMyInterval(key, fromDeptCode, targetDeptCode, eventFnc);

  let api = new Api(
    "post",
    `${d_url}/transfer`,
    commonHeader,
    {
      fromOrgId: fromDeptCode,
      targetOrgId: targetDeptCode,
      uReqUserId: "admin",
    },
    {}
  );

  const thenFnc = (response) => {
    console.log(response);
    // clearMyInterval();
  };
  const errFnc = (response) => {
    console.log(response);
    if (response.status !== 408) {
      clearMyInterval();
      eventFnc(fromDeptCode, "F");
    }
  };
  postApi(api, thenFnc, errFnc);
};

const checkApi = (key, fromDeptCode, targetDeptCode, eventFnc) => {
  let api = new Api(
    "get",
    `${d_url}/transfer-depts/from/${fromDeptCode}/target/${targetDeptCode}`,
    commonHeader,
    {},
    {}
  );
  const thenFnc = (response) => {
    if (response?.data.success) {
      if (response?.data?.response) {
        const filtered = response?.data?.response;
        console.log(filtered);
        if (filtered.transStatus === "C") {
          clearMyInterval();
        }
        eventFnc(key, fromDeptCode, filtered.transStatus);
      }
    }
  };

  const errFnc = (response) => {
    console.log(response);
    clearMyInterval();
    if (response.status !== 408) {
      eventFnc(key, fromDeptCode, "F");
    }
  };
  getApi(api, thenFnc, errFnc);
};

const getApi = (api, thenFnc, errFnc) => {
  axios({
    method: api.apiType,
    url: api.url,
    headers: api.header,
  })
    .then(thenFnc)
    .catch(errFnc);
};

const postApi = (api, thenFnc, errFnc) => {
  axios({
    method: api.apiType,
    url: api.url,
    data: api.jsonBody,
    headers: api.header,
  })
    .then(thenFnc)
    .catch(errFnc);
};
