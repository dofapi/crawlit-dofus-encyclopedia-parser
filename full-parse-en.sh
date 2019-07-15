#!/bin/bash

echo "============================================="
echo "Equipments Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category allequipments --all
sleep 900

echo "============================================="
echo "Weapons Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category allweapons --all
sleep 900

echo "============================================="
echo "Set Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category set --all


echo "============================================="
echo "Pet Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category pet --all


echo "============================================="
echo "Mount Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category mount --all
sleep 900

echo "============================================="
echo "Resource Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category resource --all
sleep 900

echo "============================================="
echo "Consumable Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category consumable --all
sleep 900

echo "============================================="
echo "Monster Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category monster --all


echo "============================================="
echo "Profession Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category profession --all


echo "============================================="
echo "Harness Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category harness --all


echo "============================================="
echo "Class Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category class --all
sleep 900

echo "============================================="
echo "Idol Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category idol --all


echo "============================================="
echo "Havenbag Parse"
echo "============================================="

npm run crawlit && node ./dist/app.js --game dofus --language english --category havenbag --all

echo "============================================="
echo "Full parse Finished !"
echo "Now you have the last version of the Encyclopedia in english !"
echo "============================================="