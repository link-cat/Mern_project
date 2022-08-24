const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId:{
            type: String,
            required: true,
        },
        message:{
            type:String,
            trim: true,
            maxlenght: 500
        },
        picture:{
            type: String
        },
        video:{
            type: String
        },
        likers:{
            type: [String],
            require:true
        },
        comments:{
            type: [
                {
                    commenterId:String,
                    commenterPseudo:String,
                    text:String,
                    timeStamp: Number
                }
            ],
            required: true,

        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('post',PostSchema);