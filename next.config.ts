import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  images: {
    localPatterns: [
      {
        pathname: '/api/auth/avatar/**', // Разрешает любые пути, начинающиеся с этого префикса
        // Свойство search намеренно опущено, чтобы разрешить любые query-параметры (?t=...)
      },
      {
        pathname: '/**', // Разрешает абсолютно любые локальные пути на вашем сервере
      },
    ],
  },
  // experimental: {
  //   allowedDevOrigins: ['192.168.1.46'],
  // },
};

export default nextConfig;

// alexGreen psw 40403030
// mongodb+srv://alexGreen:<db_password>@cluster0.9p0fbay.mongodb.net/?appName=Cluster0
