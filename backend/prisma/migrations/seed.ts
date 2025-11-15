import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1️⃣ USERS
  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      email: 'alice@example.com',
      passwordHash: 'hashed_pw_123', // in real apps, use bcrypt
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      email: 'bob@example.com',
      passwordHash: 'hashed_pw_456',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'charlie',
      email: 'charlie@example.com',
      passwordHash: 'hashed_pw_789',
    },
  });

  // 2️⃣ ROOMS
  const generalRoom = await prisma.room.create({
    data: {
      name: 'General Chat',
      isPrivate: false,
    },
  });

  const devRoom = await prisma.room.create({
    data: {
      name: 'Developers',
      isPrivate: false,
    },
  });

  const privateRoom = await prisma.room.create({
    data: {
      name: 'Alice & Bob Private Chat',
      isPrivate: true,
    },
  });

  // 3️⃣ ROOM MEMBERS
  await prisma.roomMember.createMany({
    data: [
      // general room
      { roomId: generalRoom.id, userId: alice.id },
      { roomId: generalRoom.id, userId: bob.id },
      { roomId: generalRoom.id, userId: charlie.id },

      // dev room
      { roomId: devRoom.id, userId: bob.id },
      { roomId: devRoom.id, userId: charlie.id },

      // private chat
      { roomId: privateRoom.id, userId: alice.id },
      { roomId: privateRoom.id, userId: bob.id },
    ],
  });

  // 4️⃣ MESSAGES
  await prisma.message.createMany({
    data: [
      {
        roomId: generalRoom.id,
        senderId: alice.id,
        content: 'Hey everyone!',
      },
      {
        roomId: generalRoom.id,
        senderId: bob.id,
        content: 'Hi Alice, how are you?',
      },
      {
        roomId: devRoom.id,
        senderId: charlie.id,
        content: 'Anyone working on the new API?',
      },
      {
        roomId: privateRoom.id,
        senderId: bob.id,
        content: 'Hey Alice, did you finish the report?',
      },
      {
        roomId: privateRoom.id,
        senderId: alice.id,
        content: 'Almost done, sending soon!',
      },
    ],
  });

  // 5️⃣ MESSAGE STATUS
  const allMessages = await prisma.message.findMany();

  for (const msg of allMessages) {
    const members = await prisma.roomMember.findMany({
      where: { roomId: msg.roomId },
    });

    for (const member of members) {
      await prisma.messageStatus.create({
        data: {
          messageId: msg.id,
          userId: member.userId,
          isSeen: member.userId === msg.senderId, // sender has seen own msg
          seenAt: member.userId === msg.senderId ? new Date() : null,
        },
      });
    }
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
