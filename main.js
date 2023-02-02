function symbolProcess(hitboxName, listNum){
    if (boardList[listNum] == 0){
        addSymbol(hitboxName)
        checkWinnDraw()
        switchSymbol()
        if (winnLock){
            return ""
        }
        switch(difficulty){

            case 3:
                turn = couldWinnWays();
            
            case 2:
                if (checkdoubleCombinations(1, boardList)){
                    addSymbol("hitbox" + OWinnCombinations[0])
                    checkWinnDraw()
                    break;
                    }
                if (difficulty == 2){
                    turn = tryCorners()}
                

            case 1:
                if (checkdoubleCombinations(-1, boardList)){
                    addSymbol("hitbox" + XWinnCombinations[0])
                }else{
                    while (!(boardList[turn] == 0) || turn == -1){
                        turn = Math.floor(Math.random()*9)
                    }
                addSymbol("hitbox" + turn)
                turnCount += 1
            }
                checkWinnDraw()     
                switchSymbol()
                break;
            
            case 0: 
            checkWinnDraw()
        }
    }
}


/*turn = tryCorners()
                while (!(boardList[turn] == 0) || turn == -1){
                    turn = Math.floor(Math.random()*9)*/


function switchSymbol(){
    if (XO == -1){
        XO = 1
    }else{
        XO = -1
     }
}


function addSymbol (hitboxName){
    boardList[hitboxName.split("hitbox")[1]] = XO
    var symbol = document.createElement("img")
    switch(XO){
        case -1:
            var asset = "assets\\ttt-X.png"
            break;
        case 1:
            var asset = "assets\\ttt-O.png"
    }
    symbol.src = asset
    symbol.className = "symbol"
    symbol.draggable = false
    var hitbox = document.getElementById(hitboxName)
    hitbox.appendChild(symbol)
   
}


function sleep(ms){
    return new Promise(r => setTimeout(r, ms))
}


async function finishGame(){
    winnLock = true
    markCombination(winnCheck("i"))
    await sleep(2000)
    window.location.reload()
}


function checkWinnDraw(){
    if (winnCheck("bool")){
        finishGame("hitbox");
     }else if(drawCheck()){
        drawAnimation();
        finishGame();
     }
}

function winnCheck(returnValue){
    result = false
    winnCombinations.forEach(function(e, i){
        if ((boardList[e[0]] == XO) && (boardList[e[1]] == XO) && (boardList[e[2]] == XO)){
            switch(returnValue){
                case "bool":
                    result = true
                    break;
                case "i":
                    result = i
                    break;
            }
        }
    })
    return result
}


function getCombinationCount(symbol){
    countCombinations = [0,0,0,0,0,0,0,0,0]
    couldWinnCombinations = []
    bestWinncombinations = []
    twoWaysToWinn = []
    threeWaysToWinn = []
    winnCombinations.forEach(function(e, i){
        if ((boardList[e[0]] == symbol || boardList[e[0]] == 0) && (boardList[e[1]] == symbol || boardList[e[1]] == 0) && (boardList[e[2]] == symbol || boardList[e[2]] == 0)){
            if ((boardList[e[0]] == -1 || boardList[e[1]] == -1 || boardList[e[2]] == -1) || (turnCount == 0)){
            couldWinnCombinations.push(e)
        }}
    
    })
    couldWinnCombinations.join("").split("").forEach(function (e, i){

        if (boardList[e] == 0){
            countCombinations[e] += 1
            if (countCombinations[e] == 2){
                twoWaysToWinn.push(e)
            }
            if (countCombinations[e] == 3){
                threeWaysToWinn.push(e)
            }
        }
        })
        console.log(countCombinations)
    return countCombinations
}
function couldWinnWays(){
    var CombinationCount = getCombinationCount(-1)
    var biggestNum = 0;

    CombinationCount.forEach(function(e, i){
        if (avoideToHelpEnemy(i, 1)){
            if (e > biggestNum && boardList[i] == 0){
                if (avoideToHelpEnemy(i, 1)){
                bestTurn = i;
                biggestNum = e
                }
            }
        }
        
        
    })
    
    
    return bestTurn
}


