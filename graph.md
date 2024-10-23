```mermaid
graph TD;
    A[User Interface] -->|Interacts with| B[React Components]
    B --> C[Task List Component]
    B --> D[Task Component]
    B --> E[Add Task Component]
    C --> F[Task Item Component]
    D --> G[Task Item Component]
    E --> H[Form Component]
    F --> I[Task State Management]
    G --> I[Task State Management]
    H --> I[Task State Management]
    I --> J[Local Storage / JSON Server]
    J --> K[Data Persistence]
    K --> L[Backend API Optional]
    L --> M[Database Optional]
  ```