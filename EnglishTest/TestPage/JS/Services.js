	//containers
let mainContain = document.getElementById("mainContainer");

let popUpWindow = document.getElementById("popUpWindows");

	//variable of popUpWindow

let courseList = document.getElementById("listOfCourses");

let courseName;

let LessonsInputText = document.getElementById("LessonsInpText");

let lessonsInput = document.getElementById("lessonsInp");

let lessonsSumText = document.getElementById("sumOfLessonsTxt");

let targetlList = document.getElementById("targlList");

let callCheckBox = document.getElementById("call");

let callText = document.getElementById("callTxt");

let orderPrice = document.getElementById("orderPrice");

let butNext = document.getElementById("butNextPosition");

let firstPopValid = {};

let scanFormInt;

	scanFormInt = setInterval(buttonNextUnlock, 10);

let sumElemObj = {
	
	selectedCourse: "",
	monthSum: "",
	lessonsSum: ""
};

let sumOfObjElem;

let formForSend = {
	call: "Предварительный звонок не нужен",
};

	// variable of emalePopWind

let emalePopWind;

let emlYNameInput; 

let emlYEmailInput;

let emlYPhoneInput;

let emlButSend;

let textForSend;

let emlFooterText;

let emlFootName;

let emlFootEmail;

let emlFootPhone;

let emlFootOrder;

let arrowBack;

let arrowBackTxt;

let emlFlagForBack;

let emlValidFlag = {};

let emlForm = {};



butNext.disabled = true;

					//work with PopUp window
		
	//open the PopUp window
function firstPopUp() {
	
	popUpWindow.style.display = "inline";
	
	buttonClickMe.style.display = "none";
	
	butNext.addEventListener("click", function() {checkForm();} );
	
};

	//observe changes in forms and process data
function findSumsElem() {

		courseList.onchange = function(){
				
			if (courseList.value == 1){
				
				sumElemObj.selectedCourse = 20000;
					sumElemObj.monthSum = 3;
						formForSend.course = "Продолжительность курса - 3 месяца";
							firstPopValid.courseList = true;
								
				} else if (courseList.value == 2){
						
						sumElemObj.selectedCourse = 48000;
							sumElemObj.monthSum = 6;
								formForSend.course = "Продолжительность курса - 6 месяцев";
									firstPopValid.courseList = true;
			} else if (courseList.value == 3){
							
					sumElemObj.selectedCourse = 94000;
						sumElemObj.monthSum = 12;
							formForSend.course = "Продолжительность курса - 12 месяцев";
								firstPopValid.courseList = true;
			}else{
				firstPopValid.courseList = false;
			}
			
			calculatePrice();
			console.log(formForSend);
		}
	
				lessonsInput.oninput = function(){

					if (lessonsInput.value == 2){

						lessonsSumText.textContent = "Только групповые занятия";
							sumElemObj.lessonsSum = 0;
								formForSend.lessonsAdd = lessonsSumText.textContent;
									firstPopValid.lessonsInput = true;

							}else if (lessonsInput.value == 3){

								lessonsSumText.textContent = "+ 1 индивидуальное занятие";
									sumElemObj.lessonsSum = 1;
										formForSend.lessonsAdd = lessonsSumText.textContent;
											firstPopValid.lessonsInput = true;

									}else if (lessonsInput.value == 4){

										lessonsSumText.textContent = "+ 2 индивидуальных занятия";
											sumElemObj.lessonsSum = 2;
												formForSend.lessonsAdd = lessonsSumText.textContent;
													firstPopValid.lessonsInput = true;

							}else if (lessonsInput.value == 5){

								lessonsSumText.textContent = "+ 3 индивидуальных занятия";
									sumElemObj.lessonsSum = 3;
										formForSend.lessonsAdd = lessonsSumText.textContent;
											firstPopValid.lessonsInput = true;

					}else{

						lessonsSumText.textContent = "минимальное кол-во занятий в неделю - 2, максимальное - 5";
						firstPopValid.lessonsInput = false;
					}

					calculatePrice();
			console.log(formForSend);

				}
		
		targetlList.onchange = function(){
				
				if (targetlList.value == 1){
					
					formForSend.target = "Ваша цель - повысить уровень своих знаний";
					
					emlForm.target = "Цель - повысить уровень своих знаний";
					
					firstPopValid.targetList = true;
				
					}else if (targetlList.value == 2){
						
						formForSend.target = "Ваша цель - получить помощь с домашними заданиями по школе";
						
						emlForm.target = "Цель - получить помощь с домашними заданиями по школе";
						
						firstPopValid.targetList = true;
						
						}else if (targetlList.value == 3){
							
							formForSend.target = "Ваша цель - не знаю, но изучать английский сейчас модно";
							
							emlForm.target = "Цель - не знаю, но изучать английский сейчас модно";
							
							firstPopValid.targetList = true;
							
						}else{
							firstPopValid.targetList = false;
						}
			
			console.log(formForSend);
		}
		
		callCheckBox.onchange = function(){
				
				if (callCheckBox.checked == true){
					
					formForSend.call = "Нужен предварительный звонок";
				
					}else{
						
						formForSend.call = "Предварительный звонок не нужен";
					}
			console.log(formForSend);
			
		}
};

