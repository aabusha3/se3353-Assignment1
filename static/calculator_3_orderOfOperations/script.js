const display = document.getElementById("result");
const hist = document.getElementById("hist");
const buttons = document.querySelectorAll("button");
let line = []
let memory = null
let state = 'clear'
let brkCouter = 0
display.value = ''
hist.value = ''


function tempEval(){
  let result = 0;
  try {
    result = eval(line.toString().replaceAll(',','').replaceAll('x','*'))
  } catch (error) {
    display.value = 'error was made in input'
  }finally{
    display.value = result;
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const ids = button.id;
    if(ids === 'null') return;
    const value = button.innerHTML;
    fetch(`/api/calc3/press/${value.split('').map(x=>x.charCodeAt(0)).join(',')}/${new Date()}`);
    if(ids === 'cle') memory = null;

    if((state === 'clear' && (ids === 'num' || ids === 'mer' || value === '(')) || ids === 'clr' || ids === 'cle') {
      display.value = ''
      hist.value = ''
      state = ''
      line = []
      brkCouter = 0
    }

    if(ids === 'mew' && display.value.length > 0){
      memory = display.value
    }

    if(memory != null && ids === 'mer'){
      if(line.length === 0 || /([\/+*x(-])/g.test(line[line.length-1])) {
        line.push(memory);
        display.value = memory
      }
      else if(line[line.length-1] === ')') ;
      else {
        line[line.length-1] = memory;
        display.value = memory
      }
    }

    if(state !== 'clear' && ids === 'dec' && line.length > 0 && !/([\/+*x().-])/g.test(line[line.length-1])){
        line[line.length-1] += value;
        display.value += value;
    }

    if(state !== 'clear' && ids === 'brk' ){
      if(value === '(' && (line.length === 0 || /([\/+*x(-])/g.test(line[line.length-1]))){
        line.push(value);
        brkCouter++
      }
        
      else if(value === ')' && line.length > 0 && !/([\/+*x(-])/g.test(line[line.length-1]) && brkCouter>0){
        line.push(value);
        brkCouter--
      }
    }


    if(ids === 'num'){
      if(line.length === 0 || /([\/+*x(-])/g.test(line[line.length-1])) {
        line.push(value);
        display.value = value
      }
      else if(line[line.length-1] === ')') ;
      else{
        line[line.length-1] += value;
        display.value += value
      }
    }
    else if(state !== 'clear' && ids === 'ops' && line.length !== 0){
      if(line[line.length-1] === '(') ;
      else if(!/([\/+*x(-])/g.test(line[line.length-1])) line.push(value);
      else line[line.length-1] = value
    }
    else if(ids === 'eqa'){
      if(line.length !== 0) {
        tempEval();
        hist.value += ' ='
        state = 'clear'
      }
    }

    state==='clear'?hist.value:hist.value = line.toString().replaceAll(',',' ').replaceAll('( ','(').replaceAll(' )',')')
  })
})