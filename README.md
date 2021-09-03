# dolos

A Management app built with React Native.

# problems, hiccups and unfinished business.

# Storage and reminder rework - 12.08.2021 @wojtek:

So I reworked the storage system and setting the reminders in our App.
The storage handler class is there, and in `storageHandler.js` file we create instances of it for features we want, like I did for my todo list. basically you want storage handler for something, you create an instance in the mentioned file and import it to your components/screens/whatever - the storage is isolated. Also, it's multiple instances to have separate storage keys which you don't have to rememeber, just pass once on creation.
The purpose of this was that I read you should not pass large objects to route.params, rather you should pass say an ID of an object, and read this object from your database in the component directly, so that's what I allowed us to do.
What's more I implemented a sort of event (based on how events in C# work, or at least on how I think they work), it's a list of functions that you add you listener functions to (they have to be declared and names I think), and when the event takes place (on storage updated) it loops through the list calling all functions in it.
I use it to update states in my components, cuz my thought process was like: "these components are only to render stuff, so why would I handle data logic in them?" so I isolated data logic into storage handler class, and the components just listen for storage updated event and when it happens they update their states to re-render new data to the screen. I don't know about performance, but fuck this - we probly gonna need to implement a database (like watermelondb) sooner or later so this will have to get reworked anyway...)
So now that we have storage explined, the reminders...
I thougt to myself, remidners are just notifications, so why make them out to be more than that? I found we need to store them somehow, but then it hit me, we don't need to store them whole (them = the notifications), but just the essentials (namely the date, since i need it to show when you will or won't be notified in my component). So to my todoList item definition I added the notificationData object, which is an object (instance of a class in fact, but it doesn't matter since it gets transformed to a regular unnamed object after parsing from JSON - storage) which holds necessary information - signatures, snippets if you will - This makes it so the notification are handled by the lib, and we just store what we need to know about them. Additionally, when we want to remove the notification, we just cancel it, and we have the id in notificationData in the ItemDefinition object.
Editing is just removing this notification and creating new with altered data.
Now, I was thinking about enabling and disabling notifications (like this bell icon/button I implemented) and It turns out, that with this approch, we just delete the notification to disable it, but don't alter the stored data, and when we want to re-enable it, the data is still there sitting on an item, so we just create a new one from it.
In theory, this is brilliant, but I haven't yet implemented this turning notifications on and off. It's what I'm going to do next.
Should you have any questions to the code, feel free to DM me. BUT PLEASE LOOK INTO THE CODE.
