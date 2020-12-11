const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

main()

async function main() {
  const width = 1200
  const height = 600

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#2f2f2f'
  context.fillRect(0, 0, width, height)

  const text = 'Exemplo de thumbnail'

  context.font = 'bold 70px Arial'
  context.textAlign = 'center'
  context.fillStyle = '#fff'
  context.fillText(text, 600, 470)

  const profileImage = await loadImage('profile.jpg')
  const imageWidth = 200
  const imageHight = 200
  const x = 600 - (imageWidth / 2)
  const y = 250 - (imageHight / 2)
  context.drawImage(profileImage, x, y, imageWidth, imageHight)

  const destinationFile = path.join(__dirname, 'result.png')
  const pngBuffer = canvas.toBuffer('image/png')

  fs.writeFileSync(destinationFile, pngBuffer)
}
