#!/bin/bash
NAME=$1
DIR=template-p5svg

if ! superheroes -v COMMAND &> /dev/null
then
    echo "superheroes-cli could not be found, installing now via npm..."
	npm install --global superheroes-cli
fi

if [ -z "${NAME}" ]; then
	NAME=$(superheroes | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
fi

rsync -r ./$DIR/ $NAME
echo "New Project is ${NAME}"
