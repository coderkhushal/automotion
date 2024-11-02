module.exports = {
    apps: [
      {
        name: "automotion_frontend",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        watch: true,
        env: {
          NODE_ENV: "production",
          NEXT_PUBLIC_BASE_URL: "http://apiservice:4000"
          
        },
      },
    ],
  };