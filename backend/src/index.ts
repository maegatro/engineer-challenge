import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

const allowCrossDomain = function(req:any, res:any, next:any) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}

app.use(allowCrossDomain)

app.use(express.json())

app.get('/policies', async (req, res) => {
  const { search } = req.query;

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { provider: { contains: search as string, mode: 'insensitive' } },
        { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search as string, mode: 'insensitive' } } }
      ],
    }
    : {};

  const policies = await prisma.policy.findMany({
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true
        }
      }
    }
  })

  res.json(policies);
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
