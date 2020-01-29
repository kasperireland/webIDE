function print(msg){
    console.log(msg);
}

print("Connected");


showTv= document.getElementById("previewIf");
codeEt= document.getElementById("contentTa");

showTv.srcdoc= codeEt.value;

contentTa.addEventListener("input", function(eve){
    let code= codeEt.value;
    showTv.srcdoc= code;
})