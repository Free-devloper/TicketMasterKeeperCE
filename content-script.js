console.log("content_script.js");
document.addEventListener('DOMContentLoaded', function() {
 var em= document.getElementById('email[objectobject]__input').value
 console.log(em);
});
$(document).ready(function(){
    console.log('Loaded')
  var email=$("input[name='email']").val();
  console.log(email);
  if(check_mail(email)){
    chrome.runtime.sendMessage(
      {
          contentScriptQuery: "getOTp"
          , email: email
      },function (response) {
          if (response != undefined && response != "") {
             //  alert(response.code)
              console.log(response.code)
              if(response.message=="success"){
                //  document.getElementById('otp').value=response.code;
                //  document.getElementById('getotpload').style.display="none";
                //  document.getElementById('getotp').style.display="inline-block";
                //  document.getElementById('otp').addEventListener('click',()=>{
                //     var textBox = document.getElementById("otp");
                //     textBox.select();
                //     document.execCommand("copy");
                //  });
                console.log("success")
              }else{
                console.log('fail');
                //   document.getElementById("error").style.display="block";
                //  setTimeout(function(){
                //      document.getElementById("error").style.display="none";
                //   }, 5000);
                //  document.getElementById('getotpload').style.display="none";
                //  document.getElementById('getotp').style.display="inline-block";
              }
              
             }
          else {
              alert("WENT WRONG")
          }
      });
  }
    // .on('input', function() {
    //     var email=$("input[name='email']").val()   
    //     var t=re.test(String(email).toLowerCase());
    //     // if(t){
    //     //     console.log(email)
    //     //     chrome.storage.local.set({tktemail: email});
    //     // }// Does some stuff and logs the event to the console
    //   });
    $("input[name='email']").on("change", "input",()=>{
      console.log('LORK')
    })
});

function check_mail(email){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase()); 
}