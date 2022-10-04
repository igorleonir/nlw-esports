import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const gameExists = await prisma.game.findMany({
        select: {
            title: true
        }
    })
    if (gameExists.length > 0) {
        return console.log('DB already seeded!')
    }

    const valorant = await prisma.game.create({
        data: {
            title: 'Valorant',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg',
        }

    })
    const gtav = await prisma.game.create({
        data: {
            title: 'Grand Theft Auto V',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg',
        }

    })
    const leagueoflegends = await prisma.game.create({
        data: {
            title: 'League of Legends',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg',
        }

    })
    const csgo = await prisma.game.create({
        data: {
            title: 'CS:GO',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg',
        }

    })
    const fortnite = await prisma.game.create({
        data: {
            title: 'Fortnite',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-188x250.jpg',
        }

    })
    const teamfighttatics = await prisma.game.create({
        data: {
            title: 'Teamfight Tatics',
            bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/513143-188x250.jpg',
        }

    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })