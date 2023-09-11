import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: string}>('https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        }
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-v-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData)
          if (responseData.hasOwnProperty(key))
            postsArray.push({ ...responseData[key], id: key });
        return postsArray;
      }))
      .subscribe({
        next: (posts) => {
          this.loadedPosts = posts;
        }
      });
  }
}
