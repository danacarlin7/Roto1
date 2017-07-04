import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private activatedR:ActivatedRoute,private articleService:ArticleService) { }

  id: any;
  article: any;

  ngOnInit() {
    this.activatedR.params.subscribe(
      params => {
        this.id = +params['id'];
        this.articleService.fetchPost(this.id).subscribe(
          response => {
            this.article = response;
          }
        );
      }
    );
  }

}
