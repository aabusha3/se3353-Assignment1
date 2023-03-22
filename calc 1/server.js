const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', express.static('static'))
const calcRouter = express.Router()
app.use('/api', calcRouter);
calcRouter.use(express.json());


calcRouter.route('/calc/:q')
    .get((req,res) => {
        let querry, answer = req.params.q;
        querry = (req.params.q).replace('=','').replaceAll('x','*').split((/([\/+*x-])/g))

        while(querry.length >= 3){
            answer = eval(`${querry[0]}${querry[1]}${querry[2]}`)
            querry.splice(0,3,answer)
        }

        fs.truncate('./memory.csv',(err)=>{
            return res.send(JSON.stringify(answer));
        });
    })

calcRouter.route('/press/:k/:d')
    .get((req,res) => {
        const write = `${String.fromCharCode(req.params.k)};${req.params.d},`
        fs.open('./memory.csv', 'a+', (e,f)=>{
            fs.readFile('./memory.csv', 'utf8', (err, data)=>{
                if(typeof data.split(',')[data.split(',').length-2] === 'undefined' && new RegExp(/([\/+*x-])/g).test(String.fromCharCode(req.params.k)))
                    return res.status(400);
                
                fs.writeFile('./memory.csv', write, {flag: "a+"},(errr)=>{
                    res.send(JSON.stringify(typeof data.split(',')[data.split(',').length-2] === 'undefined'? 
                        null:data.split(',')[data.split(',').length-2].split(';')[0]));
                })
            })
        })
    })

app.listen(5000, () => {fs.truncate('./memory.csv',(err)=>{console.log(`Listening To 5000`);});})
