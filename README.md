Game Engine.

Built with JavaScript and Node.js.

After trying to recreate my prior MMO concept using the engine I was working on, I realized that I was running into several roadblocks.  I could easily continuing making the game on its own, but I would much rather make an engine that would handle the creation of such a project, like I had set out to do originally.  Something like BrowserQuest is great, of course, but it would be infinitely better if it were built in a modular-and-extremely-scalable way.  Thus I decided to see if/how other game engines or similar projects handle these problems.

I researched tens of game engines.  Among them was EntityJS.  I fell in love with the API.  The concept of components was exactly what I had in mind from the beginning, and the author handles it well.  The thing that blew me away though was the selector engine, which opened up my mind to all kinds of possibilities.  Why should selector engines only exist for accessing the DOM?  I can't believe something like this has gone largely unnoticed.

My goal is to have all of the modules that the engine uses be defined in the same modular way, and allow developers to make such modules on their own.  The early stages of this rewrite are going to closely follow EntityJS (because it somewhat pulls of what I want), but when I get far enough I will begin to branch back out into the territory I was exploring in the creation of MMORPGKTHX.
