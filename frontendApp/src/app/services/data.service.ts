import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
    path: string = environment.path;

    constructor(private http: HttpClient) { }

    getPosts(userId) {
        return this.http.get<any>(this.path + '/posts/' + userId)
    }

    getUsers() {
        return this.http.get<any>(this.path + '/users')
    }

    getProfile(userId) {
        return this.http.get<any>(this.path + '/profile/' + userId)
            .pipe(map(res => res));
    }

    savePost(post) {
        console.log('From data service|post:', post)
        return this.http.post(this.path + '/post', post)
            .subscribe(res => { })
    }


}