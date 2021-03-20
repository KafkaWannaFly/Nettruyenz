enum MangaStatus {
	OnGoing,
	Complete,
	Dropped,
}

interface Manga {
	_id: string;
	id?: string;
	names: string[];
	cover: string;
	tags: string[];
	creators?: string[];
	rating?: number;
	rateNum?: number;
	bookmarks?: number;
	views?: number;
	status?: number;
	description: string;
	groups: string[];
	chapters: string[];
	comments?: string[];
}

interface Chapter {
	_id: string;
	id?: string;
	images: string[];
	manga: string;
	index: number;
	tittle: string;
	uploader: string;
	views?: number;
	group: string;
	createdAt?: Date;
	updatedAt?: Date;
}

enum UserLevel {
	normal,
	moderator,
}

interface User {
	username: string;
	password: string;
	nickname: string;
	avatar?: string;
	level: number;
	groups?: string[];
	bookmarks?: string[];
	history?: string[];
	notifications?: string[];
	ratesMade?: string[];
	createdAt: Date;
}

interface Group {
	_id: string;
	id?: string;
	name: string;
	members: string[];
}

interface Creator {
	_id: string;
	id?: string;
	name: string;
	sumary: string;
}

interface Comment {
	_id: string;
	id?: string;
	reply?: string;
	content: string;
	createdAt: Date;
}

interface Tag {
	id?: string;
	_id: string;
	name: string;
}

export {
	Manga,
	Chapter,
	Comment,
	Creator,
	Group,
	Tag,
	User,
	MangaStatus,
	UserLevel,
};
