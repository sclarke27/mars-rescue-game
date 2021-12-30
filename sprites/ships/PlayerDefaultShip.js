const PlayerDefaultShip = {
    frames: [
        [
            [0,0,5,5,0,0,0,0,0],
            [0,0,5,8,5,0,0,0,0],
            [3,2,5,5,6,6,6,0,0],
            [3,2,7,7,7,5,5,5,5],
            [0,0,0,2,2,2,8,8,0]
        ]
    ],
    pallette: [
        null, //            0 background
        [255,0,0], //       1 ship 1
        [100,100,100], //   2 engine
        [255,255,0], //     3 flame1
        [100,100,0], //     4 flame2
        [255,255,255], //   5 white
        [20,20,20], //         6 black
        [50,50,200], //     7 blue
        [175,175,175]   //  8 light grey
    ]    
}

module.exports = PlayerDefaultShip;