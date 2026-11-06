# Travel Agency — ASP.NET Core REST API + Next.js

Full-stack portfolio project for managing travel-product and category records through a REST API and browser interface.

## Technology
- **Backend:** C#, ASP.NET Core Web API, Entity Framework Core, MySQL, Swagger/OpenAPI
- **Frontend:** Next.js (Pages Router), React, Axios, Bootstrap
- **Architecture:** HTTP controllers → EF Core DbContext → MySQL; client pages consume REST endpoints

## Features in the supplied implementation
- REST endpoints for product and category CRUD
- Browser-based category and product CRUD screens using shared React components
- MySQL persistence with EF Core migrations
- OpenAPI interface in development

## Quick start (local development)
1. Create a MySQL database; configure a dedicated local database user.
2. Set `ConnectionStrings__DefaultConnection` **in your environment**, for example `Server=localhost;Database=Agencia_Api_OFC;Uid=travel_app;Pwd=YOUR_LOCAL_PASSWORD`. Never commit credentials.
3. With .NET SDK compatible with the project's `net6.0` target installed, run `dotnet restore` then `dotnet run --project backend/Agencia_Api_OFC.csproj --urls http://localhost:5000`. Note: .NET 6 is end-of-support; upgrade and regression-test dependencies before production use.
4. In `frontend/`, copy `.env.example` to `.env.local`, run `npm ci`, and `npm run dev`. Open `http://localhost:3000`.
5. Apply database migrations using `dotnet ef database update --project backend/Agencia_Api_OFC.csproj` if `dotnet-ef` is installed.

## API endpoints
| Resource | Read/list | Create | Update | Delete |
|---|---|---|---|---|
| Products | `GET /api/Produto` | `POST /api/Produto` | `PUT /api/Produto/{id}` | `DELETE /api/Produto/{id}` |
| Categories | `GET /api/Categorias` | `POST /api/Categorias` | `PUT /api/Categorias/{id}` | `DELETE /api/Categorias/{id}` |

## Engineering notes
- Application secrets were removed from checked-in configuration. Allowed development browser origin defaults to `http://localhost:3000`.
- Historical sources include .NET 6 and Next.js 14; these are retained for traceability, not presented as up-to-date production dependencies.
- **Verification status:** source reviewed and cleaned; full application build, MySQL integration, browser CRUD, and end-to-end tests have **not** been executed in this packaging environment.
- No authentication/authorization is implemented. This is a development demonstration, **not** a production deployment.
- See `docs/ROADMAP.md` for next engineering improvements.

## Collaboration and ownership
Retain credit for original collaborators where applicable. Publish only source code you have permission to redistribute. No open-source license is assumed.
