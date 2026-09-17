# Ekalavya Foundation Backend

## Core Infrastructure (Member 4)

This project uses a shared core infrastructure built by Member 4.
Please follow these conventions when building modules (Members 1, 2, 3).

### Authentication & RBAC

All protected routes MUST use the `authenticate` middleware.
If a route is role-specific, it MUST also use the `authorize` middleware.

```typescript
import { authenticate, authorize } from '../middlewares/authMiddleware';

// Example: Protect a route for Teachers and Admins only
router.get('/teacher/dashboard', authenticate, authorize('TEACHER', 'ADMIN'), controllerFunc);
```

### Response Formats

All API responses MUST use the utility functions in `src/utils/response.ts`.

```typescript
import { sendSuccess, sendError } from '../utils/response';

// Success
return sendSuccess(res, data);

// Error
return sendError(res, 'NOT_FOUND', 'Entity not found', 404);
```

### Models

Do NOT duplicate models. If you need a core entity (User, Course, Class, University, Opportunity), import it directly from `src/models/User.ts` (etc).
