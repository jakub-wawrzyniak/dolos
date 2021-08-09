# dolos

A Management app built with React Native.

# wojtek kowalczyk

So here's what I did.
I initialized the project on master branch, a clean hello world, and created a dev branch.

some ideas for workflow - very much subject to change:

- As little code as possible in `App.js` - modular
- All the source code (apart from App.js and index.js) in `./src` directory
- keep the files clean, resonably named, categorized in directories

And please, if this isn't a problem, @jakub remove `main` branch, it's driving me nuts its not master (so i created master) xd sorry

# wojtek branch

my vision for the project - rough draft, again, very much subject to change.
(just so that I'm busy until we meet)

I'm using react navigation as nav lib. https://reactnavigation.org/docs/getting-started/

# 03.07.21 @wojtek on notifications and todolist

So I've been working with marcin on the notifications, and then I implemented a todo list. as of now, we can go into the details of item in todo List (which can be made into remidner list of whatever) and click "REMIND ME" and say after how many seconds. This is basic functionality, and I have faced some problems:

# things I'd like to do but don't know how:

- no way to track when we receive notification, as onNotification (from index.js) only triggers if you OPEN the notification for LOCAL (we are local btw). Also, I cannot find a way to know when we dismiss a notification. Basically I need an event that fires when the notification is received, but this is supprted only for remote notifications - I read in https://github.com/zo0r/react-native-push-notification#usage
- the text saying you will be reminded in... doesn't work the way I intended so i replaced it with a placehoder for now.
- and there is a design issue with toggling notifications, read my comment in `listItem.js` file.
- When a notification is received it would be nice to navigate to the specific screen when we click on it. Passing navigation prop wasn't warking (empty object was passed) and only workaround I can think of i setting the initialRouteName props dynamically, but again, this is bad and Idk if will work. I need some way to call navigation.navigate(routename) from the onNotification in index.js (Cuz i can abss route, which includes routename)
