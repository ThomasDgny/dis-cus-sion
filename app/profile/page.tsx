import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { blogs } from "@/mock/Blogs";
import { userBlogs } from "@/mock/UserBlogs";
import { userSavedBlogs } from "@/mock/UserSavedBlogs";

import React from "react";

export default function page() {
  const blogsByUser = blogs.filter((blog) => userBlogs.includes(blog.uuid));
  const savedBlogsByUser = blogs.filter((blog) => userSavedBlogs.includes(blog.uuid));
  return (
    <div className="space-y-20">
      <ProfileHeader />
      <ProfileMain blogsByUser={blogsByUser} savedBlogsByUser={savedBlogsByUser}/>
    </div>
  );
}
