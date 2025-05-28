import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-userviewmovie',
  templateUrl: './userviewmovie.component.html',
  styleUrls: ['./userviewmovie.component.css']
})
export class UserviewmovieComponent implements OnInit {
  movies:Movie[]=[];
  errorMessage:string='';

  constructor(private movieService:MovieService, private router:Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }
  loadMovies():void{
    this.movieService.getAllMovies().subscribe(
      (data)=>(this.movies=data),
      (error)=>(this.errorMessage="Error Loading Movies")
    );
  }
  navigateToBooking(movieId:number){
    this.router.navigate(['/user/bookMovie',movieId]);
  }

}
