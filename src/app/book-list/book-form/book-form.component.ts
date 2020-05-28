import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {Book} from '../../models/book.model'; //*** Important to Display with Book model everytime.

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm:FormGroup;
  fileIsUploading= false;
  fileUrl:string;
  fileUploaded=false;

  constructor(private formBuilder:FormBuilder,private booksService:BooksService, private router:Router) { }

  ngOnInit(){
    this.initForm();
  }
  
  initForm(){
    this.bookForm =this.formBuilder.group({
      title:['',Validators.required],
      author: ['',Validators.required],
      synopsis:''
    });
  }

  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author =this.bookForm.get('author').value;
    const synopsis=this.bookForm.get('synopsis').value;
    const newBook = new Book(title,author);
    newBook.synopsis= synopsis;   //synopsis is facultative so not use Book injection for strit rules no errors.
    if(this.fileUrl && this.fileUrl !==''){
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
    }

    detectFiles(event){
      console.log(event.target.files);
      this.onUploadFile(event.target.files[0]); //???need to understand why they use files[0].
    }                                           //Answer: Normal the methos is files not file!!!!!!.

  onUploadFile(file:File){
    this.fileUploaded=true;
    this.booksService.uploadFile(file).then(
      (url:string)=>{
         this.fileUrl = url;
         this.fileIsUploading=false;
         
      }
    );
  }


}
