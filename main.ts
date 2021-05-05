input.onButtonPressed(Button.A, function () {
    myHand += 1
    if (myHand == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else if (myHand == 2) {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    selected = true
    radio.sendValue("AB" + "CD", myHand)
})
radio.onReceivedValue(function (name, value) {
    if (name.substr(0, 2) == "CD" && name.substr(2, 2) == "AB") {
        recieved = true
        opponentHand = value
    }
})
function reset () {
    basic.pause(1000)
    myHand = 0
    opponentHand = 0
    basic.clearScreen()
}
let recieved = false
let selected = false
let opponentHand = 0
let myHand = 0
radio.setGroup(202)
myHand = 0
opponentHand = 0
basic.forever(function () {
    if (myHand == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
    if (selected == true && recieved == true) {
        selected = false
        recieved = false
        if (myHand == 0 && opponentHand == 1) {
            basic.showIcon(IconNames.Happy)
            reset()
        } else if (myHand == 0 && opponentHand == 2) {
            basic.showIcon(IconNames.Sad)
            reset()
        } else if (myHand == 1 && opponentHand == 0) {
            basic.showIcon(IconNames.Sad)
            reset()
        } else if (myHand == 1 && opponentHand == 2) {
            basic.showIcon(IconNames.Happy)
            reset()
        } else if (myHand == 2 && opponentHand == 0) {
            basic.showIcon(IconNames.Happy)
            reset()
        } else if (myHand == 2 && opponentHand == 1) {
            basic.showIcon(IconNames.Sad)
            reset()
        } else if (myHand == opponentHand) {
            basic.showIcon(IconNames.Surprised)
            reset()
        }
    }
})
