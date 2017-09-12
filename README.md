# The Statefulness Aspect of NodeJS

Ask NodeJS developers why they choose this environment, and people typically will tell you the following:

1. NPM is the biggest package management system.
1. It can handle more connections than other languages.
1. It's JavaScript, so it's easy to transition from the front-end to the back-end

I was never sold on these points, which kept me skeptical for a long time, for the following reasons:

1. Any modern language will have something similar, and - for me, at least - big numbers are never a selling point. I prefer having fewer modules, all of which are killer, over having a massive database that I have to sift through to find the good stuff.
1. True, but this feature is used in extreme niche situations. In reality, 99% of people don’t have hugely popular websites, like Netflix and the like. Meaning that you won’t take advantage of this feature in your everyday projects, anyway.
1. True, but also not. Going from working on animations and UX to the back-end is a completely different beast. In either case, you need a completely different mind set. In addition, companies will make the mistake of thinking that they can get two employee for the price of one.

In addition, you won't find a great deal of information or help on the NodeJS.com site. Currently, all you get is an example how “easy” it is to create your own web server, and thats pretty much it. No additional advance examples, and no use cases, which could be of great help in understanding the product much better.

My hope with this article is that I’ll give you a good foundation to better understand what NodeJS is, so you’ll be able to make an informed decision for your next project.

# Dissection  

First, I'll try to explain what NodeJS is, and also describe what can you do with it by addressing a mysterious description that appears on http://nodejs.org: NodeJS is a JavaScript-based platform for server-side and networking applications.

The above sentence is very mysterious for those who have never used NodeJS. You hear people saying that you can build the backend of a website (server-side in this case), desktop apps, and even mobile apps and command line interface (CLI)). So it seems that this NodeJS can do all sorts of things, but how?

### The environment

Think of NodeJS as an environment where you can write code in JavaScript, and have access to a selection of libraries and frameworks to make your life easier.

Some analogies:

- what Cocoa is to Swift,
- what Unity 3D is to C#.
- what .NET is to C#

Check the documentation, and you’ll see many useful classes - such as File System, HTTP, OS, NET, and more, that will help you in your projects.  

### The Networking Part

Sockets are the base of any Internet-ready environment, and NodeJS basically has them built in. This means that you can write any network app that you can dream of; NodeJS is the Web Server itself.

If you know the protocol standard of a particular service you’ll be able to make it. For example, Node JS has the HTTP protocol built in. This allows your app to pars HTTP requests, and turn NodeJS into a Web Server, hence being a server and environment at the same time. But NodeJS can also be much more.

Other developers actually created some very interesting and fun projects that showcase what you can do if you implement a known protocol on top of the built-in sockets. For example, you can turn NodeJS into a:

