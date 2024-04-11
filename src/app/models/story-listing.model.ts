import { User } from "./mission-listing.model";


export interface StoryDTO {
    storyId: number;
    user: User;
    missionId: number;
    title: string;
    description: string;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: null;
    storyImage: string;
    theme: string;
    storyMedia?: storyMedia[];
}

export interface storyMedia {
    type: string;
    path: string;
}