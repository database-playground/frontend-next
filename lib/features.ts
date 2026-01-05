export const ENABLE_STATISTICS_PAGE = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_STATISTICS_PAGE);
export const ENABLE_SOCIAL_PLATFORM = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_SOCIAL_PLATFORM);
export const CHEAT_DETECTION = requireExplicitlyEnabled(process.env.NEXT_PUBLIC_FEATURE_CHEAT_DETECTION);

/**
 * Return false if the feature is explicitly disabled; true otherwise.
 */
function requireExplicitlyDisabled(feature: string | undefined) {
  return !(feature === "false" || feature === "0");
}

/**
 * Return true if the feature is explicitly enabled; false otherwise.
 */
function requireExplicitlyEnabled(feature: string | undefined) {
  return feature === "true" || feature === "1";
}
