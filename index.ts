#! /usr/bin/env node

import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns"

const res = await inquirer.prompt({
    name:"UserInput",
    type: "number",
    message: "Please enter the amount of second",
    validate: (input) =>{
        if(isNaN(input)){ // if input is not a number
            return "Please enter valid number"
        }else if (input > 60) {
            return "seconds must be in 60"
        }else {
            return true
        }
    }
})

let input = res.UserInput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val )
    const intervalTime = new Date(intTime) // time date format mai show hoga
    setInterval(()=>{             // hr ek sec ke baad refresh hojayega
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0){
            console.log("Timer has expired");
            process.exit()
        }
        const min = Math.floor((timeDiff% (3600*24))/3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`0${min}:0${sec}`)
    },1000)
}
startTime(input)