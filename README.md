# 🚀 Spring Boot + Redis + MySQL + Next.js (TypeScript) Caching Project

## 📌 Introduction
This project demonstrates how **caching** improves application performance using:
- **Spring Boot** (Backend) with **Redis** caching & **MySQL** database.
- **Next.js (TypeScript)** (Frontend) with **SWR** for caching API responses.
- **Caching in authentication and authorization**.

### 🤔 Why Use Caching?
Caching reduces database queries and speeds up responses by storing frequently accessed data in **fast storage (Redis, Memory, or Browser Cache).**

---

## 🛠️ Technologies Used
### **Backend (Spring Boot + Redis)**
- **Spring Boot 3** (Java-based backend framework)
- **Spring Data JPA** (For MySQL database interaction)
- **Spring Cache** (For caching)
- **Redis** (For fast data retrieval)
- **MySQL** (Database)

### **Frontend (Next.js + TypeScript)**
- **Next.js** (React-based frontend framework)
- **TypeScript** (For type safety)
- **SWR** (React hook for caching API requests)
- **Axios** (HTTP client for API requests)

---

## 📂 Project Structure
```
📦 caching-project
├── backend (Spring Boot + Redis + MySQL)
│   ├── src/main/java/com/example/caching
│   ├── CacheDemoApplication.java
│   ├── controller/UserController.java
│   ├── service/UserService.java
│   ├── repository/UserRepository.java
│   ├── entity/User.java
│   ├── config/RedisConfig.java
│   ├── application.properties
├── frontend (Next.js + TypeScript + SWR)
│   ├── app
│   │   ├── lib/fetchUsers.ts
│   │   ├── lib/api.ts
│   │   ├── types/index.ts
│   │   ├── users/UserList.tsx
│   │   ├── users/UserForm.tsx
│   │   ├── pages/index.tsx
│   ├── .env.local
```

---

## 🔥 Caching in Backend (Spring Boot + Redis)
### **How does it work?**
✅ **`@Cacheable`** stores data in **Redis** after the first request.<br>
✅ **`@CacheEvict`** removes/updates cache when data changes.<br>
✅ **Redis** stores the cache, reducing database queries.

### **Enable Caching in Spring Boot**
```java
@SpringBootApplication
@EnableCaching  // Enables Spring Caching
public class CacheDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(CacheDemoApplication.class, args);
    }
}
```

### **Configure Redis in `application.properties`**
```properties
spring.cache.type=redis
spring.data.redis.host=localhost
spring.data.redis.port=6379
```

### **Caching User Data**
```java
@Service
public class UserService {
    @Cacheable(value = "users", key = "#id") // Fetch from cache
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    @CacheEvict(value = "users", allEntries = true) // Clear cache when data updates
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
```

---

## ⚡ Caching in Frontend (Next.js + SWR)
### **How does it work?**
✅ **SWR** fetches data and caches it in the browser.<br>
✅ **Mutate()** refreshes data after updates/deletions.<br>
✅ **Faster UI** as fewer API calls are needed.

### **Install Dependencies**
```sh
npm install axios swr
```

### **Use SWR to Cache API Calls**
```ts
import useSWR from "swr";
import { api } from "../utils/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUsers() {
    const { data, error, mutate } = useSWR("/users", fetcher);
    return { users: data || [], isLoading: !error && !data, mutate };
}
```

---

## 🚀 Running the Project

## **1️⃣ Setup Backend (Spring Boot)**
### **Install Dependencies**
```sh
cd backend
mvn clean install
```
### **Start Redis**
```sh
docker run --name redis-cache -p 6379:6379 -d redis
```
### **Run Spring Boot Server**
```sh
mvn spring-boot:run
```

## **2️⃣ Setup Frontend (Next.js + TypeScript)**
### **Install Dependencies**
```sh
cd frontend
npm install
```
### **Run Next.js Frontend**
```sh
npm run dev
```

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/users/{id}` | Get user by ID (cached) |
| **GET** | `/users` | Get all users (not cached) |
| **POST** | `/users` | Add new user (clears cache) |
| **DELETE** | `/users/{id}` | Delete user (clears cache) |

---

## 🔥 How Frontend Caching Works?
✅ SWR caches API responses in the browser memory.<br>
✅ **`useSWR`** hook fetches data and caches it for faster UI updates.<br>
✅ **`mutate()`** updates the cache after data changes.<br>
✅ **Faster UI** as fewer API calls are needed.
✅ When the data is fetched once, it is stored locally, reducing redundant API calls.<br>
✅ On subsequent requests, SWR first returns the cached data (for fast UI updates) and then re-fetches it in the background.<br>
✅ When data changes (e.g., a user is added), SWR's mutate() updates the cache.

---

## 🎯 How Caching Helps Authentication & Authorization
✅ **Login Token Caching**: Reduce database hits for session validation.<br>
✅ **Role-Based Access Control**: Cache user roles for faster authorization.<br>
✅ **Session Expiration**: Auto-clear cache after a set period.<br>
✅ **Faster Authentication & Authorization**: Improve performance with caching.<br>
✅ **Authorization Data Caching**: Faster role-based access control.<br>
✅ **Session Expiration**: Auto-clear cache after a set period.

---

## 🎉 Conclusion
✅ **Spring Boot + Redis** caches data to avoid repetitive DB queries.<br>
✅ **Next.js + SWR** caches API responses, making UI faster.<br>
✅ **Improves authentication and authorization performance**.<br>
✅ **Reduces latency, improves user experience, and speeds up API calls.** 🚀

---

## 💡 Future Enhancements
✅ Add **JWT-based authentication with cache**.<br>
✅ Implement **auto-expiring tokens in Redis**.<br>
✅ Add **pagination with cache optimization**.

---

🔥 **Now your project is fully optimized with caching! 🚀** Let me know if you find any bug!

## 📚 Read my article
for more information - https://medium.com/@yashkolte_/what-is-caching-22b7dbcf3d09

