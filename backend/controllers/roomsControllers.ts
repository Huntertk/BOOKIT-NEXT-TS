import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

//GET ALL Rooms    =>  /api/rooms
export const allRooms = catchAsyncErrors(
    async (req:NextRequest) => {
        const rooms = await Room.find()
        return NextResponse.json({
            success:true,
            rooms
        })
    }
) 

//Create Room    =>  /api/admin/rooms

export const newRoom = catchAsyncErrors(
    async (req:NextRequest) => {
        const body = await req.json()
        const room = await Room.create(body)
        
        return NextResponse.json({
            success:true,
            room
        })
    }
) 

//GET Room Details   =>  /api/rooms/:id
export const getRoomsDetails = catchAsyncErrors ( 
    async (req:NextRequest, {params}:{params:{id:string}}) => {
        const room = await Room.findById(params.id)
        if(!room){
            return NextResponse.json({
                message:"Room Not Found"
            },
            {
                status:404
            })
        }
        return NextResponse.json({
            success:true,
            room
        })

}
)

//Update Room Details   =>  /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors( 
    async (req:NextRequest, {params}:{params:{id:string}}) => {
    let room = await Room.findById(params.id)
    const body = await  req.json()
    if(!room){
        return NextResponse.json({
            message:"Room Not Found"
        },
        {
            status:404
        })
    }

    room = await Room.findByIdAndUpdate(params.id, body, {new: true})

    return NextResponse.json({
        success:true,
        room
    })
})


//Delete Room Details   =>  /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
    async (req:NextRequest, {params}:{params:{id:string}}) => {
        const room = await Room.findById(params.id)
        const body = await  req.json()
        if(!room){
            return NextResponse.json({
                message:"Room Not Found"
            },
            {
                status:404
            })
        }
        
        await room.deleteOne()
        
        return NextResponse.json({
            success:true,
        })
    }
) 