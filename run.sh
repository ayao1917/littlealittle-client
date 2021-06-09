yarn install
yarn build
pm2 start npm --name "LittleNew" -- run start
