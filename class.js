class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites = [] }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapse: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        // context.drawImage(this.image, this.position.x, this.position.y)
        context.drawImage(
            this.image,
            this.frames.val * this.width, //for cropping position จุด x ที่ให้เริ่ม crop
            0, //for cropping position จุด y ที่ให้เริ่ม crop
            this.image.width / this.frames.max, //for width ความกว้างที่จะcrop (หาsร4 เพราะว่ามีสี่เฟรมในกาาเดิน)
            this.image.height, //for height(ไม่ต้องหารอะไรเพราะใช้ความสูงภาพตัวละคร)
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, //ขนาดทีจะแสดง
            this.image.height //ขนาดทีจะแสดง 
        )
        if (!this.moving) return
        if (this.frames.max > 1) {
            this.frames.elapse++
        }
        if (this.frames.elapse % 10 === 0) { //slow walk motion
            if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
        }

    }
}

class Boundary {
    static width = 60
    static height = 60
    constructor({ position }) {
        this.position = position
        this.width = 52 //ขนาดของ pixel (12) คูณ ขนาดที่เราขยาย map ตอน export
        this.height = 40


    }

    draw() {
        context.fillStyle = '#f000'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

    }


}

class Game {
    startGame() {
        $("#starScreen").fadeOut(1000)
        this.toggleScreen('starScreen', false)
        $("#canvas").fadeIn(1000)
        this.toggleScreen('canvas', true)
        setTimeout(function() {
            audio.Map.play()
        }, 500)



    }

    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'block' : 'none'
        element.style.display = display;
    }

}