class Person {
	constructor(name) {
		this.name = name;
	}

	say(msg) {
		console.log(this.name +  " says: " + msg);
	}
}

macro oddadd {
 case (($x:lit) <+> $y:lit) => {
   $x + $y
 }
}

macro def {
  case $name:ident $params $body => {
    function $name $params $body
  }
}

var bob = new Person("Bob");
bob.say("Macros works!");

var z = oddadd((2) <+> 4);
console.log(z);

def winning() {
  console.log('win');
}

winning();
