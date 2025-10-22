/**
 * Get the current page URL.
 *
 * Note that this function is not SSR-friendly.
 * You should import it with `current-page.lazy.tsx`, which disables SSR.
 */
export default function CurrentPage() {
  return <p>網址：{window.location.href}</p>;
}
