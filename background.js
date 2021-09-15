chrome.tabs.onRemoved.addListener(function(tabid, removed) {
  try {
    
  chrome.storage.local.get(['master_email'], function(result) {
    if(result.master_email){
      data_store=JSON.parse(result.master_email);
      delete data_store[tabid];
      chrome.storage.local.set({'master_email': JSON.stringify(data_store)}, function() {
      });
    }else{
    }
  });
} catch (error) {
    
}
 });
 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {    
  if (request.contentScriptQuery == "getOTp") {
var data_email = request.email;
var current_tab=0;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  set_data(data_email,'',tabs);
   requestOptions=get_req(request.email)
    fetch("https://ticketmasterotp.herokuapp.com/getOTp", requestOptions).then((response)=>{
      if(response.status!==200)
      {
        sendResponse({code:'',message:"failed"})
        return
      }
        response.text().then((data)=>{
          set_data(data_email,data.trim(),tabs);
          sendResponse({code:data.trim(),message:"success"})
        });
    }).catch((error)=>{
      sendResponse({code:'',message:"Failed Request"})
    })
  });
  return true;
  }else if(request.contentScriptQuery == "gettab_id"){

  }
});
function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
      { currentWindow: true, active: true },
      function (tabArray) { tabCallback(tabArray[0]); }
  );
}
function get_req(email){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('Access-Control-Allow-Origin', '*');
   myHeaders.append('Access-Control-Allow-Credentials', 'true');
  var urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
    mode:'cors'
  };
  return requestOptions;
}
function set_data(data="",code="",tabs=[]){
  var data_store={};
  try {
    
  chrome.storage.local.get(['master_email'], function(result) {
    if(result.master_email){
      data_store=JSON.parse(result.master_email);
      data_store[tabs[0].id]={email:data,code:code}
      chrome.storage.local.set({'master_email': JSON.stringify(data_store)}, function() {
      });
    }else{
      data_store[tabs[0].id]={email:data,code:code};
      chrome.storage.local.set({'master_email': JSON.stringify(data_store)}, function() {
      });
    }
  });
} catch (error) {
    
};
}