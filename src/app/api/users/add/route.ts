import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDatafromToken'



export async function POST(request : NextRequest){

    connect()

    const reqBody = await request.json()
        const {task} = reqBody
        console.log(task);

    const userId = await getDataFromToken(request)
     
    const user = await User.findOne({_id: userId.id})
    
    user.tasks.push(task)
    await user.save()
 
    return NextResponse.json({
        message: "User found",
        data: user
    })
}
