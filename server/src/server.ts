import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors())
const prisma = new PrismaClient({
  log: ['query']
})

app.post('/games/:id/ad', async (request, response) => {
  const gameId = request.params.id
  const body = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hoursStart),
      hourEnd: convertHourStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })
})



app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
})

app.get('/games/:id/ad', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response
    .json(ads.map((ad) => ({ ...ad, weekDays: ad.weekDays.split(',') })))
    .status(200)
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.id.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return response.json({
    discord: ad.discord
  })
})


app.listen(3333)