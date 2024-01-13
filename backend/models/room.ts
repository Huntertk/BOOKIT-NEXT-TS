import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
    type: string;
    coordinates:number[];
    formattedAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface IImage extends Document {
    public_id: string;
    url:string
}

export interface IReview extends Document {
    user: mongoose.Schema.Types.ObjectId;
    rating:number;
    comment:string
}

export interface IRoom extends Document{
    name:string;
    description:string;
    pricePerNight:number;
    address:string;
    location: ILocation;
    guestCapacity:number;
    numOfBeds:number;
    isInternet:boolean;
    isBreakfast:boolean;
    isAirConditioned:boolean;
    isPetsAllowed:boolean;
    isRoomCleaning:boolean;
    ratings:number;
    numsOfReviews:number;
    images: IImage[];
    category:string;
    reviews:IReview[];
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;

}

const roomSchema: Schema = new Schema ({
    name:{
        type:String,
        required: [true, "Please enter room name"],
        trim: true,
        maxLength:[100, "Room name cannot exceed 100 characters"],
    },
    description:{
        type:String,
        required: [true, "Please enter room description"],
    },
    pricePerNight:{
        type:Number,
        required: [true, "Please Enetr Room Price Per Night"],
        default: 0.0
    },
    address:{
        type:String,
        required: [true, "Please enter room address"],
    },
    location:{
        type: {
            type:String,
            enum:['Point']
        },
        coordinates:{
            type: [Number],
            index:'2dsphere'
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    guestCapacity:{
        type:Number,
        required: [true, "Please Enetr Room Guest Capacity"],
    },
    numOfBeds:{
        type:Number,
        required: [true, "Please Enetr Room Guest Capacity"],
    },
    isInternet:{
        type: Boolean,
        default: false
    },
    isBreakfast:{
        type: Boolean,
        default: false
    },
    isAirConditioned:{
        type: Boolean,
        default: false
    },
    isPetsAllowed:{
        type: Boolean,
        default: false
    },
    isRoomCleaning:{
        type: Boolean,
        default: false
    },
    ratings:{
        type:Number,
        default: 0,
    },
    numsOfReviews:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            

        }
    ],
    category:{
        type:String,
        required: [true, "Please Enter Room Category"],
        enum:{
            values:['King', 'Single', 'Twins'],
            message:"Please Select Correct Category for room",
        }
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Room || mongoose.model<IRoom>('Room', roomSchema)