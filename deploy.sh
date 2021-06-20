#!/bin/bash

if command -v yarn &> /dev/null; then
  yarn build:production;
elif command -v npm &> /dev/null; then
  npm run build:production;
else
  echo "Something wrong. Command not found."
fi

netlify deploy -p --dir=dist
