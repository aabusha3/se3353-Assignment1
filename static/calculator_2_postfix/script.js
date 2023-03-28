const display = document.getElementById("result");
const hist = document.getElementById("hist");
const buttons = document.querySelectorAll("button");
let line = []
let memory = null
let displayString = ''
let state = 'clear'
display.value = ''
hist.value = ''


function tempEval(){
  const num1 = parseFloat(line.shift())
  const num2 = parseFloat(line.shift())
  let op = line.shift()
  if(op === 'x') op ='*';
  line.push(eval(`${num1}${op}${num2}`))
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const ids = button.id;
    const value = button.innerHTML
    fetch(`/api/calc2/press/${value.split('').map(x=>x.charCodeAt(0)).join(',')}/${new Date()}`);

    if(ids === 'cle') memory = null;

    if((state === 'clear' && ids === 'num') || ids === 'clr' || ids === 'cle') {
      display.value = ''
      hist.value = ''
      state = ''
      line = []
    }

    if(ids === 'mew' && (line.length === 1||line.length === 2)){
      memory = line[line.length-1]===''?line[line.length-2]:line[line.length-1]
    }

    if(memory != null && ids === 'mer'){
      if(line.length === 3) ;
      else if(line.length === 0){
        line.push(memory)
        hist.value = memory
      }
      else if(line.length === 2 && line[1]===''){
        line[1]=(memory)
        hist.value += memory
      }
      else{
        line[line.length-1] = memory
        let tempHist = hist.value.split(/(enter)|([\/+*x-])/g);
        tempHist[tempHist.length-1].indexOf(' ')>-1?
        tempHist[tempHist.length-1] = ' ' + memory:
        tempHist[tempHist.length-1] = memory;
        hist.value = tempHist.toString().replaceAll(',','')
      }
    }

    if(ids === 'dec' && (line.length === 1||line.length === 2)){
      if(line[line.length-1].toString().indexOf('.') < 0 && line[line.length-1].toString().length > 0) {
        line[line.length-1] += value;
        hist.value += value;
      }
    }

    if(ids === 'ent' && line.length === 1){
      line.push('')
      hist.value += value;
    }
    if(ids === 'num'){
      if(line.length === 0) {
        line.push(value);
        hist.value = value
      }
      else if(line.length === 1) {
        line[0] += value;
        hist.value += value;
      }
      else if(line.length === 2) {
        line[1] += value;
        hist.value += value;
      }
      else if(line.length === 3) {
        tempEval();
        line.push(value);
        hist.value += value;
      }
    }
    else if(ids === 'ops'){
      if(line.length === 0) ;
      else if(line.length === 1) ;
      else if(line.length === 2 && line[1] !== '') {
        line.push(value);
        hist.value += ' ' + value + ' ';
        tempEval();
        line.push('')
      }
      else if(line.length === 3) {
        line[2] = value;
        if(hist.value[hist.value.length-1] === ' ') hist.value = hist.value.replace(/..$/,value) + ' ';
        else hist.value = hist.value.replace(/.$/,value);
      }
    }

    display.value = line.length>0?line[line.length-1]===''?line[line.length-2]:line[line.length-1]:''
    console.log(memory)
    console.log(line)
  })
})