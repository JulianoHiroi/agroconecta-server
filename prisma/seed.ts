import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const tipos = ['Pepino', 'Maçã', 'Alface', 'Tomate', 'Cenoura', 'Banana'];

  // for (const name of tipos) {
  //   await prisma.typeProduct.create({
  //     data: { name },
  //   });
  // }

  // console.log('Tipos de produtos criados com sucesso.');

  const statusOrder = [
    { name: 'Pendente' },
    { name: 'Confirmado' },
    { name: 'Cancelado' },
  ];

  for (const status of statusOrder) {
    await prisma.statusOrder.create({
      data: status,
    });
  }
  console.log('Status de pedidos criados com sucesso.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());