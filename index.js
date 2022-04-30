const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')



canvas.width = 1024
canvas.height = 768

const boundariesMap = []
for (let i = 0; i < collisions.length; i += 50) {
    boundariesMap.push(collisions.slice(i, 50 + i))
}

const battleZoneMap = []
for (let i = 0; i < battleZoneData.length; i += 50) {
    battleZoneMap.push(battleZoneData.slice(i, 50 + i))

}

// console.log(boundariesMap);

const mapBoundaries = []
const offset = {
    x: -565,
    y: -900
}

boundariesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2147484743 || symbol === 1095)
            mapBoundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
            // console.log(symbol)
    })
})

const battleZone = []
battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1095)
            battleZone.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
    })
})
console.log(battleZone)

// console.log(mapBoundaries)

// context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/FirstTownMap.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundMap.png'

const playerImage = new Image()
playerImage.src = './img/WalkDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/WalkUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/WalkLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/WalkRight.png'

const playerDownImage = new Image()
playerDownImage.src = './img/WalkDown.png'


const player = new Sprite({
        position: {
            x: canvas.width / 2 - 192 / 8, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม (จากภาพติดกัน 4 ภาพ (หาร4) และ หาร 2 อีกครั้ง จะได้ตรงกลางตัวแรก),
            y: canvas.height / 2 - 69 / 2, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม
        },
        image: playerDownImage,
        frames: {
            max: 4,
            hold: 10
        },
        sprites: {
            up: playerUpImage,
            left: playerLeftImage,
            right: playerRightImage,
            down: playerDownImage,

        }

    })
    // console.log(player)

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }


}

// player.onload = () => {
//     context.drawImage(map, -565, -900)
//     context.drawImage(
//         player,
//         0, //for cropping position จุด x ที่ให้เริ่ม crop
//         0, //for cropping position จุด y ที่ให้เริ่ม crop
//         player.width / 4, //for width ความกว้างที่จะcrop (หาร4 เพราะว่ามีสี่เฟรมในกาาเดิน)
//         player.height, //for height(ไม่ต้องหารอะไรเพราะใช้ความสูงภาพตัวละคร)
//         canvas.width / 2 - player.width / 8, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม (จากภาพติดกัน 4 ภาพ (หาร4) และ หาร 2 อีกครั้ง จะได้ตรงกลางตัวแรก)
//         canvas.height / 2 - player.height / 2, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม
//         player.width / 4, //ขนาดทีจะแสดง
//         player.height //ขนาดทีจะแสดง
//     )
// }

// const testBoundary = new Boundary({
//         position: { x: 400, y: 400 }
//     }


const movable = [background, ...mapBoundaries, foreground, ...battleZone]

function rectangularColiision({ rectangle1 /* refer to player*/ , rectangle2 /* refer to boundary */ }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )

}



const battle = {
    initiated: false
}

function animate() {
    const animationID = window.requestAnimationFrame(animate)

    background.draw()

    mapBoundaries.forEach(boundary => {
        boundary.draw()

    })

    battleZone.forEach(battlezone => {
            battlezone.draw()
        })
        // testBoundary.draw()
    player.draw()
    foreground.draw()
        // context.drawImage(
        //     player,
        //     0, //for cropping position จุด x ที่ให้เริ่ม crop
        //     0, //for cropping position จุด y ที่ให้เริ่ม crop
        //     player.width / 4, //for width ความกว้างที่จะcrop (หาsร4 เพราะว่ามีสี่เฟรมในกาาเดิน)
        //     player.height, //for height(ไม่ต้องหารอะไรเพราะใช้ความสูงภาพตัวละคร)
        //     canvas.width / 2 - player.width / 8, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม (จากภาพติดกัน 4 ภาพ (หาร4) และ หาร 2 อีกครั้ง จะได้ตรงกลางตัวแรก)
        //     canvas.height / 2 - player.height / 2, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม
        //     player.width / 4, //ขนาดทีจะแสดง
        //     player.height //ขนาดทีจะแสดงs 
        // )
    let moving = true
    player.animate = false

    console.log(animationID)
    if (battle.initiated) return
        //activate battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZone.length; i++) {
            const battlezone = battleZone[i]
            const overlappingArea = (Math.min(player.position.x + player.width, battlezone.position.x + battlezone.width) -
                    Math.max(player.position.x, battlezone.position.x)) *
                (Math.min(player.position.y + player.height, battlezone.position.y + battlezone.height) -
                    Math.max(player.position.y, battlezone.position.y))

            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: battlezone

                }) &&
                overlappingArea > player.width * player.height / 3 &&
                Math.random() < 0.02
            ) {
                console.log('battle activate')
                window.cancelAnimationFrame(animationID) // deactivate current animation loop

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                //activate a new animation loop
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,

                                })
                            }
                        })






                    }

                })
                break
            }
        }
    }






    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 4
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }



        if (moving)
            movable.forEach(movable => { movable.position.y += 4 })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x + 4,
                            y: boundary.position.y
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.x += 4 })
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 4
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.y -= 4 })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x - 4,
                            y: boundary.position.y
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.x -= 4 })
    }


}

