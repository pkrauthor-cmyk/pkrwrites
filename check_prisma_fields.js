const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

console.log('Fields in BlogPost model:');
try {
    const dmmf = prisma._dmmf;
    if (dmmf) {
        const blogPostModel = dmmf.datamodel.models.find(m => m.name === 'BlogPost');
        if (blogPostModel) {
            console.log(blogPostModel.fields.map(f => f.name).join(', '));
        } else {
            console.log('BlogPost model not found in DMMF');
        }
    } else {
        console.log('No DMMF found');
    }
} catch (e) {
    console.error('Error checking prisma metadata:', e);
} finally {
  prisma.$disconnect();
}
process.exit(0);
