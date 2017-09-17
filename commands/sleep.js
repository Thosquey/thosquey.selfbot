const moment = require("moment");

exports.run = (client, msg, [interval, period]) => {
  const timer = moment.duration(parseInt(interval, 10), period).asMilliseconds();
  console.log(timer);
  client.destroy();
  setTimeout(()=>{
    process.exit(1);
  }, timer);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sleep',
  description: 'Shuts down selfbot for exact period of time. Requires pm2.',
  usage: 'sleep interval period (/sleep 1 hour)'
};