const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs')
const path = require('path')

const config = require('./config.json')

generateThumbnailAndSave('Gerador de Thumbnail', config)

async function generateThumbnailAndSave(title) {
  const {
    authorName,
    avatarUrl,
    backgroundColor,
    titleColor,
    footerBackgroundColor,
    authorNameColor
  } = config

  loadFonts()
  const context = createThumbnailContext()
  drawBackground(context, backgroundColor)
  const titleX = drawTitleAndReturnXPosition(context, title, titleColor)

  await drawFooter(context, titleX, authorName, avatarUrl, footerBackgroundColor, authorNameColor)

  const destinationFilePath = path.join(__dirname, 'thumbnail.png')
  saveThumbnail(context.canvas, destinationFilePath)
}

function loadFonts() {
  const fontsPath = path.join(__dirname, 'fonts')

  registerFont(
    path.join(fontsPath, `Rubik-Black.ttf`),
    {
      family: 'Rubik Title',
      weight: 'bold'
    }
  )

  registerFont(
    path.join(fontsPath, `Rubik-Medium.ttf`),
    {
      family: 'Rubik Footer',
      weight: 'normal'
    }
  )
}

function createThumbnailContext() {
  const thumbWidth = 1200
  const thumbHeight = 600

  const canvas = createCanvas(thumbWidth, thumbHeight)
  return canvas.getContext('2d')
}

function drawBackground(context, backgroundColor) {
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

function drawTitleAndReturnXPosition(context, title, color) {
  context.font = '70px Rubik Title'
  context.textAlign = 'left'

  const maxWidth = context.canvas.width * 0.8
  let measure = context.measureText(title)
  let breakpoint = 1

  while (measure.width > maxWidth) {
    const words = title.split(' ')
    if (words.length == 1) break
    const fraction = parseInt(words.length / breakpoint)

    title = words.reduce((pre, word, i) => {
      return i % fraction === 0 ?
        `${pre}\n${word}` :
        `${pre} ${word}`
    }, "").trim()

    measure = context.measureText(title)
    breakpoint++
  }

  const height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent

  const x = (context.canvas.width / 2) - (measure.width / 2)
  const y = (context.canvas.height / 2) - (height / 2)

  context.fillStyle = 'rgba(0, 0, 0, 0.3)'
  context.fillText(title, x, y + 7)

  context.fillStyle = color
  context.fillText(title, x, y)

  return x;
}

async function drawFooter(context, leftMargin, name, avatarUrl, backgroundColor, color) {
  const footerHeight = 100

  drawFooterBackground(context, footerHeight)
  await drawFooterContent(context, footerHeight, leftMargin, name, avatarUrl)

  function drawFooterBackground(context, footerHeight) {
    context.fillStyle = backgroundColor

    const x = 0
    const y = (context.canvas.height - footerHeight)
    const footerWidth = context.canvas.width

    context.fillRect(x, y, footerWidth, footerHeight)
  }

  async function drawFooterContent(context, footerHeight, leftMargin, name, avatarUrl) {
    context.font = '30px Rubik Footer'
    context.textAlign = 'left'

    const spacingBetweenNameAndImage = 30

    const nameMeasure = context.measureText(name)

    const nameCenterY = (context.canvas.height - footerHeight) + (nameMeasure.actualBoundingBoxAscent / 2) + (footerHeight / 2)

    const nameHeight = nameMeasure.actualBoundingBoxAscent + nameMeasure.actualBoundingBoxDescent

    const nameActualY = nameCenterY - nameMeasure.actualBoundingBoxAscent

    const imageWidth = 75
    const imageHeight = 75
    const imageX = leftMargin
    const imageY = nameActualY - (imageHeight / 2) + (nameHeight / 2)

    const profileImage = await loadImage(avatarUrl)
    context.drawImage(profileImage, imageX, imageY, imageWidth, imageHeight)

    const textX = leftMargin + imageWidth + spacingBetweenNameAndImage
    const textY = nameCenterY

    context.fillStyle = 'rgba(0, 0, 0, 0.3)'
    context.fillText(name, textX, textY + 3)

    context.fillStyle = color
    context.fillText(name, textX, textY)
  }
}

function saveThumbnail(canvas, filePath) {
  canvas
    .createPNGStream()
    .pipe(
      fs.createWriteStream(filePath)
    )
}
