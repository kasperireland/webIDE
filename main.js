function print(msg){
	console.log(msg);
}

var editor = ace.edit("editor");
//editor.setTheme("ace/theme/github");
//editor.session.setMode("ace/mode/javascript");
let fontSize = 18;

editor.setOptions({
	fontFamily: "monospace",
	fontSize: fontSize,
	highlightActiveLine: false,
	highlightGutterLine: true,
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true
});

editor.setShowPrintMargin(false);

editor.commands.addCommand({
    name: 'Save',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
		if(!liveUpdate){
			showToast("Saved", "Preview has been updated");
			updateHtml();
			updateCss();
			updateJs();
		}
    },
    readOnly: true // false if this command should not apply in readOnly mode
});


// var EditSession = require("ace/edit_session").EditSession;
var EditSession = ace.EditSession;


let liveUpdate= true;



var html = new EditSession("<h2>Hello World</h2>");
html.setMode("ace/mode/html");
html.on("change", function(delta) {
	if(liveUpdate){
		updateHtml();
		updateJs();
	}
});

var css = new EditSession(["h2{", "   color: purple; text-align: center; margin: 25px;", "}"]);
css.setMode("ace/mode/css");
css.on("change", function(delta) {
	if(liveUpdate){
		updateCss();
	}
});

var js = new EditSession("console.log('Hello World');");
js.setMode("ace/mode/javascript");
js.on("change", function(delta) {
	if(liveUpdate){
		updateJs();
	}
});

//=======================================================
runI = document.getElementById("runI");

function updateHtml() {
	print("Updating HTML");
	//runI.srcdoc = html.getValue();
	$("#runI")
		.contents()
		.find("body")
		.empty();
	$("#runI")
		.contents()
		.find("body")
		.append(html.getValue());
}

function updateCss() {
	print("Updating CSS");
	$("#runI")
		.contents()
		.find("style")
		.remove();
	let styleTag= "<style>" + css.getValue() + "</style>";
	$("#runI")
	.contents()
	.find("head")
	.append(styleTag);
}

function updateJs() {
	print("Updating JS");
	$("#runI")
		.contents()
		.find("script")
		.remove();
	var scriptTag = "<script>" + js.getValue() + "</script>";
	$("#runI")
		.contents()
		.find("body")
		.append(scriptTag);
}

//=======================================================
updateHtml();
updateCss();
updateJs();
//=======================================================

setHtml();

function setHtml() {
	editor.setSession(html);
}
function setCss() {
	editor.setSession(css);
}
function setJs() {
	editor.setSession(js);
}

//==============================================
function getValue(msg) {
	return prompt(msg, "");
}
//==============================================
function downloadProject() {
	showToast("Project Download", "Zipping files....");
	let htmlC = html.getValue();
	let cssC = css.getValue();
	let jsC = js.getValue();

	let projectName = $("#title").val();
	if (projectName === "Enter Project Name") {
		projectName = getValue("Please Enter Project Title:");
		$("#title").val(projectName);
	}
	if (!projectName || projectName === "") {
		projectName = "Unnamed Project";
		$("#title").val(projectName);
	}

	let zip = new JSZip();
	zip.file("index.html", htmlC);
	let cssFolder = zip.folder("css");
	cssFolder.file("main.css", cssC);
	let jsFolder = zip.folder("js");
	jsFolder.file("main.js", jsC);
	zip
		.generateAsync({
			type: "blob"
		})
		.then(function(content) {
			saveAs(content, projectName + ".zip");
		});
}

//downloadProject();
//============================================

$("#menuUl").hide();
function showMenu() {
	$("#menuUl").toggle();
}

function hideMenu() {
	$("#menuUl").hide();
}

$("#zoomInB").click(function() {
	fontSize = fontSize + 4;
	editor.setFontSize(fontSize);
	hideMenu();
});

$("#zoomOutB").click(function() {
	fontSize = fontSize - 4;
	editor.setFontSize(fontSize);
	hideMenu();
});

setLiveUpdate();

function setLiveUpdate(){
	liveUpdate= true;
	$("#liveUpB").removeClass("inactive");
	$("#liveUpB").addClass("active");
	$("#saveUpB").removeClass("active");
	$("#saveUpB").addClass("inactive");
	showToast('Live update enabled', 'It may give poor performance');
}

function setUpdateOnSave(){
	liveUpdate= false;
	$("#liveUpB").removeClass("active");
	$("#liveUpB").addClass("inactive");
	$("#saveUpB").removeClass("inactive");
	$("#saveUpB").addClass("active");
	showToast('Update on save enabled', 'Press Ctrl + S to save');
}


function showToast(title, content){
	$.toast({
		heading: title,
		text: content,
		position: 'bottom-right',
		stack: 2,
		//icon: 'success',
		bgColor: '#00b075',
    	textColor: 'white',
		showHideTransition: 'slide',
		loader: true,  
    	loaderBg: '#005438',
	});
}