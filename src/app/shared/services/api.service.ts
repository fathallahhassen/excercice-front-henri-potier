import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


const GET = 'get';
const POST = 'post';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {

  }


  /**
   * This function will be used to call the final api.
   * @param url
   * @param options
   */
  get(url, options = {}): Observable<any> {
    return this.call(GET, url, null, options).pipe(map(data => data));
  }


  /**
   * final api call function
   * @param method
   * @param url
   * @param body
   * @param options
   */
  call(method, url, body, options): Observable<any> {
    switch (method) {
      case GET :
        return this.httpClient.get(url, options);
      case POST :
        return this.httpClient.post(url, body, options);
    }
  }
}
