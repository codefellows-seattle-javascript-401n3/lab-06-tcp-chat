## TCP SIMPLE CHAT SERVER

### Project Details:

This is a simple chat application that will allow users to connect and gives
the ability to change their nickname, send a direct message to other users, and
send a message to the channel where everyone can see it. It also comes with nice
messages for more user help.

### Instructions and Usage:
Here are some step-by-step directions.
1. Open up a terminal where the server file is located and type:```node server.js ```
2. Open a second terminal and type: ```nc localhost 3000```
3. Once you are connected you will have an option of 3 commands:
  * ```\nick <nickname>```:: will change your username.
  * ```\all <message>```:: will send a message to everyone.
  * ```\dm <nickname> <message>```:: will send a direct message to user.


*  Messages will be logged back notifying you that a message was seen by all or seen by a particular person.

When you are finished and want to end the session, just close out the terminal.


There will be a message logged in the server and to other users that you have left the channel.


