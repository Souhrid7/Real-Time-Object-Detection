function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded)
}
function draw() {
  image(video,0,0,300,300)
  classifier.classify(video,gotResults)
}
function modelLoaded() {
  console.log('ModelLoaded')
}
previous_result=''
function gotResults(error,result) {
  if(error) {
    console.error(error)
  }
  else if(result[0].confidence>0.5 && previous_result!=result[0].label) {
    console.log(result)
    previous_result=result[0].label
    s=window.speechSynthesis;
    data="Object Detected is "+result[0].label
    u=new SpeechSynthesisUtterance(data)
    s.speak(u)
    document.getElementById('result_object_name').innerHTML="Object Name: "+result[0].label
    document.getElementById('result_object_accuracy').innerHTML="Accuracy: "+(result[0].confidence.toFixed(3)*100)+" %"
  }
}

