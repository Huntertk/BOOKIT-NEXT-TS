import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

export const allRooms = async (req:NextRequest) => {
    const rooms = await Room.find()
    return NextResponse.json({
        success:true,
        rooms
    })
}

export const newRoom = async (req:NextRequest) => {
    const body = await req.json()
    const room = await Room.create(body)

    return NextResponse.json({
        success:true,
        room
    })
}


export const getRoomsDetails = async (req:NextRequest, {params}:{params:{id:string}}) => {
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