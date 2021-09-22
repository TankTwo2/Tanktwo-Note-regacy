cd ttb-backend
npm i
sudo pm2 kill
rm -rf dist
npm run build
npm run start
cd ..
cd ttb-frontend
npm i
npm run build
#npm install -g serve 
npx serve -s build