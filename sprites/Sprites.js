const Sprite = require("./Sprite");
const DropShip = require("./ships/DropShip");
const Bomber = require("./ships/Bomber");
const GenericExplosion = require("./GenericExplosion");
const GenericExplosion2 = require("./Explosion2");
const Laser = require("./projectiles/Laser");
const Bomb1 = require("./projectiles/Bomb1");
const Human = require("./Human");
const PlayerShip = require("./ships/PlayerShip2");
const SmallMountain1 = require("./SmallMountain1");
const MoonBackground = require("./TinyMoon");
const Fireball1 = require("./projectiles/Fireball1");
const MarsRotatingCorner = require("./MarsRotatingCorner");

Sprites = {
    enemies: {
        dropShip: {
            ship: DropShip,
            explosion: GenericExplosion2,
        },
        bomber: {
            ship: Bomber,
            explosion: GenericExplosion2,
            projectile: Bomb1,
        },
    },
    player: {
        defaultShip: {
            ship: PlayerShip,
            explosion: GenericExplosion2,
            projectile: Fireball1,
        },
    },
    human: Human,
    mountain1: SmallMountain1,
    moonBackground: MoonBackground,
    marsRotatingTopSmall: MarsRotatingCorner,
};

module.exports = Sprites;
