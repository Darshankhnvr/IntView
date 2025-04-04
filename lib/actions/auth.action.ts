"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params : SignUpParams){
    const {uid, name, email} = params;

    try {
        const ueserRecord = await  db.collection('users').doc(uid).get();

        if(ueserRecord.exists){
            return {
                success:false,
                message:"User already exists"
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        
    } catch (error: any) {
        console.log("Error in signUp action", error) 
        
        if(error.code === "auth/email-already-exixts"){
            return{
                success:false,
                message:"email exists already"
            }
        }
        return {
            success:false,
            message: "Failed to create an account"
        }
        
    }
}

export async function signIn(params : SignInParams){
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email)

        if(!userRecord){
            return {
                success:false,
                message:"User not found"
            }
        }
        await setSessionCookies(idToken)
        
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:"Failed to sign in"
        }
    }
}

export async function setSessionCookies(idToken : string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 *7 * 1000 // 5 days
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7 *1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax'
    })
}