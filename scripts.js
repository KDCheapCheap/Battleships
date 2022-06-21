const inputRegex = new RegExp("^[A-J][0-9]0??$");
const gridLetters = "ABCDEFGHIJ";

const enemyBattleshipOne = new Array(4);
const enemyBattleshipTwo = new Array(3);
const enemyBattleshipThree = new Array(3);

PlaceBattleShip(enemyBattleshipOne);
PlaceBattleShip(enemyBattleshipTwo);
PlaceBattleShip(enemyBattleshipThree);

function targetTile()
{
    const userInput = document.getElementById("guess").value;

    if (Boolean(validateInput(userInput)))
    {
        console.log("True");
        //Input is valid, check input against marked tiles for hit or miss
    }
    else
    {
        //ur bad kid put something else in
        console.log("False");
    }
}

function validateInput(input)
{
    if (isNaN(input) && Boolean(inputRegex.test(input)))
    {
        console.log(input);
        var chosenTileElement = document.querySelector("div." + input);

        if (chosenTileElement != null)
        {
            return true;
        }
    }
    else
    {
        return false;
    }

    return false;
}

function PlaceBattleShip(battleshipToPlace)
{
    //Get random Letter from Grid Letters
    var initialTile = GetRandomTileOnGrid();
    var tileNumber = parseInt(initialTile.substring(1));
    var isHorizonal = Boolean(tileNumber >= 5);

    battleshipToPlace[0] = initialTile;

    if (isHorizonal)
    {
        if (tileNumber + battleshipToPlace.length < 10)
        {
            //Enough Space to fit ship
            for (var i = 1; i < battleshipToPlace.length; i++)
            {
                battleshipToPlace[i] = initialTile[0] + ++tileNumber;
            }

            for (let i = 0; i < battleshipToPlace.length; i++)
            {
                const element = battleshipToPlace[i];
                console.log("BattleShip Position " + i + " " + element);
            }
        }
        else
        {
            //Not Enough Space to fit ship, go the other direction
            for (let i = 1; i < battleshipToPlace.length; i++)
            {
                battleshipToPlace[i] = initialTile[0] + --tileNumber;
            }

            for (let i = 0; i < battleshipToPlace.length; i++)
            {
                const element = battleshipToPlace[i];
                console.log("BattleShip Position " + i + " " + element);
            }
        }
    }
    else
    {
        var initialTileID = 0;

        for (let i = 0; i < gridLetters.length; i++)
        {
            const element = gridLetters[i];

            if (element == initialTile[0])
            {
                initialTileID = i;
                break;
            }
        }

        if (initialTileID + battleshipToPlace.length < 9)
        {
            //Room to place ship
            for (let i = 1; i < battleshipToPlace.length; i++)
            {
                battleshipToPlace[i] = gridLetters[++initialTileID] + tileNumber;
            }

            for (let i = 0; i < battleshipToPlace.length; i++)
            {
                const element = battleshipToPlace[i];
                console.log("BattleShip Position " + i + " " + element);
            }
        }
        else
        {
            //Not Enough Space to fit ship, go the other direction
            for (let i = 1; i < battleshipToPlace.length; i++)
            {
                battleshipToPlace[i] = gridLetters[--initialTileID] + tileNumber;
            }

            for (let i = 0; i < battleshipToPlace.length; i++)
            {
                const element = battleshipToPlace[i];
                console.log("BattleShip Position " + i + " " + element);
            }
        }
    }

    //Need to figure out why the query selector is returning null. 
    //It works in the Validation function
    for (let i = 0; i < battleshipToPlace.length; i++)
    {
        var chosenTileElement = document.querySelector("div." + battleshipToPlace[i]);
        console.log(chosenTileElement);

        if (chosenTileElement != null)
        {
            console.log("Success");
            chosenTileElement.classList.add('ship');
        }
    }
}

function GetRandomTileOnGrid()
{
    var randRow = gridLetters[getRandomInt(1, gridLetters.length)];
    var randColumn = getRandomInt(0, 11);

    return randRow + randColumn;
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}