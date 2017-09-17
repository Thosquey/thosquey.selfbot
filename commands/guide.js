const baseUrl = 'https://anidiots.guide';

/*
Relies on the following lines in app.js:
const PersistentCollection = require("djs-collection-persistent");
client.pages = new PersistentCollection({name: "guidepages"});

Want all the pages? run this:
/guide -import http://how.evie-banned.me/raw/linelipajo

*/

exports.run = async (client, msg, args) => {
  if(!args[0]) args[0] = "home";
  
  if(!msg.flags.length) {
    let name = args[0];
    if(!this.db.has(name)) name = "home";
    const details = this.db.get(name);
    return client.answer(msg, `${details.snippet}\n**Read More**: <${baseUrl}${details.url}>`);
  }
  
  let [name, ...extra] = args;
  
  let data = null;
  switch(msg.flags[0]) {
    case ("add") :
      const [url, ...snippet] = extra;
      if(name.indexOf("/") == 0) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      if(url.indexOf("/") !== 0) return client.answer(msg, "URL is absolute and must start with `/`", {deleteAfter: true, delay: 5000});
      if(!snippet) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      data = {url, snippet};
      break;
    default :
      data = extra.join(" ");
  }
  
  try {
    const response = await this.db[msg.flags[0]](name, data);
    const deleteAfter = msg.flags[0] == "list" ? false : true;
    client.answer(msg, response, {deleteAfter});
  } catch (e) {
    if(e.constructor.name === "TypeError") e = e.message;
    client.answer(msg, e, {deleteAfter: false, delay: 5000});
  }

  
};

exports.init = client => {
  this.db = new client.db(client, "guides");
  this.db.extendedHelp = this.help.extended;
  client.guides = this.db;
};

exports.conf = {
  aliases: ["page", "g"],
  permLevel: 0
};

exports.help = {
  name: 'guide',
  description: 'Returns page details from the awesome bot guide.',
  usage: 'guide [-list] [name]',
  extended: `\`\`\`xl
-add newPageName /path/to/page.html Snippet describing the page
-del pageName
-edit pageName This is new new edited snippet
-rename pageName newName
-export // exports and returns URL
-import http://url-to-import/
-list
\`\`\``
};
