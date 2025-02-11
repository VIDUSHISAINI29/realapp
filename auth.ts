import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { author_by_github_id_query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile) return false; // Prevent errors if profile is missing

      const { id, login, bio } = profile;
      const { name, email, image } = user;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(author_by_github_id_query, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: String(id), // Ensure id is a string
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(author_by_github_id_query, { id: profile?.id });

        if (user) {
          token.id = user?._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
});

export const authOptions = {
  debug: true,
};
