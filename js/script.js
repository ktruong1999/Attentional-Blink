

const openLink= () => {
	  location.href = "exp.html";
		//vs window.open("x"); opens in a new tab 

	};

var x =226;
var y= 214;

function gensample() {
	//reused a lot of code..BUT TRUST  ME would've been more complicated to make another function
	var ascii = 55;
	t1 = String.fromCharCode(ascii);
	document.getElementById('target').style.display = 'block';

	document.getElementById('target').innerHTML = t1;
	c = 360 / 4;
	points = [0, 0, 0, 0];    //points hold each iterated generated point so the next one can use             

	for (i = 0; i < 4; i++) {
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

}
