import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../db/connect";  // MongoDB connection utility
import User from "../../../../db/models/User";  // User model

export default NextAuth({
    providers: [
        // Google OAuth provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),

        // GitHub OAuth provider
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                url: "https://github.com/login/oauth/authorize",
            },
        }),


        // Credentials provider for manual login (username/password)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect(); // Connect to MongoDB

                // Find user by username
                const user = await User.findOne({ username: credentials.username });

                if (!user) {
                    throw new Error("User not found");
                }

                // Verify password using bcrypt
                const isValid = await bcrypt.compare(credentials.password, user.hash);
                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                };
            },
        }),
    ],

    // Use a database to persist sessions (optional)
    session: {
        strategy: "jwt", // Use JWT for session
    },

    // Callbacks to handle session and account creation
    callbacks: {
        async session({ session, token }) {
            // Add user data to session
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },

        async jwt({ token, user }) {
            // Add user data to the JWT token
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            return "/map"; // Redirect all logins to /map
        },

        // Account creation (when using OAuth)
        async signIn({ user, account, profile }) {
            if (account.provider === "google" || account.provider === "github") {
                await dbConnect();

                // Check if user already exists
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create a new user if not found
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
        signIn: "/",
    },
});