import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book:Book;

  constructor(private route:ActivatedRoute,private router:Router,
              private booksService:BooksService) { }

  ngOnInit(){
    this.book=new Book('','');
    const id=this.route.snapshot.params['id']; //here use activatedroute
    this.booksService.getOneBook(+id).then(
      (book:Book)=>{
        this.book =book;
        console.log(book.photo);
      }
    );
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