findSumsElem();

	//calculate sum of order and process data
function calculatePrice(){
	
	sumOfObjElem = sumElemObj.selectedCourse + (4000 * sumElemObj.monthSum * sumElemObj.lessonsSum);
		orderPrice.textContent = sumOfObjElem;
	
	formForSend.price = "Стоимость: " + sumOfObjElem;
	
};

	//check forms on correct filling
function checkForm() {
	
	let i = 0;
	
		if (courseList.value != 0){
			courseList.style.border = "solid";
			courseList.style.borderColor = "green";
			i++;
			
		
		}else{
				courseList.style.border = "solid";
				courseList.style.borderColor = "red";
		}
	
			if (lessonsInput.value >= 2 && lessonsInput.value <= 5) {
				lessonsInput.style.border = "solid";
				lessonsInput.style.borderColor = "green";
				i++;

			}else{

				lessonsInput.style.border = "solid";
					lessonsInput.style.borderColor = "red";
					lessonsSumText.textContent = "минимальное кол-во занятий в неделю - 2, максимальное - 5";
			}
		
			if (targetlList.value != 0){
					targetlList.style.border = "solid";
					targetlList.style.borderColor = "green";
					i++;

			}else{
				targetlList.style.border = "solid";
				targetlList.style.borderColor = "red";
			}
	
				if ( i == 3 && emlFlagForBack != true){
					console.log("работает - secondFormPoP");
					secondFormPoP();
					
				} else if ( i == 3 && emlFlagForBack == true){
					console.log("работает - writeEmlInpValue");
					writeEmlInpValue();
				}
};

	//check form before continue
function buttonNextUnlock() {
	
	if (Object.keys(formForSend).length == 5 && firstPopValid.courseList == true && firstPopValid.lessonsInput == true && firstPopValid.targetList == true){
			butNext.disabled = false;
	}else{
		butNext.disabled = true;
	}

};

				//work with emalePopWind 

	//create emalePopWind
