#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: ./scad.sh [--dev | --prod]"
    exit 1
}

# Ensure setup.sh is executable and run it
if [ -f "./setup.sh" ]; then
    chmod +x ./setup.sh
    ./setup.sh

    # Check if setup.sh was successful
    if [ $? -ne 0 ]; then
        echo "Error: setup.sh failed!"
        exit 1
    fi

    # Source .bashrc again to ensure Node.js, npm, and yarn are available
    source ~/.bashrc

else
    echo "Error: setup.sh not found!"
    exit 1
fi

# Check the argument passed to scad.sh
if [ "$1" == "--dev" ]; then
    echo "Running in development mode..."
    echo "--------------------------------------------------------"
    echo " "

    yarn start

elif [ "$1" == "--prod" ]; then
    echo "Running in production mode..."
    echo "--------------------------------------------------------"
    echo " "

    npm run start:prod
    
else
    usage
fi
