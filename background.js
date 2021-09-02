var data_mails=[]
var activeTabId;
chrome.tabs.onActivated.addListener(async info => {
  chrome.action.disable();
  const tab = await chrome.tabs.get(info.tabId);
  const regex = /(https?:\/\/(.+?\.)?ticketmaster\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g;
  let m;
  let mt=0;
  while ((m = regex.exec(tab.url)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        mt+1;
        chrome.action.enable(info.tabId)
          console.log(`Found match, group ${groupIndex}: ${match}`);
      });
  }
});
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  chrome.action.disable();
  doInCurrentTab( function(tab){ activeTabId = tab.id } );
      const regex = /(https?:\/\/(.+?\.)?ticketmaster\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g;
      let m;
      let mt=0;
      while ((m = regex.exec(tab.url)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            mt+1;
            chrome.action.enable(tabId)
              console.log(`Found match, group ${groupIndex}: ${match}`);
          });
      }
    });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {    
  if (request.contentScriptQuery == "getOTp") {
var data = request.email;
data_mails[activeTabId]=request.email;
console.log(data_mails);
chrome.storage.local.set({'master_email': data}, function() {
  console.log('Value is set to ' + data);
});
   requestOptions=get_req(request.email)
    fetch("https://ticketmasterotp.herokuapp.com/getOTp", requestOptions).then((response)=>{
      if(response.status!==200)
      {
        console.log('No-emailFound')
        sendResponse({code:'',message:"failed"})
        return
      }
        response.text().then((data)=>{
          console.log(data.trim());
          chrome.storage.local.set({'master_code': data.trim()}, function() {
            console.log('Value is set to ' + data.trim());
          });
          sendResponse({code:data.trim(),message:"success"})
        });
    }).catch((error)=>{
      console.log(error)
      sendResponse({code:'',message:"Failed Request"})
    })
    return true;
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