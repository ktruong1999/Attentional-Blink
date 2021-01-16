

var x = 226;
var y = 214;

var tcount = 0;
var dcount = 0;

//target positioning
var tpos = 0; //position of t1
var t2_placement = 0; //position of t2
var place = 0; //y/n for a t2 
var time = 105; //ms for duration of stimuli

//answers for evaluation as ascii codes
var cond_num = 0;
var trial_num = 0;
var flagger = 0;
var t1_ans = 0;
var t2_ans = 0;

//scores
var t1_correct = false;
var t2_correct = [0, 0, 0, 0];  //has to be stored as an array to get the accuracy per condition    

var cb_array = [0, 2, 3, 4];

//these are where the final accuacy per condition will be stored

var scores=[0,0,0,0]


//limits
var max_trials=5;
var max_cond=3;

function crosshair() {
	// clears screen; changes target to crosshair, display none on all of the distractors
	//starts trial if there are still trials/conditions left;
	for (i = 1; i <= 4; i++) {
		document.getElementById('d' + i).style.display = 'none';
	}
	document.getElementById('target').innerHTML = '+';
	document.getElementById('target').style.display = 'block';

	document.getElementById('trial').innerHTML=trial_num +1;
	document.getElementById('cond').innerHTML=cond_num +1;

	//recursive base case 
	if (cond_num == max_cond && trial_num == max_trials) {
		document.getElementById('target').style.display = 'none';
		document.getElementById('end').style.display = 'block';
		calc_score();
		document.getElementById('scores').style.display = 'block';

	} else {
		//recursion
		setTimeout(startTrial, 1500, cb_array);
	}

}


function startTrial(cb_array) {
	//only does 1 trial per call
	//90 ms per stimuli (weird things with 100 bc of screen refresh)
	//20 stimuli per trial
	//5 trials for each condition

	for (i = 1; i <= 4; i++) {
		document.getElementById('d' + i).style.display = 'none';
	}
	document.getElementById('eval1').style.display = 'none';
	document.getElementById('eval2').style.display = 'none';


	dcount = 0;
	tcount = 0;
	tpos = 0;
	t2_placement = 0;
	flagger = 0;
	t1_correct = false;


	condition = cb_array[(cond_num)]
	trial_num += 1;
	//THIS CONTROLS NUMBER OF TRIALS
	if (trial_num == max_trials && cond_num<max_cond) {
		trial_num = 0;
		cond_num += 1;
	}

	distractors(condition);
	tplace();

};


function tplace() {
	//calculates/sets the placement of t1 & t2 before the target function is called 

	tpos = Math.floor(Math.random() * (15 - 5) + 5);
	//random position for T1 somewhere in the trial between 5 & 15
	place = Math.floor(Math.random() * (2) + 1);
	//to randomize y/n if there was an X or not 1= Y 2= N

	t2_placement = Math.floor(Math.random() * 4 + 1);
	t2_placement += tpos;
	//randomize placement of x after t1

	if (place == 1) {
		t2_ans = 89;
	} else {
		t2_ans = 78;
	}

	target();
}

function target() {
	document.getElementById('target').style.display = 'block';

	tcount += 1;
	//tpos & t2_placement are accessed globally 
	if (tcount == tpos) {
		var trgt = 0;
		trgt = Math.floor(Math.random() * (57 - 49) + 49);
		t1 = String.fromCharCode(trgt);
		document.getElementById('target').innerHTML = t1;
		t1_ans = trgt;
	} else if (tcount == t2_placement && place == 1) {
		//t2 : the placement of t2 is randomly <b>sometimes<b> within 1-4 spaces after t1
		t2 = String.fromCharCode(88);
		document.getElementById('target').innerHTML = t2;
	} else {
		//else, put a random distractor
		do {
			distract = Math.floor(Math.random() * (90 - 65) + 65);
		} while (distract == 88);
		//executes random distractor ascii at least once and recalculates if it's X

		d = String.fromCharCode(distract);
		document.getElementById('target').innerHTML = d;
	}
	//document.getElementById('debugger').innerHTML += tcount + "<br>"

	if (tcount < 20) {
		setTimeout(target, time);
	} else {
		genfinal();
	}
};


