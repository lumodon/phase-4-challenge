npm install
brew services restart postgresql
npm run db:init
npm run db:schema
npm run db:seed
npm run dev