import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

//GET ALL Rooms    =>  /api/rooms
export const allRooms = async (req:NextRequest) => {
    const rooms = await Room.find()
    return NextResponse.json({
        success:true,
        rooms
    })
}

//Create Room    =>  /api/admin/rooms

export const newRoom = async (req:NextRequest) => {
    const body = await req.json()
    const room = await Room.create(body)

    return NextResponse.json({
        success:true,
        room
    })
}

//GET Room Details   =>  /api/rooms/:id
export const getRoomsDetails = async (req:NextRequest, {params}:{params:{id:string}}) => {
    try {
        throw new ErrorHandler("Helo", 404)
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
    } catch (error: any) {
        console.log(error.statusCode);
        
        return NextResponse.json({
            message:error.message
        },
        {
            status:500
        })
    }
}


//Update Room Details   =>  /api/admin/rooms/:id
export const updateRoom = async (req:NextRequest, {params}:{params:{id:string}}) => {
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
}


//Delete Room Details   =>  /api/admin/rooms/:id
export const deleteRoom = async (req:NextRequest, {params}:{params:{id:string}}) => {
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