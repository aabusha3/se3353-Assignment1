const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', express.static('static'))
const calc1Router = express.Router()
const calc2Router = express.Router()
const calc3Router = express.Router()
app.use('/api/calc1', calc1Router);
app.use('/api/calc2', calc2Router);
app.use('/api/calc3', calc3Router);
calc1Router.use(express.json());
calc2Router.use(express.json());
calc3Router.use(express.json());

let calc1Count = 0
let calc2Count = 0
let calc3Count = 0
let lastTime = new Date();

calc1Router.route('/press/:k/:d')
    .get((req,res) => {
        const dateReq = new Date(req.params.d)
        if(Math.abs(dateReq - lastTime)> 30000) calc1Count++;
        const write = `${String.fromCharCode(...req.params.k.split(','))} was pressed at time ${dateReq},`;
        const path = `./static/calculator_1_infix/logFiles/localHost_TestCase#${calc1Count}_${dateReq.getDate()}-${dateReq.getMonth()+1}-${dateReq.getFullYear()}.csv`;
        fs.open(path, 'a+', (er,f)=>{               
            fs.writeFile(path, write, {flag: "a+"},()=>{
                lastTime = new Date();
            })
        })
})

calc2Router.route('/press/:k/:d')
    .get((req,res) => {
        const dateReq = new Date(req.params.d)
        if(Math.abs(dateReq - lastTime)> 30000) calc2Count++;
        const write = `${String.fromCharCode(...req.params.k.split(','))} was pressed at time ${dateReq},`;
        const path = `./static/calculator_2_postfix/logFiles/localHost_TestCase#${calc2Count}_${dateReq.getDate()}-${dateReq.getMonth()+1}-${dateReq.getFullYear()}.csv`;
        fs.open(path, 'a+', (er,f)=>{               
            fs.writeFile(path, write, {flag: "a+"},()=>{
                lastTime = new Date();
            })
        })
})

calc3Router.route('/press/:k/:d')
    .get((req,res) => {
        const dateReq = new Date(req.params.d)
        if(Math.abs(dateReq - lastTime)> 30000) calc3Count++;
        const write = `${String.fromCharCode(...req.params.k.split(','))} was pressed at time ${dateReq},`;
        const path = `./static/calculator_3_orderOfOperations/logFiles/localHost_TestCase#${calc3Count}_${dateReq.getDate()}-${dateReq.getMonth()+1}-${dateReq.getFullYear()}.csv`;
        fs.open(path, 'a+', (er,f)=>{    
            fs.writeFile(path, write, {flag: "a+"},()=>{
                lastTime = new Date();
            })
        })
})

app.listen(5000, () => {console.log(`Listening To 5000`)})
