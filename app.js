        var canvas, ctx, w, h;
        var aNum, sumNum, bNum; 
        var imageHeight, axisStartX, axisY, oneDivision, arrowOneEnd, arrowTwoStart;  


        // creating image element
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

          // putting numbers into expression
          document.getElementById('aSpanID').innerHTML = aNum;
          document.getElementById('bSpanID').innerHTML = bNum;        

          // img width=w, height is proportional
          imageHeight = w/875*83;

          // find axis start according to img width and height
          axisStartX = w/24;
          axisY = h - 0.75 * imageHeight;
         

          // find one division of axis
          oneDivision = w/22.5;

          // the end of first arrow and beginning of second arrow
          arrowOneEnd = arrowTwoStart = axisStartX + oneDivision * aNum;
          
          // drawing img
          // x=0, y = (canvas height - img height), img width = canvas width, img height is proportional 
          cx.drawImage(img, 0, h-imageHeight, w, imageHeight);
          
          // arrows style
          cx.strokeStyle = 'purple';
          cx.lineWidth = 3;
          
          // drawing arrow1
          drawArrow(axisStartX, arrowOneEnd, axisY);

          // showing 'a' input
          numInput('aNumID', axisStartX, axisY, oneDivision, aNum);
          
        };    

        // validity checking and following instructions for 'a' and 'b' inputs
        function validityChecking(inputID, spanID, divID, currentNum, nextStep) {

          var currentElement = document.getElementById(inputID);
          var val = parseInt(currentElement.value);
          var currentSpan = document.getElementById(spanID);
          var top = currentElement.style.top;
          var left = currentElement.style.left;

          if (val === currentNum) {
            // showing correct number
            showingCorrectNumber(divID, currentNum, top, left);
            // changing span color
            currentSpan.style.backgroundColor = 'white';
            // hiding input, clearing content
            currentElement.value = null;
            currentElement.style.display = 'none';
       
            // next step (depending on input)
            nextStep();

          }else {
            currentElement.style.color = 'red';
            currentSpan.style.backgroundColor = 'orange';
          };

        };

        function secondArrowAndInput() {
          // arrow 'b'
          drawArrow(arrowTwoStart, arrowTwoStart + oneDivision * bNum, axisY);
          // input 'b'
          numInput('bNumID', arrowTwoStart, axisY, oneDivision, bNum);
        };

        function sumInput() {
          // sum input
          var inputElem = document.getElementById('sumNumID');
          inputElem.style.display = 'inline-block';
          inputElem.style.top = '20px';
          inputElem.style.left = '540px';
          inputElem.focus();
        };

        // validity checking and following instructions for 'sum' input
        function validityCheckingSum() {
          
          var currentElement = document.getElementById('sumNumID');
          var val = parseInt(currentElement.value);
          var currentSpan = document.getElementById('sumSpanID');

          if (val === sumNum) {
            // showing correct number
            currentElement.value = null;
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
          console.log('quadraticCurveY', Y - (toX - fromX)/2);
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
          // (axisY - oneDivision * currentNum/4) is the top of the curve, 25 - making input above the curve
          inputElem.style.top = (axisY - oneDivision * currentNum/4 - 25)+'px';
          console.log('numInputCoord', (axisY - oneDivision * currentNum/4 - 25));
          inputElem.style.left = (axisX + oneDivision * currentNum / 2 - 10)+'px';
          inputElem.focus();
        };

        function showingCorrectNumber(correctNumberID, currentNum, top, left) {
          var correctNumber = document.getElementById(correctNumberID);
          correctNumber.innerHTML = currentNum;
          correctNumber.style.visibility = 'visible';
          correctNumber.style.top = top;
          correctNumber.style.left = left;
        };

        
