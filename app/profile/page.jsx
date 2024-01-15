"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // fetches all posts that a user created
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = async () => {

    }

    const handleDelete = async () => {

    }

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handDelete={handleDelete}
    />
  )
}

export default MyProfile;