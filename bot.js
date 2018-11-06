//const Commando = require('discord.js-commando');
//const bot = new Commando.Client();
const Discord = require('discord.js');
const bot = new Discord.Client();
fs = require('fs')
const Enmap = require("enmap");
const factionPoints = new Enmap();

factionPoints.set('pikapals', 100);

/*bot.registry.registerGroup('calltoarms', 'CalltoArms');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');*/

/*bot.on('message', function(message) {
    if (message.content.substring(0, 4) == 'roll') {
        var random = Math.floor(Math.random() * 4);
        if (random == 0) {
            message.reply('stolen!');
        } else {
            message.reply('safe');
        }
    } else if (message.content == 'ask') {
        var random = Math.floor(Math.random() * 2);
        if (message.author.username == 'Undying Legend') {
            message.reply('You are a dirty Egyptian')
        } else {
            if (random == 0) {
                message.reply('yes');
            } else {
                message.reply('no');
            }
        }
    }
});*/

bot.on('message', function(message) {
    //console.log(message.author.username + ": " + message.content + " in " + message.channel.name);
    if (message.content.substring(0, 3) == 'ta.') {
        var args = message.content.substring(3).split(' ');
        var cmd = args[0];	//redeem,contents,info
	    var cmd2 = args[1];	//common,novice,specialist,legendary | [Item Name]
        var cmd3 = args[2];	//[Faction Name]
       
        switch(cmd) {
            case 'redeem':
            case 'r':
                if (cmd2 == 'common' || cmd2 == 'novice' || cmd2 == 'specialist' || cmd2 == 'legendary') {
                    if (selectPack(cmd2) !== null)
                        var file = selectPack(cmd2);
                    else
                        return false;
                    var prize = openPack(file);
                    message.channel.send('You have received a(n) ' + prize + ' from the ' + cmd2 + ' loot box!');
                }
		    break;
            case 'contents':
            case 'c':
                if (cmd2 == 'common' || cmd2 == 'novice' || cmd2 == 'specialist' || cmd2 == 'legendary') {
                    if (selectPack(cmd2) !== null)
                        var file = selectPack(cmd2);
                    else
                        return false;
            
                    message.channel.send('**__Contents:__**\n' + file);
                }
            break;
            /*case 'info':
                console.log('hello');
                var file = fs.readFileSync("./call_to_arms/item_desc.txt", {"encoding": "utf-8"});
                if (readInfo(file, cmd2) !== null)
                    var msg = readInfo(file, cmd2);
                else
                    break;
                
                message.channel.send(msg);
            break;*/
            case 'steal':
                var random = Math.floor(Math.random() * 4);
                if (random == 0) {
                    message.reply('Stolen!');
                } else {
                    message.reply('Safe!');
                }
            break;
            case 'help':
            case 'h':
                var str = fs.readFileSync("./call_to_arms/help.txt", {"encoding": "utf-8"});
                message.channel.send(str);
            break;
            case 'ask':
                var random = Math.floor(Math.random() * 2);
                if (message.author.username == 'Undying Legend') {
                    message.reply('You are a dirty Egyptian')
                } else {
                    if (random == 0) {
                        message.reply('yes');
                    } else {
                        message.reply('no');
                    }
                }
            break;
            case 'change':
                var args = message.content.substring(3).split(' ');
                var acro1 = args[2].substring(args[2].length - 4, args[2].length - 1).toLowerCase();	//faction that won
                var fp1 = parseInt(args[3]);
                var acro2 = args[6].substring(args[6].length - 4, args[6].length - 1).toLowerCase();;	//faction that lost or tourney
                var fp2 = parseInt(args[7]);
                var event = args[9].toLowerCase();
                var faction1 = '';
                var faction2 = '';
                var add = 0;
                var subtract = 0;		

                if (faction2 == 'tourny') {
                    bot.sendMessage({
                        to: channelID,
                        message: '**FACTION POINTS UPDATE**\n' + faction1.substring(0, 1).toUpperCase() + faction1.substring(1) + ': ' + (fp1+fp2)
                    });
                } else {

                switch(acro1) {
                    case 'tbs':
                    faction1 = 'The Free Shmurdas';
                    break;

                    case 'glp':
                    faction1 = 'Glop Nightmare';
                    break;

                    case 'scs':
                    faction1 = 'Stone Cold Stunners';
                    break;

                    case 'pik':
                    faction1 = 'PikaPals';
                    break;

                    case 'tbr':
                    faction1 = 'Tribal Rampagers';
                    break;

                    case 'cat':
                    faction1 = 'Camel Toes';
                    break;

                }

                switch(acro2) {
                    case 'tbs':
                    faction2 = 'The Free Shmurdas';
                    break;

                    case 'glp':
                    faction2 = 'Glop Nightmare';
                    break;

                    case 'scs':
                    faction2 = 'Stone Cold Stunners';
                    break;

                    case 'pik':
                    faction2 = 'PikaPals';
                    break;

                    case 'tbr':
                    faction2 = 'Tribal Rampagers';
                    break;

                    case 'cat':
                    faction2 = 'Camel Toes';
                    break;

                }

                switch(event) {
                    case 'pokemon':
                    add = 10;
                    subtract = 7;
                    break;
                    
                    case 'brawlhalla':
                    add = 7;
                    subtract = 4;
                    break;

                                case 'chess':
                    add = 8;
                    subtract = 5;
                    break;

                    case '8ball':
                    add = 5;
                    subtract = 3;
                    break;

                    case 'oldpoke':
                    add = 5;
                    subtract = 3;
                    break;

                    case 'otherpoke':
                    add = 1;
                    subtract = 1;
                    break;
                }

                message.channel.send('**FACTION POINTS UPDATE**\n' + faction1.substring(0, 1).toUpperCase() + faction1.substring(1) + ': ' + (fp1+add) + '\n' + faction2.substring(0, 1).toUpperCase() + faction2.substring(1) + ': ' + (fp2-subtract));
                
	        break;
            }

        }
    }
    if (message.author.username == 'Pyroniz') {
        var num = factionPoints.get('pikapals');
        message.channel.send(factionPoints.get('pikapals'));
        factionPoints.set('pikapals', num + 20);
    }
});

