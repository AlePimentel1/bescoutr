import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type ResponseData = {
    message: string | Object;
    success: boolean;
};

// export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//     await dbConnect();
//     if (req.method === 'POST') {
//         return register(req, res);
//     }

//     res.status(404).json({ message: 'Route Not Found', success: false });
// }

const userSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
});

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json()

        const zBody = userSchema.safeParse(body);
        if (!zBody.success) return NextResponse.json({ message: zBody.error, success: false }, { status: 400 })

        const { email, username, password } = zBody.data;

        console.log('quedandose aca 1')

        // const existingUserByEmail = await User.findOne({ email: email })
        // if (existingUserByEmail) {
        //     return NextResponse.json({ message: `User with this email: ${email} already exists`, success: false }, { status: 400 })
        // }

        // console.log('quedandose aca 2')
        // const existingUserByUsername = await User.findOne({ username: username })
        // if (existingUserByUsername) {
        //     return NextResponse.json({ message: `User with this username: ${username} already exists`, success: false }, { status: 400 })
        // }

        console.log(env.MONGODB_URI)

        const hashPassword = await hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        }).save()

        // return NextResponse.redirect(new URL('/log-in'), { status: 201 })
        return NextResponse.json({ message: "User created successfully", success: true }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}