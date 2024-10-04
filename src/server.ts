import { app } from "./app";
import { env } from "./modules/common/config/env";

app.listen({
  port: env.PORT,
  host: '0.0.0.0'
}).then(() => {
  console.log('🚀 Server started at http://localhost:3333')
})