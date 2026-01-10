import mongoose from "mongoose";
import User from "../models/User.js";
import { connectDB } from "../lib/db.js";
import { ENV } from "../lib/env.js";
import { upsertStreamUser } from "../lib/stream.js";

const userData = {
  id: "user_380osVj5bqwGbEOmO2uV7NC5RQH",
  object: "user",
  username: null,
  first_name: "Bhuvan",
  last_name: "Chebrolu",
  locale: null,
  image_url:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zODBvc1BJUHJvZG5vV3ltUTVGTmxLeFlISDQifQ",
  has_image: true,
  primary_email_address_id: "idn_380onEzYHH9bWtNNiiUh6zWF4vm",
  primary_phone_number_id: null,
  primary_web3_wallet_id: null,
  password_enabled: false,
  two_factor_enabled: false,
  totp_enabled: false,
  backup_code_enabled: false,
  email_addresses: [
    {
      id: "idn_380onEzYHH9bWtNNiiUh6zWF4vm",
      object: "email_address",
      email_address: "bhuvanchebrolu@gmail.com",
      reserved: false,
      verification: {
        object: "verification_from_oauth",
        status: "verified",
        strategy: "from_oauth_google",
        attempts: null,
        expire_at: null,
      },
      linked_to: [
        {
          type: "oauth_google",
          id: "idn_380onDZrZuYwVynfDJ0P1OcnTU5",
        },
      ],
      matches_sso_connection: false,
      created_at: 1767946013059,
      updated_at: 1767946055822,
    },
  ],
  phone_numbers: [],
  web3_wallets: [],
  passkeys: [],
  external_accounts: [
    {
      object: "external_account",
      id: "eac_380onF1Qj05NGi3KyEOZvEx2KXk",
      provider: "oauth_google",
      identification_id: "idn_380onDZrZuYwVynfDJ0P1OcnTU5",
      provider_user_id: "112763702319452851526",
      approved_scopes:
        "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
      email_address: "bhuvanchebrolu@gmail.com",
      first_name: "Bhuvan",
      last_name: "Chebrolu",
      avatar_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKp7mOearz4x8zWFtGNJdafgGieiUHoXh9PQK38ArDfrExkgmQ7=s1000-c",
      image_url:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLcDdtT2Vhcno0eDh6V0Z0R05KZGFmZ0dpZWlVSG9YaDlQUUszOEFyRGZyRXhrZ21RNz1zMTAwMC1jIiwicyI6InFnOTh3SzhWM3JVOFR0UDJsS3JWVW8rVndHZFBXVi9RQUUzaDFwYVJkeVUifQ",
      username: null,
      phone_number: null,
      public_metadata: {},
      label: null,
      created_at: 1767946013051,
      updated_at: 1767946013051,
      verification: {
        object: "verification_oauth",
        status: "verified",
        strategy: "oauth_google",
        attempts: null,
        expire_at: 1767946607849,
      },
    },
  ],
  saml_accounts: [],
  enterprise_accounts: [],
  password_last_updated_at: null,
  public_metadata: {},
  private_metadata: {},
  unsafe_metadata: {},
  external_id: null,
  last_sign_in_at: 1767946055829,
  banned: false,
  locked: false,
  lockout_expires_in_seconds: null,
  verification_attempts_remaining: 100,
  created_at: 1767946055812,
  updated_at: 1767946055845,
  delete_self_enabled: true,
  bypass_client_trust: false,
  create_organization_enabled: true,
  last_active_at: 1767946055811,
  mfa_enabled_at: null,
  mfa_disabled_at: null,
  legal_accepted_at: null,
  requires_password_reset: false,
  profile_image_url:
    "https://images.clerk.dev/oauth_google/img_380osPIProdnoWymQ5FNlKxYHH4",
};

const addUser = async () => {
  console.log(ENV.DB_URL);
  await mongoose.connect("mongodb://localhost:27017/interview_db");
  const newUser = {
    clerkId: userData.id,
    email: userData.email_addresses[0]?.email_address,
    name: `${userData.first_name || ""} ${userData.last_name || ""}`,
    profileImage: userData.image_url,
  };

  // await User.create(newUser);
  await upsertStreamUser({
    id: newUser.clerkId.toString(),
    name: newUser.name,
    image: newUser.profileImage,
  });
};

addUser();
