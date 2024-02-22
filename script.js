

(function() {
    "use strict";

    
    var el = function(element) {
      if (element.charAt(0) === "#") { 
        return document.querySelector(element); 
      }

      return document.querySelectorAll(element); 
    };
    
    var viewer = el("#viewer"), 
      equals = el("#equals"),
      nums = el(".num"), 
      ops = el(".ops"), 
      theNum = "", 
      oldNum = "", 
      resultNum, 
      operator; 

    
    var setNum = function() {
      
      if ((this.getAttribute("data-num")==="." && theNum.indexOf(".") === -1) || this.getAttribute("data-num")!=="."){
        if (resultNum) { // If a result was displayed, reset number
          theNum = this.getAttribute("data-num");
          resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
          theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number
      }

    };

    // When: Number key is pressed. Get the current number selected
    var setNumKey = function(keyPressed) {
      //if . was pressed, then only do this if theNum doesn't already include a .
      if ((keyPressed ==="." && theNum.indexOf(".") === -1) || keyPressed !=="."){
        if (resultNum) { // If a result was displayed, reset number
          theNum = keyPressed;
          resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
          theNum += keyPressed;
        }

         viewer.innerHTML = theNum; // Display current number
       }
    }

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");

      equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNumKey = function(wordOperator) {
      oldNum = theNum;
      theNum = "";
      operator = wordOperator;

      equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function() {

      // Convert string input to numbers
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);

      // Perform operation
      switch (operator) {
        case "plus":
          resultNum = oldNum + theNum;
          break;

        case "minus":
          resultNum = oldNum - theNum;
          break;

        case "times":
          resultNum = oldNum * theNum;
          break;

        case "divided by":
          resultNum = oldNum / theNum;
          break;

        case "square":
          resultNum = oldNum ** 2;
          break;

        case "cube":
          resultNum = oldNum ** 3;
          break;

        case "square root":
          resultNum = Math.sqrt(oldNum);
          break;

        case "power":
          resultNum = oldNum ** theNum;
          break;

        case "sin":
          resultNum = Math.sin(oldNum);
          break;

        case "cos":
          resultNum = Math.cos(oldNum);
          break;

        case "tan":
          resultNum = Math.tan(oldNum);
          break;

          
        default:
          resultNum = theNum;
      }

      // If NaN or Infinity returned
      if (!isFinite(resultNum)) {
        if (!isInt(resultNum) || !isFloat(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
          resultNum = "You broke it!";
        } else { // If result is infinity, set off by dividing by zero
          resultNum = "Look at what you've done";
          el('#calculator').classList.add("broken"); // Break calculator
          el('#reset').classList.add("show"); // And show reset button
        }
      }

      
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);

      
      oldNum = 0;
      theNum = resultNum;

    };

   
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };

    
    var findKey = function(e){
      if((e.key >= 0 && e.key <= 9) || e.key == "."){
        setNumKey(e.key);
      }
      
      switch (e.key) {
        case "+":
          moveNumKey("plus");
          break;
        case "-":
          moveNumKey("minus");
          break;
        case "*":
          moveNumKey("times");
          break;
        case "/":
          moveNumKey("divided by");
          break;
        case "=":
        case "Enter":
          displayNum();
          break;
        case "Escape":
        case "c":
        case "C":
          clearAll();
          break;
        
        default:
          break;
      }
    }

    
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }

    
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }

    
    document.onkeyup = findKey;

    
    equals.onclick = displayNum;

    
    el("#clear").onclick = clearAll;

    
    el("#reset").onclick = function() {
      window.location = window.location;
    };

  }());
