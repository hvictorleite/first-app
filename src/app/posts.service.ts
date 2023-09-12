import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{name: string}>('https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        }
      });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData)
          if (responseData.hasOwnProperty(key))
            postsArray.push({ ...responseData[key], id: key });
        return postsArray;
      }));
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json')
  }
}