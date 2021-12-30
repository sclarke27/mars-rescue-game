const Sprite = require('./Sprite');
const DropShip = require("./ships/DropShip");
const Bomber = require('./ships/Bomber');
const GenericExplosion = require("./GenericExplosion");
const PlayerDefaultShip = require('./ships/PlayerDefaultShip');
const Laser = require('./projectiles/Laser');
const Human = require('./Human');

Sprites = {
    enemies: {
        dropShip: {
            ship: new Sprite(DropShip),
            explosion: new Sprite(GenericExplosion)
        },
        bomber: {
            ship: new Sprite(Bomber),
            explosion: new Sprite(GenericExplosion),
            projectile: new Sprite(Laser)
        }
    },
    player: {
        defaultShip: {
            ship: new Sprite(PlayerDefaultShip),
            explosion: new Sprite(GenericExplosion),
            projectile: new Sprite(Laser)
        }
    },
    human: new Sprite(Human)
}

module.exports = Sprites;