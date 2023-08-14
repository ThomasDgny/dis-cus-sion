import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { blogs } from "@/mock/Blogs";
import { savedBlogs } from "@/mock/UserSavedBlogs";
import { users } from "@/mock/Users";
import { User } from "@/types/Types";

import React from "react";

const FindCurrentUser = (db: User[], currentUserID: string) => {
  return db.find((item) => item.uuid === currentUserID);
};

export default function page({ params }: { params: { userID: string } }) {
  const sessionUserID = "u6i7d8";
  const userParamID = params.userID;
  const userData = FindCurrentUser(users, userParamID);
  if (!userData) return null;

  const blogsByUser = blogs.filter((blog) => blog.author_id === userData.uuid);

  const savedBlogIDs = savedBlogs
    .filter((blog) => blog.user_id === userData.uuid)
    .map((blog) => blog.blog_id);

  const savedBlogsByUser = blogs.filter((blog) =>
    savedBlogIDs.includes(blog.uuid),
  );

  return (
    <div className="space-y-20">
      <ProfileHeader userData={userData} sessionUserID={sessionUserID} />
      <ProfileMain
        blogsByUser={blogsByUser}
        savedBlogsByUser={savedBlogsByUser}
      />
    </div>
  );
}
