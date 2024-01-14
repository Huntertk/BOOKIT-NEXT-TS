import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

//GET ALL Rooms    =>  /api/rooms
export const allRooms = catchAsyncErrors(
    async (req:NextRequest) => {
        const resPerPage:number = 4


        const queryStr:any = {}

        const {searchParams} = new URL(req.url)
        searchParams.forEach((value, key) => {
            queryStr[key]= value
        })

        const roomsCount:number = await Room.countDocuments() 
        
        const apiFilters = new APIFilters(Room, queryStr).search().filter()
        
        let rooms:IRoom[] = await apiFilters.query;

        const filteredRoomCount:number = rooms.length
        apiFilters.pagination(resPerPage)
        rooms = await apiFilters.query.clone()


        return NextResponse.json({
            success:true,
            filteredRoomCount,
            resPerPage,
            roomsCount,
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
            throw new ErrorHandler("Rooms Not found", 404)
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
        throw new ErrorHandler("Rooms Not found", 404)
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
        if(!room){
            throw new ErrorHandler("Rooms Not found", 404)
        }
        
        await room.deleteOne()
        
        return NextResponse.json({
            success:true,
        })
    }
) 