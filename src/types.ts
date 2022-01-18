import React from "react";

export interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

export interface MessageType {
  message: string;
  picture: string;
  userId: string;
}

interface CommentType {
  user: string;
  comment: string;
  name: string;
  id: string;
}

export interface PostType {
  user: string;
  url: string;
  caption: string;
  likes: number;
  usersLiked: Array<string | null>;
  id: string;
  comments: Array<CommentType>;
}
