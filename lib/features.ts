export const ENABLE_STATISTICS_PAGE = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_STATISTICS_PAGE);
export const ENABLE_SOCIAL_PLATFORM = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_SOCIAL_PLATFORM);

/**
 * Return false if the feature is explicitly disabled; true otherwise.
 */
function requireExplicitlyDisabled(feature: string | undefined) {
  return !(feature === "false" || feature === "0");
}
