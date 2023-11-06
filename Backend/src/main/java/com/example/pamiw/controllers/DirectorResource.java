package com.example.pamiw.controllers;

import com.example.pamiw.model.Director;
import com.example.pamiw.model.HttpResponse;
import com.example.pamiw.model.Movie;
import com.example.pamiw.model.ServiceResponse;
import com.example.pamiw.service.DirectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/directors")
public class DirectorResource {

    private final DirectorService directorService;

    public DirectorResource(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping("/allp")
    public ResponseEntity<HttpResponse> getDirectorsPage(@RequestParam Optional<String> name,
                                                  @RequestParam Optional<Integer> page,
                                                  @RequestParam Optional<Integer> size) {
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .data(Map.of("page", directorService.getDirectorsPage(name.orElse(""), page.orElse(0), size.orElse(5))))
                        .build());
    }
    @GetMapping("/all")
    public ServiceResponse<List<Director>> getDirectors() {
        return directorService.getDirectors();
    }

    @PostMapping("/add")
    public ServiceResponse<Director> addDirector(@RequestBody Director director) {
        if(director == null || director.getName() == null || director.getSurname() == null) {
            return new ServiceResponse<>(null, false, "Fields cannot be null");
        }

        return directorService.addDirector(director);
    }

    @DeleteMapping("/delete/{id}")
    public ServiceResponse<Director> deleteDirector(@PathVariable("id") Long id) {
        if (id == null) {
            return new ServiceResponse<>(null, false, "ID cannot be null!");
        }
        return this.directorService.deleteDirector(id);
    }

    @PutMapping("/update")
    public ServiceResponse<Director> updateDirector(@RequestBody Director director) {
        if (director.getId() == null) {
            return new ServiceResponse<>(null, false, "Id cannot be null");
        }
        return directorService.updateDirector(director);
    }

}
