#!/bin/sh
chmod +x /backend
/backend &

cd /frontend
npm install
npm start