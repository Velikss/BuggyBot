const config = require("../config.json");

exports.run = (client, message) => {
    const clean = text => {
        if (typeof (text) === "string")
            return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
        else
            return text;
    };

    const args = message.content.split(" ").slice(1);

    if (config.trustedUsers.indexOf(message.author.id) === -1) {
        client.logger.warn("Someone untrusted tried evaluating code.");
        return;
    }
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};