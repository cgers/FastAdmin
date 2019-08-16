export const ConnectionOptions: any = [
   {
      name: "FastAdminDB-Dev",
      type: "mysql",
      host: "localhost",
      extra: { "insecureAuth": true },
      port: 3306,
      userame: "fastadmin_db_user",
      passord: "fastadmin_db_user",
      dataase: "fastadmin",
      syncronize: false,
      logging : true,
      entiies: [
         "src/entity/**/*.ts"
      ],
      migrations: [
         "src/migration/**/*.ts"
      ],
      subscribers: [
         "src/subscriber/**/*.ts"
      ],
      cli: {
         "entitiesDir": "src/entity",
         "migrationsDir": "src/migration",
         "subscribersDir": "src/subscriber"
      }
   }
]