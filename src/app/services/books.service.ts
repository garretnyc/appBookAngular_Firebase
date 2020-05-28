import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Book} from '../models/book.model';  //All the things imported in {} is objects.
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;  //special way to import DataSnapShot.
import { cpus } from 'os';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

    books:Book[]=[];
    booksSubject = new Subject<Book[]>();
  


     constructor() { 
       this.getBooks();
     }

     emitBooks(){
       this.booksSubject.next(this.books);
     }


     saveBooks(){
       firebase.database().ref('/books').set(this.books); //set will overwrite all data saved in database.
       console.log(this.books);
     }

     getBooks(){
       firebase.database().ref('/books')
                .on('value',(data: DataSnapshot)=>{
                  this.books =data.val() ?data.val() :[];
                  this.emitBooks();

                });
     }

     getOneBook(id:number){
       return new Promise(
         (resolve,reject)=>{
           firebase.database().ref('/books/'+id).once('value').then( //***Must check the chemin of database the / after books important.
             (data:DataSnapshot) =>{
               resolve(data.val());
             },(error)=>{
               reject(error);
             }
           );
         }
       );
     }



     createNewBook(newBook:Book){
       this.books.push(newBook);
       this.saveBooks();
       this.emitBooks();
     }

     removeBook(book:Book){
       if(book.photo){
         const storageRef =firebase.storage().refFromURL(book.photo);
         storageRef.delete().then(
           ()=>{
             console.log('photo removed.');
           },
           (error)=>{
             console.log('could not remove photo'+error);
           }
         );
       }
       const bookIndexToRemove =this.books.findIndex(
         (bookEl)=>{
           if(bookEl===book){
             return true;
           }

           
         }
       );
       this.books.splice(bookIndexToRemove,1);
       this.saveBooks();
       this.emitBooks();
     }

     uploadFile(file:File){
       return new Promise(
         (resolve,reject)=>{
           const almostUniqueFileName = Date.now().toString();
           const upload = firebase.storage().ref()
              .child('images/'+almostUniqueFileName+file.name).put(file); //for upload files.   ffile.name how it works???.
                                                                         //put() for upoad files,it return a task so we can callback.
              upload.on(firebase.storage.TaskEvent.STATE_CHANGED,    // for Sending back an url.
                (snapshot)=>{
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');    //***the first callback function is the snapshot of progress.
                },
                (error)=>{
                  console.log('Erreur de chargement ! :'+error);
                  reject();
                },
                ()=>{
                   resolve(upload.snapshot.ref.getDownloadURL());
                     //once done it send the URL.
                   console.log('hello'+upload.snapshot.ref.getDownloadURL());
                   //Why we use resolve because we use Promise above on,but on is not not promise!!!!!.
                }
                );   //just mind the size of pictures.
               

              

             
         }
       );
     }
}
