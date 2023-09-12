import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: string = null;
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error
      .subscribe({
        next: (errorMessage) => {
          this.error = errorMessage;
        }
      });

    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.error = null;
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe({
        next: (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        error: (err) => {
          this.error = err.message;
        }
    });
  }

  onClearPosts() {
    this.postsService.deletePosts()
      .subscribe({
        next: () => {
          this.loadedPosts = [];
        }
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
