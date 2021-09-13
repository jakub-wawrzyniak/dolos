# dolos

A Management app built with React Native.

# problems, hiccups and unfinished business.

we might want to test the performance of async storage with really long list of archive, I mean like 4 habits/day for 2 years which gives us 4*365*2 = 2920 so say 5000 entries in archive list, all stored in json and loaded to memory.

- 1st issue: performance (loading speed)
- 2nd issue: RAM usage
- 3rd issue : storage memory usage

The way I see this we have 3 options:

1. Make a transition to a database that can handle large data (though this doesn't solve the storage size issue and RAM fix should be implemented as well as we don't want to load 600mb of data to RAM even if its loaded really fast from fast db)
2. Store Archive as a collection of monthly / weekly lists - RAM saved, not too much loaded at once to memory, still much in storage but faster load times.
3. Delete entries after 1-3 months and use 2 or load whole thing - the question is, do we need entries 1 year back? well we might...

We have to ask a question what do we need to load archive for?

Surely for drawing statistics to user (table), but it is also needed in the algorithm that refreshes habits and loads new if needed, which runs relatively frequently, so waiting 2sec every time to load archive is not an option, not to mention RAM usage.

To avoid this we could implement some workaround in the storage handler that allows the algorithm to use only the latest portion of the archive (say week, or last 5 entries, or heck, the last 1 even, if last is selected correctly) and then this issue seems solved. now that we have the "on entry" data handling algorithm out of the way, we have to think about the table for statistics.

Asuming we store the whole history (no deleting records after a year) we could ask for what period of time they want statistics and load only data for that said period (i.e. month, 3 months, a week) but this requires us to store the archive in multiple lists, which almost grows to be a database, so I imagine it would be easier to use one maybe(?)
But then still, what if the user asks for data for say 2 years back, we have to load 2 years worth of data. When designing this system keep in mind that if some habit was being tracked for only a day we don't want to include a whole row that lasts 2 years and has bits set to true for 7 days over this 2yr period, so that adds to the complexity. And then, even if we have some habits tracked for 2 years, and users wants to load this, what's the guarantee that they have enough emmory on their mobile phone to load that data for processings, so we have to do it in chunks (this is getting scary).

This is the type of problem that cannot be "overlooked" by saying - noone's gonna use the app for 1 yr - because what if they will? we cannot afford that, this has to be done well right away.

My idea would be to start seriously thinking about a database, but for now don't implement it, and do something like this:
Store data in monthly(?) chunks, and delete records after said period - period which user can customize while being presented with a disclaimer that it is not advised to keep records older than X for memory reasons(but still allow it), and implement stuff in a way that even if they do keep 5years-worth of records we can somewhat resonably process this data, so maybe something where we show a table for 1 month, and when user clicks on an arrow to see 2nd month we only then load the 2nd month (while unloading the first to avoid RAM cluttering) and present it to them. Loose thinking, we have to discuss this.

Numbers:
10 habits/day fast-forwarded date 10 years into the future and the app crashed and got this message on console:
`Please report: Excessive number of pending callbacks: 501. Some pending callbacks that might have leaked by never being called from native code: {"3956":{},"3957":{},"3958":{},"3959":{},"3960":{},"3961":{},"3962":{},"3963":{},"3964":{},"3965":{},"3966":{},"3967":{},"3968":{},"3969":{},"3970":{},"3971":{},"3972":{},"3973":{},"3974":{},"3975":{},"3976":{},"3977":{},"3978":{},"3979":{},"3980":{},"3981":{},"3982":{},"3983":{},"3984":{},"3985":{},"3986":{},"3987":{},"3988":{},"3989":{},"3990":{},"3991":{},"3992":{},"3993":{},"3994":{},"3995":{},"3996":{},"3997":{},"3998":{},"3999":{},"4000":{},"4001":{},"4002":{},"4003":{},"4004":{},"4005":{},"...(truncated keys)...":451}`
1 habit/day for 91 days: visible stutter, no sigificant increase in userdata stored on device (almost as if async sotrage devoted this 5.6mb beforehand, nad 90days just wasnt enough to fill the whole thing)
