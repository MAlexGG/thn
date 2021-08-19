# Web Scrapping with puppeteer

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [What's next](#whats-next)

### General Info
***
This javascript and puppeteer script is for web scrapping hotels ang get information about available rooms searched.
The program is developed in such a way that it could be executed into different web pages, which it would go through one after another.
In the "index.js" file is the connection with empty functions so that it can be executed as a loop with the information provided by the "websites.json" file, there are 2 websites running for now, one with all the functions completed and another just for testing that ends with a "console.log" message.
In the "scripts" folder there are 2 ".js" files that contain all the functions that are required to run the program for each specific website and it will extract the information from the "websites.json" file, such as the url and the class or id selectors, so functions can be reusable. In the same folder there is an output file "arcotel.json" that contains all the information that was required by the client to scrape. For running the program it should start the command node index.js 
It has some unit tests that are passing tested from a different file called "utilities.js" inside the "scripts" folder.

### Screenshot
![jsonFile](https://user-images.githubusercontent.com/73828751/130118478-5d45f4a1-c1b0-4733-986b-b76acb48b426.JPG)

## Technologies
***
Technologies used within the project:
Javascript
Puppeteer
Jest
Node.js
Github
Chromium

## Installation
***
Node.js https://nodejs.org/es/download/
npm install
npm install puppeteer
npm install jest-puppeteer puppeteer

## What's next
***
Refactoring, more testing and a better looking output file.




