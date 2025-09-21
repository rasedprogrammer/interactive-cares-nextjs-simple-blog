// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "../models/user";
// import bcrypt from "bcrypt";
// import ConnectDB from "./db";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials.email || !credentials.password) {
//           throw new Error("Email and password are required");
//         }

//         try {
//           await ConnectDB();

//           const user = await User.findOne({ email: credentials.email });
//           if (!user) {
//             throw new Error("No user found");
//           }

//           const isValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isValid) {
//             throw new Error("Invalid password");
//           }

//           const { password, ...userWithoutPassword } = user.toObject();
//           return userWithoutPassword;
//         } catch (error) {
//           throw new Error(error.message || "Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       return !!user;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//           role: user.role || "user",
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token.user) {
//         session.user = token.user;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/login",
//   },
// };

import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/user";
import bcrypt from "bcrypt";
import ConnectDB from "./db";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        await ConnectDB();

        let user = await User.findOne({ email: credentials.email });

        // Optional: auto-register if user not found
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await User.create({
            email: credentials.email,
            password: hashedPassword,
            name: credentials.email.split("@")[0],
            role: "user",
          });
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role || "user",
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};
