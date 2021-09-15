$(document).ready(function(){
  var email=$("input[name='email']").val();
  if(check_mail(email)){
    send_Message(email); 
  }
$("body").on("change", "input", function(event) {
  // console.log(event.target.value);
  if(check_mail(event.target.value)){
    send_Message(event.target.value);  
  }
});
});

function check_mail(email){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase()); 
}
function send_Message(email){
  chrome.runtime.sendMessage(
    {
        contentScriptQuery: "getOTp"
        , email: email
    },function (response) {
        if (response != undefined && response != "") {
           //  alert(response.code)
            // console.log(response.code)
            if(response.message=="success"){
              // console.log("success")
            }else{
              // console.log('fail');
            }
            
           }
        else {
            alert("WENT WRONG")
        }
    });
}