function secondFormPoP(){
	
		popUpWindow.style.display = "none";
		
	let scanEmalePopWind;

	scanEmalePopWind = setInterval(catchEmlFormValue,10);
		
		emalePopWind = document.createElement("div");
		mainContain.appendChild(emalePopWind);
		emalePopWind.classList.add("popUpW");
	
		arrowBack = document.createElement("img");
		arrowBack.src = "../img/Shape.png";
		emalePopWind.appendChild(arrowBack);
		arrowBack.classList.add("emlArrowBack");
		arrowBack.addEventListener("click", function() {backToFirst();} );
	
		arrowBackTxt = document.createElement("p");
		emalePopWind.appendChild(arrowBackTxt);
		arrowBackTxt.classList.add("arrBackTxt");
		arrowBackTxt.textContent = "Вернуться";
		arrowBackTxt.style.color = "white";
		arrowBackTxt.style.fontSize = "14px";
		arrowBackTxt.addEventListener("click", function() {backToFirst();} );
	
			
		let emlHeaderTxt = document.createElement("h1");
		emalePopWind.appendChild(emlHeaderTxt);
		emlHeaderTxt.classList.add("headText");
		emlHeaderTxt.textContent = "Пожалуйста, представьтесь";
	
		let emlForm = document.createElement("form");
		emalePopWind.appendChild(emlForm);
		emlForm.action = "https://formspree.io/f/xjvpekjg";
		emlForm.method = "post";
		emlForm.id = "oneForm";
				
	
		let emlNameLabel = document.createElement("label");
		emlForm.appendChild(emlNameLabel);
			
		let emlYouNameTxt = document.createElement("p");
		emlNameLabel.appendChild(emlYouNameTxt);
		emlYouNameTxt.textContent = "Ваше имя";
	
		emlYNameInput = document.createElement("INPUT");
		emlNameLabel.appendChild(emlYNameInput);
		emlYNameInput.setAttribute("type","text");
	
		let emlYEmaiLabel = document.createElement("label");
		emlForm.appendChild(emlYEmaiLabel);
		
		let emlYEmailTxt = document.createElement("p");
		emlYEmaiLabel.appendChild(emlYEmailTxt);
		emlYEmailTxt.textContent = "Электронная почта";
	
		emlYEmailInput = document.createElement("INPUT");
		emlYEmaiLabel.appendChild(emlYEmailInput);
		emlYEmailInput.setAttribute("type","email");
		emlYEmailInput.setAttribute("id","email");
		emlYEmailInput.setAttribute("placeholder","address@yandex.ru");
	
		emlYEmailTo = document.createElement("INPUT");
		emlYEmaiLabel.appendChild(emlYEmailTo);
		emlYEmailTo.name = "_replyto";
		emlYEmailTo.setAttribute("type","email");
		emlYEmailTo.setAttribute("id","email");
		emlYEmailTo.setAttribute("value","Diamond9496@yandex.ru");
		emlYEmailTo.style.display = "none";
		
		let emlYPhoneLabel = document.createElement("label");
		emlForm.appendChild(emlYPhoneLabel);
		
		let emlYPhoneTxt = document.createElement("p");
		emlYPhoneLabel.appendChild(emlYPhoneTxt);
		emlYPhoneTxt.textContent = "Телефон";
	
		emlYPhoneInput = document.createElement("INPUT");
		emlYPhoneLabel.appendChild(emlYPhoneInput);
		emlYPhoneInput.setAttribute("type","tel");
		emlYPhoneInput.setAttribute("placeholder", "89997778855");
	
		emlButSend = document.createElement("button");
		emlForm.appendChild(emlButSend);
		emlButSend.classList.add("butSend");
		emlButSend.textContent = "Отправить";
		emlButSend.setAttribute("type","submit");
		emlButSend.disabled = true;
		
		
		textForSend = document.createElement("textarea");
		emlForm.appendChild(textForSend);
		textForSend.name = "message";
		textForSend.style.display = "none";
				
	
		emlFooterText = document.createElement("ul");
		emlForm.appendChild(emlFooterText);
		emlFooterText.classList.add("emlFooterTxt");
	
		emlFootName = document.createElement("li");
		emlFooterText.appendChild(emlFootName);
	
		emlFootEmail = document.createElement("li");
		emlFooterText.appendChild(emlFootEmail);
	
		emlFootPhone = document.createElement("li");
		emlFooterText.appendChild(emlFootPhone);
	
		emlFootCall = document.createElement("li");
		emlFooterText.appendChild(emlFootCall);
	
		emlFootOrder = document.createElement("li");
		emlFooterText.appendChild(emlFootOrder);

};

	//cacth values of emal emalePopWind
