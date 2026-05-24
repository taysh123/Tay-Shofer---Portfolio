import { encodePhone } from "@/lib/obfuscate";

const PHONE_PLAIN = "052-8183479";

export const socials = {
  email: "tayshofer05@gmail.com",
  phoneEncoded: encodePhone(PHONE_PLAIN),
  github: {
    handle: "taysh123",
    url: "https://github.com/taysh123",
  },
  linkedin: {
    label: "Tay Shofer",
    url: "https://www.linkedin.com/in/tay-shofer-1b2b54287",
  },
} as const;

export const siteMeta = {
  name: "Tay Shofer",
  role: "Software Developer",
  tagline:
    "Computer Science graduate building polished digital products, real-time systems, and memorable user experiences.",
  domain: "tayshofer.dev",
  url: "https://tayshofer.dev",
  locale: "en_US",
} as const;
