var record = $("#record")[0];
var ricon = $("#recordIcon")[0];
var toutput = $("toutput")[0];

record.onclick = function chgColor():void{
    console.log(record.className);
    if(record.className == 'btn btn-success'){
        record.className = "btn btn-danger";
        ricon.className = "glyphicon glyphicon-stop";
    }else{
        record.className = "btn btn-success";
        ricon.className = "glyphicon glyphicon-record";
        
    }
   
}