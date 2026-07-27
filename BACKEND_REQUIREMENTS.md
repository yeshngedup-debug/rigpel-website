# Rigpel Job Marketplace - Backend & Database Requirements

This document outlines the Supabase configuration, database schema, Storage buckets, and API endpoints required to support the Rigpel marketplace frontend.

## 1. Authentication Configuration

- **Provider**: Phone OTP (Supabase Auth)
- **External Provider**: Twilio (Verify Service) for production
- **Requirements**:
  - Enable "Phone Provider" in Supabase Auth settings
  - Configure Twilio `Account SID`, `Auth Token`, and `Verify Service SID`
  - Enable "Confirm Phone" to ensure workers are verified
  - For testing: Add test phone numbers in Auth Settings → Phone Auth

## 2. Database Schema (PostgreSQL)

### Table: `profiles`
Stores extended user data for Clients, Workers, and Admins.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK, references `auth.users.id` |
| `full_name` | text | |
| `phone` | text | Unique |
| `role` | text | Enum: `client`, `worker`, `admin` |
| `avatar_url` | text | Nullable |
| `skills` | text[] | Array of strings (workers) |
| `cid_url` | text | CID document URL |
| `cid_status` | text | Default: `pending`, Enum: `pending`, `verified`, `rejected` |
| `bank_qr_url` | text | mBoB/BNB/BOB QR image URL |
| `bank_name` | text | Enum: `mBoB`, `BNB`, `BOB`, `other` |
| `rating` | numeric | Default: 0 |
| `jobs_completed` | int | Default: 0 |
| `account_status` | text | Default: `active`, Enum: `active`, `suspended` |
| `created_at` | timestamptz | |

### Table: `jobs`
Stores part-time job postings created by Clients.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `client_id` | uuid | FK → `profiles.id` |
| `title` | text | |
| `category` | text | Enum: `Tech`, `Labor`, `Service`, `Creative`, `Hospitality`, `Other` |
| `description` | text | |
| `duration_value` | int | |
| `duration_unit` | text | Enum: `day`, `week`, `month` |
| `location_name` | text | |
| `location_coords` | point | Nullable |
| `pay_amount` | numeric | |
| `pay_period` | text | Enum: `day`, `week`, `month` |
| `duties` | text[] | Array of duty strings |
| `status` | text | Default: `open`, Enum: `open`, `in_progress`, `filled`, `cancelled` |
| `is_featured` | boolean | Default: false |
| `is_moderated` | text | Default: `pending`, Enum: `pending`, `approved`, `rejected`, `flagged` |
| `created_at` | timestamptz | |

### Table: `applications`
Tracks job applications from Workers.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `job_id` | uuid | FK → `jobs.id` |
| `worker_id` | uuid | FK → `profiles.id` |
| `status` | text | Default: `pending`, Enum: `pending`, `selected`, `rejected` |
| `applied_at` | timestamptz | |

### Table: `payments`
Tracks manual payment verification for listing/featured fees.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `client_id` | uuid | FK → `profiles.id` |
| `job_id` | uuid | FK → `jobs.id` |
| `screenshot_url` | text | |
| `amount` | numeric | |
| `status` | text | Default: `pending`, Enum: `pending`, `approved`, `rejected` |
| `admin_notes` | text | Nullable |
| `created_at` | timestamptz | |

## 3. Storage Buckets

Create these buckets in Supabase Storage with RLS policies:

1. **`avatars`**: Public read, owner-only write (profile pictures)
2. **`cid-documents`**: Admin-only read, owner-only write (private)
3. **`bank-qrs`**: Selected-client-only read, owner-only write (private)
4. **`payment-screenshots`**: Admin-only read, owner-only write (private)

## 4. Row Level Security (RLS) Policies

### `profiles`
- **SELECT**: Everyone can view profiles (public worker profiles)
- **INSERT**: Authenticated users can create own profile
- **UPDATE**: Users can update own profile; Admins can update any profile

### `jobs`
- **SELECT**: Anyone can view `open` jobs; clients can view own jobs
- **INSERT**: Authenticated clients can create jobs
- **UPDATE**: Job owner can update; Admins can moderate
- **DELETE**: Job owner can delete; Admins can remove

### `applications`
- **SELECT**: Workers see own; Clients see applications for their jobs; Admins see all
- **INSERT**: Authenticated workers can apply
- **UPDATE**: Job owner can select/reject; Admins can manage

### `payments`
- **SELECT**: Client sees own; Admins see all
- **INSERT**: Client can upload payment screenshots
- **UPDATE**: Admins can approve/reject

## 5. API Endpoints

### Auth
```
POST /api/auth/send-otp       # Send OTP to phone
POST /api/auth/verify-otp     # Verify OTP + create session
POST /api/auth/complete-profile # Set role + profile data after auth
```

### Jobs
```
GET    /api/jobs?category=&duration=&payMin=&payMax=&location=&page=&status=
GET    /api/jobs/:id
POST   /api/jobs              # Client only
PATCH  /api/jobs/:id           # Client: edit; Admin: moderate
DELETE /api/jobs/:id
PATCH  /api/jobs/:id/status   # Client: open/in_progress/filled/cancelled
```

### Applications
```
GET    /api/jobs/:id/applications  # Client: review applicants
POST   /api/jobs/:id/apply         # Worker: one-tap apply
PATCH  /api/applications/:id/select # Client: select worker → unlock contact
```

### Users (Profiles)
```
GET    /api/users/me
PATCH  /api/users/me
POST   /api/users/me/cid      # Upload CID document
POST   /api/users/me/bank-qr  # Upload bank QR image
GET    /api/users/:id         # Public profile
```

### Admin
```
GET    /api/admin/stats
GET    /api/admin/jobs/moderation
PATCH  /api/admin/jobs/:id/moderate  # approve/reject/flag
GET    /api/admin/users
PATCH  /api/admin/users/:id          # verify CID, suspend/activate
GET    /api/admin/payments
PATCH  /api/admin/payments/:id       # approve/reject payment screenshot
```

## 6. Supabase Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 7. Webhook (Optional)

For Twilio SMS status callbacks (if using custom OTP):
```
POST /api/webhooks/twilio-status
```
