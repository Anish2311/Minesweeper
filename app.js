ndim = 9
dim = Math.min(window.innerWidth,window.innerHeight)/ndim
grid = []
initialize()

function initialize(){
    for(let i = 0; i < ndim; i++){
        m = `
        <div class="row">
        `
        for(let j = 0; j < ndim; j++){
            grid.push(' ')
            markup = `
            <div class="block" style="width: ${dim - 4}px; height: ${dim - 10}px; font-size:${(dim - 4)/1.5}px;" id="${(i + j * ndim).toString()}" onclick="handleClick(${i + j * ndim})"></div>
            `
            m += markup
        }
        m += `</div>`
        document.getElementById('cont').insertAdjacentHTML('beforeend',m)
    }
    mining()
}

function mining(){
    for(let i = 0; i < (ndim**2)/5; i++){
        let ind = parseInt(Math.random()*ndim**2)
        if (grid[ind] == ' '){
            grid[ind] = 'bomb'
        }
    }
}

function handleClick(l){
    let index = l
    if(grid[index] == 'bomb'){
        show()
    }
    else if(grid[index] == ' '){
        check(index)
    }
}

function indicesGen(i){
    let indices = []
    if(i%ndim > 0){
        indices.push(i - 1)
        if(i > ndim - 1){
            indices.push(i - ndim - 1)
        }
        if(i < ndim*(ndim - 1)){
            indices.push(i + ndim - 1)
        }
    }
    if(i%ndim < ndim - 1){
        indices.push(i + 1)
        if(i > ndim - 1){
            indices.push(i - ndim + 1)
        }
        if(i < ndim*(ndim - 1)){
            indices.push(i + ndim + 1)
        }
    }
    if(i > ndim - 1){
        indices.push(i - ndim)
    }
    if(i < ndim*(ndim - 1)){
        indices.push(i + ndim)
    }
    return indices
}

function check(j){
    let c = 0
    let indi = indicesGen(j)
    for(let i = 0; i < indi.length; i++){
        if(grid[indi[i]] == 'bomb'){
            c += 1
        }
    }
    if(c == 0){
        grid[j] = ''
        document.getElementById(`${j}`).style.backgroundColor = 'rgb(80,80,80)'
        for(let i = 0; i < indi.length; i++){
            if(grid[indi[i]] == ' '){
                check(indi[i])
            }
        }
    }
    else{
        grid[j] = c
        document.getElementById(`${j}`).innerText = `${c}`
        winChecker()
    }
}

function show(){
    for(let i = 0; i < grid.length; i++){
        if(grid[i] == 'bomb'){
            document.getElementById(`${i}`).innerHTML = `<ion-icon name="skull-outline" style="color: rgb(100,50,50)"></ion-icon>`
        }
    }
    setTimeout(alert,1000);
    function alert(){
        window.alert('You Lost.. SKILL ISSUE XD')
        location.reload()
    }
}

function winChecker(){
    for(let i = 0; i < grid.length; i++){
        if(grid[i] == ' '){
            return
        }
    }
    setTimeout(alert,1000);
    function alert(){
        window.alert('You WON !!')
        location.reload()
    }
}
