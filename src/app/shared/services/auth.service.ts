import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
/**
 * Created by Hiren on 05-06-2017.
 */

@Injectable()
export class AuthService {

  counter:number = 0;

  constructor(private http:Http) {
    this.counter++;
  }

}