function avoideToHelpEnemy(i, symbol){
    var copyBoard = JSON.parse(JSON.stringify(boardList))
    console.log("copyboard: " + copyBoard)
    copyBoard[i] = 1
    if (checkdoubleCombinations(1, copyBoard)){
        copyBoard[OWinnCombinations[0]] = -1
        if (checkdoubleCombinations(-1, copyBoard) && XWinnCombinations.length == 2){
            return false
        }
    }
    return true
    

}


function checkdoubleCombinations(symbol, board){
    returnValue = false;
    XWinnCombinations = [];
    OWinnCombinations = [];
    doubleCombinations.forEach(function(e, i){
        e.forEach(function(elem, iter){
            let result = 0;
            for (var count = 0; count < elem.length; count++){
                if (board[elem[count]] == symbol){
                    result++
                    }
                
                if (result == elem.length && board[i] == 0){
                        switch(symbol){
                            case -1:
                                XWinnCombinations.push(i)
                                break;
                            case 1:
                                OWinnCombinations.push(i)
                        }   
                        returnValue = true; 
                    }
                }
            }
        )
    })
    return returnValue

}


function tryCorners(){
    var corners = [0,-1,2,-1,-1,-1,6,-1,8].map(elem => boardList[elem] == 0)
    var foundetCorners = []
    while (!(corners.indexOf(true) == -1)){
        var cornerIndex = corners.indexOf(true);
        foundetCorners.push(cornerIndex)
        delete corners[cornerIndex]
        
    }
    if (foundetCorners.length == 0){
        return -1
    }

    return foundetCorners[Math.floor(Math.random() * foundetCorners.length)]
}


function drawCheck(){
    if (!(boardList.includes(0))){
        return true;
    }
};


function drawAnimation(){
    var drawMessage = document.getElementById("drawMessage");
    var opacity = 0
    var interval = setInterval(function(){
        if (opacity < 1){
            drawMessage.style.opacity = opacity 
            opacity += 0.01
            
        }else{
            clearInterval(interval)
        }
    },10);
}



function markCombination(i){
    switch (i){
        case 0:
            magicLine(29 + "%", 0 + "%", -44 + "deg")
            break;
        case 1:
            magicLine(29 + "%", 10 + "%", -44 + "deg")
            break;
        case 2:
            magicLine(29 + "%", 21 + "%", -44 + "deg")
            break;
        case 3:
            magicLine(19 + "%", 10 + "%", 46 + "deg")
            break;
        case 4:
            magicLine(29 + "%", 10 + "%", 46 + "deg")
            break;
        case 5:
            magicLine(39 + "%", 10 + "%", 46 + "deg")
            break;
        case 6:
            magicLine(30 + "%", 10 + "%", 7 + "deg")
            break;
        case 7:
            magicLine(30 + "%", 10 + "%", 90 + "deg")
            break;
            
    }
}



function magicLine(i,e,r){
    var degArr = [0,-42,0,45,3,45,0,-42,0]
    if (winnCombinations[winnCheck("i")][1] == 4){
        switch(winnCombinations[winnCheck("i")][0]){
            case 1:
                degArr[4] += 45
                break;
            case 2:
                degArr[4] += 90
                break;
            case 3: 
                degArr[4] += 135
                break;
                
        }
    }
    var rt = degArr[winnCombinations[winnCheck("i")][1]] + "deg"
    winnline = document.createElement("img")
    winnline.src = "assets\\ttt-winnline.png"
    winnline.style.transform = "rotate("+rt+")"
    winnline.id = "winnLine"
    var hitbox = document.getElementById("hitbox" + winnCombinations[winnCheck("i")][1])
    hitbox.appendChild(winnline)
}


function removeBlur(dif){
    var element = document.getElementById("blur")
    var difficultyselection = document.getElementById("difficultySelection")
    difficulty = dif;
    element.style.opacity = 1
    difficultyselection.style.opacity = 1
    var int = setInterval(function(){
        if (element.style.opacity > 0){
            element.style.opacity = element.style.opacity - 0.1
            difficultyselection.style.opacity = difficultyselection.style.opacity - 0.15
            
        }else{clearInterval(int)}
    }, 100);
    difficultyselection.style.pointerEvents = "none"
    document.getElementById("game").style.pointerEvents = "all"
    
    
}