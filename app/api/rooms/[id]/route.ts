
import dbConnect from '@/backend/config/dbConnect';
import { getRoomsDetails} from '@/backend/controllers/roomsControllers';
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

export async function GET (request:NextRequest, ctx:RequestContext) {
    return router.run(request, ctx);
}
