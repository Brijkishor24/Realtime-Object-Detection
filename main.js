status="";
objects=[];
function preload(){
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelloaded(){
    console.log("Model Loaded");
    status= true;
    objectDetector.detect(video,getResult);
} 
function getResult(error,results){
   if(error){
       console.log(error);
   }else{
       console.log(results);
       objects=results;
       console.log(objects);
    }
}
function draw(){
    image(video,0,0,640,420);

   

    if(status!=""){
        console.log(objects);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("No.of_objects_detected").innerHTML="No of Objects detected:"+objects.length;
            fill(r,g,b);
            confidence=floor(objects[i].confidence*100);
            text(objects[i].label+" "+confidence+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
