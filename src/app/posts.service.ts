import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{name: string}>(
        'https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json',
        postData,
        { observe: 'response' }
      ).subscribe({
        next: (responseData) => {
          console.log(responseData.body);
        },
        error: (err) => {
          this.error.next(err.message);
        }
      });
  }

  fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello!'}),
          params: searchParams,
          responseType: 'json'
        }
      ).pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData)
            if (responseData.hasOwnProperty(key))
              postsArray.push({ ...responseData[key], id: key });
          return postsArray;
        }),
        catchError(errorResponse => {
          // Send to analytics server
          return throwError(() => new Error(errorResponse.message));
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
      ).pipe(tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log(event);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      }));
  }
}
