
import dbConnect from '@/backend/config/dbConnect';
import { getRoomsDetails, updateRoom } from '@/backend/controllers/roomsControllers';
import {createEdgeRouter} from 'next-connect';
import { NextRequest } from 'next/server';

interface RequestContext {
    params:{
        id:string
    }
}

const router = createEdgeRouter<NextRequest,RequestContext>()

dbConnect()

router.get(getRoomsDetails)
router.put(updateRoom)

export async function GET (request:NextRequest, ctx:RequestContext) {
    return router.run(request, ctx);
}

export async function PUT (request:NextRequest, ctx:RequestContext) {
    return router.run(request, ctx);
}