function selectPack(rarity) {

    switch(rarity) {
	case 'common':
	    return fs.readFileSync("./call_to_arms/common_box.txt", {"encoding": "utf-8"});
	case 'novice':
	    return fs.readFileSync("./call_to_arms/novice_box.txt", {"encoding": "utf-8"});
	case 'specialist':
	    return fs.readFileSync("./call_to_arms/specialist_box.txt", {"encoding": "utf-8"});
	case 'legendary':
	    return fs.readFileSync("./call_to_arms/legendary_box.txt", {"encoding": "utf-8"});
	default:
	    return;
    }
}

function openPack(file) {
    var p = ''; //Prize
    var i = 0; //Incrementation
    var setRng = Math.random()*100; //RNG Selector
    var rng = setRng;
    var chosen = false;

    console.log("RNG Output: " + rng);

    while (!chosen) {

    	var r = ''; //rarity
    	while (file[i] !== ' ') {
	        r += file[i];
	        i++;
    	}

    	rng -= parseFloat(r);
    	if (rng <= 0)
	        chosen = true;
    	    i++;
    	while (i < file.length && isNaN(parseInt(file[i], 10))) {
	        if (chosen)
	    	    p += file[i];
	        i++;
    	}

    } 
    return p.slice(0, -2) + ' (' + setRng.toFixed(3) + ')';
}

function readInfo(file, item) {

    var str = '';	//Item Description
    var i, j;		//Incrementations
    var Title = '';	//Title String
    var tCheck = true;	//Title Check

    for (i=0 ; i<file.length ; i++) {
	if (file.substring(i, i+item.length) === item && tCheck)
	    break;
	if (tCheck) {
	    if (file[i-1] === ' ' || file[i-1] === '>')
		Title += file[i].toUpperCase();
	    else
		Title += file[i];
	}
	if (file[i] === '>') {
	    tCheck = true;
	    Title = '';
	}else if (file[i] === '<') {
	    tCheck = false;
	}

    }

    while (i < file.length && file[i] !== '<') {
        if (file[i-1] === ' ' || file[i-1] === '>')
            Title += file[i].toUpperCase();
        else
            Title += file[i];
        i++;
    }   
}

bot.login(process.env.TOKEN);
