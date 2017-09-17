/* BASE COMMAND EXAMPLE, MODIFY TO SUIT YOUR NEEDS */

exports.run = (client, msg, args) => {
  /* args is an array of strings which corresponds to the message split by space, with the command removed. */
  /* example: `/test blah foo thing` , where `["blah", "foo", "thing"]` is the value of `args`. */
  msg.reply("Changeme, fool");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'base',
  description: 'Example command to copy and modify',
  usage: 'base [arg1] [arg2]'
};