export const ENABLE_STATISTICS_PAGE = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_STATISTICS_PAGE);
export const ENABLE_SOCIAL_PLATFORM = requireExplicitlyDisabled(process.env.NEXT_PUBLIC_FEATURE_SOCIAL_PLATFORM);
export const LOCK_USER_ON_LEAVING = requireExplicitlyEnabled(process.env.NEXT_PUBLIC_FEATURE_LOCK_USER_ON_LEAVING);

/**
 * Return false if the feature is explicitly disabled; true otherwise.
 */
function requireExplicitlyDisabled(feature: string | undefined) {
  return !(feature === "false" || feature === "0");
}

/**
 * Return false if the feature is explicitly enabled; true otherwise.
 */
function requireExplicitlyEnabled(feature: string | undefined) {
  return feature === "true" || feature === "1";
}