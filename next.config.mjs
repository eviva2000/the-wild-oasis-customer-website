/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aaszdcvdlpwtevrctgqk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  out: "export",
};

export default nextConfig;
