import { ClaimRead } from "@/types/claim.types";

export const mockClaims: ClaimRead[] = [
  {
    id: "claim_1",
    status: "False",
    message_type: "voice",
    created_at: new Date(Date.now() - 2 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
    vcon: {
      vcon: "0.0.1",
      uuid: "d7e4a6c0-2f31-4b85-8e19-a3f90000021c",
      created_at: "2026-11-07T12:37:00Z",
      parties: [{ hashed_whatsapp: "a3f9...21c" }],
      dialog: [
        { url: "https://example.invalid/audio/a3f9.ogg", duration: "0:42" },
      ],
      analysis: [
        {
          type: "transcript",
          confidence: 0.76,
          body: "INEC don postpone the Lagos governorship election.",
        },
      ],
    },
  },
  {
    id: "claim_2",
    status: "Unverified",
    message_type: "voice",
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
    vcon: {
      vcon: "0.0.1",
      uuid: "c1b2a3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      created_at: "2026-11-07T12:31:00Z",
      parties: [{ hashed_whatsapp: "b4c2...32a" }],
      dialog: [
        { url: "https://example.invalid/audio/b4c2.ogg", duration: "1:18" },
      ],
      analysis: [
        {
          type: "transcript",
          confidence: 0.43,
          body: "FG wan ban okada nationwide.",
        },
      ],
    },
  },
  {
    id: "claim_3",
    status: "Needs Human Review", // Maps to "Misleading" in UI
    message_type: "voice",
    created_at: new Date(Date.now() - 14 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
    vcon: {
      vcon: "0.0.1",
      uuid: "e9f8d7c6-5b4a-3c2d-1e0f-9a8b7c6d5e4f",
      created_at: "2026-11-07T12:25:00Z",
      parties: [{ hashed_whatsapp: "f8e1...00b" }],
      dialog: [
        { url: "https://example.invalid/audio/f8e1.ogg", duration: "0:56" },
      ],
      analysis: [
        {
          type: "transcript",
          confidence: 0.89,
          body: "New CBN notes no get security thread.",
        },
      ],
    },
  },
  {
    id: "claim_4",
    status: "True",
    message_type: "voice",
    created_at: new Date(Date.now() - 21 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
    vcon: {
      vcon: "0.0.1",
      uuid: "12345678-1234-1234-1234-123456789012",
      created_at: "2026-11-07T12:18:00Z",
      parties: [{ hashed_whatsapp: "a1b2...c3d" }],
      dialog: [
        { url: "https://example.invalid/audio/a1b2.ogg", duration: "0:34" },
      ],
      analysis: [
        {
          type: "transcript",
          confidence: 0.97,
          body: "You fit check your voter registration status on INEC website.",
        },
      ],
    },
  },
];