function catchEmlFormValue () {
	
		emlYNameInput.onchange = function() {

			emlForm.name = emlYNameInput.value;
			console.log(emlForm);
			
			textForSend.textContent = "Имя: " + emlForm.name + ", " + " " + " Телефон: " + ", " + " " + " Email: " + ", " + " " + formForSend.call + ", " + " " + " Заказ: " + " " + formForSend.course + ", " + formForSend.lessonsAdd + ", " + emlForm.target +", " + " " + formForSend.price;
			
			
		}

			emlYEmailInput.onchange = function() {

				emlForm.email = emlYEmailInput.value;
				console.log(emlForm);
				validateEmail();
				
				textForSend.textContent = "Имя: " + emlForm.name + ", " + " " + " Телефон: " + ", " + " " + " Email: " + emlForm.email + ", " + " " + formForSend.call + ", " + " " + " Заказ: " + " " + formForSend.course + ", " + formForSend.lessonsAdd + ", " + emlForm.target +", " + " " + formForSend.price;

				}
			
		emlYPhoneInput.onchange = function() {
			
				emlForm.phone = emlYPhoneInput.value;
				console.log(emlForm);
				validatePhone();
			textForSend.textContent = "Имя: " + emlForm.name + ", " + " " + " Телефон: " + emlForm.phone + ", " + " " + " Email: " + emlForm.email + ", " + " " + formForSend.call + ", " + " " + " Заказ: " + " " + formForSend.course + ", " + formForSend.lessonsAdd + ", " + emlForm.target +", " + " " + formForSend.price;
		}
		
		if (Object.keys(emlForm).length == 4 && emlValidFlag.emailV == true && emlValidFlag.phoneV == true){
			emlFootName.textContent = "Ваше имя: " + emlForm.name;
				
			emlFootEmail.textContent = "Ваш Email: " + emlForm.email;
						
			emlFootPhone.textContent = " Ваш телефон: " + emlForm.phone;
			
			emlFootCall.textContent = formForSend.call;
						
			emlFootOrder.textContent = "Ваш заказ: " + " " + formForSend.course + ", " + formForSend.lessonsAdd + ", " + formForSend.target + ", " + formForSend.price;
		
			emlButSend.disabled = false;
		}else{
			emlButSend.disabled = true;
		}
				
};
				//check values of emalePopWind's inputs

	//check email
function validateEmail() {
	
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	if (reg.test(emlForm.email) == true ){
		
		emlYEmailInput.style.border = "solid";
		emlYEmailInput.style.borderColor = "green";
		console.log("корректный Email");
		emlValidFlag.emailV = true;
	
	}else {
	
		emlYEmailInput.style.border = "solid";
		emlYEmailInput.style.borderColor = "red";
		console.log("Введите корректный Email");
		emlValidFlag.emailV = false;
		}
	catchEmlFormValue ();
};

	//check phone
function validatePhone() {
	
	var reg = /^\d[\d\(\)\ -]{4,14}\d$/;
	
	if (reg.test(emlForm.phone) == true){
		
		emlYPhoneInput.style.border = "solid";
		emlYPhoneInput.style.borderColor = "green";
		emlValidFlag.phoneV = true;
		
	}else {
			
		emlYPhoneInput.style.border = "solid";
		emlYPhoneInput.style.borderColor = "red";
		emlValidFlag.phoneV = false;
		}
	catchEmlFormValue ();
};

	//back to popUpWindow
function backToFirst() {
	
	console.log(emlForm);
	
	emalePopWind.style.display = "none";
	
	popUpWindow.style.display = "inline";
	
	emlFlagForBack = true;
	
	checkWroteEmlInp();
	
	catchEmlFormValue ();
	
};

function checkWroteEmlInp(flag) {
	

	
	if (!emlForm.hasOwnProperty("name")){
			console.log(emlForm.name);
			emlYNameInput.value = "";
			//emlFootName.textContent = "Ваше имя: ";
			flag = 0;
		}
	
	if (!emlForm.hasOwnProperty("email")){
			emlYEmailTo.setAttribute("value","Diamond9496@yandex.ru");
			//emlFootEmail.textContent = "Ваш Email: ";
			flag = 0;
		
		}
	
	if (!emlForm.hasOwnProperty("phone")){
			emlYPhoneInput.setAttribute("placeholder", "89997778855");
			//emlFootPhone.textContent = " Ваш телефон: ";
			flag = 0;
		}
};

	//fill emalePopWind's inputs 
function writeEmlInpValue() {

	emalePopWind.style.display = "inline";
	
	if (checkWroteEmlInp(1) && emlFlagForBack == true){	
	
		emlYNameInput.value = emlForm.name;
		emlYEmailInput.value = emlForm.email;
		emlYPhoneInput.value = emlForm.phone;
		
		//emalePopWind.style.display = "inline";
		
		let scanEmlFormPopUp;
		
		scanEmlFormPopUp = setInterval(catchEmlFormValue, 10);
		
	}else if (checkWroteEmlInp(0) && emlFlagForBack == true){
		//emalePopWind.style.display = "inline";
		
		let scanEmlFormPopUp;
		
		scanEmlFormPopUp = setInterval(catchEmlFormValue, 10);
	}
};


let buttonClickMe = document.querySelector("#butClickMe");
buttonClickMe.addEventListener("click", function() {firstPopUp()} );