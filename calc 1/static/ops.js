async function calc(){
    let display = document.getElementById("calc-typed");
    let history = document.getElementById("calc-operation");

    if(new RegExp(/([\/+*x-])/g).test(display.innerHTML.at(display.innerHTML.length-1))
        || display.innerHTML === '|' 
        )
        return;

    await fetch(`/api/calc/${display.innerHTML}`).then(res => res.json().then(data => {
        display.readOnly = true;
        history.innerHTML = display.innerHTML+'='
        return(display.innerHTML = data)
    }));
}

async function keyPress(key){
    const display = document.getElementById("calc-typed")
    display.readOnly = false;
    const date = new Date()
    await fetch(`/api/press/${key}/${date}`).then(res => res.json().then(data => {
        if(res.status === 400) return;
        if(data != null && (new RegExp(/([\/+*x-])/g).test(data) && new RegExp(/([\/+*x-])/g).test(String.fromCharCode(key)))) 
            display.innerHTML = display.innerHTML.replace(/.$/,String.fromCharCode(key));
        else {
            if(display.innerHTML === '|' || display.readOnly) display.innerHTML = String.fromCharCode(key);
            else display.innerHTML += String.fromCharCode(key);
        }
    }));
}
