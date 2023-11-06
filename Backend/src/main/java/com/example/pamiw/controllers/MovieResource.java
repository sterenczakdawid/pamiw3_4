package com.example.pamiw.controllers;

import com.example.pamiw.model.HttpResponse;
import com.example.pamiw.model.Movie;
import com.example.pamiw.model.ServiceResponse;
import com.example.pamiw.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieResource {
    private final MovieService movieService;

    public MovieResource(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/all")
    public ResponseEntity<HttpResponse>getMovies(@RequestParam Optional<String> title,
                                                 @RequestParam Optional<Integer> page,
                                                 @RequestParam Optional<Integer> size) {
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .data(Map.of("page", movieService.getMovies(title.orElse(""), page.orElse(0), size.orElse(5))))
                        .build());
    }


    @PostMapping("/add")
    public ServiceResponse<Movie> addMovie(@RequestBody Movie movie) {
        if(movie == null || movie.getTitle() == null || movie.getDirector() == null || movie.getYearOfRelease() == 0 ) {
            return new ServiceResponse<>(null, false, "Fields cannot be null");
        }
        if(movie.getYearOfRelease() > 2023) {
            return new ServiceResponse<>(null, false, "Movie's release date cannot be in the future!");
        }

        return movieService.addMovie(movie);
    }

    @DeleteMapping("/delete/{id}")
    public ServiceResponse<Movie> deleteMovie(@PathVariable("id") Long id) {
        if (id == null) {
            return new ServiceResponse<>(null, false, "ID cannot be null!");
        }
        return this.movieService.deleteMovie(id);
    }

    @PutMapping("/update")
    public ServiceResponse<Movie> updateMovie(@RequestBody Movie movie) {
        if (movie.getId() == null) {
            return new ServiceResponse<>(null, false, "Id cannot be null");
        }
        return movieService.updateMovie(movie);
    }

    //    @GetMapping("/all")
//    public ServiceResponse<HttpResponse>getMovies(@RequestParam Optional<String> title,
//                                                  @RequestParam Optional<Integer> page,
//                                                  @RequestParam Optional<Integer> size) {
//        return new ServiceResponse<>(HttpResponse.builder()
//                .data(Map.of("page", movieService.getMovies(title.orElse(""), page.orElse(0), size.orElse(5))))
//                .build(), true, "Movie retrieved");
//    }

}
