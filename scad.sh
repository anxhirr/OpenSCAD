#!/bin/bash
usage() {
    echo "Usage: ./scad.sh [--dev | --prod]"
    exit 1
}

if [ -f "./start.sh" ]; then
    chmod +x ./start.sh
    ./start.sh

    if [ $? -ne 0 ]; then
        echo "Error: start.sh failed!"
        exit 1
    fi

    source ~/.bashrc

else
    echo "Error: start.sh not found!"
    exit 1
fi

if [ "$1" == "--dev" ]; then
    echo " "
    echo "Running in development mode..."
    echo "--------------------------------------------------------"
    echo " "

    npm start

elif [ "$1" == "--prod" ]; then
    echo " "
    echo "Running in production mode..."
    echo " "
    echo "--------------------------------------------------------"
    echo " "
    echo "Test and Build  the  production mode..."
    echo " "
    npm run build:prod

    echo " Start the production mode "
    echo " "
    npm run start:prod
    

else
    usage
fi
