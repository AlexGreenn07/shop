require('dotenv').config();

const config = {
  mongodb: {
    // Убедитесь, что в .env переменная называется именно так
    url: process.env.DELIVERY_SHOP_DB_URL,

    databaseName: process.env.DELIVERY_SHOP_DB_NAME,

    options: {
      // Для новых версий драйвера эти опции не требуются,
      // но если используете старый, можно расскомментировать
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  lockCollectionName: 'changelog_lock',
  lockTtl: 0,
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

// ИСПОЛЬЗУЙТЕ ЭТО ВМЕСТО export default
module.exports = config;
