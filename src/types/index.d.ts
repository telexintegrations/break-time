export interface Settings {
	label: string;
	type: string;
	required: boolean;
	default: string;
}

export interface Payload {
	return_url: string;
	settings: Settings;
}

export interface Quote {
	content: string;
}

export interface TelexData {
	message: string;
	username: string;
	event_name: string;
	status: string;
}

export interface QuotableResponse {
	_id: string;
	content: string;
	author: string;
	tags: [];
	authorSlug: string;
	length: number;
	dateAdded: string;
	dateModified: string;
}
