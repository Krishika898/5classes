

song = "";

function preload()
{
	song1 = loadSound("music.mp3");
	song2 = loadSound("jump.wav");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(400, 400);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	
if(scoreRightWrist > 0.2){
	circle(rightWristX, rightWristY, 20);
	document.getElementById("whatsongiscurrentlyebingplayed").innerHTML = "music.mp3";
    song1.play();
	song2.stop();
	}
	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX, leftWristY, 20);
		document.getElementById("whatsongiscurrentlyebingplayed").innerHTML = "Peter Pan";
    song2.play();
	song1.stop();
	}

}

function GOGOGOGO()
{
	song1.play();
	song.setVolume(1);
	song.rate(1);
}