- network printer (https://github.com/watson/ipp-printer)
- DNS server (https://www.npmjs.com/package/dnsd)
- POP3 server (https://github.com/akshut/pop3)

Boiling it down: You have access to TCP and UDP sockets, which means you can build anything network-related.

### Not just networking

NodeJS also offers access to the file system of the machine it's running on. This means that you don’t have to make a network-enabled app. You can use NodeJS to parse, copy, move, and delete files. As with other languages on the market, you can make a CLI app for the terminal world.

# The Event Loop

Another important aspect of NodeJS is the event loop, but I won’t spend the time to explain it, since [Philip Roberts](https://twitter.com/philip_roberts) made a fantastic [talk](https://www.youtube.com/watch?v=8aGhZQkoFbQ) about this at JSConf EU 2014 which I highly recommend.

# The Main Part: Statefulness

Until now, this article has given you a good frame of reference for gaining a better understanding of NodeJS from this point on. In this next part I’m going to talk about the best feature in my mind of NodeJS, which is its Statefulness environment.

Lets start. There are two types of environment that you can have in a computer program. It can work in a stateful or stateless environment, and the differences are as follows:

Stateful: The program can keep its state in memory for as long as it works, or there is power to the system, since RAM is volatile (can’t retain its state as a hard drive).

Stateless: The code has access to memory for the lifetime of the script, and every time your code finishes executing, you lose what you had in memory. That is why you'll use a database to save the progress of your code so you can get back to it once you run the script again.

### History: How It All Started

I’m not a historian, but this is more or less how backend web development began. PHP started as side project to make it easier to build and maintain a web page. Before PHP you would write a web site using CGI, which was an interface to scripting languages or compiled languages of your choosing in the system. It all worked by accessing a URL, and the server would execute the corresponding code, display the result and die. There was no state.

Later, people started using databases to store data for later use, and for years this was how things were done.

I think this is the reason why developers don’t associate statefulness with web servers. When people think server they're still recall the very beginnings of the web.

Even though NodeJS is stateful, it seems that nobody uses this feature because of their awareness of history. There are some NPM packages that use this feature, but they hide it behind the word “magic”, and a new developer to the environment won’t learn about this feature.

My point in writing this is to raise awareness, and to prove that if used in the right way, it's a powerful aspect that makes writing more efficient and code faster, since you can’t get direct access to RAM.

### Of course people know RAM is fast

Just one more thing to make sure that we are on the same page. Of course people knows that RAM is fast, but not having the ability to store data there is a huge disadvantage. That’s why databases like Memcached, Redis and more were built. But NodeJS offers a third option, direct access.

### What can we do with statefulness?

Since statefulness allows you to use the RAM in your server, you can use this feature to:

1. Store non-unique data into a JavaScript object
1. Store temporary data that you don’t care to keep around
1. Prototype a database structure without the database

### Practical example

Dry theory is nothing compared to a practical example. So, let's wander off in our minds, and picture ourselves working on a blog. This blog displays a list of 100 articles on one page. A bit crazy, but that’s the point.

Normally, our code would do a pretty big query each time someone visits the home page. Not only do you have to get the full post, but you also need the relevant tags, time, author, etc. Our database will have some processing to do.

But now imagine this. When you load your blog, the first thing your code does is to query the database for those 100 entries, and store them as an array in a JavaScript object (curly brakes). After everything is loaded, our code wouldn't ask the database for the content; it would use the article stored in the array, which lives in RAM.

You would have only one query per restart, and after that you could even kill your database, because the site would still keep displaying all your posts.

What happens when you need to update a blog post? Well, the situation is actually pretty simple. Picture this: You edit an article using the CMS that you’ve built, and when you perform the save action, you update the specific JavaScript object in the array. At the same time the database is updated, as well. And that’s it. With this approach you display the new data, but you'll also still have the fresh copy for the next restart.

The caveat, as you can see, is that you need an interface for your data. If you were to edit a blog post straight from the database, you would need to restart the whole site to reload the new information.

### Are databases dead?

Of course not! The idea of databases is to store data, and later access it in a reliable way. One important aspect of a database is to make sure to handle situations where two action are performed on the same peace of data at the same time. For example:

- One action is trying to delete the data
- The next action is trying to read the data from that variable

The RAM way of storing data is bare bones, what you write is what you get, so there is nothing to shield yourself from situations like this, but is perfectly fine if you just read data 99.99 percent of the time.

### If the data is static, why bother keeping it in the database?

Because you'll  want to be able to edit it easily. Maybe you'll need to change prices or edit the product description from time to time.

# Real-Life Example

To learn NodeJS, I decided to build a full product from start to finish, called https://simpe.li. At first, I was developing the site as if there were no state. But in the middle of development, I realized that my variables would stay in memory if I declared them outside of the routing function.

When that happened, not only did I have an eureka moment, but I completely changed my approach to storing data. The structure of the site is as follows:

- Server for the main page, with the dashboard
- Server for the public API calls
- Server for the PDF creation
- Server for the database which is in a API form
- Other server for miscellaneous stuff

Let's break down how I use memory on all of these servers

1. The home page has three places where the data is dynamic: the list of templates, the specific template itself, and the price page. When you visit these places, you get the data from an array of objects which are loaded in memory. This data is non unique, of course. The only place where I always query the database is after you log in, since the data is unique to the user, and working out a solution to only keep the most frequent user in memory would take to much time to work out at this point. But I believe that this will definitely be possible in the future.
1. The API itself doesn’t store anything; it just checks the data prior to saving it.
1. The code that makes the PDF use RAM for storing all the templates. This improves the conversion process, since I’m not reading the template from the hard drive for each conversion. When I start the app, the code first loads all the templates in an array, and once that part is done, it starts the main component.
1. This part is the most fun: the server for the database. Since I designed it as an API, all of the apps that want access to the database have no idea how the data is stored. But I know. ;) I store data in three different ways:
    1. Direct interaction with the database, for unique data, such as user related data.
    1. Indirectly, for when I have an up-to-date copy in the database, and another copy of the same data in RAM. When the API queries the data, it will come from a JavaScript array. In this API, every time there is an UDPATE call, RAM and data are both updated to keep everything in sync
    1. Only in RAM, for data that I don’t care about. A good example would be all my telemetry data to check the efficiency of the servers, amount of memory they are using, how many PDFs are being made, and any other type of useful information. This data will live in the server until the next reset. I don’t mind losing it. This way, collecting this information has a minimal impact on server performance.

# To Sum It All Up

JavaScript in NodeJS can’t be called a scripting language anymore. NodeJS compiles the code using V8 into binary, and loads the whole app in to memory.

My hope with this article is that I’ll make you consider this cool aspect of NodeJS in your existing or feature project. Since using RAM not only increases the speed of a website; it also lowers the cost for a simple site with lots of queries. Imagine you actually have a blog, with your articles, and you use a database that you constantly read from. The more users you get, more connection you’ll have, and suddenly you’ll have to buy a bigger account for your database to support more connections. If you used RAM to serve your content, more page views won’t equal more connection to your database.

# I have a Favor to Ask

I would love to have a list of all the Web Server back-end solutions that are actually stateful. A list like this for sure would help others discover other languages with this feature.

Other languages

- **Python**. Thank you to [Dmitry Sadovnychyi](https://github.com/sadovnychyi) for the contribution. 

# The End

If you've enjoyed this article/project, please consider giving it a 🌟 or donate.

- [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gattidavid/25)
- [![Star on GitHub](https://img.shields.io/github/stars/davidgatti/Statefulness-aspect-of-NodeJS.svg?style=social)](https://github.com/davidgatti/How-to-Stream-Movies-using-NodeJS/stargazers)
- [![Watch on GitHub](https://img.shields.io/github/watchers/davidgatti/Statefulness-aspect-of-NodeJS.svg?style=social)](https://github.com/davidgatti/How-to-Stream-Movies-using-NodeJS/watchers)

Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

## For Hire 👨‍💻

If you'd like me to help you, I'm available for hire. Contact me at job@gatti.pl.

## Where to follow

You can follow me on social media 🐙😇, at the following locations:

- [GitHub](https://github.com/davidgatti)
- [Twitter](https://twitter.com/dawidgatti)
- [Instagram](https://www.instagram.com/gattidavid/)

## More about me

I don’t only live on GitHub, I try to do many things not to get bored 🙃. To learn more about me, you can visit the following links:

- [Podcasts](http://david.gatti.pl/podcasts)
- [Articles](http://david.gatti.pl/articles)
- [Technical Articles](http://david.gatti.pl/technical_articles)
- [Software Projects](http://david.gatti.pl/software_projects)
- [Hardware Projects](http://david.gatti.pl/hardware_projects)

