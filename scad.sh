#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: ./scad.sh [--dev | --prod]"
    exit 1
}

# Ensure start.sh is executable and run it
if [ -f "./start.sh" ]; then
    chmod +x ./start.sh
    ./start.sh

    # Check if start.sh was successful
    if [ $? -ne 0 ]; then
        echo "Error: start.sh failed!"
        exit 1
    fi

    # Source .bashrc again to ensure Node.js, npm, and yarn are available
    source ~/.bashrc

else
    echo "Error: start.sh not found!"
    exit 1
fi

# Check the argument passed to scad.sh
if [ "$1" == "--dev" ]; then
    echo "Running in development mode..."
    echo "--------------------------------------------------------"
    echo " "

    npm start

elif [ "$1" == "--prod" ]; then
    echo "Running in production mode..."
    echo "--------------------------------------------------------"
    echo " "

    npm run start:prod

else
    usage
fi
