let q,a;


//calc 1
q = ('5+3x2=').replace('=','').replaceAll('x','*').split((/([\/+*x-])/g))
while(q.length >= 3){
    a = eval(`${q[0]}${q[1]}${q[2]}`)
    q.splice(0,3,a)
}
console.log(a)


//calc 2
q = ('5=3+2x').replaceAll('x','*')
q = (q.split('=')[1] + q.split('=')[0]).split((/([\/+*x-])/g))
while(q.length >= 3){
    a = eval(`${q[q.length-1]}${q[1]}${q[0]}`)
    q.shift()
    q.shift()
    q.splice(q.length-1,1,a)
}
console.log(a)


//calc 3
q = ('(5+3)x2=').replace('=','').replaceAll('x','*')
a = eval(q)
console.log(a)