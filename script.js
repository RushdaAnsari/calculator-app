class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
      this.maxDigits = 13;
    }
  
    clear() {
      this.previousOperand = ''
      this.currentOperand = ''
      this.operation = undefined

    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
        if (this.currentOperand.length < this.maxDigits) {
            if (number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }    
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }

    compute() {
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            this.currentOperand = prev + current
            break
          case '-':
            this.currentOperand = prev - current
            break
          case '*':
            this.currentOperand = prev * current
            break
          case '÷':
            this.currentOperand = prev / current
            break
          case '%':
            this.currentOperand = prev * (current / 100)
            break
          default:
            return     
        }
        this.operation = undefined
        this.previousOperand = ''
      }      

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
              `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const outputElement = document.getElementById("calc-output");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// function for applying font color
function fontColor() {
  outputElement.style.color = 'black';
}


// number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        fontColor()
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === button.innerText) {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
           fontColor()
        }
    })
})


// operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === button.innerText) {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
            
        }
    })
})

// calculate function
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    fontColor()
})
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculator.compute()
        calculator.updateDisplay()
        fontColor()
       
    }
})    

// all clear button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
    
})
  
// delete button
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
    
})
window.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
        
    }
})    