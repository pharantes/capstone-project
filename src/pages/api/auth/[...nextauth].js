import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                url: "https://github.com/login/oauth/authorize",
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            return "/";
        },
        async signIn({ user, account, profile }) {
            if (account.provider === "google" || account.provider === "github") {
                await dbConnect();
                let existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    const newUser = new User({
                        username: user.name,
                        email: user.email,
                        image: user.image,
                    });
                    await newUser.save();
                }
            }
            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login-signup",
    },
});