# Dalmoa Frontend Architecture

## Components Structure

- base: primitive UI (Button, Card, Input, Container)
- common: reusable blocks (EmptyState, Pagination, etc)
- layout: header/footer/navigation
- listing: domain UI
- ad: ads UI

## Rules

- base는 절대 확장하지 않는다
- common은 재사용 UI
- layout은 페이지 구조
- feature는 business logic 기반


```
components/
├── base/
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   └── Input.tsx
├── common/
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── LoadingBlock.tsx
│   ├── Pagination.tsx
│   ├── SafeImage.tsx
│   └── SectionHeading.tsx
├── layout/
│   ├── LocaleSwitcher.tsx
│   ├── MainNav.tsx
│   ├── MobileNav.tsx
│   ├── SiteFooter.tsx
│   └── SiteHeader.tsx
├── ad/
├── listing/
```
