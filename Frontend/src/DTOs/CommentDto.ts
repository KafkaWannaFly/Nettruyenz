export interface CommentDto{
    id?: string;
	email: string;
	manga: string;
	chapter?: string;
	replyTo?: string;
	// repliedBy?: string[];
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}