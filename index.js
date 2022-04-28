const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

console.log(collisions)

canvas.width = 1024
canvas.height = 768

const boundariesMap = []
for (let i = 0; i < collisions.length; i += 50) {
    boundariesMap.push(collisions.slice(i, 50 + i))

}
// console.log(boundariesMap);

class Boundary {
    static width = 60
    static height = 60
    constructor({ position }) {
        this.position = position
        this.width = 60 //ขนาดของ pixel (12) คูณ ขนาดที่เราขยาย map ตอน export
        this.height = 60

    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

    }


}

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

console.log(mapBoundaries)

// context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/First town map.png'

const playerImage = new Image()
playerImage.src = './img/WalkDown.png'

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
    }

    draw() {
        // context.drawImage(this.image, this.position.x, this.position.y)
        context.drawImage(
            this.image,
            0, //for cropping position จุด x ที่ให้เริ่ม crop
            0, //for cropping position จุด y ที่ให้เริ่ม crop
            this.image.width / this.frames.max, //for width ความกว้างที่จะcrop (หาsร4 เพราะว่ามีสี่เฟรมในกาาเดิน)
            this.image.height, //for height(ไม่ต้องหารอะไรเพราะใช้ความสูงภาพตัวละคร)
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, //ขนาดทีจะแสดง
            this.image.height //ขนาดทีจะแสดง 
        )
    }
}


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 8, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม (จากภาพติดกัน 4 ภาพ (หาร4) และ หาร 2 อีกครั้ง จะได้ตรงกลางตัวแรก),
        y: canvas.height / 2 - 69 / 2, // จัดกึ่งกลาง ให้ตัวละครอยู่กลางเฟรม
    },
    image: playerImage,
    frames: {
        max: 4
    }


})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
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

const testBoundary = new Boundary({
        position: { x: 400, y: 400 }
    }

)
const movable = [background, testBoundary]

function rectangularColiision({ rectangle1 /* refer to player*/ , rectangle2 /* refer to boundary */ }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )

}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()

    // mapBoundaries.forEach(boundary => {
    //     boundary.draw()
    //     console.log("b_drew")

    // })
    testBoundary.draw()
    player.draw()
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

    if (
        rectangularColiision({
            rectangle1: player,
            rectangle2: testBoundary

        })
    ) {
        console.log('collied')
    }

    if (keys.w.pressed && lastKey === 'w') {
        movable.forEach(movable => { movable.position.y += 4 })
    } else if (keys.a.pressed && lastKey === 'a') {
        movable.forEach(movable => { movable.position.x += 4 })
    } else if (keys.s.pressed && lastKey === 's') {
        movable.forEach(movable => { movable.position.y -= 4 })
    } else if (keys.d.pressed && lastKey === 'd') {
        movable.forEach(movable => { movable.position.x -= 4 })
    }


}

animate()


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