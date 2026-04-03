export interface BrandingConfig {
  appName: string;
  brandSlug: string;
  accentLabel: string;
}

export const defaultBranding: BrandingConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Horizonte ERP",
  brandSlug: process.env.NEXT_PUBLIC_BRAND_SLUG ?? "horizonte",
  accentLabel: "Aria"
};
