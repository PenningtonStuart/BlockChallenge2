# Block Challenge 2

In order to run this file you must do an npm install command to setup a local server

npm install -g live-server

To run the server type live-server in the command line

There were multiple issues that we ran into. All of which were resolved but one.

## The Breakdown
When you click on the link to login there are two tabs. 

The first tab is to create a new account. This would normally call out to a database via an API and create a new entry. this was outside of the scope of the class. So I got creative. If you look under the main.js file there is a commented section called cookies. What I did was set a browser cookie that persists the username(email) and password to the following session. I know that the security implications of this are not ideal but it was still a good fix for my issue. Simply for the purpose of writing this web app. 

The second tab is to login for returning users. When submit is clicked it looks into the cookie that was set when the user created a new account and verifys the login. 

The downside to this is that when a new "account" is created the cookie is overwritten and the old credentials are wiped. But for the purposes of this application I think that it serves well.

The GeoMap is included. However, as I learned so late in the game, google requires you to pay to truly use the map. So it may work once or twice before the API says nope pay me to play more. I was successfully able to implement the active working map and connect it with my web app. You will see all of that code under the commedted section labled Google Map and API in the main.js file.(85% was copied from the google api documentation the other 15% I had to figure out how to change it slightly) 

## The Honest Truth
I'll be honest in saying that I am not a front-end wizzard. So with the CSS I had Katie looking over my shoulder helping me to get that all nice and tidy. 

## The outcome
The only portion of what I wanted to accomplish that I could not was the user being able to add and share a pin of a public BBQ. But there is always room for improvement. 
