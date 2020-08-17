# DodgeBall

Hello, my name is Cole Samuelsen.

This is just a warm-up project to get the hang of a few skills I wanted to learn before starting more of a professional
looking game. "Dodge Ball", what I've been calling this game, is a simple five level survival mini-game where you
try to avoid you mouse cursor hitting the balls. You can get hit up to 100 frames of being inside of the ball. Upon
completion of all five levels, you are notified that you have won and can restart the game if you'd like.

With this project I learned some techniques using motion of javascript objects that I will end up using on a more full fledged
game. Turns out motion can be quite buggy. One of the major issues I ran into while developing this game was having
some of the balls get stuck in the border and flip their velocity from negative to positive over and over without ever
having a chance to escape the region in which it's set to flip its velocity so you end up with kind of ball shaking back and forth
along the border. I solved this by using math.abs and a couple extra if statements to make sure the velocity isn't just being flipped,
it is recieving the right positive/negative value. See this.bounceoffborder in Cirlce.js. I was pretty satisfied with this solution
because it solved an issue that I've seen a lot of professional developeres have on their code pens, and it was kind of one of those first
times where I had a clearly better solution to someone that has a lot of experience, and as someone who learning as fast as they can
it was validating.

To run the project, I would just recommend opening it up in Visual Studio Code and pressing Alt+ L O to open with live server. It's all vanilla JS,
HTML, and CSS so you won't have to download anything and can simply open it up in any browser. Should be compatable across browers, but it is designed
for desktop screen sizeas you need a mouse to screen so I did NOT bother making it responsive to screens in which you wouldn't be able to play on
anyways,so it remains Desktop only.

Thanks for checking out my work :)
