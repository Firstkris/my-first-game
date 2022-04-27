const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const map = new Image()
map.src = './img/First town map.png'

const player = new Image()
player.src = './img/WalkDown.png'

class Sprite {
    constructor({ position, velocity, map }) {
        this.position = position
        this.map = map
    }

    draw() {
        context.drawImage(this.map, this.position.x, this.position.y)

    }
}

const background = new Sprite({
    position: {
        x: -565,
        y: -900
    },
    map: map
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

function walkanimate() {
    window.requestAnimationFrame(walkanimate)
    console.log('walk')
    background.draw()
    context.drawImage(
        player,
        0, //for cropping position จุด x ที่ให้เริ่ม crop
        0, //for cropping position จุด y ที่ให้เริ่ม crop
        player.width / 4, //for width ความกว้างที่จะcrop (หาร4 เพราะว่ามีสี่เฟรมในกาาเดิน)
        player.height, //for height(ไม่ต้องหารอะไรเพราะใช้ความสูงภาพตัวละคร)
        canvas.width / 2 - player.width / 8, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม (จากภาพติดกัน 4 ภาพ (หาร4) และ หาร 2 อีกครั้ง จะได้ตรงกลางตัวแรก)
        canvas.height / 2 - player.height / 2, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม
        player.width / 4, //ขนาดทีจะแสดง
        player.height //ขนาดทีจะแสดง 
    )

    if (keys.w.pressed && lastKey === 'w') background.position.y += 4
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 4
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 4
    else if (keys.d.pressed && lastKey === 'd') background.position.x += -4


}


walkanimate()

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
    console.log(keys)


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