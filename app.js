        var canvas, ctx, w, h, aNum, sumNum, bNum, imageHeight, axisStartX, axisY, oneDivision, arrowOneEnd, arrowTwoStart;  


        // creating sprite image in canvas
        var img = document.createElement("img");
        img.src = "sprite.png";

        // after DOM loading calling init function
        window.onload = function init() {
        canvas = document.getElementById("canv_1");
  
        w = canvas.width; 
        h = canvas.height;  
  
        cx = canvas.getContext('2d');
        // random numbers (a between [6,9], sum between [11,14])
        aNum = Math.round((9 - 6) * Math.random() + 6);
        sumNum = Math.round((14 - 11) * Math.random() + 11);
        bNum = sumNum - aNum;

        // adding numbers to expression
        document.getElementById('aSpanID').innerHTML = aNum;
        document.getElementById('bSpanID').innerHTML = bNum;

        

        // sprite width=w, height is proportional
        imageHeight = w/875*83;

        // find axis start according to sprite width and height
        axisStartX = w/24;
        axisY = h - 0.75 * imageHeight;
       

        // find one division of axis
        oneDivision = w/22.5;

        // the end of first arrow and beginning of second arrow
        arrowOneEnd = arrowTwoStart = axisStartX + oneDivision * aNum;
          
          // drawing img
          // x=0, y = (canvas height - sprite height), sprite width = canvas width, sprite height is proportional 
          cx.drawImage(img, 0, h-imageHeight, w, imageHeight);
          
          cx.strokeStyle = 'purple';
          
          // arrow1
          drawArrow(axisStartX, arrowOneEnd, axisY);

          // first input
          numInput('aNumID', axisStartX, axisY, oneDivision, aNum);
          
        };    


        function validityChecking(inputID, spanID, currentNum) {
          
          // add nextStep function as a parameter. For first validityChecking make func for arrow drawing and send it as nextStep parameter
          // dont forget all slo's comments in skype
          // dont forget to check in mozilla

          var currentElement = document.getElementById(inputID);
          var val = parseInt(currentElement.value);
          var currentSpan = document.getElementById(spanID);

          if (val === currentNum) {
            console.log('correct!');
            // showing first correct number
            showingCorrectNumber('aNumDivID', axisStartX, axisY, oneDivision, currentNum);
            // changing span color
            currentSpan.style.backgroundColor = 'white';
            currentElement.style.display = 'none';

            // arrow2
            drawArrow(axisStartX + oneDivision * currentNum, axisStartX + oneDivision * currentNum + oneDivision * bNum, axisY);

            // second input
            numInput('bNumID', axisStartX + oneDivision*currentNum, axisY, oneDivision, bNum);

          }else {
            currentElement.style.color = 'red';
            currentSpan.style.backgroundColor = 'orange';
          };

        };

        function validityChecking2() {
          
          var currentElement = document.getElementById('bNumID');
          var val = parseInt(currentElement.value);
          var currentSpan = document.getElementById('bSpanID');

          if (val === bNum) {
            console.log('correct!');
            // showing first correct number
            showingCorrectNumber('bNumDivID', axisStartX + oneDivision*aNum, axisY, oneDivision, bNum);
            // changing span color
            currentSpan.style.backgroundColor = 'white';
            currentElement.style.display = 'none';

            // expression input
            var inputElem = document.getElementById('sumNumID');
            inputElem.style.display = 'inline-block';
            inputElem.style.top = '20px';
            inputElem.style.left = '540px';
            inputElem.focus();

          }else {
            currentElement.style.color = 'red';
            currentSpan.style.backgroundColor = 'orange';
          };

        };

        function validityChecking3() {
          
          var currentElement = document.getElementById('sumNumID');
          var val = parseInt(currentElement.value);
          var currentSpan = document.getElementById('sumSpanID');

          if (val === sumNum) {
            console.log('correct!');
            // showing first correct number
            currentElement.style.display = 'none';
            currentSpan.innerHTML = sumNum;
            currentSpan.style.backgroundColor = 'white';

          }else {
            currentElement.style.color = 'red';
          };

        };

        function drawArrow(fromX,toX,Y) {
          // arc
          cx.beginPath();
          cx.moveTo(fromX, Y);
          cx.quadraticCurveTo(fromX + (toX - fromX)/2, Y - (toX - fromX)/2, toX, Y);
          cx.stroke();
          // arrow for arc
          cx.beginPath();
          cx.moveTo(toX - 0.03 * (toX-fromX), Y - (toX - fromX)/15);
          cx.lineTo(toX, Y);
          cx.lineTo(toX - 0.07 * (toX-fromX), Y - (toX - fromX)/30);
          cx.stroke();
        };

        function numInput(inputID, axisX, axisY, oneDivision, currentNum) {
          var inputElem = document.getElementById(inputID);
          inputElem.style.display = 'inline-block';
          inputElem.style.top = (axisY - oneDivision * currentNum/3)+'px';
          inputElem.style.left = (axisX + oneDivision * currentNum / 2 - 10)+'px';
          inputElem.focus();
        };

        function showingCorrectNumber(correctNumberID, axisX, axisY, oneDivision, currentNum) {
          var correctNumber = document.getElementById(correctNumberID);
          correctNumber.innerHTML = currentNum;
          correctNumber.style.visibility = 'visible';
          correctNumber.style.top = (axisY - oneDivision * currentNum/3)+'px';
          correctNumber.style.left = (axisX + oneDivision * currentNum / 2 - 10)+'px';
        }

        
