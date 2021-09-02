var activeTabId;
doInCurrentTab( function(tab){ activeTabId = tab.id } );
var btn_submit=document.getElementById('getotp');
document.addEventListener('DOMContentLoaded', function() {
    var text='';
    setTimeout(async()=>console.log(
       text=await window.navigator.clipboard.readText()), 3000)
    if(!test_mail(text)){
        document.getElementById('email').value=text;
    }
   document.getElementById('getotp').addEventListener("click",()=>{
      var email=document.getElementById('email').value;
      if(!test_mail(email)){
        return
      }else{
    document.getElementById('getotp').style.display="none";
    document.getElementById('getotpload').style.display="inline-block";
    chrome.runtime.sendMessage(
         {
             contentScriptQuery: "getOTp"
             , email: email
         },function (response) {
             if (response != undefined && response != "") {
                //  alert(response.code)
                 console.log(response.code)
                 if(response.message=="success"){
                    document.getElementById('otp').value=response.code;
                    document.getElementById('getotpload').style.display="none";
                    document.getElementById('getotp').style.display="inline-block";
                    document.getElementById('otp').addEventListener('click',()=>{
                       var textBox = document.getElementById("otp");
                       textBox.select();
                       document.execCommand("copy");
                    });
                 }else{
                     document.getElementById("error").style.display="block";
                    setTimeout(function(){
                        document.getElementById("error").style.display="none";
                     }, 5000);
                    document.getElementById('getotpload').style.display="none";
                    document.getElementById('getotp').style.display="inline-block";
                 }
                 
                }
             else {
                 alert(response.message)
             }
         });
    }
   });
}, false);

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//    chrome.runtime.sendMessage({type: "getEmail", id: tabs[0].id}, function(email) {

//    });
// });
function test_mail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//JQUUERY
$( document ).ready(function() {
    chrome.storage.local.get(['master_email'], function(result) {
        console.log(result.master_email)
        if(result.master_email!==undefined){
            $('#email').val(result.master_email);
        }
      });
      chrome.storage.local.get(['master_code'], function(result) {
        console.log(result.master_code)
        if(result.master_code!==undefined){
            $('#otp').val(result.master_code);
            document.getElementById('otp').addEventListener('click',()=>{
                var textBox = document.getElementById("otp");
                textBox.select();
                document.execCommand("copy");
             })
            chrome.storage.local.clear();
        }
      });
});

function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}
// function getAllStorageSyncData(key) {
//     return new Promise((resolve, reject) => {
//       window.sessionStorage.getItem(key, (items) => {
//         // Pass any observed errors down the promise chain.
//         if (chrome.runtime.lastError) {
//           return reject(chrome.runtime.lastError);
//             }
//             // Pass the data retrieved from storage down the promise chain.
//         resolve(items);
//       });
//     });
//   }