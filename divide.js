//link button to function
function create(){
	input.style = "display : block"
	document.querySelector("button").style = "display : none"
}

function insertFromTo(start, end, intArr, scndArr) {
	while (start <= end)
		scndArr.push(intArr[start++]);
	return scndArr;
}
function shuffle(array) {

	//generation random number to select how many times you main group will be shuffled.
	//between 1 and 10 times.
	let rand = Math.round(Math.random() * 9 + 1);
	alert("Your list of names will be shuffled randomly for " + rand + " times.");
	let i = 0;
	while (i++ < rand) {
		//Start shuffling.
		let currentIndex = array.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex--);
			//Swap between two elements (random and the last one).
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
		}
	}
}
function optionToDivide(array) {
	let options = [];
	for (let i = 2; i < array.length; i++) {
		if (array.length % i == 0)
			options.push(i);
	}
	return options;
}
function notOptimalChoice(array, grpNbr, optimalArr) {
	let count = 0;
	let reminder = 0;
	for (let i = 0; i < optimalArr.length; i++) {
		if (grpNbr == optimalArr[i])
			count++;
	}
	if (count > 0) {
		alert("the user chose from the optimal group number.")
	}
	// if(array.length % grpNbr * grpNbr > array.length){
	// 	return;
	// }
	else {
		reminder = array.length % grpNbr;
		alert("The last " + reminder + " elements will be added randomly to " + reminder + " groups.");
		//if the user didnt choose the perfect divisor, place the rest students in the first ${reminder} group.
		let containers = document.querySelectorAll('p');
		for(let i = 0 ; i < reminder ; i++){
			containers[i].textContent += ","+array[(array.length-reminder+i)]
		}
	}
}
function reset(){
	//hiding "crete" button & upload
	document.querySelector("button").style = "display : none";
	document.querySelector("input").style = "display : none";
	//button reset creation
	let newBtn = document.createElement('button');
	document.body.appendChild(newBtn);
	newBtn.textContent = "Reset";
	newBtn.addEventListener("click",()=>{
		//reload the whole page.
		document.location.reload();
	});
}
function grouping(array) {
	//shuffle
	shuffle(array);
	//display options to have x nbr of groups equal to each other.
	let opt = optionToDivide(array);
	if(opt.length > 0)
	alert("-Tip:\nTo get groups equal to each other you have to select the number of the groups from : " + opt);
	else alert(`No way to get equal groups, except dividing into 1 or ${array.length} groups`)
	//eliminating some non logical cases.  
	let groupsNbr = parseInt(prompt("To how many group you want to divide you class?"));
	// if (groupsNbr > array.length / 2) {
	// 	alert("your initial group is small to be divided into " + groupsNbr + " other groups.")
	// 	return;
	// }
	if (groupsNbr < 1) {
		alert("please enter a number greater than 0");
		return reset();
	}
	if(groupsNbr > array.length){
		alert("please enter smaller number");
		return reset();
	}
	//building obj to store new groups.	
	let storage = {};
	for (let i = 1; i <= groupsNbr; i++) {
		storage["grp" + i] = [];
	}

	//Initializing variables
	let start = 0;
	let end = Math.floor(array.length / groupsNbr);
	const INC = Math.floor(array.length / groupsNbr);
	//alert("size of each grp"  + end); (for testing)
	for (let i = 1; i <= groupsNbr; i++) {
		// alert("grp"+i);
		// alert(insertFromTo(start, --end , array, storage["grp"+i]));
		let newP = document.createElement('p');
		newP.textContent =  `group${i} : 
		${(insertFromTo(start, --end, array, storage["grp" + i])).toString()}`;
		document.getElementById("container").appendChild(newP);
		// document.querySelector("p").textContent += "\ngroup" + i + ": \n" + (insertFromTo(start, --end, array, storage["grp" + i])).toString() + "\n********************\n";
		//alert(start + "   " +end);(for testing)
		//start from the next index to the end index in last iteration.
		start = ++end;
		// new end
		end += INC;
	}
	notOptimalChoice(array, groupsNbr, optionToDivide(array));
	reset();
}
//upload file.
const input = document.querySelector('input[type ="file"]');
//hiding the upload
input.style = "display : none";
//converting input to arrays
let array = input.addEventListener('change' , (e)=>{
	const reader = new FileReader();
	reader.onload = () =>{
		var arr = reader.result.split(",")
		grouping(arr);
	};
	reader.readAsText(input.files[0]);
} , false);	
//

document.querySelector("h1").addEventListener("mouseover" , function(){
	this.textContent = "GMC";
	this,this.style = "animation: glitch3 0.4s infinite;color : blue;"
})


	
	
