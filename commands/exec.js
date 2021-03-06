const Discord = require("discord.js");
const { exec } = require("child_process");
const owner = ["560484031838552064", "662207542486630401"];

module.exports.run = async (client, message, args) => {try {
if (!owner.includes(message.author.id)) return;
            message.channel.startTyping();
            exec(args.join(" ") || "date", function (err, stdout, stderr) {
                if (err) {
                    const emErr = new Discord.MessageEmbed()
                        .setAuthor(`Command Executed!`)
                        .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                        .addField(
                            `📤 OUTPUT 📤`,
                            `\`\`\`xl\n${err.toString().substr(0, 1000)}\n\`\`\``
                        )
                        .setTimestamp()
                        .setColor('BLURPLE')
                        .setFooter(`Requested by: ${message.author.tag}`);
                    message.channel.stopTyping(true);
                    return message.channel.send(emErr);
                }
                const emSuccess = new Discord.MessageEmbed()
                    .setAuthor(`Command Executed!`)
                    .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                    .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${stdout}\n\`\`\``)
                    .setTimestamp()
                    .setColor(123456)
                    .setFooter(`Requested by: ${message.author.tag}`);
                message.channel.stopTyping(true);
                return message.channel.send(emSuccess).catch(err => {
                    const emSuccess = new Discord.MessageEmbed()
                        .setAuthor(`Command Executed!`)
                        .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                        .addField(
                            `📤 OUTPUT 📤`,
                            `\`\`\`xl\n${stdout.substr(0, 1000)}\n\`\`\``
                        )
                        .setTimestamp()
                        .setColor(123456)
                        .setFooter(`Requested by: ${message.author.tag}`);
                    message.channel.send(emSuccess);
                    return message.channel.stopTyping(true);
                });
            });
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Command Executed!`)
                .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${err.toString()}\n\`\`\``)
                .setTimestamp()
                .setColor("#FF0000")
                .setFooter(`Requested by: ${message.author.tag}`);
            message.channel.send(embed);
            return message.channel.stopTyping(true);
        }
    }
module.exports.config = {
    name: "exec",
    description: "Execute Command!",
    usage: "exec",
    accessableby: "Bot Owner",
    aliases: ["execute"]
}
