
const { cmd } = require("../command");
const config = require("../config");

cmd({
    pattern: "report",
    alias: ["ask", "bug", "request"],
    desc: "Report a bug or request a feature",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, {
    from, body, command, args, senderNumber, reply
}) => {
    try {
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("*_Only the bot owner can use this command.🚀_*");
        }
        
        if (!args.length) {
            return reply(`Example: ${config.PREFIX}REPORT PLAY COMMAND IS NOT WORKING...🚀`);
        }

        const reportedMessages = {};
        const devNumber = "923096287432"; // Bot owner's number
        const messageId = m.key.id;

        if (reportedMessages[messageId]) {
            return reply("*_This report has already been forwarded to the owner. Please wait for a response.🚀_*");
        }
        reportedMessages[messageId] = true;

        const reportText = `*| REQUEST/BUG |*\n\n*User*: @${m.sender.split("@")[0]}\n*Request/Bug*: ${args.join(" ")}`;
        const confirmationText = `*_HI ${m.pushName}, YOUR REQUEST HAS BEEN FORWARDED TO THE OWNER. PLEASE WAIT FOR RESPONSE...🚀_*`;

        await conn.sendMessage(`${devNumber}@s.whatsapp.net`, {
            text: reportText,
            mentions: [m.sender]
        }, { quoted: m });

        reply(confirmationText);
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing your report.");
    }
});
