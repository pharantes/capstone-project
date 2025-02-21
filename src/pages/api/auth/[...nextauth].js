import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default NextAuth({
    providers: [
        // Google OAuth provider setup
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email", // Request additional scopes if needed
                },
            },
        }),

        // GitHub OAuth provider setup
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                url: "https://github.com/login/oauth/authorize", // Custom authorization URL
            },
        }),
    ],

    // JWT strategy for session handling
    session: {
        strategy: "jwt", // Use JWT to manage session data
    },

    // Callbacks to customize session and JWT
    callbacks: {
        // Customize the session to include additional user data (id, username)
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },

        // Add user data to the JWT token during sign in
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Store the user's id
                token.username = user.username; // Store the user's username
            }
            return token;
        },

        // Redirect after sign-in
        async redirect({ url, baseUrl }) {
            return baseUrl; // Redirect to the base URL or home page after sign-in
        },

        // Handle user creation after sign-in
        async signIn({ user, account, profile }) {
            if (account.provider === "google" || account.provider === "github") {
                await dbConnect(); // Ensure the database connection is established
                let existingUser = await User.findOne({ email: user.email }); // Check if the user already exists
                if (!existingUser) {
                    // If no user found, create a new one
                    const newUser = new User({
                        username: user.name,
                        email: user.email,
                        image: user.image, // You may want to save the user's image URL
                    });
                    await newUser.save(); // Save the new user in the database
                }
            }
            return true; // Allow sign-in to continue
        },
    },

    // Use environment variables for secrets
    secret: process.env.NEXTAUTH_SECRET, // Ensure this secret is set in .env.local

    // Custom pages
    pages: {
        signIn: "/login-signup", // Custom sign-in page
    },
});
