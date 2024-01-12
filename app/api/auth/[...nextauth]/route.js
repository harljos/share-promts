import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        // checking which user is currently online
        const sessionUser = await User.findOne({
            email: session.user.email
        });

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDB();

            // check if user exists
            const userExists = await User.findOne({
                email: profile.email
            });

            // create a new user if use doesn't exist
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    // make sure it has no spaces and lowercase
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
});

export { handler as GET, handler as POST };