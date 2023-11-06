package com.example.pamiw.repo;

import com.example.pamiw.model.Movie;
import com.example.pamiw.model.ServiceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long> {
    Page<Movie> findByTitleContaining(String title, Pageable pageable);
}
