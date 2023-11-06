package com.example.pamiw.repo;

import com.example.pamiw.model.Director;
import com.example.pamiw.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepo extends JpaRepository<Director, Long> {
    Page<Director> findByNameContaining(String name, Pageable pageable);
}
