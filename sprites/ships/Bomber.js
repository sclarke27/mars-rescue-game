const Bomber = {
    frames: [
        [
            [0,0,1,1,2,0,0],
            [1,3,4,5,3,4,2],
            [0,1,1,3,2,2,0]
        ],
        [
            [0,0,1,1,2,0,0],
            [1,5,3,4,5,3,2],
            [0,1,1,3,2,2,0]
        ],
        [
            [0,0,1,1,2,0,0],
            [1,4,5,3,4,5,2],
            [0,1,1,3,2,2,0]
        ]


    ],
    pallette: [
        null, //            0 background
        [100,100,100], //   1 grey
        [175,175,175],   //  4 light grey
        [255,255,255], //   2 white
        [0,0,50], //     3 dk blue
        [0,0,125], //     3 md blue
        [0,0,255], //     3 md blue

    ]
}

module.exports = Bomber;