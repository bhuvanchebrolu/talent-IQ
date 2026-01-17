import mongoose from "mongoose";
import User from "../models/User.js";
import { connectDB } from "../lib/db.js";
import { ENV } from "../lib/env.js";
import { upsertStreamUser } from "../lib/stream.js";

const userData ={
  "id": "user_38MqVc3FqLzl8aQ7PewRxW0bXbW",
  "object": "user",
  "username": null,
  "first_name": "Cheb",
  "last_name": "Bhuvan",
  "locale": null,
  "image_url": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zOE1xVmNUaFhKcmNEYTZTaVRLbmJjTnR3VGYifQ",
  "has_image": true,
  "primary_email_address_id": "idn_38MqUs02eEu1NCeaMW6LlbDQxTe",
  "primary_phone_number_id": null,
  "primary_web3_wallet_id": null,
  "password_enabled": false,
  "two_factor_enabled": false,
  "totp_enabled": false,
  "backup_code_enabled": false,
  "email_addresses": [
    {
      "id": "idn_38MqUs02eEu1NCeaMW6LlbDQxTe",
      "object": "email_address",
      "email_address": "bhuvancheb@gmail.com",
      "reserved": false,
      "verification": {
        "object": "verification_from_oauth",
        "status": "verified",
        "strategy": "from_oauth_google",
        "attempts": null,
        "expire_at": null
      },
      "linked_to": [
        {
          "type": "oauth_google",
          "id": "idn_38MqUmtzHzC4xxsnkRGJvsMp84v"
        }
      ],
      "matches_sso_connection": false,
      "created_at": 1768619805296,
      "updated_at": 1768619811670
    }
  ],
  "phone_numbers": [],
  "web3_wallets": [],
  "passkeys": [],
  "external_accounts": [
    {
      "object": "external_account",
      "id": "eac_38MqUoWW5PqcLI7XT1HDo3w4ff7",
      "provider": "oauth_google",
      "identification_id": "idn_38MqUmtzHzC4xxsnkRGJvsMp84v",
      "provider_user_id": "104917125665513478980",
      "approved_scopes": "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
      "email_address": "bhuvancheb@gmail.com",
      "first_name": "Cheb",
      "last_name": "Bhuvan",
      "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKrhFF4aNrBnaaKN-2KCtqYoWMz-OH81hmUVRplCxfKChpPkg=s1000-c",
      "image_url": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLcmhGRjRhTnJCbmFhS04tMktDdHFZb1dNei1PSDgxaG1VVlJwbEN4ZktDaHBQa2c9czEwMDAtYyIsInMiOiJadUdKVzk3SnNEbXA3VGU5WDdLN1BJVSttL1B0N1FybHFESTRtV0hQK3NjIn0",
      "username": null,
      "phone_number": null,
      "public_metadata": {},
      "label": null,
      "created_at": 1768619805289,
      "updated_at": 1768619805289,
      "verification": {
        "object": "verification_oauth",
        "status": "verified",
        "strategy": "oauth_google",
        "attempts": null,
        "expire_at": 1768620379679
      }
    }
  ],
  "saml_accounts": [],
  "enterprise_accounts": [],
  "password_last_updated_at": null,
  "public_metadata": {},
  "private_metadata": {},
  "unsafe_metadata": {},
  "external_id": null,
  "last_sign_in_at": 1768619811674,
  "banned": false,
  "locked": false,
  "lockout_expires_in_seconds": null,
  "verification_attempts_remaining": 100,
  "created_at": 1768619811660,
  "updated_at": 1768619811685,
  "delete_self_enabled": true,
  "bypass_client_trust": false,
  "create_organization_enabled": true,
  "last_active_at": 1768619811659,
  "mfa_enabled_at": null,
  "mfa_disabled_at": null,
  "legal_accepted_at": null,
  "requires_password_reset": false,
  "profile_image_url": "https://images.clerk.dev/oauth_google/img_38MqVcThXJrcDa6SiTKnbcNtwTf"
}
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
