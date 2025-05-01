import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // wipe
  await prisma.comment.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // 1) CREATE USERS (with plain & hashed password)
  const users = []
  for (let i = 0; i < 10; i++) {
    // generate
    const plainPassword = faker.internet.password()
    const hashed = await bcrypt.hash(plainPassword, 12)

    const u = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(),
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean() ? faker.date.past() : null,
        image: faker.image.dataUri({ type: 'svg-base64' }),
        coverImage: faker.image.dataUri({ type: 'svg-base64' }),
        profileImage: faker.image.dataUri({ type: 'svg-base64' }),
        password: plainPassword,           // store plain
        hashedPassword: hashed,            // store hash
        hasNotification: faker.datatype.boolean(),
        followingIds: [],                  // fill in next
      },
    })
    users.push(u)
  }

  const userIds = users.map((u) => u.id)

  // 2) FOLLOWS
  for (const u of users) {
    const follows = faker.helpers
      .shuffle(userIds.filter((id) => id !== u.id))
      .slice(0, 3)
    await prisma.user.update({
      where: { id: u.id },
      data: { followingIds: follows },
    })
  }

  // 3) POSTS + LIKES
  const posts = []
  for (const u of users) {
    for (let i = 0; i < 3; i++) {
      const liked = faker.helpers
        .shuffle(userIds.filter((id) => id !== u.id))
        .slice(0, 10)
      const p = await prisma.post.create({
        data: {
          body: faker.lorem.paragraph(),
          image: faker.datatype.boolean() ? faker.image.dataUri({ type: 'svg-base64' }) : null,
          userId: u.id,
          likedIds: liked,
        },
      })
      posts.push(p)
    }
  }

  // 4) COMMENTS
  for (const p of posts) {
    for (let i = 0; i < 1; i++) {
      const commenter = faker.helpers.arrayElement(users)
      await prisma.comment.create({
        data: {
          body: faker.lorem.sentence(),
          userId: commenter.id,
          postId: p.id,
        },
      })
    }
  }

  // 5) NOTIFICATIONS
  for (const u of users) {
    for (let i = 0; i < 2; i++) {
      await prisma.notification.create({
        data: {
          body: faker.lorem.sentence(),
          userId: u.id,
        },
      })
    }
  }

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