function distractors(num) {
	//num is the number of distractors
	dcount += 1;
	c = 360 / num;
	points = [0, 0, 0, 0];    //points hold each iteration generated point so the next one can use             

	for (i = 0; i < num; i++) {
		if (i == 0) {
			p = Math.floor(Math.random() * c + 1);
			//only calculate a rnd point for  the first iteration
		} else {
			p = points[i - 1] + c;
			//suceeding iterations are just  the prev point + 180 or 120 or 90
		}
		points[i] = p;
		p = p / 57.295; //convert from radians to degrees
		sin = Math.sin(p);
		cos = Math.cos(p);
		xp = x - (Math.floor(cos * 100));
		yp = y - (Math.floor(sin * 100));


		document.getElementById('d' + (i + 1)).style.left = (xp - 30) + 'px';
		document.getElementById('d' + (i + 1)).style.top = (yp - 30) + 'px';

		distract = Math.floor(Math.random() * (90 - 65) + 65);
		d = String.fromCharCode(distract);

		document.getElementById('d' + (i + 1)).innerHTML = d;
		document.getElementById('d' + (i + 1)).style.display = 'block';
	}

	if (dcount < 20) {
		setTimeout(distractors, time, num);
		//modern day setTimeout! 3rd parameter is the parameter passed into the function
	} else {
		genfinal();
	}


};

function genfinal() {
	for (i = 1; i <= 4; i++) {
		document.getElementById('d' + i).style.display = 'none';
	}
	document.getElementById('target').style.display = 'none';

	setTimeout(function () { document.getElementById('eval1').style.display = 'block'; }, 1000);
}


function cleareval() {
	for (i = 1; i <= 3; i++) {
		document.getElementById('eval' + i).style.display = 'none';
	}
	document.getElementById('response').innerHTML = " ";
	document.getElementById('response').style.display = 'none';

}

function onkeynum(e) {

	flagger += 1;
	//if the participant identified the  right T1 #
	if (flagger == 1 && e.keyCode == t1_ans) {
		t1_correct = true;
		ascii = e.which;
		rspnse = String.fromCharCode(ascii);

		cleareval();

		document.getElementById('response').style.display = 'block';
		document.getElementById('response').innerHTML = "you entered : " + rspnse;

		setTimeout(function () { cleareval(); document.getElementById('eval2').style.display = 'block'; }, 2000);

	} else if (flagger == 2 && e.which == t2_ans) {
		if (t1_correct == true) {
			t2_correct[cond_num] += 1;
		}
		ascii = e.which;
		rspnse = String.fromCharCode(ascii);

		cleareval();

		document.getElementById('response').style.display = 'block';
		document.getElementById('response').innerHTML = "you entered : " + rspnse;

		setTimeout(function () { cleareval(); document.getElementById('eval3').style.display = 'block'; }, 2000);
	} else if (flagger >= 3 && e.which == 32) {
		cleareval();
		crosshair();
	} else {
		cleareval();
		ascii = e.which;
		rspnse = String.fromCharCode(ascii);

		document.getElementById('response').style.display = 'block';
		document.getElementById('response').innerHTML = "you entered : " + rspnse;

		setTimeout(function () {
			cleareval();
			if (flagger < 3) {
				document.getElementById("eval" + (flagger + 1)).style.display = 'block';
			} else {
				document.getElementById('eval3').style.display = 'block';
			}
		}, 2000);
	}


}

function calc_score() {
	//the only way i could think of to store the accuracy according to
	//the # of distractors, sorts & stores score accuracy into correct
	//condition 

	//DATA STORING

	for (i = 0; i <= 3; i++) {
		scores[i]= t2_correct[i] / 6;
		document.getElementById("s"+i).innerHTML=(scores[i]*100)+'%';
		} 

}




