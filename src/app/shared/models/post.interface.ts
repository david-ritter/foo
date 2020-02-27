import { Observable } from 'rxjs';

export interface PostI {
    id?: string;
    titlePost: string;
    contentPost: string;
    imagePost?: any;
    tagsPost?: string[];
    fileRef?: any;
}
