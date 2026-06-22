package com.intqeasd007.SyncIn.repository;

import com.intqeasd007.SyncIn.entity.Role;
import com.intqeasd007.SyncIn.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    // Spring Boot automatically implements this to check for existence
    boolean existsByEmpId(String empId);

    // Optional, but highly recommended if emails must be unique
    boolean existsByEmail(String email);
    List<User> findByCohort_BatchCode(String batchCode);
    // Find users by their Role enum
    List<User> findByRole(Role role);
    long countByCohort_BatchCodeAndRole(String batchCode, Role role);
}