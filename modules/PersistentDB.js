const Enmap = require("enmap");

class PersistentDB extends Enmap {
  constructor(client, PCName, editable = "contents") {
    super({name: PCName, persistent: true});
    this.client = client;
    this.type = PCName.toLowerCase().slice(0, -1);
    this.editable = editable;
  }

  add(name, data) {
    if(this.has(name))
      throw `The ${this.type} \`${name}\` already exists.`;
    if(this.client.commands.get(name) || this.client.commands.get(this.client.aliases.get(name)))
      throw `A command of this name exists, cannot add ${this.type}.`;
    this.set(name, data);
    return `The new ${this.type} \`${name}\` was added to the database.`;
  }

  del(name) {
    if(!this.has(name))
      throw `The ${this.type} \`${name}\` does not exist.`;
    this.delete(name);
    return `The ${this.type} \`${name}\` has been deleted`;
  }

  rename(oldName, newName) {
    console.log(oldName, newName);
    if(!this.has(oldName))
      throw `The ${this.type} \`${oldName}\` does not exist.`;
    const entry = this.get(oldName);
    this.set(newName, entry);
    this.delete(oldName);
    return true;
  }
  
  edit(name, contents) {
      if(!this.has(name))
        throw `The ${this.type} \`${name}\` does not exist.`;
      const entry = this.get(name);
      if(!entry[this.editable])
        throw `Cannot find an editable key for this object.`;
      entry[this.editable] = contents;
      this.set(name, entry);
      return `The ${this.type} \`${name}\` has been edited.`;
  }
  
  async export() {
    const pageExport = {};
    this.forEach((s,p)=> {
        s = JSON.parse(s);
      pageExport[p] = {url: s.url, snippet: s.snippet};
    });
    const hasteURL = await require("snekfetch")
      .post("http://how.evie-banned.me/documents")
      .send(pageExport).catch(e => {throw new Error(`Error posting data: ${e}`)});
    return `http://how.evie-banned.me/${hasteURL.body.key}.json`;
  }
  
  async import(url) {
    const pageData = await require("snekfetch").get(url)
      .catch(e => {throw new Error(`Error fetching data: ${e}`)});
    Object.entries(JSON.parse(pageData.text)).forEach(
      ([key, value]) => this.set(key, value)
    );
    return `Import successful: ${this.size} values now in Database}`;
  }

  list() {
    return "```\n" + this.map((s,k) =>k).join(", ") + "\n```";
  }

  help() {
    return this.extendedHelp;
  }
}

module.exports = PersistentDB;
