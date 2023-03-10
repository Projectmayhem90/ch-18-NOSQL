const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [ 'Please use valid email address']
        },
        course: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('followerCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;