const wbtn = document.querySelector("#w")


function motion() {
    let moving = true
    player.animate = false

    if (wbtn.onclick) {
        player.animate = true
        player.image = player.sprites.up

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 4
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }

        if (moving)
            movable.forEach(movable => { movable.position.y += 4 })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x + 4,
                            y: boundary.position.y
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.x += 4 })
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 4
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.y -= 4 })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right

        for (let i = 0; i < mapBoundaries.length; i++) {
            const boundary = mapBoundaries[i]
            if (
                rectangularColiision({
                    rectangle1: player,
                    rectangle2: {...boundary,
                        position: {
                            x: boundary.position.x - 4,
                            y: boundary.position.y
                        }
                    }

                })
            ) {
                console.log('collied')
                moving = false
                break
            }
        }
        if (moving)
            movable.forEach(movable => { movable.position.x -= 4 })

    }
}

// window.onload = function() {
//     animate()
// }



let game = new Game()

function start() {
    animate()
    console.log('Star Game')
    game.startGame()

}

const battleBgImage = new Image()
battleBgImage.src = './img/battlebg2.png'
const battleBg = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBgImage


})

const pigImage = new Image()
pigImage.src = './img/GreenPig_36x30_2.png'
const pig = new Sprite({
    position: {
        x: 200,
        y: 420
    },
    image: pigImage,
    frames: {
        max: 9,
        hold: 4
    },
    animate: true

})

const birdImage = new Image()
birdImage.src = './img/FatBird_40X48.png'
const bird = new Sprite({
    position: {
        x: 750,
        y: 50
    },
    image: birdImage,
    frames: {
        max: 8,
        hold: 4
    },
    animate: true

})

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBg.draw()
    pig.draw()
    bird.draw()
    console.log('animating battle')
}

function soundoff() {
    // game.soundoff()
    audio.Map.mute(true)

}


function soundon() {
    // game.soundoff()
    audio.Map.mute(false)

}


// $(document).on('keypress', function(e) {
//     if (e.which == 13) {

//         setTimeout(function() {
//                 $("#canvas").fadeIn(500)
//                 $("#textAleart").fadeOut(500)
//                 audio.Map.play()
//                 audio.Map.resume()
//                     // getAudioContext().resume();

//             }, 500)
//             // alert('You pressed enter!');
//     }
// });


let lastKey = ''


window.addEventListener('keydown', (event) => {
    // console.log(event.key) //เลือก event เมือกด keybord ส่วนนี้แสดงผลเป็นคีย์ทรี่เรากด
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            console.log('press w')
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            console.log('press a')
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            console.log('press s')
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            console.log('press d')
            break
    }
    // console.log(keys)


})
window.addEventListener('keyup', (event) => {
    // console.log(event.key) //เลือก event เมือไม่ได้กด keybord ส่วนนี้แสดงผลเป็นคีย์ทรี่เรากด
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }


})

// let clicked = false
// addEventListener('click', () => {
//     if (!clicked) {
//         audio.Map.play()
//         clicked = true
//     }
// })